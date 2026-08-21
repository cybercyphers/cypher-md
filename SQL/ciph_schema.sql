
CREATE TABLE IF NOT EXISTS cypher_user(
    id INTEGER PRIMARY KEY NOT NULL,
    name TEXT NOT NULL, 
    version TEXT,
    engine TEXT,
    online BOOLEAN DEFAULT false, 
    joined_at TEXT DEFAULT (DATETIME('now','localtime'))
);
