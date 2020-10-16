--
-- PostgreSQL database dump
--

-- Dumped from database version 12.4
-- Dumped by pg_dump version 12.4

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
-- Name: campaign; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.campaign (
    place character varying(255),
    name character varying(255) NOT NULL,
    id integer NOT NULL,
    "time" character varying(255)
);


ALTER TABLE public.campaign OWNER TO postgres;

--
-- Name: campaign_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.campaign_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.campaign_id_seq OWNER TO postgres;

--
-- Name: campaign_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.campaign_id_seq OWNED BY public.campaign.id;


--
-- Name: member; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.member (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    is_join boolean,
    campaign_id integer NOT NULL,
    uid character varying
);


ALTER TABLE public.member OWNER TO postgres;

--
-- Name: members_campaign_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.members_campaign_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.members_campaign_id_seq OWNER TO postgres;

--
-- Name: members_campaign_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.members_campaign_id_seq OWNED BY public.member.campaign_id;


--
-- Name: members_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.members_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.members_id_seq OWNER TO postgres;

--
-- Name: members_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.members_id_seq OWNED BY public.member.id;


--
-- Name: campaign id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.campaign ALTER COLUMN id SET DEFAULT nextval('public.campaign_id_seq'::regclass);


--
-- Name: member id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.member ALTER COLUMN id SET DEFAULT nextval('public.members_id_seq'::regclass);


--
-- Name: member campaign_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.member ALTER COLUMN campaign_id SET DEFAULT nextval('public.members_campaign_id_seq'::regclass);


--
-- Name: campaign campaign_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.campaign
    ADD CONSTRAINT campaign_pkey PRIMARY KEY (id);


--
-- Name: member members_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.member
    ADD CONSTRAINT members_pkey PRIMARY KEY (id);


--
-- Name: member campagn_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.member
    ADD CONSTRAINT campagn_id FOREIGN KEY (campaign_id) REFERENCES public.campaign(id);


--
-- PostgreSQL database dump complete
--

