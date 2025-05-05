
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'dummy-issuer-wallet-shared-key-1234567890';

const presentedVC = '...'; 

try {
  const decoded = jwt.verify(presentedVC, SECRET_KEY);
  console.log('VC is valid. Decoded data:', decoded);
} catch (err) {
  console.error('VC is invalid:', err.message);
}
