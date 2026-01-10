import { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

// Guest user object for no-auth mode
const GUEST_USER: User = {
  id: 'guest-user',
  aud: 'authenticated',
  role: 'authenticated',
  email: 'guest@trackora.app',
  email_confirmed_at: new Date().toISOString(),
  phone: '',
  confirmed_at: new Date().toISOString(),
  last_sign_in_at: new Date().toISOString(),
  app_metadata: { provider: 'guest', providers: ['guest'] },
  user_metadata: { full_name: 'Guest User' },
  identities: [],
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isGuest: boolean;
  signInWithGoogle: () => Promise<{ error: any }>;
  signInWithEmail: (email: string, password: string) => Promise<{ error: any }>;
  signUpWithEmail: (email: string, password: string, fullName: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  enterAsGuest: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Check localStorage for guest mode
const getGuestMode = (): boolean => {
  try {
    return localStorage.getItem('trackora_guest_mode') === 'true';
  } catch {
    return false;
  }
};

const setGuestMode = (value: boolean): void => {
  try {
    if (value) {
      localStorage.setItem('trackora_guest_mode', 'true');
    } else {
      localStorage.removeItem('trackora_guest_mode');
    }
  } catch {
    // Ignore localStorage errors
  }
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isGuest, setIsGuest] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for existing guest mode
    if (getGuestMode()) {
      setUser(GUEST_USER);
      setIsGuest(true);
      setLoading(false);
      return;
    }

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const enterAsGuest = () => {
    setGuestMode(true);
    setUser(GUEST_USER);
    setIsGuest(true);
    navigate('/dashboard');
  };

  const signInWithGoogle = async () => {
    // Clear guest mode when signing in with real account
    setGuestMode(false);
    setIsGuest(false);
    
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`
      }
    });
    return { error };
  };

  const signInWithEmail = async (email: string, password: string) => {
    // Clear guest mode when signing in with real account
    setGuestMode(false);
    setIsGuest(false);
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (!error) {
      navigate('/dashboard');
    }
    return { error };
  };

  const signUpWithEmail = async (email: string, password: string, fullName: string) => {
    // Clear guest mode when signing up
    setGuestMode(false);
    setIsGuest(false);
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
        data: {
          full_name: fullName,
        }
      }
    });
    if (!error) {
      navigate('/dashboard');
    }
    return { error };
  };

  const signOut = async () => {
    setGuestMode(false);
    setIsGuest(false);
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      session, 
      loading, 
      isGuest, 
      signInWithGoogle, 
      signInWithEmail, 
      signUpWithEmail, 
      signOut,
      enterAsGuest 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}