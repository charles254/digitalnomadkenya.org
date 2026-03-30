import datetime

class VizaBotAudit:
    def __init__(self):
        self.class_n_threshold = 55000
        self.class_g_threshold = 100000
        self.passport_validity_months = 6

    def audit_eligibility(self, income, permit_class="N"):
        """
        Check if the user meets the financial threshold for a permit class.
        """
        if permit_class == "N":
            if income >= self.class_n_threshold:
                return {"status": "Eligible", "message": f"Income ${income:,} exceeds the ${self.class_n_threshold:,} threshold for Class N."}
            else:
                return {"status": "Ineligible", "message": f"Income ${income:,} is below the ${self.class_n_threshold:,} statutory requirement."}
        elif permit_class == "G":
            if income >= self.class_g_threshold:
                return {"status": "Eligible", "message": f"Investment ${income:,} meets the $100,000 threshold for Class G."}
            else:
                return {"status": "Ineligible", "message": f"Investment ${income:,} is below the $100,000 requirement."}
        return {"status": "Unknown", "message": "Invalid permit class."}

    def audit_passport(self, expiry_date_str):
        """
        Check if the passport has at least 6 months validity.
        Expiry date format: YYYY-MM-DD
        """
        try:
            today = datetime.date.today()
            expiry_date = datetime.datetime.strptime(expiry_date_str, "%Y-%m-%d").date()
            diff = (expiry_date.year - today.year) * 12 + (expiry_date.month - today.month)
            
            if diff >= self.passport_validity_months:
                return {"status": "Pass", "message": f"Passport valid until {expiry_date}. Verification successful."}
            else:
                # Based on User Phase 3 Prompt
                return {"status": "Fail", "message": f"Stop! You need 6 months validity to apply for a Class N permit. Renew your German passport first, then we proceed."}
        except ValueError:
            return {"status": "Error", "message": "Invalid date format. Use YYYY-MM-DD."}

    def audit_bank_statement(self, is_stamped):
        """
        Check if the bank statement is stamped.
        """
        if is_stamped:
            return {"status": "Pass", "message": "Bank statement is stamped. Document verified."}
        else:
            return {"status": "Fail", "message": "Unstamped bank statement detected. Please get it stamped by your bank before proceeding."}

# Example Usage
if __name__ == "__main__":
    audit = VizaBotAudit()
    
    # Designer from Berlin scenario
    print("Scenario: Designer from Berlin, $60k income, passport expires in 4 months.")
    print(audit.audit_eligibility(60000, "N"))
    print(audit.audit_passport("2026-07-06")) # Assuming today is 2026-03-06
    print(audit.audit_bank_statement(True))
