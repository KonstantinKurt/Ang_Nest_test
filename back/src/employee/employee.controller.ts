import {
    Controller,
    HttpCode,
    Post,
    UseGuards,
    Body,
    Get,
    Put,
    Delete,
    Param,
    Query,
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiInternalServerErrorResponse,
    ApiOperation,
    ApiUseTags,
    ApiNotFoundResponse,
    ApiResponse,
    ApiImplicitQuery,
} from '@nestjs/swagger';
import {EmployeeService} from './employee.service';
import {AuthGuard} from '@nestjs/passport';
import {EmployeeDTO} from './dto/employee.dto';
import {UpdateEmployeeDto} from './dto/update-employee.dto';

@ApiUseTags('Employee controller')
@Controller('/employee')
export class EmployeeController {
    constructor(
        private readonly employeeService: EmployeeService,
    ) {
    }

    @Post('')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @ApiInternalServerErrorResponse({description: 'Something went wrong!...'})
    @ApiOperation({title: 'Create new employee'})
    @ApiResponse({status: 201, description: 'Employee created successfully!'})
    @HttpCode(201)
    async create(@Body() employeeData: EmployeeDTO): Promise<object> {
        return this.employeeService.create(employeeData);
    }

    @Get(':pagination')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @ApiInternalServerErrorResponse({description: 'Something went wrong!...'})
    @ApiOperation({title: 'Get all employees'})
    @ApiResponse({status: 200, description: 'All employees from DB'})
    @HttpCode(200)
    async getEmployees(@Param('pagination') pagination: number): Promise<object> {
        return this.employeeService.getAll(pagination);
    }

    @Get()
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @ApiImplicitQuery({
        name: 'Query params',
        description: 'List of params for searching employee',
        required: true,
        type: String,
    })
    @ApiInternalServerErrorResponse({description: 'Something went wrong!...'})
    @ApiOperation({title: 'Get employees by query params '})
    @ApiResponse({status: 200, description: 'Employees satisfying query params'})
    @HttpCode(200)
    async getEmployeesByQuery(@Query() query: object): Promise<object> {
        return this.employeeService.getAllByQuery(query);
    }

    @Put('')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @ApiInternalServerErrorResponse({description: 'Something went wrong!...'})
    @ApiOperation({title: 'Update employee'})
    @ApiResponse({status: 200, description: 'Employee updated successfully!'})
    @ApiNotFoundResponse({description: 'Employee not found!'})
    @HttpCode(200)
    async update(@Body() employeeData: UpdateEmployeeDto): Promise<object> {
        return this.employeeService.update(employeeData);
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @ApiOperation({title: 'Delete user'})
    @ApiInternalServerErrorResponse({description: 'Something went wrong!...'})
    @ApiResponse({status: 200, description: 'Employee deleted successfully!'})
    @ApiNotFoundResponse({description: 'Employee not found!'})
    @HttpCode(200)
    async deleteUser(@Param('id') id: string) {
        return await this.employeeService.delete(id);
    }
}
