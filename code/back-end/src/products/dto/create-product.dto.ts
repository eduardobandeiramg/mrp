import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { Line } from "src/Line/entities/line.entity";

export class CreateProductDTO {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    code: string;

    @ApiProperty()
    @IsNotEmpty()
    role: Line

}
