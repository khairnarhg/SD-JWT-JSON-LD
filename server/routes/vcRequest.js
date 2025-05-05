
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');


const ACCEPTED_CREDENTIAL_TYPES = ['PID', 'QEAA'];

router.post('/vc-request-SD-JWT', async (req, res) => {
    const { presentedVC, requestedType, disclosures } = req.body;
  
    if (!ACCEPTED_CREDENTIAL_TYPES.includes(requestedType)) {
      return res.status(400).json({ error: 'Unsupported credential type requested' });
    }
  
    try {
      const SECRET_KEY = 'dummy-issuer-wallet-shared-key-1234567890';
      const decoded = jwt.verify(presentedVC, SECRET_KEY);
  
      if (decoded.type !== requestedType) {
        return res.status(400).json({ error: 'Incorrect credential type presented' });
      }
  
 
      const allValid = decoded._sd.every((digest, i) => {
        const reSigned = jwt.sign(disclosures[i], SECRET_KEY);
        return digest === reSigned;
      });
  
      if (!allValid) {
        return res.status(400).json({ error: 'Disclosure digest mismatch' });
      }
  
      return res.json({ message: 'SD-JWT verified', subject: decoded.sub, claims: disclosures });
    } catch (err) {
      return res.status(401).json({ error: 'Invalid or expired SD-JWT' });
    }
  });
  router.post('/vc-request-JSON-LD', async (req, res) => {
    const { presentedVC, requestedType, format } = req.body;
  
 
    if (!ACCEPTED_CREDENTIAL_TYPES.includes(requestedType)) {
      return res.status(400).json({ error: 'Unsupported credential type requested' });
    }
  
    if (format !== 'jsonld') {
      return res.status(400).json({ error: 'Invalid format. Expected jsonld.' });
    }
  
    try {
    
      const { type, credentialSubject, proof } = presentedVC;
  
      if (!Array.isArray(type) || !type.includes(requestedType)) {
        return res.status(400).json({ error: 'Incorrect credential type in JSON-LD VC' });
      }
  
   
      if (!credentialSubject || !credentialSubject.id) {
        return res.status(400).json({ error: 'Missing or invalid credentialSubject' });
      }
  
      if (!proof || !proof.jws) {
        return res.status(400).json({ error: 'Missing or invalid proof in JSON-LD VC' });
      }
  

      return res.json({
        message: 'JSON-LD VC verified',
        subject: credentialSubject.id,
        name: credentialSubject.name || null
      });
  
    } catch (err) {
      return res.status(500).json({ error: 'Error processing JSON-LD VC', details: err.message });
    }
  });
  

module.exports = router;
