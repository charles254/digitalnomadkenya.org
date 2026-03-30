import uuid
import time

class PaymentProcessor:
    def __init__(self):
        self.pending_transactions = {}

    def simulate_stk_push(self, phone_number, amount):
        """
        Simulate triggering an M-Pesa STK Push.
        """
        checkout_id = f"WS_CHECKOUT_{uuid.uuid4().hex[:8].upper()}"
        self.pending_transactions[checkout_id] = {
            "status": "Requested",
            "phone": phone_number,
            "amount": amount,
            "timestamp": time.time()
        }
        return {"MerchantRequestID": checkout_id, "ResponseCode": "0", "CustomerMessage": "Success. Request accepted for processing"}

    def handle_callback(self, checkout_id, success=True):
        """
        Simulate the callback from M-Pesa/Stripe for a payment.
        """
        if checkout_id not in self.pending_transactions:
            return {"status": "Error", "message": "Transaction not found."}
        
        if success:
            self.pending_transactions[checkout_id]["status"] = "Completed"
            return {
                "status": "Success",
                "checkout_id": checkout_id,
                "message": "Payment verified. Unlocking premium features.",
                "action": "TRIGGER_DOSSIER_GENERATION"
            }
        else:
            self.pending_transactions[checkout_id]["status"] = "Failed"
            return {"status": "Failed", "message": "Payment cancelled/failed."}

if __name__ == "__main__":
    processor = PaymentProcessor()
    print("Initiating M-Pesa STK Push...")
    req = processor.simulate_stk_push("254712345678", 50)
    print(req)
    
    print("\nSimulating M-Pesa Callback (Payment Successful)...")
    time.sleep(1)
    callback = processor.handle_callback(req["MerchantRequestID"])
    print(callback)
