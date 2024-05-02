--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2 (Debian 16.2-1.pgdg120+2)
-- Dumped by pg_dump version 16.2 (Debian 16.2-1.pgdg120+2)

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
-- Name: change_date(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.change_date() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        NEW.date := CURRENT_DATE;
        RETURN NEW;
    ELSIF TG_OP = 'UPDATE' THEN
        NEW.date := CURRENT_DATE;
        RETURN NEW;
    END IF;
END;
$$;


ALTER FUNCTION public.change_date() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: admin; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.admin (
    name character varying(50),
    password text
);


ALTER TABLE public.admin OWNER TO postgres;

--
-- Name: movies; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.movies (
    title character varying(255),
    trailer text,
    image text,
    content text,
    date date DEFAULT CURRENT_TIMESTAMP,
    id integer NOT NULL,
    music text
);


ALTER TABLE public.movies OWNER TO postgres;

--
-- Name: movies_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.movies_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.movies_id_seq OWNER TO postgres;

--
-- Name: movies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.movies_id_seq OWNED BY public.movies.id;


--
-- Name: people; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.people (
    name character varying(255),
    role character varying(255),
    id integer NOT NULL,
    picture text
);


ALTER TABLE public.people OWNER TO postgres;

--
-- Name: people_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.people_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.people_id_seq OWNER TO postgres;

--
-- Name: people_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.people_id_seq OWNED BY public.people.id;


--
-- Name: movies id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movies ALTER COLUMN id SET DEFAULT nextval('public.movies_id_seq'::regclass);


--
-- Name: people id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.people ALTER COLUMN id SET DEFAULT nextval('public.people_id_seq'::regclass);


--
-- Data for Name: admin; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.admin (name, password) FROM stdin;
Akice	$2a$11$RSmAgWcag6gqqfvL7NdEV.ps1CrUmXsRzwh6f.9FeGNGeGKsf/No.
\.


--
-- Data for Name: movies; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.movies (title, trailer, image, content, date, id, music) FROM stdin;
El Gato con Botas 2: El Último Deseo	https://www.youtube.com/embed/18v5EPO5ySs?si=HjUDr_hWgeyUoUe-	https://www.universalpictures-latam.com/tl_files/content/movies/puss_in_boots_2/posters/01.jpg	Probando cambios	2024-05-01	1	https://music.youtube.com/watch?v=x6Z_s-WVR-Y&si=S7TYhWwhsgPrCfU1
Interestellar	https://www.youtube.com/embed/zSWdZVtXT7E?si=ZZ9D34sjp8Kdkxwd	gt	Buenisima pelicula	2024-05-01	2	sa
\.


--
-- Data for Name: people; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.people (name, role, id, picture) FROM stdin;
\.


--
-- Name: movies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.movies_id_seq', 4, true);


--
-- Name: people_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.people_id_seq', 1, false);


--
-- Name: movies movies_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movies
    ADD CONSTRAINT movies_pkey PRIMARY KEY (id);


--
-- Name: movies assert_date; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER assert_date BEFORE INSERT OR UPDATE ON public.movies FOR EACH ROW EXECUTE FUNCTION public.change_date();


--
-- Name: people people_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.people
    ADD CONSTRAINT people_id_fkey FOREIGN KEY (id) REFERENCES public.movies(id);


--
-- PostgreSQL database dump complete
--

