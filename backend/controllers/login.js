// const User = require('../models/users');
// const CryptoJS = require('crypto-js');
// const jwt = require('jsonwebtoken');
// const zod = require('zod');
// const validateInput = require("./zod_validation"); // Corrected import statement

// const loginSchema = zod.object({
//     email: zod.string().email({ message: 'Invalid email format' }),
//     password: zod.string().min(8, { message: 'Password must be at least 8 characters long' })
//                            .regex(/^[a-zA-Z0-9]+$/, { message: 'Password can only contain letters and numbers' })
//                            .nonempty({ message: 'Password is required' })
// });


// const login = async (req, res) => {
//     try {
//         validateInput(req.body, loginSchema);
//         const { email, password } = req.body;
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(404).json({ "msg": "User not found" });
//         }
//         const decryptedPassword = CryptoJS.AES.decrypt(user.password, process.env.CRYPTO_KEY).toString(CryptoJS.enc.Utf8);
//         if (decryptedPassword === password) {
//             // const token = jwt.sign({ email }, jwtPass);
//             // user.token = token;
//             // await user.save();
//             res.status(200).json({ "msg": "Login successful", token: await user.generateToken(), userid: user._id.toString() });
//         } else {
//             res.status(401).json({ "msg": "Incorrect Credentials" });
//         }
//     } catch (error) {
//         console.error("Error during login:", error);
//         res.status(400).json({ "msg": error.message });
//     }
// }

// module.exports = { login };
