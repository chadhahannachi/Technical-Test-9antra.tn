import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateCourseDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  price: number;
}
