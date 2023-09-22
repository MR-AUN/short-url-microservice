import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/shared/base.repository';
import { User, UserDocument } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
@Injectable()
export class UsersRepository extends BaseRepository<UserDocument, User> {
    constructor(@InjectModel(User.name) model: Model<UserDocument>) {
        super(model)
    }
}