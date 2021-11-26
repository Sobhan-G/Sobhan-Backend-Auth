import * as clientHelpers from '../helpers/clienthelpers'
import * as billHelpers from '../helpers/bills'
import * as reservHelpers from '../helpers/reservations'
import * as roomHelpers from '../helpers/rooms'


describe('Testsuite-1', function(){
  
      it('create a random client', function(){

      clientHelpers.createRandomClientPayload(cy)

      }) 
         
      it('change a clients info', function(){

       clientHelpers.changeClientinfo(cy)

      }) 
      it('create a reservation', function(){

        reservHelpers.createReserv(cy)

      })
        
      it('create a room', function(){

        roomHelpers.createRoom(cy)

      })
        
      it('edit a bill', function(){

        billHelpers.editBill(cy)

      })
   
         
      it('create a client and delete it', function(){

       clientHelpers.deleteRequestAfterGet(cy)

      })
   
})