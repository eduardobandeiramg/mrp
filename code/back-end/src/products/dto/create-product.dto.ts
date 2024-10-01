import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateProductDTO {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    code: string;

    @ApiProperty({ description: 'ID da linha de produção', example: 'UUID' }) // Ajuste o tipo e forneça um exemplo
    @IsString()
    @IsNotEmpty()
    lineId: string;

}
