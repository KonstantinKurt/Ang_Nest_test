import {Logger} from '@nestjs/common';
import * as mongoose from 'mongoose';
import * as faker from 'faker';
import * as lodash from 'lodash';

import {EmployeeSchema} from '../employee/schema/employee.schema';

export async function seeder() {
    await mongoose.connect(`mongodb://localhost:${process.env.DB_PORT}/${process.env.DB_NAME}`, {useNewUrlParser: true}, (err) => {
        if (err) {
            Logger.log(err);
        }
    });
    const employees = [];
    const Employee = await mongoose.model('Employee', EmployeeSchema);
    const checkDB = await Employee.find({}).exec();
    if (!checkDB.length) {
        for (let i = 0; i < 15; i++) {
            await employees.push(new Employee({
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                position: faker.name.jobTitle(),
                info: faker.lorem.sentences(),
                gender: lodash.sample(['Male', 'Female']),
                salary: faker.random.number(),
            }).save());
        }
        Promise
            .all(employees)
            .then(() => {
                Logger.log('DB updated');
            })
            .catch(err => {
                Logger.log(err.message);
            });
    } else {
        return;
    }
}
