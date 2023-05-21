const crypto = require('crypto'); 
require('dotenv').config()

// function encrypt digits sent to users 
const encrypt = (text)=> {
    const initVector = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-ctr', process.env.SECRET_KEY,initVector);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
    return {
        iv:initVector.toString('hex'), 
        content:encrypted.toString('hex')
    }
}

// function decrypt digits recieved from users
const decrypt = (hash) => {
    const decipher = crypto.createDecipheriv('aes-256-ctr',process.env.SECRET_KEY, Buffer.from(hash.iv,'hex'))
    const decrypted = Buffer.concat([decipher.update(Buffer.from(hash.content,'hex')), decipher.final()])
    return decrypted.toString();
}

/**
 * 
 * @param {Function} fn an async callback function
 * @returns an express callback that resolves the wrapped function
 */
const asyncWrapper = fn => (req,res,next) => {
    return Promise.resolve(fn(req,res,next)).catch(next); 
}


module.exports = {
    encrypt,
    decrypt,
    asyncWrapper
}