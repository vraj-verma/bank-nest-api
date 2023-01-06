import { AuthController } from './bank/controller/auth/auth.controller';
import { AccountSignup, SignupSchema } from './bank/schema/signup.schema';
import { Module } from '@nestjs/common';
import { BankController } from './bank/controller/bank.controller';
import { BankService } from './bank/service/bank.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Bank, BankSchema } from './bank/schema/accountSchema';
import { AuthService } from './bank/service/auth/auth.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://oyevraj:omsairam786@cluster0.yxcordx.mongodb.net/?retryWrites=true&w=majority'),
    MongooseModule.forFeature([
      {
        name: Bank.name, schema:BankSchema
      },
      {
        name:AccountSignup.name, schema:SignupSchema
      }
    ]
    )
  ],
  controllers: [
    BankController,
    AuthController
  ],
  providers: [
    BankService,
    AuthService,
  ],
})
export class AppModule { }
