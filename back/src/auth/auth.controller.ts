import {
    Body,
    Controller, HttpCode, Logger,
    Post, Put, Req, UseGuards,
} from '@nestjs/common';
import {
    ApiCreatedResponse,
    ApiInternalServerErrorResponse,
    ApiUseTags,
    ApiOperation, ApiBearerAuth, ApiResponse, ApiNotFoundResponse,
} from '@nestjs/swagger';
import {AuthService} from './auth.service';
import {LoginDto} from './dto/login.dto';
import {RegisterDto} from './dto/register.dto';
import {AuthGuard} from '@nestjs/passport';
import {UpdateEmployeeDto} from '../employee/dto/update-employee.dto';
import {UpdateUserDTO} from './dto/update-user.dto';

@ApiUseTags('Auth controller')
@Controller('/')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Post('/login')
    @ApiInternalServerErrorResponse({description: 'Something went wrong!...'})
    @ApiOperation({title: 'Auth user'})
    @ApiResponse({status: 200, description: 'User authorized successfully!'})
    @ApiNotFoundResponse({description: 'User not found!'})
    @HttpCode(200)
    async Login(@Body() data: LoginDto): Promise<object> {
        return  await this.authService.login(data);
    }
    @Post('/register')
    @ApiOperation({title: 'Register user'})
    @ApiCreatedResponse({description: 'User created successfully!'})
    @ApiInternalServerErrorResponse({description: 'Something went wrong!...'})
    @HttpCode(201)
    async create(@Body() userData: RegisterDto): Promise<object> {
        return await this.authService.register(userData);

    }

    @Post('/user')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @ApiInternalServerErrorResponse({description: 'Something went wrong!...'})
    @ApiResponse({status: 200, description: 'User found successfully!'})
    @ApiNotFoundResponse({description: 'User not found!'})
    @ApiOperation({title: 'Get user by token decoded data'})
    @HttpCode(200)
    async getProfileByToken(@Req() req): Promise<object> {
        const token = req.header(`authorization`).split(' ')[1];
        return this.authService.getUserByToken(token);
    }

    @Put('/user')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @ApiInternalServerErrorResponse({description: 'Something went wrong!...'})
    @ApiOperation({title: 'Update user by token decoded data'})
    @ApiResponse({status: 204, description: 'User updated successfully!'})
    @ApiNotFoundResponse({description: 'User not found!'})
    @HttpCode(204)
    async updateProfileByToken(@Body() userData: UpdateUserDTO, @Req() req): Promise<object> {
        const token = req.header(`authorization`).split(' ')[1];
        return this.authService.updateUserByToken(userData, token);
    }
}
