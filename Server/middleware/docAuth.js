import jwt from "jsonwebtoken";

const authDoc = async (req, res, next) => {
    try {
        // Extract the token from the 'token' header
        const dtoken = req.headers.token;

        if (!dtoken) {
            return res.status(401).json({ success: false, message: "Authorization token missing" });
        }

        // Verify and decode the token
        const decodedToken = jwt.verify(dtoken, process.env.JWT_SECRET);

        // Attach user ID to the request object
        req.user = { id: decodedToken.id };

        next(); // Pass control to the next middleware or controller
    } catch (error) {
        console.error("Error in authUser middleware:", error);
        res.status(403).json({ success: false, message: "Invalid token, authorization denied" });
    }
};

export { authDoc };


