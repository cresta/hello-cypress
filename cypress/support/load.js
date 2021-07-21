Cypress.Commands.add('load', (accountId) => {
  cy.echo('load: ', accountId);

  cy.fixture('load.json').then(load => {
    const { url, contains } = load[accountId];
    cy.visit(url, {timeout: 60000});
    cy.contains(contains, {timeout: 60000});
  });
});
