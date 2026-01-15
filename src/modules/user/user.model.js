import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: false},
    password: {type: String, required: true, select: false},
    role: {type: String, enum: ['user', 'admin'], default: 'user'},
    status: {type: String, enum: ['active', 'inactive'], default: 'active'},
}, {timestamps: true});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;