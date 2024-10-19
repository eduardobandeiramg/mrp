import { IsDateString, IsOptional, IsUUID } from 'class-validator';

export class CreateProductionDto {
  @IsUUID()
  @IsOptional()
  productId?: string;

  @IsUUID()
  @IsOptional()
  productionPlanId?: string;

  @IsDateString()
  @IsOptional()
  dateInit?: Date;

  @IsDateString()
  @IsOptional()
  dateEnd?: Date;
}
