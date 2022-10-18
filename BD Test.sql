--
-- PostgreSQL database dump
--

-- Dumped from database version 11.8
-- Dumped by pg_dump version 11.1

-- Started on 2022-10-18 08:13:44

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 199 (class 1259 OID 440307)
-- Name: sq_address; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sq_address
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999999999999
    CACHE 1;


ALTER TABLE public.sq_address OWNER TO postgres;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 197 (class 1259 OID 440265)
-- Name: address; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.address (
    street character varying(50) NOT NULL,
    userid integer NOT NULL,
    id integer DEFAULT nextval('public.sq_address'::regclass) NOT NULL,
    suite character varying(30) NOT NULL,
    city character varying(30) NOT NULL,
    zipcode character varying(30) NOT NULL,
    lat character varying(15) NOT NULL,
    lng character varying(15) NOT NULL
);
ALTER TABLE ONLY public.address ALTER COLUMN street SET STATISTICS 0;


ALTER TABLE public.address OWNER TO postgres;

--
-- TOC entry 196 (class 1259 OID 440260)
-- Name: appuser; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.appuser (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    username character varying(50) NOT NULL,
    email character varying(60) NOT NULL,
    phone character varying(50) NOT NULL,
    website character varying(200)
);


ALTER TABLE public.appuser OWNER TO postgres;

--
-- TOC entry 200 (class 1259 OID 440309)
-- Name: sq_company; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sq_company
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999999999999
    CACHE 1;


ALTER TABLE public.sq_company OWNER TO postgres;

--
-- TOC entry 198 (class 1259 OID 440292)
-- Name: company; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.company (
    id integer DEFAULT nextval('public.sq_company'::regclass) NOT NULL,
    name character varying(50) NOT NULL,
    catchphrase character varying(100) NOT NULL,
    bs character varying(100) NOT NULL,
    userid integer NOT NULL
);
ALTER TABLE ONLY public.company ALTER COLUMN id SET STATISTICS 0;


ALTER TABLE public.company OWNER TO postgres;

--
-- TOC entry 201 (class 1259 OID 441213)
-- Name: sq_user; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sq_user
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999999999999
    CACHE 1;


ALTER TABLE public.sq_user OWNER TO postgres;

--
-- TOC entry 2828 (class 0 OID 440265)
-- Dependencies: 197
-- Data for Name: address; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.address (street, userid, id, suite, city, zipcode, lat, lng) FROM stdin;
\.


--
-- TOC entry 2827 (class 0 OID 440260)
-- Dependencies: 196
-- Data for Name: appuser; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.appuser (id, name, username, email, phone, website) FROM stdin;
\.


--
-- TOC entry 2829 (class 0 OID 440292)
-- Dependencies: 198
-- Data for Name: company; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.company (id, name, catchphrase, bs, userid) FROM stdin;
\.


--
-- TOC entry 2838 (class 0 OID 0)
-- Dependencies: 199
-- Name: sq_address; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sq_address', 1, false);


--
-- TOC entry 2839 (class 0 OID 0)
-- Dependencies: 200
-- Name: sq_company; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sq_company', 1, false);


--
-- TOC entry 2840 (class 0 OID 0)
-- Dependencies: 201
-- Name: sq_user; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sq_user', 11, false);


--
-- TOC entry 2702 (class 2606 OID 440271)
-- Name: address address_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.address
    ADD CONSTRAINT address_pkey PRIMARY KEY (id);


--
-- TOC entry 2704 (class 2606 OID 440296)
-- Name: company company_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.company
    ADD CONSTRAINT company_pkey PRIMARY KEY (id);


--
-- TOC entry 2700 (class 2606 OID 440264)
-- Name: appuser user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appuser
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- TOC entry 2705 (class 2606 OID 440302)
-- Name: company company_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.company
    ADD CONSTRAINT company_fk FOREIGN KEY (userid) REFERENCES public.appuser(id);


-- Completed on 2022-10-18 08:13:44

--
-- PostgreSQL database dump complete
--

