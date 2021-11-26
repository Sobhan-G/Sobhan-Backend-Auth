const faker = require('faker')

const ENDPOINT_GET_CLIENTS = 'http://localhost:3000/api/clients/'
const ENDPOINT_POST_CLIENT = 'http://localhost:3000/api/client/new/'

const ENDPOINT_GET_CLIENT = 'http://localhost:3000/api/client/'
const ENDPOINT_PUT_CLIENT = 'http://localhost:3000/api/client/'

function createRandomClientPayload(){

    const fakeName = faker.name.firstName()
    const fakeEmail = faker.internet.email()
    const fakePhone = faker.phone.phoneNumber()

    const payload = {
        "name":fakeName,
        "email":fakeEmail,
        "telephone":fakePhone
    }

    return payload
}

function getRequestAllClientsWithAssertion(cy,name, email, telephone){
    
    cy.request({
        method: "GET",
        url: ENDPOINT_GET_CLIENTS,
        headers:{
  
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
    }).then((response =>{

        const responseAsString = JSON.stringify(response)
        expect(responseAsString).to.have.string(name)
        expect(responseAsString).to.have.string(email)
        expect(responseAsString).to.have.string(telephone)
        
        cy.log(response.body [response.body.length -1].id)
        cy.log(response.body.length)

    }))
}

function getAllClientsRequest(cy){

    cy.authenticateSession().then((response =>{

        cy.request({
            method: "GET",
            url: ENDPOINT_GET_CLIENTS,
            headers:{

                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
        }).then((response =>{

            const responseAsString = JSON.stringify(response)
            cy.log(responseAsString)
           
        }))
    }))
}

function deleteRequestAfterGet(cy,name, email, telephone){
    
    cy.request({

        method: "GET",
        url: ENDPOINT_GET_CLIENTS,
        headers:{
  
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
    }).then((response =>{
        
         cy.log(JSON.stringify(response))

         let lastid= response.body[response.body.length -1].id
         cy.log(lastid)

         cy.request({
             method:"DELETE",
             url: ENDPOINT_GET_CLIENT +lastid,
             headers:{
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'

            },
         }).then((response =>{    
            
           const responseAsString = JSON.stringify(response.body)
           cy.log(responseAsString)
           expect(responseAsString).to.have.string('true')

        }))
        

    }))
}

function createClientRequest(cy){

    cy.authenticateSession().then((response =>{

        let fakeClientPayload = createRandomClientPayload() 
        
        cy.request({

            method: "POST",
            url: ENDPOINT_POST_CLIENT,
            headers:{
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
            body:fakeClientPayload 

        }).then((response =>{    

           const responseAsString = JSON.stringify(response)
           expect(responseAsString).to.have.string(fakeClientPayload.name)

        }))
        getRequestAllClientsWithAssertion(cy,fakeClientPayload.name, fakeClientPayload.email, fakeClientPayload.telephone)
    }))
}

function createClientRequestandDelete(cy){

    cy.authenticateSession().then((response =>{

        let fakeClientPayload = createRandomClientPayload() 

        cy.request({

            method: "POST",
            url: ENDPOINT_POST_CLIENT,
            headers:{
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
            body:fakeClientPayload 

        }).then((response =>{    
             cy.log('clientcreated')   
           const responseAsString = JSON.stringify(response)
           expect(responseAsString).to.have.string(fakeClientPayload.name)

        }))

        deleteRequestAfterGet(cy)
    }))
}

function changeClientinfo(cy){ 

    cy.authenticateSession().then((response =>{

        cy.request({
            method: "GET",
            url: ENDPOINT_GET_CLIENTS,
            headers:{
    
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
        }).then((response =>{

            cy.log(response.body [response.body.length -1].id)
            cy.log(response.body.length)

            var client = response.body [response.body.length -1]
            client.telephone = '0700700707'

            cy.request({

                method: "PUT",
                url: ENDPOINT_PUT_CLIENT + client.id,
                headers:{
                    'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                    'Content-Type': 'application/json'
                },
                body:client
    
            }).then((response =>{    
    
               const responseAsString = JSON.stringify(response)
               expect(responseAsString).to.have.string(client.telephone)
    
            }))

        }))

        
    }))
}


module.exports = {
    createRandomClientPayload, 
    createClientRequest, 
    getAllClientsRequest,
    deleteRequestAfterGet,
    createClientRequestandDelete,
    changeClientinfo,
    
}