import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ShorterDocument = HydratedDocument<Shorter>

@Schema({ timestamps: true })
export class Shorter {
    @Prop({ type: String, required: true, unique: true })
    short_id: string;

    @Prop({ required: true })
    long_url: string

    @Prop({ required: true})
    shorter_url: string

    @Prop({ type: Number })
    view_count: number

    @Prop({required: true})
    user_id: string
}

export const ShorterSchema = SchemaFactory.createForClass(Shorter).index({ shorter_url: 1}, {unique: true})