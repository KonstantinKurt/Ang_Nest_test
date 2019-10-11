import * as mongoose from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';
import * as bcrypt from 'bcrypt';

export const UserSchema = new mongoose.Schema({
    login: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
}, {versionKey: false});
UserSchema.plugin(uniqueValidator);

UserSchema.pre('save', function(next)  {
    this.password = bcrypt.hashSync(this.password, +process.env.USER_PASSWORD_SALT);
    next();
});


