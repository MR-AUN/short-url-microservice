import { Transform } from "class-transformer";
import { IsString, IsNotEmpty, Length, IsEmail } from "class-validator";

export class SigninAuthDto {
  
    @IsEmail()
    email: string;

    @Transform(({ value }) => typeof value === "string" ? value?.trim() : value)
    @IsString()
    @IsNotEmpty()
    @Length(3)
    password: string;
}
