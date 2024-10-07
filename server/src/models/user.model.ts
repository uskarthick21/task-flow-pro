import mongoose from "mongoose";
import { compareValue, hashValue } from "../utils/bcrypt";

export interface UserDocument extends mongoose.Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword (val: string): Promise<boolean>;
    omitPassword(): Pick<UserDocument, "_id" | "firstName" | "lastName" | "email">;
}

const userSchema = new mongoose.Schema<UserDocument> (
    {
        firstName: {type: String, required: true},
        lastName: {type: String,  required:true},
        email: {type: String, unique: true, required: true},
        password: {type: String, required: true}
    }
);

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) {
        return next();
    }

    this.password = await hashValue(this.password);
    next();
});

userSchema.methods.comparePassword = async function (val: string) {
    return compareValue(val, this.password);
}

userSchema.methods.omitPassword = function () {
    // toObject() is the bulitin method from moongoose that will conver our user document into a plain javascript object
    const user = this.toObject();
    delete user.password;
    return user;
}

const UserModel = mongoose.model<UserDocument>("User", userSchema);
export default UserModel;