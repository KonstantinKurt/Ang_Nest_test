import * as mongoose from 'mongoose';

export interface User extends mongoose.Document {
    id: string;
    login: string;
    password: string;
    email: string;
}
