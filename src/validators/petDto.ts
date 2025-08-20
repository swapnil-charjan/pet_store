import {
  IsNotEmpty,
  IsInt,
  Min,
  MinLength,
  IsString,
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
  color!: string;

  @IsNotEmpty()
  imageUrl!: string; // match Prisma schema field name

  @IsString()
  @IsNotEmpty()
  ownerId!: string; // foreign key reference to User
}


