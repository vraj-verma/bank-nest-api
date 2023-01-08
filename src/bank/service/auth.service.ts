// import { Signup } from 'src/bank/schema/signup.schema';
import { signupDocument, AccountSignup } from '../schema/signup.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Signup } from '../model/signup';
import { Signin } from '../model/signin';
import { AuthUser } from '../model/authUser';
// import {AccountSignup} from '../../schema/accountSchema'


@Injectable()
export class AuthService {
    constructor(
        @InjectModel(AccountSignup.name) private auth: Model<signupDocument>
    ) { }

    // Create a new account or signup account
    async signupAccount(SignupData: Signup) {
        const response = await this.auth.create(SignupData);
        return response ? response._id : 0;
    }

    async getUserByEmail(email: string): Promise<AuthUser> {
        const filter = {email}
        const response = await this.auth.find(filter);
        return response ? response[0] : null;
    }
}