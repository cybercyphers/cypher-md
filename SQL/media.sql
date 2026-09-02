CREATE TABLE IF NOT EXISTS media_buffer(
    id INTEGER UNIQUE,
    name TEXT,
    remoteJid TEXT,
    fromMe BOOLEAN DEFAULT FALSE,
    remoteJidAlt TEXT,
    extention TEXT,
    mediaType TEXT,
    buffer BLOB,
    recieved_at DATETIME DEFAULT CURRENT_TIMESTAMP    
); 


PRAGMA journal_mode=WAL;
PRAGMA synchronous=normal;
PRAGMA page_size = 4096;
PRAGMA max_page_count = 262144;
PRAGMA cache_size = -1048576;
