import {ApiModelProperty} from '@nestjs/swagger';
import {
    IsString,
    IsEmail,
    IsNotEmpty,
    Length,
} from 'class-validator';

export class UpdateUserDTO {
    @ApiModelProperty(
        {
            maxLength: 20,
            minLength: 4,
        },
    )
    @IsString()
    login: string;

    @ApiModelProperty(
        {
            maxLength: 20,
            minLength: 4,
        },
    )
    password: string;

    @ApiModelProperty()
    @IsEmail()
    email: string;
}
