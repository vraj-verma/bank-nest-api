import { Module } from '@nestjs/common';
import { BankController } from './bank/controller/bank.controller';
import { BankService } from './bank/service/bank.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Bank, BankSchema } from './bank/schema/accountSchema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://oyevraj:omsairam786@cluster0.yxcordx.mongodb.net/?retryWrites=true&w=majority'),
    MongooseModule.forFeature([
      {
        name: Bank.name, schema:BankSchema
      }
    ]
    )
  ],
  controllers: [BankController],
  providers: [BankService],
})
export class AppModule { }
