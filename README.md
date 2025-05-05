# Presentation During Issuance - Prototype (Inji Certify)

This prototype demonstrates **Verifiable Credential (VC) authentication** during issuance using both **SD-JWT** and **JSON-LD** formats. It simulates how a wallet can present existing credentials (e.g., PID or QEAA) during issuance, aligning with **eIDAS 2.0** and **EUDI wallet** requirements.

## Features

- Request and verify presented VCs from a wallet.
- Supports:
  - ✅ **SD-JWT** (JWT with simulated selective disclosure)
  - ✅ **JSON-LD** (Linked Data Proof structure)
- Validates VC type, basic proof, and disclosed claims.
- Provides feedback on invalid or missing credentials.

##  How to Run

1. Install dependencies:
   ```bash
   npm install
2. Start the Express server:
   ```bash
   node index.js
3. Run the wallet simulation:
   ```bach
   node wallet-SD-JWT.js
   node wallet-JSON-LD.js
   
##  Next Steps for Production
- Use real SD-JWT libraries instead of jsonwebtoken.
- Add asymmetric key support (e.g., RS256, ES256).
- Integrate jsonld-signatures for verifying JSON-LD proofs.
- Implement secure wallet interactions via DIDComm, CHAPI, or OpenID4VP.
- Enforce proper user consent UI and holder binding.
