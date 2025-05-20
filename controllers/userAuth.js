const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const { sendWelcomeEmail } = require("../emails/emailHandlers");
dotenv.config();
const signup = async(req,res)=>{
    try {
        const{name,username,email,password} = req.body;
    if (!name || !username || !email || !password) {
			return res.status(400).json({ message: "All fields are required" });
		}
		const existingEmail = await User.findOne({ email });
		if (existingEmail) {
			return res.status(400).json({ message: "Email already exists" });
		}
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
	    return res.status(400).json({ message: "Invalid email format" });  
      }
		const existingUsername = await User.findOne({ username });
		if (existingUsername) {
			return res.status(400).json({ message: "Username already exists" });
		}

		if (password.length < 6) {
			return res.status(400).json({ message: "Password must be at least 6 characters" });
		}
        const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
		const user = new User({
			name,
			email,
			password: hashedPassword,
			username,
		});
		await user.save();
		const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "3d" });
        sendWelcomeEmail(user.email,user.name);
        res.status(201).json({
			message: "User created successfully",
			user: {
				_id: user._id,
				name: user.name,
				email: user.email,
				username: user.username,
			},
			token,
		});
    } catch (error) {
        console.error("Error in signup controller:", error);
		res.status(500).json({ message: "Server error" });
    }
}
const login = async (req, res) => {
	try {
		const { username, password } = req.body;
		const user = await User.findOne({ username });
		if (!user) {
			return res.status(400).json({ message: "Invalid credentials" });
		}
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).json({ message: "Invalid credentials" });
		}
		const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "3d" });
		res.status(200).json({
            message: "Login successful",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                username: user.username,
            },
            token,
        });
	} catch (error) {
		console.error("Error in login controller:", error);
		res.status(500).json({ message: "Server error" });
	}
};
module.exports = {signup,login};