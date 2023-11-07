describe('Outcome Page', () => {
  it('XM Cloud should be the only product', () => {
    cy.visit('/');
    cy.get("#start").click();
    cy.get(':nth-child(1) > .chakra-stack > .chakra-button').click();
    cy.get('.css-1izj7gt > :nth-child(4)').click();
    cy.get(':nth-child(9) > .chakra-button').click();
    cy.get('.chakra-container > :nth-child(3) > .chakra-button').click();
    cy.get('[value="xm"]').click();
    cy.get('[value="nosecuredpages"]').click();
    cy.get('[value="search-no"]').click();
    cy.get('[value="scs"]').click();
    cy.get('[value="vuejs"]').click();
    cy.get('.css-gmuwbf > .chakra-button').click();
    cy.get('[value="yesexperienceedge"]').click();
    cy.wait(5000);
    cy.get('.chakra-modal__close-btn').click();
    cy.get('#required-products').should('exist').children().should('have.length', 1);
    cy.get('#required-products').children().should('contain', 'XM Cloud');
  });

  it('multiple required products', () => {
    cy.visit('/');
    cy.get("#start").click();
    cy.get(':nth-child(1) > .chakra-stack > .chakra-button').click();
    cy.get(':nth-child(11) > .chakra-button').click();
    cy.get('.css-1izj7gt > :nth-child(2)').click();
    cy.get('.chakra-container > :nth-child(3) > .chakra-button').click();
    cy.get('[value="xp"]').click();
    cy.get('[value="sessionpersonalization"]').click();
    cy.get('[value="identityresolution"]').click();
    cy.get('[value="customxdbfacets"]').click();
    cy.get('[value="exm"]').click();
    cy.get('[value="forms"]').click();
    cy.get('[value="customanalyticsdashboards"]').click();
    cy.get('[value="externaldatasystems"]').click();
    cy.get('[value="historicalpersonalization"]').click();
    cy.get('[value="patterncards"]').click();
    cy.get('[value="customrules"]').click();
    cy.get('[value="marketingautomation"]').click();
    cy.get('[value="captureadditionalevents"]').click();
    cy.get('.css-gmuwbf > .chakra-button').click();
    cy.get('[value="securityloginrequired"]').click();
    cy.get('[value="historicalpersonalize90"]').click();
    cy.get('[value="search-index"]').click();
    cy.get('[value="unicorn"]').click();
    cy.get('[value="netcore"]').click();
    cy.get('.css-gmuwbf > .chakra-button').click();
    cy.get('[value="noexperienceedge"]').click();
    cy.wait(5000);
    cy.get('.chakra-modal__close-btn').click();
    cy.get('#required-products').should('exist').children().should('have.length', 5);
    cy.get('#required-products').children().should('contain', 'XM Cloud');
    cy.get('#required-products').children().should('contain', 'Search');
    cy.get('#required-products').children().should('contain', 'Personalize');
    cy.get('#required-products').children().should('contain', 'CDP');
    cy.get('#required-products').children().should('contain', 'Send');
  });
});