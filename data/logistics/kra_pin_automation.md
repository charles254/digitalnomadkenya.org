# KRA PIN Fast-Track: Data Entry Map

This document maps user data collected by VizaBot KE to the required fields on the Kenya Revenue Authority (iTax) "Individual" registration form.

## 1. Basic Details
| iTax Field | VizaBot Source | Notes |
|---|---|---|
| Citizenship | User Passport | e.g., German, US |
| ID Type | Fixed: "Passport" | Selection from dropdown |
| Passport Number | OCR from Passport Audit | Verified against image |
| Expiry Date | OCR from Passport Audit | Must be > 6 months |
| Issuing Country | OCR from Passport Audit | |

## 2. Contact Details
| iTax Field | VizaBot Source | Notes |
|---|---|---|
| Mobile Number | User Input | Must be a +254 (Safaricom) number |
| Email Address | User Profile | |
| Physical Address | Settlement Plan | e.g., House No, Street, District |

## 3. Business Details (For Class G)
| iTax Field | VizaBot Source | Notes |
|---|---|---|
| Business Name | CR12 Document | OCR from Company Audit |
| Business PIN | CR12 Document | |

---

## Automation Flow
1. **Collector**: Bot asks for missing fields (Mobile, Address).
2. **Validator**: Bot checks against Passport OCR and Settlement Plan data.
3. **Generator**: Bot generates a pre-filled JSON or PDF "Dossier" that the user can use to copy-paste into iTax, or (if API available) push directly to a human agent's portal.
