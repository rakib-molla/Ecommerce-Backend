import bcrypt from 'bcrypt';
import UserModel from "./user.model.js";
import { generateToken } from '../../utils/generateToken.js';

const getAllUserServices = async (page = 1, limit = 20, searchTerm = "") => {
    
    const skip = (page - 1) * limit;

    // search query
    let query = {};
    if (searchTerm) {
        query = {
            $or: [
                { name: { $regex: searchTerm, $options: "i" } }, // 'i' means case-insensitive upper and lowercase ignore
                { email: { $regex: searchTerm, $options: "i" } }
            ]
        };
    }

    const users = await UserModel.find(query)
        .sort({ createdAt: -1 }) // new user show first
        .skip(skip)
        .limit(limit)
        .lean(); // performance increase read-only query

    const total = await UserModel.countDocuments(query);

    return {
        users,
        meta: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)
        }
    };
};

const createUserServices = async (data) => {
    const result = await UserModel.create(data);
    return result;
}

// Function-er parameter theke curly braces {} soriye din
const loginUserServices = async (email, password) => { 
    // 1. User find 
    const user = await UserModel.findOne({ email }).select('+password'); 
    
    if (!user) {
        throw new Error('Invalid email or password');
    }

    // 2. Password match 
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
        throw new Error('Invalid email or password');
    }

    // 3. Data return
    return {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id)
    };
};

export const userServices = {
    getAllUserServices,
    createUserServices,
    loginUserServices
};