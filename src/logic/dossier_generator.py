import os
import datetime
from fpdf import FPDF

class DossierGenerator:
    def __init__(self):
        self.output_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "backend", "dossiers")
        if not os.path.exists(self.output_dir):
            os.makedirs(self.output_dir)

    def generate_dossier_pdf(self, user_data):
        """
        Generates a high-quality PDF dossier using FPDF.
        Returns the absolute path to the generated PDF file.
        """
        name = user_data.get('name', 'Applicant')
        permit_class = user_data.get('permit_class', 'N')
        income = user_data.get('income', 0)
        
        pdf = FPDF()
        pdf.add_page()
        
        # Header
        pdf.set_font("Arial", 'B', 16)
        pdf.set_text_color(16, 185, 129) # Emerald Main
        pdf.cell(0, 10, "VizaBot KE", ln=1, align="L")
        
        pdf.set_font("Arial", '', 10)
        pdf.set_text_color(100, 100, 100)
        pdf.cell(0, 5, "The Silicon Savannah Standard", ln=1, align="L")
        pdf.cell(0, 5, f"Date Generated: {datetime.date.today()}", ln=1, align="L")
        
        pdf.ln(10)
        
        # Title
        pdf.set_font("Arial", 'B', 20)
        pdf.set_text_color(0, 0, 0)
        pdf.cell(0, 15, "Official Application Dossier", ln=1, align="C")
        
        pdf.set_font("Arial", 'B', 14)
        pdf.cell(0, 10, f"Permit Target: Class {permit_class} Permit", ln=1, align="C")
        
        pdf.ln(10)
        
        # Applicant Info Section
        pdf.set_font("Arial", 'B', 14)
        pdf.set_text_color(16, 185, 129)
        pdf.cell(0, 10, "1. Applicant Profile", ln=1, align="L")
        
        pdf.set_font("Arial", '', 12)
        pdf.set_text_color(50, 50, 50)
        pdf.cell(50, 8, "Primary Applicant:", border=0)
        pdf.set_font("Arial", 'B', 12)
        pdf.cell(0, 8, name, ln=1)
        
        pdf.set_font("Arial", '', 12)
        pdf.cell(50, 8, "Verified Income:", border=0)
        pdf.set_font("Arial", 'B', 12)
        pdf.cell(0, 8, f"${income:,.2f} USD", ln=1)
        
        pdf.ln(10)
        
        # Checklist Section
        pdf.set_font("Arial", 'B', 14)
        pdf.set_text_color(16, 185, 129)
        pdf.cell(0, 10, "2. Legal Document Checklist", ln=1, align="L")
        
        pdf.set_font("Arial", '', 12)
        pdf.set_text_color(50, 50, 50)
        
        checklist_items = [
            ("[  ] Completed Form 25 (eFNS Portal)", "Ensure this matches the exact data provided here."),
            ("[  ] Two Passport Photographs", "Must be recent, clear, and on a white background."),
            ("[  ] Valid National Passport Copy", "Bio-data page; minimum 6 months validity remaining."),
            ("[  ] Proof of Foreign Employment", "Active contract or freelance business registration."),
            ("[  ] Certified Bank Statements", "Last 3 months, physically stamped by the issuing bank."),
            ("[  ] Police Clearance Certificate", "From country of habitual residence (apostilled if required)."),
            ("[  ] Proof of Accommodation", "Lease agreement or hotel reservation in Kenya."),
            ("[  ] Signed Non-Compete Undertaking", "Letter stating you will not engage local Kenyan clients.")
        ]
        
        for item, desc in checklist_items:
            pdf.set_font("Arial", 'B', 12)
            pdf.cell(0, 8, item, ln=1)
            pdf.set_font("Arial", 'I', 10)
            pdf.set_text_color(120, 120, 120)
            pdf.cell(0, 6, f"      {desc}", ln=1)
            pdf.set_text_color(50, 50, 50)
            pdf.ln(2)
            
        pdf.ln(10)
        
        # Next Steps
        pdf.set_font("Arial", 'B', 14)
        pdf.set_text_color(16, 185, 129)
        pdf.cell(0, 10, "3. Next Steps (e-Citizen Portal)", ln=1, align="L")
        
        pdf.set_font("Arial", '', 11)
        pdf.set_text_color(50, 50, 50)
        pdf.multi_cell(0, 6, "1. Create an account on the Kenya Foreign Nationals Services (eFNS) portal.\n"
                             "2. Navigate to 'Permit Applications' and select 'Class N'.\n"
                             "3. Upload all documents from the checklist above in PDF format.\n"
                             "4. Pay the non-refundable $200 USD processing fee.\n"
                             "5. Await approval from the Directorate of Immigration Services.")
        
        pdf.ln(15)
        pdf.set_font("Arial", 'I', 10)
        pdf.set_text_color(150, 150, 150)
        pdf.cell(0, 10, "VizaBot KE - Premium Legal Automation. Do not distribute.", ln=1, align="C")
        
        # Sanitize name to prevent path traversal
        clean_name = "".join(c for c in name if c.isalnum() or c in (' ', '_', '-')).strip()
        file_name = f"VizaBot_Dossier_{clean_name.replace(' ', '_')}.pdf"
        file_path = os.path.join(self.output_dir, file_name)
        
        pdf.output(file_path)
        
        return file_path

if __name__ == "__main__":
    generator = DossierGenerator()
    user = {"name": "Sarah London", "income": 60000, "permit_class": "N"}
    path = generator.generate_dossier_pdf(user)
    print(f"Test dossier generated at: {path}")
