
CREATE TABLE IF NOT EXISTS cypher_user(
    name TEXT, 
    version TEXT,
    engine TEXT,
    online BOOLEAN DEFAULT false, 
    joined_at TEXT DEFAULT (DATETIME('now','localtime'))
);
