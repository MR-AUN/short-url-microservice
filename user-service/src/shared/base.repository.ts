import { AnyKeys, ClientSession, Document, FilterQuery, Model, PipelineStage, PopulateOptions, QueryOptions, SaveOptions, UpdateQuery, UpdateWithAggregationPipeline } from "mongoose";
import { CreatedModel, RemovedModel, UpdatedModel } from "./entity";


export abstract class BaseRepository<T extends Document, K>{
    constructor(private readonly model: Model<T>) {}

  async create(doc: K, saveOptions?: SaveOptions): Promise<T
  > {
    const createdEntity = new this.model(doc);
    const savedResult = await createdEntity.save(saveOptions);

    return savedResult
  }

  async find(filter: FilterQuery<T>, options?: QueryOptions): Promise<T[]> {
    return await this.model.find(filter, null, options);
  }

  async findOne(filter: FilterQuery<T>, options?: QueryOptions): Promise<T> {
    return await this.model.findOne(filter, null, options);
  }

  async findById(id: string): Promise<T | null> {
    return await this.model.findById(id);
  }

  async findAll(): Promise<T[]> {
    return await this.model.find();
  }

  async findOneAndDelete(filterQuery: FilterQuery<T>, session?: ClientSession): Promise<T> {
    return this.model.findOneAndDelete(filterQuery).session(session).exec();
}

  async updateOne(
    filter: FilterQuery<T>,
    updated: UpdateWithAggregationPipeline | UpdateQuery<T>,
    options?: QueryOptions,
  ): Promise<UpdatedModel> {
    return await this.model.updateOne(filter, updated, options);
  }

  async updateMany(
    filter: FilterQuery<T>,
    updated: UpdateWithAggregationPipeline | UpdateQuery<T>,
    options?: QueryOptions,
  ): Promise<UpdatedModel> {
    return await this.model.updateMany(filter, updated, options);
  }

}