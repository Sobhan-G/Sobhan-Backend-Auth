import * as clientHelpers from '../helpers/clienthelpers.js'

describe('testing auth', function(){

    it('Create a new client', function(){

       clientHelpers.createClientRequest(cy)

    })

    it('Get all clients', function(){

        clientHelpers.getAllClientsRequest(cy)
        
     })
     
     it('create a client and delete it', function(){

      clientHelpers.createClientRequestandDelete(cy)
      
   })

   
})