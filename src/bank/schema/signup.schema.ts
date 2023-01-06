
import { Prop, SchemaFactory } from "@nestjs/mongoose";

export type signupDocument = AccountSignup & Document;

export class AccountSignup{
    @Prop()
    aadhaar_card:number;

    @Prop()
    name:string;

    @Prop()
    pan_card?:string;

    @Prop()
    dob?:Date;

    @Prop()
    address:string;
}

export const SignupSchema = SchemaFactory.createForClass(AccountSignup);