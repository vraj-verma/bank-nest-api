import { Body, Controller, Get, HttpException, HttpStatus, Post, Req, Res } from "@nestjs/common";
import { Request, Response } from 'express';
import { BankService } from "../service/bank.service";
import { Bank, BankValidation } from "../schema/accountSchema";
import { ValidationPipe } from "../pipe/joiValidation.pipe";

@Controller('v1/account')
export class BankController {
    constructor(
        private bankService: BankService
    ) { }

    // Create or Open a fresh account
    @Post()
    async openAccount(
        @Req() req: Request,
        @Res() res: Response,
        @Body(new ValidationPipe(BankValidation.AccountOpenSchema)) userData: Bank
    ) {
        userData.ac_number = Date.now();
        const accountnumber = await this.bankService.openAccount(userData);
        if (!accountnumber) {
            throw new HttpException(
                'Account not created, try again later',
                HttpStatus.BAD_REQUEST
            );
        }
        res.status(200).json({ ...userData });
    }

    // Get Accounts
    @Get()
    async getAccounts(
        @Req() req: Request,
        @Res() res: Response,
    ) {
        const response = await this.bankService.getAccounts();
        if (!response) {
            throw new HttpException(
                'Unable to fetch accounts, try again',
                HttpStatus.BAD_REQUEST
            );
        }
        const totalAccount = await this.bankService.getAccountCount();
        res.status(200).json(
            // {
            //     total: totalAccount,
            //     ...response
            // }
           response
        );

    }
}