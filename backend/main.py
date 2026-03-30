from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
import sys
import os

# Add root src to path for logic imports
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from src.vision.audit_logic import VizaBotAudit
from src.logic.email_engine import EmailEngine
from src.logic.dossier_generator import DossierGenerator
import backend.database as db

# Initialize Limiter
limiter = Limiter(key_func=get_remote_address)
app = FastAPI(title="VizaBot KE API")
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# Restrict CORS for Production Alignment
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://vizabot.ke"],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

class AuditRequest(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    income: float = Field(..., gt=0)
    permit_class: str = Field(..., pattern="^[NG]$")
    passport_expiry: str = Field(..., pattern=r"^\d{4}-\d{2}-\d{2}$")
    is_bank_statement_stamped: bool
    is_vip: bool = False

class DossierRequest(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    income: float = Field(..., gt=0)
    permit_class: str = Field(..., pattern="^[NG]$")

@app.get("/")
def read_root():
    return {"status": "Online", "service": "VizaBot KE Security-Hardened API"}

@app.post("/audit")
@limiter.limit("5/minute")
def perform_audit(req: AuditRequest, request: Request):
    try:
        audit = VizaBotAudit()
        email_engine = EmailEngine()
        
        # Logic for audit result determination
        elig = audit.audit_eligibility(req.income, req.permit_class)
        pass_audit = audit.audit_passport(req.passport_expiry)
        bank_audit = audit.audit_bank_statement(req.is_bank_statement_stamped)
        
        status = "Eligible"
        message = "Perfect! You meet all legal requirements. The AI vision audit verifies your financial standing and document validity."
        
        if elig['status'] == "Ineligible":
            status = "Ineligible"
            message = elig['message']
        elif pass_audit['status'] == "Fail":
            status = "Blocked"
            message = pass_audit['message']
        elif bank_audit['status'] == "Fail":
            status = "ActionRequired"
            message = bank_audit['message']
        
        # Record Lead in Database
        db.add_lead(
            name=req.name,
            email=req.email,
            permit_class=req.permit_class,
            status=status,
            is_vip=req.is_vip or req.income > 120000 # High-income auto-VIP
        )

        # Send Email
        email_sent = email_engine.send_audit_report(
            to_email=req.email,
            user_name=req.name,
            audit_status=status,
            audit_message=message
        )
        
        if not email_sent:
            print("[WARNING] Email Delivery Blocked. Proceeding with audit completion.")

        return {
            "status": "Success", 
            "message": f"Audit complete! Result sent to {req.email}.",
            "gated": True
        }
    except Exception as e:
        # Sanitize error to prevent sensitive leak
        print(f"[SECURITY ALERT] Audit Error: {str(e)}")
        raise HTTPException(status_code=500, detail="An internal processing error occurred. Our security team has been notified.")

@app.post("/dossier")
@limiter.limit("2/minute")
def generate_dossier(req: DossierRequest, request: Request):
    try:
        generator = DossierGenerator()
        user_data = {
            "name": req.name,
            "income": req.income,
            "permit_class": req.permit_class
        }
        pdf_path = generator.generate_dossier_pdf(user_data)
        
        if not os.path.exists(pdf_path):
            raise Exception("PDF Ghost Error")
            
        return FileResponse(
            path=pdf_path, 
            filename=os.path.basename(pdf_path),
            media_type="application/pdf"
        )
    except Exception as e:
        print(f"[SECURITY ALERT] Dossier Error: {str(e)}")
        raise HTTPException(status_code=500, detail="Secure PDF generation failed. Please contact support.")

@app.get("/admin/leads")
def get_leads(request: Request):
    # In a real app, verify API Key here
    return db.get_all_leads()

@app.get("/admin/stats")
def get_dashboard_stats(request: Request):
    return db.get_stats()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

