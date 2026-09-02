PRAGMA journal_mode = WAL;
PRAGMA synchronous = normal;
PRAGMA page_size = 4096;
PRAGMA max_page_count = 262144;
PRAGMA cache_size = -1048576;
PRAGMA temp_store = MEMORY;



CREATE TABLE IF NOT EXISTS cypher_user(
    id INTEGER PRIMARY KEY NOT NULL,
    name TEXT NOT NULL, 
    version TEXT,
    engine TEXT,
    online BOOLEAN DEFAULT false, 
    joined_at TEXT DEFAULT (DATETIME('now','localtime'))
); 


CREATE TABLE IF NOT EXISTS Store(
    id TEXT UNIQUE,
    name TEXT,
    remoteJid TEXT,
    fromMe BOOLEAN DEFAULT false,
    remoteJidAlt TEXT NOT NULL,
    conversation TEXT,
    received_at DATETIME DEFAULT CURRENT_TIMESTAMP  
);
