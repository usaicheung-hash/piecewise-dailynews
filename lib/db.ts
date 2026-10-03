import Database from 'better-sqlite3';
import fs from 'node:fs';
import path from 'node:path';

const DB_PATH = process.env.SQLITE_PATH || path.join(process.cwd(), 'data', 'aihub.sqlite');
let db: Database.Database | null = null;

export function getDb(){
  if(!db){
    fs.mkdirSync(path.dirname(DB_PATH), {recursive:true});
    db = new Database(DB_PATH);
    db.pragma('journal_mode = WAL');
    initDb(db);
  }
  return db;
}

function initDb(d: Database.Database){
  d.exec(`
  CREATE TABLE IF NOT EXISTS refresh_jobs (
    id INTEGER PRIMARY KEY AUTOINCREMENT, kind TEXT NOT NULL, status TEXT NOT NULL,
    started_at TEXT NOT NULL, finished_at TEXT, summary TEXT, error TEXT
  );
  CREATE TABLE IF NOT EXISTS news_articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT, source TEXT NOT NULL, source_url TEXT NOT NULL UNIQUE,
    original_title TEXT NOT NULL, zh_title TEXT NOT NULL, zh_summary TEXT NOT NULL, why_it_matters TEXT,
    published_at TEXT, fetched_at TEXT NOT NULL, category TEXT, country TEXT, hk_relevance INTEGER DEFAULT 0,
    confidence REAL DEFAULT 0.6, duplicate_key TEXT, raw_json TEXT
  );
  CREATE INDEX IF NOT EXISTS idx_news_published ON news_articles(published_at DESC);
  CREATE INDEX IF NOT EXISTS idx_news_hk ON news_articles(hk_relevance, published_at DESC);

  CREATE TABLE IF NOT EXISTS models_db (
    slug TEXT PRIMARY KEY, name TEXT NOT NULL, provider TEXT NOT NULL, context_length INTEGER,
    input_price REAL, output_price REAL, pricing_scope TEXT, popularity_scope TEXT,
    overall_score REAL, coding_score REAL, reasoning_score REAL, agentic_score REAL,
    speed_score REAL, value_score REAL, source TEXT, source_url TEXT, last_verified_at TEXT, raw_json TEXT
  );
  CREATE TABLE IF NOT EXISTS model_metric_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT, model_slug TEXT, metric_name TEXT, metric_value REAL,
    metric_scope TEXT, source TEXT, source_url TEXT, recorded_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS extensions_db (
    slug TEXT PRIMARY KEY, name TEXT NOT NULL, type TEXT NOT NULL, category TEXT, description_zh_hk TEXT,
    publisher TEXT, repository_url TEXT, registry_url TEXT, official_status TEXT, trust_level TEXT,
    security_status TEXT, stars INTEGER DEFAULT 0, forks INTEGER DEFAULT 0, open_issues INTEGER DEFAULT 0,
    last_updated_at TEXT, last_verified_at TEXT, install_command TEXT, permissions TEXT,
    compatibility TEXT, source TEXT, raw_json TEXT, popularity_score REAL, momentum_score REAL,
    trust_score REAL, freshness_score REAL, overall_trending_score REAL
  );
  CREATE TABLE IF NOT EXISTS extension_events (
    id INTEGER PRIMARY KEY AUTOINCREMENT, extension_slug TEXT, event_type TEXT, title TEXT,
    details TEXT, source_url TEXT, created_at TEXT NOT NULL
  );
  `);
}

export function nowIso(){ return new Date().toISOString(); }
export function rowToJson<T=any>(v: string | null | undefined, fallback:T):T{ try{return v?JSON.parse(v):fallback}catch{return fallback} }
