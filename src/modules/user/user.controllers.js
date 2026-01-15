import ApiResponse from "../../utils/ApiResponse.js";
import ErrorHandler from "../../utils/ErrorHandler.js";
import { getCache, removeCache, setCache } from "../../utils/redisCache.helper.js";
import { userServices } from "./user.services.js";
import bcrypt from 'bcrypt';

const getAllUsersControllers = async (req, res, next) => {
    try {

        // http://localhost:3000/api/v1/users?page=1&limit=2&searchTerm=rakib

        const { page, limit, searchTerm } = req.query;

        // quer params to number
        const pageNum = parseInt(page) || 1;
        const limitNum = parseInt(limit) || 20;

        const result = await userServices.getAllUserServices(pageNum, limitNum, searchTerm);

        // if user not found
        if (!result || result.users.length === 0) {
            return next(new ErrorHandler("No users found", 404));
        }

        return res.status(200).json(
            new ApiResponse(200, "Users fetched successfully", result)
        );
    } catch (error) {
        next(error);
    }
}

const createUserControllers = async (req, res, next) => {
    try {
        
        const { password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await userServices.createUserServices({ ...req.body, password: hashedPassword });
        // await removeCache('users_data');

        if (!user) {
            return next(new ErrorHandler("User creation failed", 400));
        }

        return res.status(201).json(
            new ApiResponse(201, "User created successfully", { 
                id: user._id, 
                name: user.name, 
                email: user.email 
            })
        );

    } catch (error) {
        next(error); 
    }
}

export const userControllers = {
    getAllUsersControllers,
    createUserControllers
};