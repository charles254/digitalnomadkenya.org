from vision.audit_logic import VizaBotAudit
from payments.payment_flow import VizaBotPayments
import time

def run_vizabot_workflow(user_data):
    audit = VizaBotAudit()
    payments = VizaBotPayments()
    
    print(f"--- VizaBot KE: Starting Audit for {user_data['name']} ---")
    time.sleep(1)

    # Step 1: Eligibility Check
    print("\n[Step 1] Checking Eligibility...")
    eligibility = audit.audit_eligibility(user_data['income'], user_data['permit_class'])
    print(f"Result: {eligibility['status']} - {eligibility['message']}")
    
    if eligibility['status'] == "Ineligible":
        print("Workflow Terminated. User does not meet financial requirements.")
        # Phase 11: Ineligible Lead Capture
        from logic.whatsapp_engine import WhatsAppEngine
        wa = WhatsAppEngine()
        wa_card = wa.format_eligibility_card(user_data['name'], "Ineligible", eligibility['message'])
        wa.send_message(user_data.get('phone', 'whatsapp:+254700000002'), wa_card)
        return

    # Step 2: Vision AI Passport Audit
    print("\n[Step 2] Simulation: Auditing Passport...")
    time.sleep(1)
    passport_audit = audit.audit_passport(user_data['passport_expiry'])
    print(f"Result: {passport_audit['status']} - {passport_audit['message']}")
    
    if passport_audit['status'] == "Fail":
        print("!!! ROCK FACTOR ALERT !!!")
        print("ACTION REQUIRED: User warned to renew passport before paying government fees.")
        # Phase 11: Blocked Lead Automation
        from logic.whatsapp_engine import WhatsAppEngine
        wa = WhatsAppEngine()
        wa_card = wa.format_eligibility_card(user_data['name'], "Blocked", "Passport expires in < 6 months.")
        wa.send_message(user_data.get('phone', 'whatsapp:+254700000002'), wa_card)
        return

    # Step 3: Vision AI Bank Statement Audit
    print("\n[Step 3] Simulation: Auditing Bank Statements...")
    time.sleep(1)
    bank_audit = audit.audit_bank_statement(user_data['is_bank_statement_stamped'])
    print(f"Result: {bank_audit['status']} - {bank_audit['message']}")
    
    if bank_audit['status'] == "Fail":
        print("ACTION REQUIRED: User must get bank statements stamped physically.")
        return

    # Step 4: Payment for Dossier (Operational Phase 9)
    from logic.payment_processor import PaymentProcessor
    from logic.dossier_generator import DossierGenerator

    print("\n[Step 4] Initiating Operational Payment (STK Push simulation)...")
    processor = PaymentProcessor()
    stk_req = processor.simulate_stk_push(user_data.get('phone', '254700000000'), 50)
    print(f"STK Push Sent: {stk_req['CustomerMessage']} (ID: {stk_req['MerchantRequestID']})")
    
    # Simulate user paying on their phone
    print("\n[Admin] Simulating user payment successful on mobile...")
    time.sleep(1)
    pay_callback = processor.handle_callback(stk_req['MerchantRequestID'])
    print(f"Result: {pay_callback['status']} - {pay_callback['message']}")

    if pay_callback.get('action') == "TRIGGER_DOSSIER_GENERATION":
        print("\n[Step 5] Triggering Automated Dossier Generation...")
        generator = DossierGenerator()
        dossier = generator.generate_dossier_pdf(user_data, f"public/assets/{user_data['name']}_Dossier.pdf")
        print(f"Result: {dossier['status']} - {dossier['file_name']} created.")

    # Phase 4 Additions: KRA and Settlement
    from logistics.kra_generator import KRABot
    from logistics.uptime_engine import UptimeEngine

    print("\n--- Phase 4: High-Value Features ---")
    
    # 4.1 KRA PIN Preparation
    print("[4.1] Preparing KRA PIN Dossier...")
    kra = KRABot()
    kra_dossier = kra.generate_kra_dossier(user_data)
    print(f"Result: {kra_dossier['status']} - Ready for iTax submission.")

    # 4.2 Property Uptime Check
    print(f"[4.2] Verifying Property Uptime for {user_data.get('neighborhood', 'Unknown')}...")
    uptime = UptimeEngine()
    prop_check = uptime.verify_property(
        user_data.get('neighborhood', 'Westlands'), 
        user_data.get('has_inverter', True),
        user_data.get('has_starlink', False)
    )
    print(f"Result: {prop_check['status']} - {prop_check['message']}")

    # Phase 7 Additions: B2B & VIP
    from logic.cover_letter_engine import CoverLetterEngine
    from logic.vip_webhook import VIPWebhook

    print("\n--- Phase 7: B2B & VIP Assets ---")
    
    # 7.1 Cover Letter Generation (Application Pack)
    print("[7.1] Generating Personalized Cover Letter...")
    letter_engine = CoverLetterEngine()
    letter = letter_engine.generate_letter(user_data)
    print("Result: Cover Letter Drafted and ready for download.")

    # 7.2 VIP Notification (VIP Fixer only)
    if user_data.get('is_vip'):
        print(f"[7.2] VIP Tier Detected. Notifying On-Ground Fixer...")
        webhook = VIPWebhook()
        notification = webhook.notify_partner(user_data['name'], "VIP Fixer", "JKIA Terminal 1A")
        print(f"Result: {notification['status']} - Partner {notification['partner']} briefed.")

    # Phase 11: WhatsApp Integration (Success Path)
    from logic.whatsapp_engine import WhatsAppEngine
    wa = WhatsAppEngine()
    print("\n--- Phase 11: WhatsApp Lead Automation ---")
    wa_card = wa.format_eligibility_card(user_data['name'], "Eligible", "Income & Passport Verified.")
    wa.send_message(user_data.get('phone', 'whatsapp:+254700000002'), wa_card)

    if user_data.get('is_vip'):
        print(f"[11.2] VIP Tier Detected. Sending WhatsApp alert to ground partner...")
        wa.notify_fixer_vip(user_data['name'], "JKIA Terminal 1A")

    # Phase 10: Security & Cleanup
    from logic.security_manager import SecurityManager
    print("\n--- Phase 10: Security & GDPR Cleanup ---")
    sec = SecurityManager()
    sec.run_cleanup_routine()

    print("\n--- All Operational Phases Complete ---")
    print("Dossier, KRA files, Cover Letters, and VIP Concierge are synced.")
    print("Sensitive data scheduled for auto-deletion in 24 hours.")

if __name__ == "__main__":
    # Case: The German Designer scenario
    berlin_designer = {
        "name": "Alex (Berlin)",
        "income": 60000,
        "permit_class": "N",
        "passport_expiry": "2026-07-06", # Today is 2026-03-06, so 4 months away
        "is_bank_statement_stamped": True
    }
    
    run_vizabot_workflow(berlin_designer)

    print("\n" + "="*50 + "\n")

    # Case: Eligible user
    eligible_nomad = {
        "name": "Sarah (London)",
        "income": 75000,
        "permit_class": "N",
        "passport_expiry": "2027-12-01",
        "is_bank_statement_stamped": True,
        "is_vip": True
    }
    run_vizabot_workflow(eligible_nomad)
