import SubCategoryModel from "./subCategories.model.js";

const getAllSubCategoriesService = async()=>{
    const result = await SubCategoryModel.find({}).lean().populate('parentCategory', 'name');
    return result;
}

const addSubCategoryService = async(data)=>{
    // Logic to add a new sub-category in the database
    const result = await SubCategoryModel.create(data);
    return result;
}

export const subCategoriesServices = {
    getAllSubCategoriesService,
    addSubCategoryService
};