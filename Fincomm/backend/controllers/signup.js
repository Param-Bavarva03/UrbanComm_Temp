// const User = require('../models/users');
// const CryptoJS = require('crypto-js');
// const jwt = require('jsonwebtoken');
// const zod = require('zod');
// const validateInput = require("./zod_validation"); // Corrected import statement

// const signupSchema = zod.object({
//     username: zod.string().nonempty({ message: 'Username is required' }),
//     email: zod.string().email({ message: 'Invalid email format' }),
//     password: zod.string().min(8, { message: 'Password must be at least 8 characters long' })
//                            .regex(/^[a-zA-Z0-9]+$/, { message: 'Password can only contain letters and numbers' })
//                            .nonempty({ message: 'Password is required' }),
//     role: zod.string().nonempty({ message: 'Role is required' }),
// });


// const signup = async (req, res) => {
//     try {
//         validateInput(req.body, signupSchema);
//         const { username, email, password, role } = req.body;

//         const existingUser = await User.findOne({ $or: [{ username }, { email }] });

//         if (existingUser) {
//             return res.status(400).json({ "msg": "User already exists" });
//         }
//         const encryptedPassword = CryptoJS.AES.encrypt(password, process.env.CRYPTO_KEY).toString();
//         const newUser = new User({ username, email, password: encryptedPassword, role });
//         await newUser.save();
        
//         res.status(201).json({ "msg": "Signup successful", token:await newUser.generateToken(), userid: newUser._id.toString() });
//     } catch (error) {
//         console.error("Error during signup:", error);
//         res.status(400).json({ "msg": error.message });
//     }
// }

// module.exports = { signup };
