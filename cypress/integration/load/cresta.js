describe('load', () => {
  const accountId = 'cresta';
  it(`load ${accountId}`, () => {
    cy.load(accountId);
  });
});
