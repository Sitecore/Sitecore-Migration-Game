import { EmailForm } from "./EmailForm";

describe('<EmailForm />', () => {
  
  it('when data is valid data is submitted to endpoint & display thank you message', () => {
    cy.intercept(process.env.NEXT_PUBLIC_EMAIL_FORM_ENDPOINT as string, { statusCode: 200 }).as("emailFormSubmit")
    cy.mount(<EmailForm />);
    cy.get('input[name="first_name"]').type('FirstName');
    cy.get('input[name="last_name"]').type('LastName');
    cy.get('input[name="email"]').type('email@mailinator.com');
    cy.get('#country').select('United States');
    cy.get('#state').select('Alabama');
    cy.get('.chakra-checkbox__control').click();
    cy.get('button[type="submit"]').click();
    cy.get('@emailFormSubmit.all').should('have.length', 1);
    cy.get('#success-message').should('be.visible')
  });  

  it('state select shows for United States, Canada, & Australia', () => {
    cy.mount(<EmailForm />);
    cy.get('#country').select('United States');
    cy.get('#state').select('Alabama');
    cy.get('#country').select('Canada');
    cy.get('#state').select('Quebec');
    cy.get('#country').select('Australia');
    cy.get('#state').select('Queensland');
    cy.get('#country').select('Antarctica');
    cy.get('#state').should('not.exist');
  });
});
