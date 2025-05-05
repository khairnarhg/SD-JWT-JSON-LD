const axios = require('axios');

const jsonLdVC = {
  '@context': [
    'https://www.w3.org/2018/credentials/v1',
    'https://www.w3.org/2018/credentials/examples/v1'
  ],
  id: 'urn:uuid:1234',
  type: ['VerifiableCredential', 'PID'],
  issuer: 'did:example:issuer123',
  issuanceDate: new Date().toISOString(),
  credentialSubject: {
    id: 'did:example:123',
    name: 'Harsh Khairnar',
    dob: '2002-08-15'
  },
  proof: {
    type: 'Ed25519Signature2018',
    created: new Date().toISOString(),
    proofPurpose: 'assertionMethod',
    verificationMethod: 'did:example:issuer123#key-1',
    jws: 'dummy-jws-value'
  }
};

axios.post('http://localhost:3000/api/vc-request-JSON-LD', {
  presentedVC: jsonLdVC,
  requestedType: 'PID',
  format: 'jsonld'
})
.then(response => {
  console.log('JSON-LD VC Verified:', response.data);
})
.catch(error => {
  console.error('Verification failed:', error.response?.data || error.message);
});
