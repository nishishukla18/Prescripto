import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        // Replace with your MongoDB URI
        const MONGODB_URI = process.env.MONGODB_URI ;

        // Connect to MongoDB
        await mongoose.connect(MONGODB_URI);

        console.log('Database Connected');
    } catch (error) {
        console.error('Database Connection Failed:', error.message);
        process.exit(1); // Stop the server if the database connection fails
    }
};

export default connectDB;
