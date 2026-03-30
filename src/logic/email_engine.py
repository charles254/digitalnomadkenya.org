import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from dotenv import load_dotenv

load_dotenv()

class EmailEngine:
    def __init__(self):
        self.smtp_host = os.getenv("SMTP_HOST", "smtp.gmail.com")
        self.smtp_port = int(os.getenv("SMTP_PORT", 587))
        self.smtp_user = os.getenv("SMTP_USER", "")
        self.smtp_pass = os.getenv("SMTP_PASS", "")
        self.from_email = os.getenv("FROM_EMAIL", "audit@vizabot.ke")

    def send_audit_report(self, to_email, user_name, audit_status, audit_message):
        """
        Sends an HTML-styled audit report to the user.
        """
        if not self.smtp_user or not self.smtp_pass:
            print(f"SMTP Credentials missing. Mocking email to {to_email}")
            return True

        try:
            msg = MIMEMultipart("alternative")
            msg["Subject"] = f"VizaBot KE: Your Class N Audit Results for {user_name}"
            msg["From"] = f"VizaBot KE <{self.from_email}>"
            msg["To"] = to_email

            html = f"""
            <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                    <h2 style="color: #10b981;">{audit_status}: Official Audit Report</h2>
                    <p>Hello <strong>{user_name}</strong>,</p>
                    <p>Thank you for using the VizaBot KE Audit Simulator. Our AI engine has benchmarked your profile against the 2024 Kenya Immigration Act.</p>
                    
                    <div style="background: #f9fafb; padding: 15px; border-radius: 8px; border-left: 4px solid #10b981; margin: 20px 0;">
                        <p style="margin: 0;"><strong>Result:</strong> {audit_message}</p>
                    </div>

                    {self._get_cta_section(audit_status)}

                    <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;">
                    <p style="font-size: 0.8em; color: #777;">
                        VizaBot KE - Automation for Digital Nomads. <br>
                        This is an automated legal audit. For representation, please contact our VIP fixers.
                    </p>
                </div>
            </body>
            </html>
            """
            
            msg.attach(MIMEText(html, "html"))

            with smtplib.SMTP(self.smtp_host, self.smtp_port) as server:
                server.starttls()
                server.login(self.smtp_user, self.smtp_pass)
                server.sendmail(self.from_email, to_email, msg.as_string())
            
            return True
        except Exception as e:
            print(f"Failed to send email: {e}")
            return False

    def _get_cta_section(self, status):
        if status == "Eligible":
            return """
            <p><strong>Next Step:</strong> You are clear to apply! Get your professional application dossier now.</p>
            <a href="https://vizabot.ke/audit/dossier" style="display: inline-block; padding: 12px 25px; background-color: #f59e0b; color: #fff; text-decoration: none; border-radius: 5px; font-weight: bold;">Download Official Dossier ($20)</a>
            """
        else:
            return """
            <p><strong>Action Required:</strong> We found discrepancies in your profile. Book a consultation with a local immigration expert to fix your application.</p>
            <a href="https://vizabot.ke/consult" style="display: inline-block; padding: 12px 25px; background-color: #3b82f6; color: #fff; text-decoration: none; border-radius: 5px; font-weight: bold;">Book VIP Consultation</a>
            """
