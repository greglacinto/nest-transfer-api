import { IntraReq } from "src/interface/intra.interface";

export class IntraFI {
    requestBody: IntraReq
    requestTime: string = (new Date()).toISOString()

    constructor(payload: IntraReq){
        this.requestBody = payload
    }

    soapRequest() {
        const xml = `
            <XferTrnAddRequest>
            <XferTrnAddRq>
            <XferTrnHdr>
            <TrnType>T</TrnType>
            <TrnSubType>CI</TrnSubType>
            </XferTrnHdr>
            <XferTrnDetail>
            <PartTrnRec>
            <AcctId>
            <AcctId>${this.requestBody.drAcct}</AcctId>
            </AcctId>
            <CreditDebitFlg>D</CreditDebitFlg>
            <TrnAmt>
            <amountValue>${this.requestBody.amount}</amountValue>
            <currencyCode>NGN</currencyCode>
            </TrnAmt>
            <TrnParticulars>${this.requestBody.narration}</TrnParticulars>
            <ValueDt>${this.requestTime}</ValueDt>
            </PartTrnRec>
            <PartTrnRec>
            <AcctId>
            <AcctId>${this.requestBody.crAcct}</AcctId>
            </AcctId>
            <CreditDebitFlg>C</CreditDebitFlg>
            <TrnAmt>
            <amountValue>${this.requestBody.amount}</amountValue>
            <currencyCode>NGN</currencyCode>
            </TrnAmt>
            <TrnParticulars>${this.requestBody.narration}</TrnParticulars>
            <ValueDt>${this.requestTime}</ValueDt>
            </PartTrnRec>
            </XferTrnDetail>
            </XferTrnAddRq>
            </XferTrnAddRequest>
        `;
        return xml
    }
}