import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Course extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true, type: Number })
  price: number;

  @Prop({ required: false })
  image: string; 
}

export const CourseSchema = SchemaFactory.createForClass(Course);
