import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from './user.schema';
import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<UserDocument>) {}

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<UserDocument> {
    const user = await this.userModel.findById(id).exec();
    
    if (!user) {
      throw new HttpException("User is not found", HttpStatus.NOT_FOUND);
    }
    return user;    
  }

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const createdUser = new this.userModel(createUserDto);

    return createdUser.save();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<any> {    
    const user = await this.userModel.findById(id).exec();
  
    if (!user) {
      throw new HttpException("User is not found", HttpStatus.NOT_FOUND);
    }
    
    return await this.userModel.updateOne({ _id: id }, updateUserDto).exec();
  }

  async delete(id: string): Promise<any> {
    const user = await this.userModel.findById(id).exec();
    
    if (!user) {
      throw new HttpException("User is not found", HttpStatus.NOT_FOUND);
    }

    return await this.userModel.deleteOne().exec();
  }
}