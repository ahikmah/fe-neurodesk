import cryptoJS from "crypto-js";

export const encodeData = (data) => {
  if (!data) return null;
  var encrypted = cryptoJS.AES.encrypt(JSON.stringify(data), 'SECRET_KEY').toString();
  return encrypted;
}

export const decryptData = (data) => {
  if (!data) return null;
  var decoded = cryptoJS.AES.decrypt(data, 'SECRET_KEY');
  if (decoded.sigBytes === 0) return null;
  var decrypted = JSON.parse(decoded.toString(cryptoJS.enc.Utf8));
  return decrypted;
}

export const base64 = {
  encodeData,
  decryptData
}

export default base64;