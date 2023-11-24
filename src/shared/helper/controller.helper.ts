import { Logger, NotFoundException } from "@nestjs/common"
import { FIxml } from "./fixml.helper"
import {xmlParser} from "./parser.helper"

export interface IntegratorRes {
    statusCode: number
    data: string
}

export async function controllerHelper(res: IntegratorRes, service: string){
    const loggerService = new Logger("ControllerHelper")

    if (res.statusCode != 200) {
        throw new NotFoundException('Finacle call failed')
    }

    loggerService.log("=== Finacle call was successful. Trying to parse XML response fields... ===")

    let data = res.data
        [0]['dlwmin:executeServiceResponse']
        [0]['executeServiceReturn']
        [0]['_']
    
    const responseJSON: any = await xmlParser(data)

    // get response header
    const dataHeader = responseJSON.FIXML
        .Header[0]
        .ResponseHeader[0]
        .HostTransaction[0]
        .Status[0]

    loggerService.log(dataHeader)

    if (dataHeader.toUpperCase() == 'FAILURE') {
        let dataBody = ''
        
        if (typeof responseJSON.FIXML.Body[0].Error[0].FIBusinessException === 'undefined') {
            dataBody = responseJSON.FIXML
                .Body[0]
                .Error[0]
                .FISystemException[0]
                .ErrorDetail[0].ErrorDesc[0]
            loggerService.log(dataBody)
        } else {
            dataBody = responseJSON.FIXML
                .Body[0]
                .Error[0]
                .FIBusinessException[0]
                .ErrorDetail[0].ErrorDesc[0]
            loggerService.log(dataBody)
        }

        return {"status":dataHeader, "message": dataBody}
    }
    else {
        const dataBody = FIxml(responseJSON, service)
        loggerService.log(dataBody)

        return {"status":dataHeader, "message": dataBody}

    }

}


    






