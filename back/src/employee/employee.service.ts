import {HttpException, Injectable, Logger, NotFoundException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Employee} from './interface/employee.interface';
import {EmployeeDTO} from './dto/employee.dto';
import {UpdateEmployeeDto} from './dto/update-employee.dto';

@Injectable()
export class EmployeeService {
    constructor(
        @InjectModel('Employee') private readonly employeeModel: Model<Employee>,
    ) {}
    async create(employeeData: EmployeeDTO) {
        try {
            Logger.log(employeeData);
            const newEmployee = await new this.employeeModel(employeeData);
            return newEmployee.save();
        } catch (error) {
            throw new HttpException({
                error,
            }, 500);
        }
    }

    async getAll(pagination: number) {
        try {
           const skip = pagination - +process.env.PAGINATION_STEP;
           return this.employeeModel.find({})
               .skip(+skip)
               .limit(+process.env.PAGINATION_STEP)
               .exec();
        } catch (error) {
            throw new HttpException({
                error,
            }, 500);
        }
    }

    async update(updateData: UpdateEmployeeDto) {
        try {
            Logger.log(updateData.properties);
            const result = await this.employeeModel.updateOne({_id: updateData.id}, updateData.properties).exec();
            if (result.nModified === 1) {
                return this.employeeModel.findOne({_id: updateData.id}).exec();
            } else {
                throw new NotFoundException(404);
            }
        } catch (error) {
            throw new HttpException({
                error,
            }, 500);
        }
    }

    async delete(id: string) {
        try {
            const result = this.employeeModel.deleteOne({_id: id}).exec();
            return result;
        } catch (error) {
            throw new HttpException({
                error,
            }, 500);
        }
    }

    async getAllByQuery(query: any) {
        try {
            Logger.log(query);
            const pagination = query.pagination;
            const skip = pagination - +process.env.PAGINATION_STEP;
            delete query.pagination;
            return this.employeeModel.find({})
                .where(query)
                .skip(+skip)
                .limit(+process.env.PAGINATION_STEP)
                .exec();
        } catch (error) {
            throw new HttpException({
                error,
            }, 500);
        }
    }

}
