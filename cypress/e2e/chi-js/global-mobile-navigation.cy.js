describe('Global Sidenav', () => {
  before(() => {
    cy.visit('tests/lumen/js/global-mobile-navigation.html');
  });

  beforeEach(() => {
    cy.get('[data-cy="mobile-nav"]')
      .find('ul.chi-sidenav__list')
      .as('mainList');
  });

  describe('Test expand/collapse functionality', () => {
    it('check that clicking on the toggle button collapses the sidenav', () => {
      cy.get('#mobile-nav-trigger')
        .click();
      cy.get('[data-cy="mobile-nav"]')
        .should('have.class', '-collapsed');
    });

    it('check that sidenav expands on hover', () => {
      cy.get('@mainList')
        .trigger('mouseenter');
      cy.get('[data-cy="mobile-nav"]')
        .should('have.class', '-expanded');
    });

    it('check that clicking on the toggle button collapses the sidenav', () => {
      cy.get('#mobile-nav-trigger')
        .click();
      cy.get('[data-cy="mobile-nav"]')
        .should('have.class', '-collapsed');
    });

    it('check that clicking on the toggle button again expands the sidenav', () => {
      cy.get('#mobile-nav-trigger')
        .click();
      cy.get('[data-cy="mobile-nav"]')
        .should('have.class', '-expanded');
    });
  });

  describe('Test Global Sidenav items behaviour', () => {
    it('check that clicking on item activates it', () => {
      cy.get('@mainList')
        .find('> li.chi-sidenav__item:first-child chi-link')
        .as('firstLevelFirstItem');
      cy.get('@firstLevelFirstItem')
        .click()
      cy.get('@firstLevelFirstItem')
        .should('have.class', '-active');
    });

    it('check that clicking on the accordion items expands its content', () => {
      cy.get('@mainList')
        .find('> li.chi-sidenav__item')
      cy.get('.chi-accordion__item').as('accordionItem').find('.chi-accordion__trigger').click({ multiple: true });
      cy.get('@accordionItem')
        .should('have.class', '-expanded')
        .find('.chi-accordion__content')
        .should('have.css', 'display', 'block');
    });
  });

  describe('Test Global Sidenav on small viewport', () => {
    it('check that sidenav does not expand when viewport is small', () => {
      cy.viewport(1000, 800);
      cy.get('#mobile-nav-trigger')
        .click();
      cy.get('[data-cy="mobile-nav"]')
        .should('have.class', '-collapsed');
    });
  });

  describe('Test Global Sidenav dispose method', () => {
    it('Trigger collapse sidenav', () => {
      cy.get('#mobile-nav-trigger')
        .click();
    });

    it('Click to run dispose method', () => {
      cy.get('#dispose-mobile-navigation-button')
        .click();
    });

    it('Check that sidenav does not open on trigger expand sidenav', () => {
      cy.get('#mobile-nav-trigger')
        .click();
      cy.get('[data-cy="mobile-nav"]')
        .should('have.class', '-collapsed');
    });
  });
});
