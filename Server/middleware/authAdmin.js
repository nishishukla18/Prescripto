import jwt from "jsonwebtoken";

const authAdmin = async (req, res, next) => {
    try {
        const { atoken } = req.headers;

        if (!atoken) {
            return res.status(401).json({ success: false, message: "Authorization token missing" });
        }

        const decodedToken = jwt.verify(atoken, process.env.JWT_SECRET);

        if (decodedToken.email !== process.env.ADMIN_EMAIL) {
            return res.status(403).json({ success: false, message: "Unauthorized access" });
        }

        next();
    } catch (error) {
        console.error("Error in authAdmin middleware:", error);
        res.status(403).json({ success: false, message: "Invalid token, authorization denied" });
    }
};

export { authAdmin };