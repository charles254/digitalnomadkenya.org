class NewsEngine:
    def __init__(self):
        self.news_feed = [
            {"date": "2026-03-01", "title": "Class N Income Threshold Updated", "impact": "High", "summary": "Income requirement remains at $55,000 but now requires 6 months of certified statements."},
            {"date": "2026-02-15", "title": "JKIA Terminal 1A Fast-Track for Investors", "impact": "Medium", "summary": "Class G holders now have a dedicated priority lane at immigration."},
            {"date": "2026-02-10", "title": "eVisa Portal Maintenance Notice", "impact": "Low", "summary": "Expect 48-hour delay in processing single-entry visas."}
        ]

    def get_latest_news(self):
        return self.news_feed

if __name__ == "__main__":
    engine = NewsEngine()
    for item in engine.get_latest_news():
        print(f"[{item['date']}] {item['title']} - Impact: {item['impact']}")
