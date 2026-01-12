import CategoryModel from "./categories.model.js";

const addCategoryService = async(data)=>{
    // Logic to add a new category in the database
    const result = await CategoryModel.create(data);
    return result;
}

const getAllCategoriesService = async()=>{
    const result = await CategoryModel.find({}).lean();
    return result;
}

export const categoriesServices = {
    addCategoryService,
    getAllCategoriesService
};