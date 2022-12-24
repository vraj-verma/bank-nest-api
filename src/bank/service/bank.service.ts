import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Bank, BankDocument } from '../schema/accountSchema';
import { Model } from 'mongoose';

@Injectable()
export class BankService {
    constructor(
        @InjectModel(Bank.name) private bank: Model<BankDocument>
    ) { }

    // Create or open a fresh account
    async openAccount(userData: any): Promise<number> {
        const response = await this.bank.create(userData);
        return response ? response._id : 0;
    }

    // Get accounts
    async getAccounts(): Promise<Bank[]> {
        const response = await this.bank.find({
            __v:0
        });
        return response ? response : null;
    }

    // Get total account count
    async getAccountCount(): Promise<number> {
        const response = await this.bank.count();
        return response ? response : 0;
    }
}
