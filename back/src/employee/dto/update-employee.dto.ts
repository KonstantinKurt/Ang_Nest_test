import {ApiModelProperty} from '@nestjs/swagger';
import {
    IsString,
    IsEmail,
    IsNotEmpty,
    Length,
} from 'class-validator';

export class UpdateEmployeeDto {
    @ApiModelProperty()
    @IsString()
    @IsNotEmpty()
    readonly id: string;

    @ApiModelProperty()
    @IsNotEmpty()
    readonly properties: object;
}
