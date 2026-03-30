import uuid

class VizaBotPayments:
    def __init__(self):
        self.prices = {
            "eligibility_pass": 10,      # $10 (KES 1,300)
            "application_pack": 50,      # $50 (KES 6,500)
            "vip_fixer": 250             # $250 (KES 32,500)
        }

    def initiate_payment(self, service_key, method="M-Pesa"):
        """
        Simulate payment initiation.
        """
        if service_key not in self.prices:
            return {"status": "Error", "message": "Invalid service selected."}
        
        amount = self.prices[service_key]
        transaction_id = str(uuid.uuid4())[:8].upper()
        
        return {
            "status": "Pending",
            "transaction_id": transaction_id,
            "amount": amount,
            "method": method,
            "instruction": f"Please complete payment of ${amount} via {method} to proceed with your {service_key.replace('_', ' ')}."
        }

    def verify_payment(self, transaction_id):
        """
        Simulate payment verification.
        """
        # In real-world, we'd check against M-Pesa C2B/STK Push or Stripe API
        return {
            "status": "Success",
            "transaction_id": transaction_id,
            "message": "Payment verified. Your dossier generation has started."
        }

# Example Usage
if __name__ == "__main__":
    payments = VizaBotPayments()
    pay_init = payments.initiate_payment("application_pack")
    print(pay_init)
    print(payments.verify_payment(pay_init["transaction_id"]))
