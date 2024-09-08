import { ApiProperty } from "@nestjs/swagger";

export class CreateMaterialDto {
    @ApiProperty()
    code: string;
    
    @ApiProperty()
    description: string;
}
