const jwt = require('jsonwebtoken');

const generateAccessToken = async (user) => {

    const payload = {
        id: user._id
    };

    const secret = 'Millie@45';
    const options = { expiresIn: '1h' };


    console.log(typeof payload);
    console.log(typeof user);

    return jwt.sign(payload, secret, options);
}

const verifyAccessToken = (token)=> {
    const secret = 'Millie@45';
  
    try {
      const decoded = jwt.verify(token, secret);
      return { success: true, data: decoded };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

module.exports = { generateAccessToken };