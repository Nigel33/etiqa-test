import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersController } from 'src/Users/users.controller';
import { AppService } from './app.service';
import { UsersService } from 'src/Users/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/Users/user.schema';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]) // add the User model to forFeature()
  ],
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService],
})
export class AppModule {}
