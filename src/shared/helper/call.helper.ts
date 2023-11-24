import axios from 'axios'

class FinacleCall {
  
  async serverCall (payload: string, serviceName: string) {
    
    const url = process.env.INTEGRATOR_URL
              
    if (!url) return new Error('Integrator URL is undefined')
    const controller = new AbortController()
    try {
      const request = {
        xml: payload,
        serviceName: serviceName
      }
      const response = await axios.post(url, request)
      
      if (response.data.statusCode === 200){
        console.log("===== Finacle call was successful. Trying to parse XML response fields...")
        try {
          console.log(response.data)
          const responseXML = 
              response.data.data
                    [0]['dlwmin:executeServiceResponse']
                    [0]['executeServiceReturn']
                    [0]['_']
          
          return responseXML
        } catch (error: any) {
          console.error('Error:', error);
          throw new Error(error)
        }
      }
    } catch (error: any) {
      // console.error(error)
      throw new Error(error)
    } finally {
      // cancel the request
      controller.abort()
    }
  }
}

export default new FinacleCall().serverCall