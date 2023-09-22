import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"; 
import { HydratedDocument } from "mongoose";


export type UserDocument = HydratedDocument<User>

@Schema({timestamps: true})
export class User {

    @Prop({ type: String, required: true, unique: true })
    user_id: string;

    @Prop()
    name?: string

    @Prop()
    email?: string

    @Prop()
    password?: string
}

export const UserSchema = SchemaFactory.createForClass(User)