const jwt = require('jsonwebtoken');
const axios = require('axios');

const SECRET_KEY = 'dummy-issuer-wallet-shared-key-1234567890';

// Step 1: Create disclosures (the claim values separately)
const disclosures = [
  { name: 'Harsh Khairnar' },
  { dob: '2002-08-15' }
];

// Step 2: Simulate digests for claims
const digest = disclosures.map(claim => jwt.sign(claim, SECRET_KEY)); // Mock digesting

// Step 3: Create the SD-JWT (just simulating here)
const sdJwtPayload = {
  sub: 'did:example:123',
  type: 'PID',
  _sd: digest, // digests of hidden claims
  iat: Date.now(),
};

const sdJwt = jwt.sign(sdJwtPayload, SECRET_KEY);

// Step 4: Send to issuer
axios.post('http://localhost:3000/api/vc-request-SD-JWT', {
  presentedVC: sdJwt,
  requestedType: 'PID',
  disclosures: disclosures, // real values holder chooses to disclose
})
.then(response => {
  console.log('SD-JWT VC Verified:', response.data);
})
.catch(error => {
  console.error('Verification failed:', error.response?.data || error.message);
});
