import time

class WhatsAppEngine:
    def __init__(self, partner_whatsapp="whatsapp:+254700000001"):
        self.partner_whatsapp = partner_whatsapp

    def send_message(self, to_phone, body):
        """
        Simulate sending a WhatsApp message via Twilio.
        """
        print(f"\n[WHATSAPP] Outgoing to {to_phone}...")
        time.sleep(1)
        print(f"Message Body:\n------------------\n{body}\n------------------")
        return {"status": "Sent", "to": to_phone, "sid": f"SM{int(time.time())}"}

    def format_eligibility_card(self, name, status, reason):
        """
        Format a professional WhatsApp notification card.
        """
        icon = "[OK]" if status == "Eligible" else "[X]"
        return f"""
*VizaBot KE | Audit Result*

Hello *{name}*, 

Our AI has completed your document audit.
Status: {icon} *{status}*

Detail: {reason}

Next Step: Reply 'DOSSIER' to unlock your full application kit.
"""

    def notify_fixer_vip(self, client_name, location):
        """
        Directly notify the ground partner of a VIP arrival.
        """
        body = f"""
*VizaBot KE | VIP ALERT*

Partner, we have a VIP client arrival:
Client: *{client_name}*
Service: VIP JKIA Concierge
Meeting Point: {location}

Please confirm once you have reached out to the client.
"""
        return self.send_message(self.partner_whatsapp, body)

if __name__ == "__main__":
    wa = WhatsAppEngine()
    card = wa.format_eligibility_card("Alex", "Eligible", "Income verified.")
    wa.send_message("whatsapp:+4912345678", card)
