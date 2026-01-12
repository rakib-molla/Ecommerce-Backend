import UserModel from "./user.model.js";

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
    // Logic to create a new user in the database
    const result = await UserModel.create(data);
    return result;
}


export const userServices = {
    getAllUserServices,
    createUserServices
};