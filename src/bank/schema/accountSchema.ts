
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import { Document } from "mongoose";
import * as joi from 'joi';

export type BankDocument = Bank & Document;

@Schema()
export class Bank {

    @Prop()
    ac_name: string;

    @Prop()
    ac_balance: number = 0;

    @Prop()
    ac_number: number;

}

export const BankSchema = SchemaFactory.createForClass(Bank)

export class BankValidation {
    static AccountOpenSchema = joi.object({
        ac_name: joi.string().min(2).max(30).required(),
        ac_balance: joi.number().default(0),
        ac_number: joi.number().allow('', null)
    });

} 