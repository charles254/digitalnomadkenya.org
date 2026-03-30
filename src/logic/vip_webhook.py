import time

class VIPWebhook:
    def __init__(self, partner_id="KE_FIXER_001"):
        self.partner_id = partner_id

    def notify_partner(self, user_name, service_type, location):
        """
        Simulate a webhook call to the human fixer partner.
        """
        print(f"\n[WEBHOOK] Outgoing to Partner {self.partner_id}...")
        time.sleep(1)
        
        payload = {
            "event": "VIP_PURCHASE",
            "client_name": user_name,
            "service": service_type,
            "delivery_location": location,
            "instruction": "Meet at JKIA Terminal 1A with 5G SIM and Welcome Kit."
        }
        
        # In real life, use requests.post(webhook_url, json=payload)
        return {"status": "Notified", "partner": self.partner_id, "payload": payload}

if __name__ == "__main__":
    webhook = VIPWebhook()
    print(webhook.notify_partner("Alex Berlin", "VIP Fixer", "JKIA Terminal 1A"))
