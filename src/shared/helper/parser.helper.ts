import { Logger } from '@nestjs/common'
import * as xml2js from 'xml2js'


export async function xmlParser (xml:string) {
    const loggerService = new Logger("ControllerHelper")
    return new Promise((resolve, reject) => {
        xml2js.parseString(xml, (err: any, result: unknown) => {
            if (err) {
              loggerService.error('Error parseing xml:', err)
              reject('Error parsing XML')
            } else {
              resolve(result)
            }
        })
    })
}
 
