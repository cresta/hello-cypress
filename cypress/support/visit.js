/**
 * The only function is to echo the page to console before visiting
 */
Cypress.Commands.overwrite('visit', (originalFn, subject, text, options = {}) => {
  cy.echo('visit:', subject);
  originalFn(subject, text, options);
});
