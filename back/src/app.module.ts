import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {ConfigService, ConfigModule} from 'nestjs-config';
import { AuthModule } from './auth/auth.module';
import { EmployeeModule } from './employee/employee.module';

import * as path from 'path';

@Module({
    imports: [
        ConfigModule.load(path.resolve(__dirname, 'config', '**/!(*.d).{ts,js}')),
        MongooseModule.forRoot(`mongodb://localhost:${process.env.DB_PORT}/${process.env.DB_NAME}`, ConfigService.get('mongo.options')),
        AuthModule,
        EmployeeModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}
