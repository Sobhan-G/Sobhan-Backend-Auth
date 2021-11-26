
const ENDPOINT_GET_ROOMS = 'http://localhost:3000/api/rooms/'
const ENDPOINT_POST_ROOM = 'http://localhost:3000/api/room/new/'
const ENDPOINT_PUT_ROOM = 'http://localhost:3000/api/room/'
const ENDPOINT_DELETE_ROOM = 'http://localhost:3000/api/room/'



function createRoom(cy){

    cy.authenticateSession().then((response =>{
        
        cy.request({

            method: "POST",
            url: ENDPOINT_POST_ROOM,
            headers:{
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
            body:{features: ["ensuite"], category: "twin", number: "3", floor: "3", available: true, price: "4500"}
            

        }).then((response =>{    
            const responseAsString = JSON.stringify(response)

             expect(response.status).to.eq(200)   

        }))

    }))
}
function editRoom(cy){

    cy.authenticateSession().then((response =>{
        
        cy.request({
            method: "GET",
            url: ENDPOINT_GET_ROOM,
            headers:{
    
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
        }).then((response =>{

            cy.log(response.body [response.body.length -1].id)
            cy.log(response.body.length)

            var Rooms = response.body [response.body.length -1]
            Rooms = '6500'

            cy.request({

                method: "PUT",
                url: ENDPOINT_PUT_ROOMS + ENDPOINT_POST_ROOM.id,
                headers:{
                    'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                    'Content-Type': 'application/json'
                },
                body:Rooms
    
            }).then((response =>{    
    
               const responseAsString = JSON.stringify(response)
               expect(responseAsString).to.have.string(rooms)
    
            }))

        }))
    }))
}

function deleteAfterGetR(cy,features,category,number,floor,available,price,id){
    
    cy.request({

        method: "GET",
        url: ENDPOINT_GET_ROOMS,
        headers:{
  
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
    }).then((response =>{
         let lastid = response.body[response.body.lenght -1].id

         cy.request({
             method:"Delete",
             url: ENDPOINT_DELETE_ROOM +lastid,
             headers:{
  
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'

            },
         }).then((response =>{    
            
           const responseAsString = JSON.stringify(response.body)
           cy.log(responseAssString)
           expect(responseAsString).to.have.string('true')

        }))
        

    }))
}

function getRequestAllRooms(cy,features,category,number,floor,available,price,id){
    
    cy.request({
        method: "GET",
        url: ENDPOINT_GET_ROOMS,
        headers:{
  
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
    }).then((response =>{

       
    }))
}

module.exports = {

    createRoom,
    deleteAfterGetR,
    editRoom,
    getRequestAllRooms,
    
}


    