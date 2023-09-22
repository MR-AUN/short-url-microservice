import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/shared/base.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Shorter, ShorterDocument } from './schema/shorter.schema';
@Injectable()
export class ShorterRepository extends BaseRepository<ShorterDocument, Shorter> {
    constructor(@InjectModel(Shorter.name) model: Model<ShorterDocument>) {
        super(model)
    }
}