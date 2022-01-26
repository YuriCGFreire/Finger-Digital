import {IsEmail, IsNotEmpty, IsString, MinLength} from "class-validator"

export class SignInDTO {
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;
     
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    readonly password: string;
}
