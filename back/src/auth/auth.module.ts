import {Module, NestModule} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {MongooseModule} from '@nestjs/mongoose';
import {UserSchema} from './schema/user.schema';
import {JwtModule} from '@nestjs/jwt';
import {PassportModule} from '@nestjs/passport';
import {EmployeeSchema} from '../employee/schema/employee.schema';
import {JwtStrategy} from './strategy/jwt.strategy';

@Module({
    imports: [
        MongooseModule.forFeature([
                {
                    name: 'User',
                    schema: UserSchema,
                },
                {
                    name: 'Profile',
                    schema: EmployeeSchema,
                },
            ],
        ),
        JwtModule.register({
            secret: process.env.AUTH_SECRET,
            signOptions: {
                expiresIn: process.env.AUTH_TOKEN_EXPIRES_IN,
            },
        }),
        PassportModule.register({
            defaultStrategy: 'jwt',
        }),
    ],
    providers: [
        AuthService,
        JwtStrategy,
    ],
    controllers: [AuthController],
    exports: [
        JwtStrategy,
        PassportModule,
        JwtModule
    ],

})
export class AuthModule {

}
