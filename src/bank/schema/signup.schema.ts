
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


export type signupDocument = AccountSignup & Document;
@Schema()
export class AccountSignup{

    @Prop()
    name:string;

    @Prop()
    email:string;

    @Prop()
    password:string;

    @Prop()
    gender:string;
}

export const SignupSchema = SchemaFactory.createForClass(AccountSignup);