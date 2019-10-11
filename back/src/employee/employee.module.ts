import {Module} from '@nestjs/common';
import {EmployeeController} from './employee.controller';
import {MongooseModule} from '@nestjs/mongoose';
import {EmployeeSchema} from './schema/employee.schema';
import {EmployeeService} from './employee.service';

@Module({
    imports: [
        MongooseModule.forFeature([
                {
                    name: 'Employee',
                    schema: EmployeeSchema,
                },
            ],
        ),
    ],
    providers: [
        EmployeeService,
    ],
    controllers: [
        EmployeeController,
    ],
})
export class EmployeeModule {
}
