--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: gradovi; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.gradovi (
    id integer NOT NULL,
    ime character varying(255) NOT NULL,
    zupanija character varying(255) NOT NULL,
    brojstanovnika integer,
    povrsina numeric(10,2),
    nadmorskavisina integer,
    godinaosnutka integer,
    zemljopisnasirina numeric(8,6),
    zemljopisnaduzina numeric(9,6)
);


ALTER TABLE public.gradovi OWNER TO postgres;

--
-- Name: gradovi_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.gradovi_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.gradovi_id_seq OWNER TO postgres;

--
-- Name: gradovi_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.gradovi_id_seq OWNED BY public.gradovi.id;


--
-- Name: kvartovi; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.kvartovi (
    id integer NOT NULL,
    ime character varying(255) NOT NULL,
    gradid integer
);


ALTER TABLE public.kvartovi OWNER TO postgres;

--
-- Name: kvartovi_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.kvartovi_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.kvartovi_id_seq OWNER TO postgres;

--
-- Name: kvartovi_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.kvartovi_id_seq OWNED BY public.kvartovi.id;


--
-- Name: gradovi id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gradovi ALTER COLUMN id SET DEFAULT nextval('public.gradovi_id_seq'::regclass);


--
-- Name: kvartovi id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.kvartovi ALTER COLUMN id SET DEFAULT nextval('public.kvartovi_id_seq'::regclass);


--
-- Data for Name: gradovi; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.gradovi (id, ime, zupanija, brojstanovnika, povrsina, nadmorskavisina, godinaosnutka, zemljopisnasirina, zemljopisnaduzina) FROM stdin;
1	Zagreb	Grad Zagreb	803000	641.36	122	1850	45.815011	15.981919
2	Split	Splitsko-dalmatinska	178102	79.38	0	295	43.508133	16.442957
3	Rijeka	Primorsko-goranska	128384	44.21	0	1288	45.327647	14.442858
\.


--
-- Data for Name: kvartovi; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.kvartovi (id, ime, gradid) FROM stdin;
1	Donja Dubrava	1
2	Stari Grad	1
3	Pazdigrad	2
4	Brajda-Đardin	3
\.


--
-- Name: gradovi_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.gradovi_id_seq', 3, true);


--
-- Name: kvartovi_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.kvartovi_id_seq', 4, true);


--
-- Name: gradovi gradovi_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gradovi
    ADD CONSTRAINT gradovi_pkey PRIMARY KEY (id);


--
-- Name: kvartovi kvartovi_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.kvartovi
    ADD CONSTRAINT kvartovi_pkey PRIMARY KEY (id);


--
-- Name: kvartovi kvartovi_gradid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.kvartovi
    ADD CONSTRAINT kvartovi_gradid_fkey FOREIGN KEY (gradid) REFERENCES public.gradovi(id);


--
-- PostgreSQL database dump complete
--

