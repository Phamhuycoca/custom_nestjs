import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/common/base/Service/servcie';
import { User, UserDocument } from '../entities/user.entity';

@Injectable()
export class UserRepository extends BaseRepository<UserDocument> {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<UserDocument>,
  ) {
    super(userModel);
  }
  async countDocuments(filter) {
    return this.userModel.countDocuments(filter);
  }
}
