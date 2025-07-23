const jwt = require('jsonwebtoken')

const generateToken = (userid,res)=>{
    const token = jwt.sign({userid},process.env.JWT_SECRET_KEY,{expiresIn:"7d",})

    res.cookie("jwt", token, {
  httpOnly: true,
  sameSite: process.env.NODE_ENV === "production" ? "lax" : "none",
  secure: process.env.NODE_ENV === "production",
});

    return token
}
module.exports = generateToken