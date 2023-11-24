import { NotFoundException } from "@nestjs/common"

export function FIxml(data: any, service: string){

    if (service == process.env.SERVICE_INTRA) {
        return data.FIXML
            .Body[0]
            .XferTrnAddResponse[0]
            .XferTrnAddRs[0]
            .TrnIdentifier[0]
    }

    if (service == process.env.SERVICE_REV_INTRA) {
        return data.FIXML
            .Body[0]
            .XferTrnRevResponse[0]
            .XferTrnRevRs[0]
            .RevTrnIdRec[0]
    }

    throw new NotFoundException('No Handler for response xml in FIXML HELPER');



}