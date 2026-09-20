CREATE TABLE IF NOT EXISTS secure_uuid(
    id INTEGER PRIMARY KEY,
    jid TEXT NOT NULL,
    uuid TEXT UNIQUE NOT NULL,
    sent_at DATETIME DEFAULT CURRENT_TIMESTAMP
);



PRAGMA journal_mode=WAL;
PRAGMA synchronous=normal;
PRAGMA page_size = 4096;
PRAGMA max_page_count = 262144;
PRAGMA cache_size = -1048576;
