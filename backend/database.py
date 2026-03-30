import sqlite3
import os
from datetime import datetime

DB_PATH = os.path.join(os.path.dirname(__file__), "vizabot_leads.db")

def init_db():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS leads (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            permit_class TEXT NOT NULL,
            status TEXT NOT NULL,
            is_vip BOOLEAN DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.commit()
    conn.close()

def add_lead(name, email, permit_class, status, is_vip=False):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO leads (name, email, permit_class, status, is_vip)
        VALUES (?, ?, ?, ?, ?)
    ''', (name, email, permit_class, status, is_vip))
    conn.commit()
    conn.close()

def get_all_leads():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM leads ORDER BY created_at DESC')
    leads = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return leads

def get_stats():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    cursor.execute('SELECT COUNT(*) FROM leads')
    total_leads = cursor.fetchone()[0]
    
    cursor.execute("SELECT COUNT(*) FROM leads WHERE status = 'Eligible'")
    eligible_leads = cursor.fetchone()[0]
    
    cursor.execute('SELECT COUNT(*) FROM leads WHERE is_vip = 1')
    vip_leads = cursor.fetchone()[0]
    
    conn.close()
    
    conversion_rate = (eligible_leads / total_leads * 100) if total_leads > 0 else 0
    
    return {
        "total_leads": total_leads,
        "conversion_rate": f"{conversion_rate:.1f}%",
        "vip_alerts": vip_leads
    }

# Initialize on import
init_db()
