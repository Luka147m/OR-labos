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

--
-- Name: getgradbyid(integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.getgradbyid(city_id integer) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
    result_json JSON;
BEGIN
    SELECT json_agg(city_info) INTO result_json
    FROM (
        SELECT json_build_object(
            'id', gradovi_kvartovi.gradid,
            'imegrada', gradovi_kvartovi.imegrada,
            'kvartovi',
            CASE
                WHEN count(gradovi_kvartovi.nazivkvarta) > 0 THEN json_agg(json_build_object('nazivkvarta', gradovi_kvartovi.nazivkvarta, 'brojkvartstan', gradovi_kvartovi.brojkvartstan))
                ELSE '[]'::json
            END,
            'latitude', gradovi_kvartovi.latitude,
            'povrsina', gradovi_kvartovi.povrsina,
            'zupanija', gradovi_kvartovi.zupanija,
            'longitude', gradovi_kvartovi.longitude,
            'godinaosnutka', gradovi_kvartovi.godinaosnutka,
            'gradonacelnik', gradovi_kvartovi.gradonacelnik,
            'brojstanovnika', gradovi_kvartovi.brojstanovnika,
            'nadmorskavisina', gradovi_kvartovi.nadmorskavisina
        ) AS city_info
        FROM gradovi_kvartovi
        WHERE gradovi_kvartovi.gradid = city_id
        GROUP BY gradovi_kvartovi.gradid, gradovi_kvartovi.imegrada, gradovi_kvartovi.latitude, gradovi_kvartovi.povrsina, gradovi_kvartovi.zupanija, gradovi_kvartovi.longitude, gradovi_kvartovi.godinaosnutka, gradovi_kvartovi.gradonacelnik, gradovi_kvartovi.brojstanovnika, gradovi_kvartovi.nadmorskavisina
    ) subquery;

    RETURN result_json;
END;
$$;


ALTER FUNCTION public.getgradbyid(city_id integer) OWNER TO postgres;

--
-- Name: getgradbyname(character varying); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.getgradbyname(gradname character varying) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
    result_json JSON;
BEGIN
    SELECT json_agg(city_info) INTO result_json
    FROM (
        SELECT json_build_object(
            'id', gradovi_kvartovi.gradid,
            'imegrada', gradovi_kvartovi.imegrada,
            'kvartovi',
            CASE
                WHEN count(gradovi_kvartovi.nazivkvarta) > 0 THEN json_agg(json_build_object('nazivkvarta', gradovi_kvartovi.nazivkvarta, 'brojkvartstan', gradovi_kvartovi.brojkvartstan))
                ELSE '[]'::json
            END,
            'latitude', gradovi_kvartovi.latitude,
            'povrsina', gradovi_kvartovi.povrsina,
            'zupanija', gradovi_kvartovi.zupanija,
            'longitude', gradovi_kvartovi.longitude,
            'godinaosnutka', gradovi_kvartovi.godinaosnutka,
            'gradonacelnik', gradovi_kvartovi.gradonacelnik,
            'brojstanovnika', gradovi_kvartovi.brojstanovnika,
            'nadmorskavisina', gradovi_kvartovi.nadmorskavisina
        ) AS city_info
        FROM gradovi_kvartovi
        WHERE gradovi_kvartovi.imegrada LIKE '%' || GradName || '%'
        GROUP BY gradovi_kvartovi.gradid, gradovi_kvartovi.imegrada, gradovi_kvartovi.latitude, gradovi_kvartovi.povrsina, gradovi_kvartovi.zupanija, gradovi_kvartovi.longitude, gradovi_kvartovi.godinaosnutka, gradovi_kvartovi.gradonacelnik, gradovi_kvartovi.brojstanovnika, gradovi_kvartovi.nadmorskavisina
    ) subquery;

    RETURN result_json;
END;
$$;


ALTER FUNCTION public.getgradbyname(gradname character varying) OWNER TO postgres;

--
-- Name: getgradbysize(integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.getgradbysize(population integer) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
    result_json JSON;
BEGIN
    SELECT json_agg(city_info) INTO result_json
    FROM (
        SELECT json_build_object(
            'id', gradovi_kvartovi.gradid,
            'imegrada', gradovi_kvartovi.imegrada,
            'kvartovi',
            CASE
                WHEN count(gradovi_kvartovi.nazivkvarta) > 0 THEN json_agg(json_build_object('nazivkvarta', gradovi_kvartovi.nazivkvarta, 'brojkvartstan', gradovi_kvartovi.brojkvartstan))
                ELSE '[]'::json
            END,
            'latitude', gradovi_kvartovi.latitude,
            'povrsina', gradovi_kvartovi.povrsina,
            'zupanija', gradovi_kvartovi.zupanija,
            'longitude', gradovi_kvartovi.longitude,
            'godinaosnutka', gradovi_kvartovi.godinaosnutka,
            'gradonacelnik', gradovi_kvartovi.gradonacelnik,
            'brojstanovnika', gradovi_kvartovi.brojstanovnika,
            'nadmorskavisina', gradovi_kvartovi.nadmorskavisina
        ) AS city_info
        FROM gradovi_kvartovi
        WHERE gradovi_kvartovi.brojstanovnika > population
        GROUP BY gradovi_kvartovi.gradid, gradovi_kvartovi.imegrada, gradovi_kvartovi.latitude, gradovi_kvartovi.povrsina, gradovi_kvartovi.zupanija, gradovi_kvartovi.longitude, gradovi_kvartovi.godinaosnutka, gradovi_kvartovi.gradonacelnik, gradovi_kvartovi.brojstanovnika, gradovi_kvartovi.nadmorskavisina
    ) subquery;

    RETURN result_json;
END;
$$;


ALTER FUNCTION public.getgradbysize(population integer) OWNER TO postgres;

--
-- Name: getgradbyzup(character varying); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.getgradbyzup(zupname character varying) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
    result_json JSON;
BEGIN
    SELECT json_agg(city_info) INTO result_json
    FROM (
        SELECT json_build_object(
            'id', gradovi_kvartovi.gradid,
            'imegrada', gradovi_kvartovi.imegrada,
            'kvartovi',
            CASE
                WHEN count(gradovi_kvartovi.nazivkvarta) > 0 THEN json_agg(json_build_object('nazivkvarta', gradovi_kvartovi.nazivkvarta, 'brojkvartstan', gradovi_kvartovi.brojkvartstan))
                ELSE '[]'::json
            END,
            'latitude', gradovi_kvartovi.latitude,
            'povrsina', gradovi_kvartovi.povrsina,
            'zupanija', gradovi_kvartovi.zupanija,
            'longitude', gradovi_kvartovi.longitude,
            'godinaosnutka', gradovi_kvartovi.godinaosnutka,
            'gradonacelnik', gradovi_kvartovi.gradonacelnik,
            'brojstanovnika', gradovi_kvartovi.brojstanovnika,
            'nadmorskavisina', gradovi_kvartovi.nadmorskavisina
        ) AS city_info
        FROM gradovi_kvartovi
        WHERE gradovi_kvartovi.zupanija LIKE '%' || ZupName || '%'
        GROUP BY gradovi_kvartovi.gradid, gradovi_kvartovi.imegrada, gradovi_kvartovi.latitude, gradovi_kvartovi.povrsina, gradovi_kvartovi.zupanija, gradovi_kvartovi.longitude, gradovi_kvartovi.godinaosnutka, gradovi_kvartovi.gradonacelnik, gradovi_kvartovi.brojstanovnika, gradovi_kvartovi.nadmorskavisina
    ) subquery;

    RETURN result_json;
END;
$$;


ALTER FUNCTION public.getgradbyzup(zupname character varying) OWNER TO postgres;

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
-- Name: gradovijson; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.gradovijson AS
 SELECT json_agg(city_info) AS json_agg
   FROM ( SELECT json_build_object('id', gradovi_kvartovi.gradid, 'imegrada', gradovi_kvartovi.imegrada, 'kvartovi',
                CASE
                    WHEN (count(gradovi_kvartovi.nazivkvarta) > 0) THEN json_agg(json_build_object('nazivkvarta', gradovi_kvartovi.nazivkvarta, 'brojkvartstan', gradovi_kvartovi.brojkvartstan))
                    ELSE '[]'::json
                END, 'latitude', gradovi_kvartovi.latitude, 'povrsina', gradovi_kvartovi.povrsina, 'zupanija', gradovi_kvartovi.zupanija, 'longitude', gradovi_kvartovi.longitude, 'godinaosnutka', gradovi_kvartovi.godinaosnutka, 'gradonacelnik', gradovi_kvartovi.gradonacelnik, 'brojstanovnika', gradovi_kvartovi.brojstanovnika, 'nadmorskavisina', gradovi_kvartovi.nadmorskavisina) AS city_info
           FROM public.gradovi_kvartovi
          GROUP BY gradovi_kvartovi.gradid, gradovi_kvartovi.imegrada, gradovi_kvartovi.latitude, gradovi_kvartovi.povrsina, gradovi_kvartovi.zupanija, gradovi_kvartovi.longitude, gradovi_kvartovi.godinaosnutka, gradovi_kvartovi.gradonacelnik, gradovi_kvartovi.brojstanovnika, gradovi_kvartovi.nadmorskavisina) subquery;


ALTER VIEW public.gradovijson OWNER TO postgres;

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
2	Split	Splitsko-dalmatinska	Ivica Puljak	162873	79	0	305	43.51	16.44
3	Rijeka	Primorsko-goranska	Marko Filipović	109775	44	0	1139	45.33	14.44
4	Osijek	Osječko-baranjska	Ivan Radić	97846	171	90	124	45.551	18.694
5	Slavonski Brod	Brodsko-posavska	Mirko Duspara	51264	50.27	96	1224	45.16	18.01
6	Požega	Požeško-slavonska	Željko Glavić	22564	133.91	152	1100	45.33	17.67
7	Varaždin	Varaždinska	Neven Bosilj	44364	59.45	173	1181	46.31	16.33
8	Pula	Istarska	Filip Zoričić	52920	51.65	30	-177	44.87	13.85
9	Zadar	Zadarska	Marko Vučetić	71475	194	0	-59	44.12	15.24
10	Dubrovnik	Dubrovačko-neretvanska	Mato Franković	42005	143.35	3	600	42.6402	18.1083
1	Zagreb	Grad Zagreb	Tomislav Tomašević	777183	641.2	122	1094	45.8130	15.9775
\.


--
-- Data for Name: kvartovi; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.kvartovi (id, gradid, nazivkvarta, brojstanovnika) FROM stdin;
1	1	Gornja Dubrava	58908
2	1	Maksimir	47989
3	1	Trešnjevka	119475
4	2	Bol	11550
5	2	Sućidar	10720
6	3	Zamet	7765
7	3	Sveti Nikola	7502
8	4	Tvrđa	10277
9	6	Sajmište	5432
10	7	Hrašćica	1283
\.


--
-- Name: gradovi_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.gradovi_id_seq', 17, true);


--
-- Name: kvartovi_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.kvartovi_id_seq', 25, true);


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
    ADD CONSTRAINT kvartovi_gradid_fkey FOREIGN KEY (gradid) REFERENCES public.gradovi(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

