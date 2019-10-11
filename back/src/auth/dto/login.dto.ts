import {ApiModelProperty} from '@nestjs/swagger';
import {
    IsString,
    IsNotEmpty,
} from 'class-validator';

export class LoginDto {
    @ApiModelProperty(
        {
            maxLength: 20,
            minLength: 4,
        },
    )
    @IsString()
    @IsNotEmpty()
    readonly login: string;

    @ApiModelProperty(
        {
            maxLength: 20,
            minLength: 4,
        },
    )
    @IsNotEmpty()
    @IsString()
    readonly password: string;
}
