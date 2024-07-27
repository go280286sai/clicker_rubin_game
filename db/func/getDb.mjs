import path from "path";
import sqlite3 from "sqlite3";

export function getDb(to_path){
    let path_db = path.resolve() + to_path;
    return new sqlite3.Database(path_db);
}