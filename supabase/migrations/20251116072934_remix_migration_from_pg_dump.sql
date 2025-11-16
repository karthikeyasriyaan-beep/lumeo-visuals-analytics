--
-- PostgreSQL database dump
--


-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.7

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--



--
-- Name: update_updated_at_column(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.update_updated_at_column() RETURNS trigger
    LANGUAGE plpgsql
    SET search_path TO 'public'
    AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;


SET default_table_access_method = heap;

--
-- Name: expenses; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.expenses (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    name text NOT NULL,
    amount numeric(15,2) NOT NULL,
    date date NOT NULL,
    category text,
    notes text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


--
-- Name: income; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.income (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    source text NOT NULL,
    amount numeric(15,2) NOT NULL,
    date date NOT NULL,
    category text,
    notes text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


--
-- Name: loans; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.loans (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    name text NOT NULL,
    initial_amount numeric(15,2) NOT NULL,
    current_balance numeric(15,2) NOT NULL,
    interest_rate numeric(5,2),
    monthly_payment numeric(15,2),
    start_date date NOT NULL,
    end_date date,
    status text DEFAULT 'active'::text,
    notes text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


--
-- Name: receipts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.receipts (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    name text NOT NULL,
    amount numeric(15,2) NOT NULL,
    date date NOT NULL,
    merchant text,
    category text,
    notes text,
    image_url text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


--
-- Name: savings; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.savings (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    name text NOT NULL,
    target_amount numeric(15,2) NOT NULL,
    current_amount numeric(15,2) DEFAULT 0,
    category text,
    deadline date,
    notes text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


--
-- Name: subscriptions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.subscriptions (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    name text NOT NULL,
    amount numeric(15,2) NOT NULL,
    billing_cycle text NOT NULL,
    next_billing_date date NOT NULL,
    category text,
    status text DEFAULT 'active'::text,
    notes text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


--
-- Name: expenses expenses_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.expenses
    ADD CONSTRAINT expenses_pkey PRIMARY KEY (id);


--
-- Name: income income_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.income
    ADD CONSTRAINT income_pkey PRIMARY KEY (id);


--
-- Name: loans loans_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.loans
    ADD CONSTRAINT loans_pkey PRIMARY KEY (id);


--
-- Name: receipts receipts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.receipts
    ADD CONSTRAINT receipts_pkey PRIMARY KEY (id);


--
-- Name: savings savings_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.savings
    ADD CONSTRAINT savings_pkey PRIMARY KEY (id);


--
-- Name: subscriptions subscriptions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.subscriptions
    ADD CONSTRAINT subscriptions_pkey PRIMARY KEY (id);


--
-- Name: expenses update_expenses_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_expenses_updated_at BEFORE UPDATE ON public.expenses FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: income update_income_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_income_updated_at BEFORE UPDATE ON public.income FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: loans update_loans_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_loans_updated_at BEFORE UPDATE ON public.loans FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: receipts update_receipts_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_receipts_updated_at BEFORE UPDATE ON public.receipts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: savings update_savings_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_savings_updated_at BEFORE UPDATE ON public.savings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: subscriptions update_subscriptions_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON public.subscriptions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: expenses Users can create their own expenses; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can create their own expenses" ON public.expenses FOR INSERT WITH CHECK ((auth.uid() = user_id));


--
-- Name: income Users can create their own income; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can create their own income" ON public.income FOR INSERT WITH CHECK ((auth.uid() = user_id));


--
-- Name: loans Users can create their own loans; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can create their own loans" ON public.loans FOR INSERT WITH CHECK ((auth.uid() = user_id));


--
-- Name: receipts Users can create their own receipts; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can create their own receipts" ON public.receipts FOR INSERT WITH CHECK ((auth.uid() = user_id));


--
-- Name: savings Users can create their own savings; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can create their own savings" ON public.savings FOR INSERT WITH CHECK ((auth.uid() = user_id));


--
-- Name: subscriptions Users can create their own subscriptions; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can create their own subscriptions" ON public.subscriptions FOR INSERT WITH CHECK ((auth.uid() = user_id));


--
-- Name: expenses Users can delete their own expenses; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can delete their own expenses" ON public.expenses FOR DELETE USING ((auth.uid() = user_id));


--
-- Name: income Users can delete their own income; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can delete their own income" ON public.income FOR DELETE USING ((auth.uid() = user_id));


--
-- Name: loans Users can delete their own loans; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can delete their own loans" ON public.loans FOR DELETE USING ((auth.uid() = user_id));


--
-- Name: receipts Users can delete their own receipts; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can delete their own receipts" ON public.receipts FOR DELETE USING ((auth.uid() = user_id));


--
-- Name: savings Users can delete their own savings; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can delete their own savings" ON public.savings FOR DELETE USING ((auth.uid() = user_id));


--
-- Name: subscriptions Users can delete their own subscriptions; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can delete their own subscriptions" ON public.subscriptions FOR DELETE USING ((auth.uid() = user_id));


--
-- Name: expenses Users can update their own expenses; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can update their own expenses" ON public.expenses FOR UPDATE USING ((auth.uid() = user_id));


--
-- Name: income Users can update their own income; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can update their own income" ON public.income FOR UPDATE USING ((auth.uid() = user_id));


--
-- Name: loans Users can update their own loans; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can update their own loans" ON public.loans FOR UPDATE USING ((auth.uid() = user_id));


--
-- Name: receipts Users can update their own receipts; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can update their own receipts" ON public.receipts FOR UPDATE USING ((auth.uid() = user_id));


--
-- Name: savings Users can update their own savings; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can update their own savings" ON public.savings FOR UPDATE USING ((auth.uid() = user_id));


--
-- Name: subscriptions Users can update their own subscriptions; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can update their own subscriptions" ON public.subscriptions FOR UPDATE USING ((auth.uid() = user_id));


--
-- Name: expenses Users can view their own expenses; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can view their own expenses" ON public.expenses FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: income Users can view their own income; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can view their own income" ON public.income FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: loans Users can view their own loans; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can view their own loans" ON public.loans FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: receipts Users can view their own receipts; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can view their own receipts" ON public.receipts FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: savings Users can view their own savings; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can view their own savings" ON public.savings FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: subscriptions Users can view their own subscriptions; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can view their own subscriptions" ON public.subscriptions FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: expenses; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;

--
-- Name: income; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.income ENABLE ROW LEVEL SECURITY;

--
-- Name: loans; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.loans ENABLE ROW LEVEL SECURITY;

--
-- Name: receipts; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.receipts ENABLE ROW LEVEL SECURITY;

--
-- Name: savings; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.savings ENABLE ROW LEVEL SECURITY;

--
-- Name: subscriptions; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

--
-- PostgreSQL database dump complete
--


