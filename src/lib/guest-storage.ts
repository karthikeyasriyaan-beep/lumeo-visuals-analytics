export type GuestExpense = {
  id: string;
  user_id: string;
  name: string;
  amount: number;
  category: string;
  notes?: string;
  date: string; // YYYY-MM-DD
  created_at: string;
};

export type GuestIncome = {
  id: string;
  user_id: string;
  source: string;
  amount: number;
  category: string;
  notes?: string;
  date: string; // YYYY-MM-DD
  created_at: string;
};

const KEY_EXPENSES = "trackora_guest_expenses";
const KEY_INCOME = "trackora_guest_income";

const todayISODate = () => new Date().toISOString().split("T")[0];

const uuid = () => {
  const c: any = globalThis.crypto as any;
  return typeof c?.randomUUID === "function"
    ? c.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const safeRead = <T,>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
};

const safeWrite = (key: string, value: unknown) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore (private mode / quota)
  }
};

export const getGuestExpenses = (): GuestExpense[] => safeRead<GuestExpense[]>(KEY_EXPENSES, []);
export const getGuestIncome = (): GuestIncome[] => safeRead<GuestIncome[]>(KEY_INCOME, []);

export const addGuestExpense = (input: {
  name: string;
  amount: number;
  category?: string;
  notes?: string;
  date?: string;
  user_id?: string;
}): GuestExpense => {
  const next: GuestExpense = {
    id: uuid(),
    user_id: input.user_id ?? "guest",
    name: input.name || "Expense",
    amount: Number(input.amount),
    category: input.category || "Other",
    notes: input.notes || "",
    date: input.date ?? todayISODate(),
    created_at: new Date().toISOString(),
  };

  const existing = getGuestExpenses();
  safeWrite(KEY_EXPENSES, [next, ...existing]);
  return next;
};

export const addGuestIncome = (input: {
  source: string;
  amount: number;
  category?: string;
  notes?: string;
  date?: string;
  user_id?: string;
}): GuestIncome => {
  const next: GuestIncome = {
    id: uuid(),
    user_id: input.user_id ?? "guest",
    source: input.source || "Income",
    amount: Number(input.amount),
    category: input.category || "Other",
    notes: input.notes || "",
    date: input.date ?? todayISODate(),
    created_at: new Date().toISOString(),
  };

  const existing = getGuestIncome();
  safeWrite(KEY_INCOME, [next, ...existing]);
  return next;
};

export const updateGuestExpense = (id: string, updates: Partial<GuestExpense>): GuestExpense | null => {
  const existing = getGuestExpenses();
  const index = existing.findIndex(e => e.id === id);
  if (index === -1) return null;
  
  const updated = { ...existing[index], ...updates };
  existing[index] = updated;
  safeWrite(KEY_EXPENSES, existing);
  return updated;
};

export const updateGuestIncome = (id: string, updates: Partial<GuestIncome>): GuestIncome | null => {
  const existing = getGuestIncome();
  const index = existing.findIndex(e => e.id === id);
  if (index === -1) return null;
  
  const updated = { ...existing[index], ...updates };
  existing[index] = updated;
  safeWrite(KEY_INCOME, existing);
  return updated;
};

export const deleteGuestExpense = (id: string): boolean => {
  const existing = getGuestExpenses();
  const filtered = existing.filter(e => e.id !== id);
  if (filtered.length === existing.length) return false;
  safeWrite(KEY_EXPENSES, filtered);
  return true;
};

export const deleteGuestIncome = (id: string): boolean => {
  const existing = getGuestIncome();
  const filtered = existing.filter(e => e.id !== id);
  if (filtered.length === existing.length) return false;
  safeWrite(KEY_INCOME, filtered);
  return true;
};
