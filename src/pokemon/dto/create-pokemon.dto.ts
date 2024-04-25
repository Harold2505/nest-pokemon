import { IsInt, IsPositive, IsString, Min, MinLength } from 'class-validator';

export class CreatePokemonDto {
  //isint,ispositiv,min1
  @IsInt()
  @IsPositive()
  @Min(1)
  no: number;
  //isString,MinLenth
  @IsString()
  @MinLength(1)
  name: string;
}
