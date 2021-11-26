
const ENDPOINT_GET_BILLS   = 'http://localhost:3000/api/bills'
const ENDPOINT_POST_BILL   = 'http://localhost:3000/api/bill/new'
const ENDPOINT_PUT_BILL    = 'http://localhost:3000/api/bill/'
const ENDPOINT_DELETE_BILL = 'http://localhost:3000/api/bill/'

function createBill(cy){

    cy.authenticateSession().then((response =>{

        cy.request({

            method: "POST",
            url: ENDPOINT_POST_BILL,
            headers:{
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
            body ,value:4500,paid:true

        }).then((response =>{    

           const responseAsString = JSON.stringify(response)
           expect(responseAsString).to.have.string(body.value.paid)

        }))

        getcreateBill(cy,body.value.paid)
    }))
}

function deleteAfterGetB(cy,body,value,paid){
    
    cy.request({

        method: "GET",
        url: ENDPOINT_GET_BILLS,
        headers:{
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
    }).then((response =>{
         let lastid = response.body[response.body.lenght -1].id

         cy.request({
             method:"Delete",
             url: ENDPOINT_DELETE_BILL +lastid,
             headers:{
  
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
         }).then((response =>{    
            
           const responseAsString = JSON.stringify(response.body.value.paid)
           cy.log(responseAssString)
           expect(responseAsString).to.have.string('true')

        }))
        

    }))
}
function editBill(cy){

    cy.authenticateSession().then((response =>{
        
        cy.request({

            method: "GET",
            url: ENDPOINT_GET_BILLS,
            headers:{
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },

        }).then((response =>{

            cy.log(response.body [response.body.length -1].id)
            cy.log(response.body.length)

            var Bill = response.body [response.body.length -1]

            Bill.value = '4500'
            
            cy.request({

                method: "PUT",
                url: ENDPOINT_PUT_BILL + Bill.id,
                headers:{
                    'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                    'Content-Type': 'application/json'
                },
                body:Bill 
    
            }).then((response =>{  

               const responseAsString = JSON.stringify(response)

               
               expect(response.status).to.eq(200)
    
            }))

        }))

    }))
}
module.exports = {
    createBill,
    deleteAfterGetB,
    editBill,
}


