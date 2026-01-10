export type GuestExpense = {
  id: string;
  user_id: string;
  name: string;
  amount: number;
  category: string;
  date: string; // YYYY-MM-DD
  created_at: string;
};

export type GuestIncome = {
  id: string;
  user_id: string;
  source: string;
  amount: number;
  category: string;
  date: string; // YYYY-MM-DD
  created_at: string;
};

const KEY_EXPENSES = "trackora_guest_expenses";
const KEY_INCOME = "trackora_guest_income";

const todayISODate = () => new Date().toISOString().split("T")[0];

const uuid = () => {
  // crypto.randomUUID is supported in modern browsers; fallback keeps IDs unique enough for UI.
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
  date?: string;
  user_id?: string;
}): GuestExpense => {
  const next: GuestExpense = {
    id: uuid(),
    user_id: input.user_id ?? "guest",
    name: input.name || "Voice Expense",
    amount: Number(input.amount),
    category: input.category || "Other",
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
  date?: string;
  user_id?: string;
}): GuestIncome => {
  const next: GuestIncome = {
    id: uuid(),
    user_id: input.user_id ?? "guest",
    source: input.source || "Voice Income",
    amount: Number(input.amount),
    category: input.category || "Other",
    date: input.date ?? todayISODate(),
    created_at: new Date().toISOString(),
  };

  const existing = getGuestIncome();
  safeWrite(KEY_INCOME, [next, ...existing]);
  return next;
};
