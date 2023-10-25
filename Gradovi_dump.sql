--
-- PostgreSQL database dump
--

-- Dumped from database version 16.0
-- Dumped by pg_dump version 16.0

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
    imegrada character varying(255) NOT NULL,
    zupanija character varying(255),
    gradonacelnik character varying(255),
    brojstanovnika integer,
    povrsina numeric,
    nadmorskavisina integer,
    godinaosnutka integer,
    latitude numeric,
    longitude numeric
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


ALTER SEQUENCE public.gradovi_id_seq OWNER TO postgres;

--
-- Name: gradovi_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.gradovi_id_seq OWNED BY public.gradovi.id;


--
-- Name: kvartovi; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.kvartovi (
    id integer NOT NULL,
    gradid integer,
    nazivkvarta character varying(255) NOT NULL,
    brojstanovnika integer
);


ALTER TABLE public.kvartovi OWNER TO postgres;

--
-- Name: gradovi_kvartovi; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.gradovi_kvartovi AS
 SELECT gradovi.id AS gradid,
    gradovi.imegrada,
    gradovi.zupanija,
    gradovi.gradonacelnik,
    gradovi.brojstanovnika,
    gradovi.povrsina,
    gradovi.godinaosnutka,
    gradovi.latitude,
    gradovi.longitude,
    gradovi.nadmorskavisina,
    kvartovi.nazivkvarta,
    kvartovi.brojstanovnika AS brojkvartstan
   FROM (public.gradovi
     LEFT JOIN public.kvartovi ON ((gradovi.id = kvartovi.gradid)));


ALTER VIEW public.gradovi_kvartovi OWNER TO postgres;

--
-- Name: gradovi_kvartovi_view; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.gradovi_kvartovi_view AS
 SELECT gradovi.id AS gradid,
    gradovi.imegrada,
    gradovi.zupanija,
    gradovi.gradonacelnik,
    gradovi.brojstanovnika,
    gradovi.povrsina,
    gradovi.godinaosnutka,
    gradovi.latitude,
    gradovi.longitude,
    gradovi.nadmorskavisina,
    kvartovi.nazivkvarta,
    kvartovi.brojstanovnika AS brojkvartstan
   FROM (public.gradovi
     LEFT JOIN public.kvartovi ON ((gradovi.id = kvartovi.gradid)));


ALTER VIEW public.gradovi_kvartovi_view OWNER TO postgres;

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


ALTER SEQUENCE public.kvartovi_id_seq OWNER TO postgres;

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

COPY public.gradovi (id, imegrada, zupanija, gradonacelnik, brojstanovnika, povrsina, nadmorskavisina, godinaosnutka, latitude, longitude) FROM stdin;
1	Zagreb	Grad Zagreb	Tomislav Tomašević	790017	641	122	1850	45.8150	15.9819
2	Split	Splitsko-dalmatinska	Ivo Baldasar	178192	79	0	295	43.5081	16.4402
3	Rijeka	Primorsko-goranska	Marko Filipović	128384	44	0	1288	45.3271	14.4422
4	Osijek	Osječko-baranjska	Ivan Vrkić	108048	171	90	1687	45.5511	18.6932
5	Zadar	Zadarska	Branko Dukić	75088	194	0	9	44.1194	15.2314
6	Pula	Istarska	Filip Zoričić	57833	51	20	177	44.8666	13.8496
7	Dubrovnik	Dubrovačko-neretvanska	Mato Franković	42890	21	0	7	42.6507	18.0944
8	Varaždin	Varaždinska	Ivan Čehok	46498	63	177	1181	46.3038	16.3375
9	Šibenik	Šibensko-kninska	Željko Burić	34368	51	0	1066	43.7357	15.8895
10	Vukovar	Vukovarsko-srijemska	Ivan Penava	27711	74	91	1232	45.3464	18.9954
\.


--
-- Data for Name: kvartovi; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.kvartovi (id, gradid, nazivkvarta, brojstanovnika) FROM stdin;
1	1	Donji Grad	45000
2	1	Trešnjevka	65000
3	1	Novi Zagreb	70000
4	2	Split-Centar	25000
5	2	Split-Sjever	35000
6	2	Split-Jug	45000
\.


--
-- Name: gradovi_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.gradovi_id_seq', 10, true);


--
-- Name: kvartovi_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.kvartovi_id_seq', 6, true);


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

