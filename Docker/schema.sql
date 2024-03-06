CREATE TABLE IF NOT EXISTS Post(
id VARCHAR(3) PRIMARY KEY,
name VARCHAR(255),
date TIMESTAMP
)

CREATE TABLE IF NOT EXISTS Content(
id VARCHAR(3) references Post(id), 
text TEXT PRIMARY KEY

)

CREATE TABLE IF NOT EXISTS Decoration(
id VARCHAR(3) references Post(id),
archive TEXT PRIMARY KEY
)