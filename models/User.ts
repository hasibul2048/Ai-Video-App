import mongoose, { Schema, model, models } from 'mongoose';
import bcrypt from "bcryptjs";

export interface IUser {
    email: string;
    password: string;
    _id?: mongoose.Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}          //type diclaration for user it's a TypeScript interface

const userSchema = new Schema <IUser>({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
}, {
    timestamps: true
});


// Hash password before saving to the database this is a pre-save hook

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

const User = models.User || model<IUser>('User', userSchema); //if model already exists, use it, otherwise create a new one

export default User; //export the User model