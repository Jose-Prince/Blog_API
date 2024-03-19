CREATE TABLE IF NOT EXISTS Movies(
id VARCHAR(3) PRIMARY KEY,
title VARCHAR(255),
trailer TEXT,
image TEXT,
content TEXT,
date DATE
)

CREATE TABLE IF NOT EXISTS Colors(
id VARCHAR(3) references Post(id), 
type VARCHAR(20),
hexadecimal VARCHAR(7) 
)

CREATE TABLE IF NOT EXISTS People(
id VARCHAR(3) references Post(id),
name VARCHAR(255),
role VARCHAR(255)
)