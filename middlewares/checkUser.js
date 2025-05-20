const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const authUser = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: decoded.userId };
        next();
    } catch (error) {
        console.error("JWT Error:", error);
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};

const isAdmin = async (req, res, next) => {
	try {
		const user = await User.findById(req.user.id);
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		if (user.type !== "admin") {
			return res.status(403).json({ message: "Access denied: Admins only" });
		}
		next();
	} catch (error) {
		console.error("Error in isAdmin middleware:", error);
		res.status(500).json({ message: "Server error" });
	}
};

module.exports = {authUser,isAdmin};
