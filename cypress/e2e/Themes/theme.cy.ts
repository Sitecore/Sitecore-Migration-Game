const backgroundImageFileName = '182bc6d196aa465cbf9b614ff2883eb4';

describe('Theme switcher', () => {
  it('Choosing Fantasy theme should change background and buttons', () => {
    cy.visit('/');
    cy.get('.css-uvp8xs > :nth-child(2) > .chakra-stack > .chakra-button').click();
    cy.get('div#backgroundImage').should('have.css', 'background-image').and('include', backgroundImageFileName);
    cy.get('[value="Bard"]').should('have.css', 'background-image').and('include', '/fantasy/button/');
  });
});
