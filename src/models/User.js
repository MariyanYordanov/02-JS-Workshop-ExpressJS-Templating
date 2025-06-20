import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [10, "Email must be at least 10 characters long."],
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        // valid pass must contain only English letters and digits
        validate: {
            validator: function (v) {
                return /^[a-zA-Z0-9]+$/.test(v);
            },
            message: 'Password must contain only English letters and digits'
        },
        maxLength: [6, "Password cannot exceed 6 characters."],
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// virtual prop for rePassword and check password
userSchema.virtual("rePassword")
    .set(function (value) {
        if(this.password !== value) {
            throw new Error("Passwords do not match");
        }
    });

// validate user email for english letters and numbers
userSchema.path("email").validate((email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}, "Invalid email format");

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        try {
            this.password = await bcrypt.hash(this.password, 10);
        } catch (error) {
            return next(error);
        }
    }
    next();
});

const User = mongoose.model("User", userSchema);
export default User;