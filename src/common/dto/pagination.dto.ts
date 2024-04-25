import { IsNumber, IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsPositive()
  @IsNumber()
  @Min(1)
  limit?: number; //? este para que typescript sepa que son opcionales
  @IsOptional()
  @IsNumber()
  @IsPositive()
  offset?: number; //? este para que typescript sepa que son opcionales
  //jjjj
}
