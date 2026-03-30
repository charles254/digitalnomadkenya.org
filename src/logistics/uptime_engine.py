class UptimeEngine:
    def __init__(self):
        self.zones = {
            "Westlands": {"uptime_index": 98, "power_rating": "A", "recommendation": "Fiber + UPS"},
            "Karen": {"uptime_index": 95, "power_rating": "B", "recommendation": "Solar + Inverter"},
            "Diani": {"uptime_index": 90, "power_rating": "C", "recommendation": "3kVA Inverter + Starlink Mandatory"}
        }

    def verify_property(self, neighborhood, has_inverter, has_starlink=False):
        """
        Check if a property meets 'Nomad-Standard' based on its zone.
        """
        if neighborhood not in self.zones:
            return {"status": "Unknown", "message": "Neighborhood not in our verified database."}
        
        zone_info = self.zones[neighborhood]
        
        # Coastal requirement: Diani needs Inverter AND Starlink for 'Nomad-Standard'
        if neighborhood == "Diani":
            if has_inverter and has_starlink:
                return {"status": "Nomad-Standard", "message": "Excellent! Property meets high-uptime coastal standards."}
            else:
                return {"status": "Substandard", "message": "Caution: Coastal areas require both an Inverter and Starlink for reliable work."}
        
        # Nairobi requirement: Westlands/Karen need at least an Inverter/UPS
        if has_inverter:
            return {"status": "Nomad-Standard", "message": f"Verified! Property meets {neighborhood} uptime standards."}
        else:
            return {"status": "Risky", "message": "Risk identified: Periodic blackouts in this area require an Inverter/UPS."}

if __name__ == "__main__":
    engine = UptimeEngine()
    print("Checking Westlands property with Inverter:")
    print(engine.verify_property("Westlands", True))
    
    print("\nChecking Diani property without Starlink:")
    print(engine.verify_property("Diani", True, False))
