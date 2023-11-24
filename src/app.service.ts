import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import * as https from 'https'
import { wrapper } from './shared/soap/wrapper';
import axios, { AxiosError } from 'axios';
import { IntegratorRes } from './shared/helper/controller.helper';
import { xmlParser } from './shared/helper/parser.helper';

@Injectable()
export class AppService {
  private readonly loggerService = new Logger(AppService.name)
  
  getHello(): string {
    return 'Hello World!';
  }

  async postTran(payload: string, type: string) {

    const url = process.env.INTEGRATOR_URL
    const request = {
      requestBody: payload,
      serviceName: type,
      channelId: process.env.CHNID_POST
    }

    const soapRequest = wrapper(request)
    this.loggerService.log(soapRequest)

    const config = {
        headers: {
          'Content-Type': 'text/xml',
          'Content-Length': Buffer.byteLength(soapRequest),
          'SOAPAction': ''
    },
        httpsAgent: new https.Agent({
            rejectUnauthorized: false
        })
    }
    const response: any = await axios
        .post<IntegratorRes>( url, soapRequest, config )
        .catch((err: AxiosError) => {
            this.loggerService.log(err.stack)
            throw new NotFoundException(err.message);
        })
    const result: any = await xmlParser(response.data)     
    const responseXML: string = result['soapenv:Envelope']['soapenv:Body']

    return {
        statusCode: 200,
        data: responseXML
    } 
  }
}
