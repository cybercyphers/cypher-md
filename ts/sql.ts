import dbase from "better-sqlite3";
import path,{ dirname } from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url"
var __dirname = dirname(fileURLToPath(import.meta.url));


type dbaseType = dbase.Database;
const db:dbaseType = new dbase(path.join(__dirname,"../Databases/user_info.db"));

db.exec("CREATE TABLE IF NOT EXISTS cypher_user(name TEXT, version TEXT, engine TEXT,online BOOLEAN DEFAULT false, joined_at TEXT DEFAULT (DATETIME('now','localtime')))");
