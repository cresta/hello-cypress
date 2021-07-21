describe('load', () => {
  const accountId = 'homepoint';
  it(`load ${accountId}`, () => {
    cy.load(accountId);
    cy.get('form.login-form input#normal_login_username', {timeout: 60000});
  });
});
