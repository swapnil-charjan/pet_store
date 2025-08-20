import {
  IsNotEmpty,
  IsInt,
  Min,
  MinLength,
} from 'class-validator';

export class PetDto {
  @IsNotEmpty()
  @MinLength(2)
  name!: string;

  @IsInt()
  @Min(0)
  age!: number;

  @IsNotEmpty()
  type!: string;

  @IsNotEmpty()
  breed!: string;

  @IsNotEmpty()
  @MinLength(2)
  owner!: string;

  @IsNotEmpty()
  color!: string;

  @IsNotEmpty()
  image!: string;
}

