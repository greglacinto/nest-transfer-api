import { IntraReq } from "src/interface/intra.interface";
import { RevRequest } from "src/interface/rev.interface";

export class RevFI {
    requestBody: RevRequest

    constructor(payload: RevRequest){
        this.requestBody = payload
    }

    soapRequest() {
        const xml = `
            <XferTrnRevRequest>
            <XferTrnRevRq>
            <TrnId>${this.requestBody.tranId}</TrnId>
            <TrnDt>${this.requestBody.tranDt}</TrnDt>
            <TualraChrgRevFlg>N</TualraChrgRevFlg>
            <WaiveDDCnclChrgFlg>N</WaiveDDCnclChrgFlg>
            </XferTrnRevRq>
            </XferTrnRevRequest>
        `;
        return xml
    }
}