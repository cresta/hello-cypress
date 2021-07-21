describe('load', () => {
  const accountId = 'google';
  it(`load ${accountId}`, () => {
    cy.load(accountId);
  });
});
