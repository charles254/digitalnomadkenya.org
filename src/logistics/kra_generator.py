import json

class KRABot:
    def __init__(self):
        self.kra_fields = [
            "Citizenship", "ID_Type", "Passport_Number", 
            "Passport_Expiry", "Issuing_Country", "Mobile_Number", 
            "Email", "Physical_Address"
        ]

    def generate_kra_dossier(self, user_profile):
        """
        Generate a structured data file for iTax copy-pasting.
        """
        dossier = {field: user_profile.get(field.lower(), "MISSING") for field in self.kra_fields}
        
        # Validation
        missing = [f for f, v in dossier.items() if v == "MISSING"]
        if missing:
            return {"status": "Incomplete", "missing_fields": missing}
        
        return {
            "status": "Ready",
            "dossier": dossier,
            "instruction": "Download this JSON or Copy-Paste the fields below into the iTax 'Individual' registration portal."
        }

if __name__ == "__main__":
    kra = KRABot()
    profile = {
        "citizenship": "German",
        "id_type": "Passport",
        "passport_number": "A12345678",
        "passport_expiry": "2030-01-01",
        "issuing_country": "Germany",
        "mobile_number": "0712345678",
        "email": "alex@berlin.de",
        "physical_address": "Riverside Drive, Westlands, Nairobi"
    }
    print(json.dumps(kra.generate_kra_dossier(profile), indent=2))
