const {
  privateDecrypt,
  publicEncrypt,
  constants,
} = require('crypto-browserify');
const CryptoJS = require('crypto-js');
const { v4: uuid } = require('uuid');

export const encryptRSAPublicKey = (toEncrypt, rsaPublicKey) => {
  if (!rsaPublicKey) {
    throw new TypeError('public key is not defined');
  }
  const publicKey = {
    key: rsaPublicKey,
    padding: constants.RSA_PKCS1_PADDING,
  };
  const buffer = Buffer.from(toEncrypt, 'utf8');
  const encrypted = publicEncrypt(publicKey, buffer);
  return encrypted.toString('base64');
};

export const decryptRSAPrivateKey = (toDecrypt, rsaPrivateKey) => {
  if (!rsaPrivateKey) {
    throw new TypeError('private key is not defined');
  }
  const privateKey = {
    key: rsaPrivateKey,
    padding: constants.RSA_PKCS1_PADDING,
  };
  const buffer = Buffer.from(toDecrypt, 'base64');
  const decrypted = privateDecrypt(privateKey, buffer);
  return decrypted.toString('utf8');
};

export const decryptAesCbc = (data, key, iv) => {
  if (typeof data !== 'string') {
    throw new TypeError('data must be string');
  }
  if (typeof key !== 'string') {
    throw new TypeError('key must be string');
  }
  if (typeof iv !== 'string') {
    throw new TypeError('iv must be string');
  }
  const rawData = CryptoJS.enc.Base64.parse(data);
  const keyParse = CryptoJS.enc.Utf8.parse(key);
  const ivParse = CryptoJS.enc.Utf8.parse(iv);
  const decrypterData = CryptoJS.AES.decrypt(
    { ciphertext: rawData },
    keyParse,
    {
      iv: ivParse,
      mode: CryptoJS.mode.CBC,
    },
  );
  return decrypterData.toString(CryptoJS.enc.Utf8);
};
