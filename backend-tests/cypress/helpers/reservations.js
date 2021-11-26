
const ENDPOINT_GET_RESERV    = 'http://localhost:3000/api/reservations/'
const ENDPOINT_POST_RESERV   = 'http://localhost:3000/api/reservation/new/'
const ENDPOINT_PUT_RESERV    = 'http://localhost:3000/api/reservation/'
const ENDPOINT_DELETE_RESERV = 'http://localhost:3000/api/reservation/'


function createReserv(cy){

    cy.authenticateSession().then((response =>{

        cy.request({

            method: "POST",
            url: ENDPOINT_POST_RESERV,
            headers:{
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
            body:'{"start": "2020-04-01","end": "2049-04-04","client": 2,"room": 1,"bill": 1}'
            

        }).then((response =>{    

           const responseAsString = JSON.stringify(response)
           cy.log(responseAsString)
           
           expect(response.status).to.eq(200)  
           
            
        }))

    }))
}

function deleteAfterGetReserv(cy,body,client,room,bill,start,end){
    
    cy.request({

        method: "GET",
        url: ENDPOINT_GET_RESERV,
        headers:{
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
    }).then((response =>{
         let lastid = response.body[response.body.lenght -1].id

         cy.request({
             method:"Delete",
             url: ENDPOINT_DELETE_RESERV +lastid,
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
function editResv(cy){
    
    cy.authenticateSession().then((response =>{
        cy.request({
            method: "PUT",
            url: ENDPOINT_PUT_RESERV,
            headers:{
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
            body:{ client: 4, room: 4, bill: 4, start: "2021-11-31", end: "2021-12-31"}
        }).then((response =>{    
           const responseAsString = JSON.stringify(response)
           expect(responseAsString).to.have.string(body.body.client.room.bill.start.end)

        }))

    }))
}

module.exports = {
    editResv,
    createReserv,
    deleteAfterGetReserv,
}