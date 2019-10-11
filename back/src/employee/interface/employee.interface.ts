import * as mongoose from 'mongoose';

export interface Employee extends mongoose.Document {
    id: string;
    firstName: string;
    lastName: string;
    position: string;
    info: string;
    gender: string;
    salary: number;
}
