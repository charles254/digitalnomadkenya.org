class CoverLetterEngine:
    def __init__(self):
        self.templates = {
            "N": """
TO: THE DIRECTOR GENERAL OF IMMIGRATION SERVICES, KENYA
REF: COVER LETTER FOR CLASS N (DIGITAL NOMAD) PERMIT APPLICATION

Dear Sir/Madam,

I am writing to formally apply for a Class N permit to reside and work remotely from Kenya. 

My name is {name}, a {citizenship} citizen. I am currently {job_title} at {company}, a firm based in {company_location}. My role is fully remote, and I receive an annual income of ${income}, which meets the statutory requirements.

I intend to reside in {neighborhood}, where I have secured 'Nomad-Standard' housing with reliable connectivity. During my stay, I intend to contribute to the local economy while maintaining my professional obligations abroad.

Thank you for your consideration.

Sincerely,
{name}
""",
            "G": """
TO: THE DIRECTOR GENERAL OF IMMIGRATION SERVICES, KENYA
REF: COVER LETTER FOR CLASS G (INVESTOR) PERMIT APPLICATION

Dear Sir/Madam,

I am writing to apply for a Class G permit for the purpose of trade and business in Kenya.

My name is {name}, representing {company}. We have committed an investment of ${income} into the Kenyan {industry} sector. Our goal is to foster innovation and create employment opportunities for Kenyans in {neighborhood}.

Attached please find our Certificate of Incorporation and investment proofs.

Sincerely,
{name}
"""
        }

    def generate_letter(self, user_data):
        permit_class = user_data.get('permit_class', 'N')
        template = self.templates.get(permit_class, self.templates["N"])
        
        try:
            return template.format(
                name=user_data.get('name', 'Applicant'),
                citizenship=user_data.get('citizenship', 'Foreign'),
                job_title=user_data.get('job_title', 'Professional'),
                company=user_data.get('company', 'Foreign Entity'),
                company_location=user_data.get('company_location', 'Outside Kenya'),
                income=user_data.get('income', 0),
                neighborhood=user_data.get('neighborhood', 'Nairobi'),
                industry=user_data.get('industry', 'Technology')
            )
        except KeyError as e:
            return f"Error: Missing field {e}"

if __name__ == "__main__":
    engine = CoverLetterEngine()
    test_data = {
        "name": "Sarah London",
        "citizenship": "British",
        "job_title": "Senior Engineer",
        "company": "Tech Global UK",
        "company_location": "London, UK",
        "income": 75000,
        "neighborhood": "Westlands",
        "permit_class": "N"
    }
    print(engine.generate_letter(test_data))
