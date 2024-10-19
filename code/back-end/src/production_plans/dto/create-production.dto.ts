import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsUUID } from 'class-validator';

export class CreateProductionDto {
  @ApiProperty({ example: 'UUID do produto', description: 'ID do produto' })
  @IsUUID()
  productId: string;

  @ApiProperty({
    example: 'UUID do plano de produção',
    description: 'ID do plano de produção',
  })
  @IsUUID()
  productionPlanId: string;

  @ApiProperty({
    example: '2024-10-19',
    description: 'Data de início da produção',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  dateInit?: string;

  @ApiProperty({
    example: '2024-10-24',
    description: 'Data de término da produção',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  dateEnd?: string;
}
