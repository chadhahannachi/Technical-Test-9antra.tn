import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCourseDto } from 'src/course.dto';
import { Course } from 'src/course.entity';

@Injectable()
export class CourseService {
  constructor(@InjectModel(Course.name) private courseModel: Model<Course>) {}

  async createCourse(createCourseDto: CreateCourseDto, imagePath: string): Promise<Course> {
    const newCourse = new this.courseModel({ ...createCourseDto, image: imagePath });
    return newCourse.save();
  }

  async getCourses(): Promise<Course[]> {
    return this.courseModel.find().exec();
  }

  async getCourseById(id: string): Promise<Course> {
    const course = await this.courseModel.findById(id).exec();
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    return course;
  }

  async updateCourse(id: string, updateData: Partial<CreateCourseDto>, imagePath?: string): Promise<Course> {
    const updatedCourse = await this.courseModel.findByIdAndUpdate(
      id,
      { ...updateData, ...(imagePath && { image: imagePath }) },
      { new: true },
    ).exec();
    if (!updatedCourse) {
      throw new NotFoundException('Course not found');
    }
    return updatedCourse;
  }

  async deleteCourse(id: string): Promise<void> {
    const result = await this.courseModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Course not found');
    }
  }
}
