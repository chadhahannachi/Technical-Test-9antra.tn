import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CourseModule } from './course/course.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    // ConfigModule.forRoot({
    //   envFilePath: '.env',
    //   isGlobal: true,
    // }),
    MongooseModule.forRoot('mongodb+srv://chadhahannachi675:SnJY5tsXhVs6KT6S@cluster0.esber.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { dbName: 'E-learning' }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads', 
      serveStaticOptions: {
        index: false, 
      },
    }),
    CourseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}