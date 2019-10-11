import {ApiModelProperty} from '@nestjs/swagger';
import {
    IsString,
    IsEmail,
    IsNotEmpty,
    Length,
} from 'class-validator';

export class RegisterDto {
    @ApiModelProperty({
            maxLength: 20,
            minLength: 4,
            type: String,
        },
    )
    @IsString()
    @IsNotEmpty()
    @Length(4, 20)
    readonly login: string;

    @ApiModelProperty({
            maxLength: 20,
            minLength: 4,
            type: String,
        },
    )
    @IsNotEmpty()
    @Length(4, 20)
    readonly password: string;

    @ApiModelProperty()
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;
}
