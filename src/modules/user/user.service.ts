import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { isValidObjectId } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';


@Injectable()
export class UserService{
    constructor(private readonly userRepository: UserRepository){

    }
    async getAllPosts(page: number, limit: number, start: string) {
        try{
          const count = await this.userRepository.countDocuments({});
          const count_page = (count / limit).toFixed();
          const results = await this.userRepository.getByCondition(
            {
              _id: {
                $gt: isValidObjectId(start) ? start : '000000000000000000000000',
              },
            },
            null,
            {
              sort: {
                _id: 1,
              },
              skip: (page - 1) * limit,
              limit: Number(limit),
            },
          );
          return { count_page, results };
        }catch(error){
          throw new HttpException(
            {
              status: HttpStatus.BAD_REQUEST,
              error: 'Custom Bad Request',
              message: error.message,
            },
            HttpStatus.BAD_REQUEST,
          );
        }
    }
    async createPost(user: CreateUserDto) {
      try{
        return await this.userRepository.create(user);
      }catch(error){
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'Custom Bad Request',
            message: error.message,
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
}
