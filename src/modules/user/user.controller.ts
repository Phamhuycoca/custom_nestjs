import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpStatus, HttpException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { any } from 'joi';
import { PaginationDto } from 'src/common/constant/constants';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  async CreateUser(@Body() dto:CreateUserDto){
    try {
      const createdUser = await this.userService.createPost(dto);
      return createdUser;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: 'Internal Server Error',
            message: 'Something went wrong during user creation.',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
  @Get()
  getAllPost(@Query() { page, limit, start }: PaginationDto) {
    return this.userService.getAllPosts(page, limit, start);
  }
 
}
