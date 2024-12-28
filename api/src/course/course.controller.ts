import { Controller, Post, Get, Param, Body, Put, Delete, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CourseService } from './course.service';
import { CreateCourseDto } from 'src/course.dto';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async createCourse(
    @Body() createCourseDto: CreateCourseDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    const imagePath = image ? `/uploads/${image.filename}` : null;
    return this.courseService.createCourse(createCourseDto, imagePath);
  }

  @Get()
  async getCourses() {
    return this.courseService.getCourses();
  }

  @Get(':id')
  async getCourseById(@Param('id') id: string) {
    return this.courseService.getCourseById(id);
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async updateCourse(
    @Param('id') id: string,
    @Body() updateData: Partial<CreateCourseDto>,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const imagePath = file ? `/uploads/${file.filename}` : null;
    return this.courseService.updateCourse(id, updateData, imagePath);
  }

  @Delete(':id')
  async deleteCourse(@Param('id') id: string) {
    return this.courseService.deleteCourse(id);
  }
}
