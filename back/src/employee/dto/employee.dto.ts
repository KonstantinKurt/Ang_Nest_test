import {ApiModelProperty} from '@nestjs/swagger';
import {
    IsString,
    IsNumber,
    IsNotEmpty,
    Length,
} from 'class-validator';

export class EmployeeDTO {
    @ApiModelProperty(
        {
            type: Number,
        },
    )
    @IsNumber()
    @IsNotEmpty()
    readonly salary: number;

    @ApiModelProperty()
    @IsNotEmpty()
    @IsString()
    readonly position: string;

    @ApiModelProperty(
        {
            maxLength: 20,
            minLength: 4,
        },
    )
    @IsString()
    @IsNotEmpty()
    @Length(4, 20)
    readonly firstName: string;

    @ApiModelProperty(
        {
            maxLength: 20,
            minLength: 4,
        },
    )
    @IsString()
    @IsNotEmpty()
    @Length(4, 20)
    readonly lastName: string;

    @ApiModelProperty()
    @IsString()
    @IsNotEmpty()
    readonly info: string;

    @ApiModelProperty()
    @IsString()
    @IsNotEmpty()
    readonly gender: string;

}
