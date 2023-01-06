// import { Signup } from 'src/bank/schema/signup.schema';
import { signupDocument, AccountSignup } from './../../schema/signup.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// import {AccountSignup} from '../../schema/accountSchema'


@Injectable()
export class AuthService {
    constructor(
        @InjectModel(AccountSignup.name) private auth: Model<signupDocument>
    ) { }

    // Create a new account or signup account
    async signupAccount(SignupData: AccountSignup) {
        const response = await this.auth.create( SignupData );
        return response ? response._id : 0;
    }
}