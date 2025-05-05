const jwt = require('jsonwebtoken');
const axios = require('axios');

const SECRET_KEY = 'dummy-issuer-wallet-shared-key-1234567890';

const disclosures = [
  { name: 'Harsh Khairnar' },
  { dob: '2002-08-15' }
];


const digest = disclosures.map(claim => jwt.sign(claim, SECRET_KEY));

// SD-JWT
const sdJwtPayload = {
  sub: 'did:example:123',
  type: 'PID',
  _sd: digest, 
  iat: Date.now(),
};

const sdJwt = jwt.sign(sdJwtPayload, SECRET_KEY);


axios.post('http://localhost:3000/api/vc-request-SD-JWT', {
  presentedVC: sdJwt,
  requestedType: 'PID',
  disclosures: disclosures, 
})
.then(response => {
  console.log('SD-JWT VC Verified:', response.data);
})
.catch(error => {
  console.error('Verification failed:', error.response?.data || error.message);
});
