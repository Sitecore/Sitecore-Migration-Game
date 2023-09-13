describe('Outcome Page', () => {
  it('XM Cloud should be the only product', () => {
    cy.visit('/');
    cy.get(':nth-child(1) > .chakra-stack > .chakra-button').click();
    cy.get('.css-1izj7gt > :nth-child(4)').click();
    cy.get(':nth-child(9) > .chakra-button').click();
    cy.get('.chakra-container > :nth-child(3) > .chakra-button').click();
    cy.get('[value="xm"]').click();
    cy.get('[value="nosecuredpages"]').click();
    cy.get('[value="search-no"]').click();
    cy.get('[value="scs"]').click();
    cy.get('.css-18udl74').click();
    cy.get('[value="vuejs"]').click();
    cy.get('.css-gmuwbf > .chakra-button').click();
    cy.get('[value="yesexperienceedge"]').click();
    cy.wait(5000);
    cy.get('.chakra-modal__close-btn').click();
    cy.get('ul#required-products').should('exist').find('li').should('have.length', 1);
    cy.get('ul#required-products li').eq(0).should('contain', 'XM Cloud');
  });
});



