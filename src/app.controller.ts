import { Body, Controller, Get, Post } from '@nestjs/common';
import { Logger } from '@nestjs/common'
import { AppService } from './app.service';
import { IntraDto } from './dto/intra.dto';
import { RevDto } from './dto/rev.dto';
import { ApiTags } from '@nestjs/swagger';
import { IntraFI } from './fi/intra.fi';
import { controllerHelper } from './shared/helper/controller.helper';
import { ServiceResponse } from './interface/response.interface';
import { RevFI } from './fi/rev.fi';

@ApiTags('Intrabank')
@Controller({version: '1'})
export class AppController {
    constructor( private readonly appService: AppService  ) {}

    private readonly loggerService = new Logger(AppController.name)

    @Get()
    getHello(): string {
        this.loggerService.log("Just testing this")
        return this.appService.getHello();
    }

    @Post('transfer')
    async postIntraBank(@Body() intraDto: IntraDto): Promise<ServiceResponse> {
        const intraFI = new IntraFI(intraDto)
        const payload = intraFI.soapRequest()
        const response = await this.appService.postTran(payload, process.env.Service_INTRA)
        return await controllerHelper(response, process.env.Service_INTRA)
    }

    @Post('reversal')
    async postReverseIntrabank(@Body() revDto: RevDto): Promise<ServiceResponse> {
        const revFI = new RevFI(revDto)
        const payload = revFI.soapRequest()
        const response = await this.appService.postTran(payload, process.env.Service_REV_INTRA)
        return  await controllerHelper(response, process.env.Service_REV_INTRA)
    }
}
