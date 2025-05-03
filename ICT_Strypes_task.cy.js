describe('Automation of the five testcases', () => {
    it('TC001 Country Selection Updates Indicators', () => {
    cy.visit('https://app.fabric.microsoft.com/view?r=eyJrIjoiYWMwNmI1ZmMtZGYwYS00ODljLWE4NzgtNzM1OGRkYWQzMWMxIiwidCI6IjZiZTgxZjIwLWFlY2MtNGQyZC1hMTM0LWJmZWJlOTAxODE4NCIsImMiOjl9');
    cy.wait(5000); //wait 5 sec because the page is loading too slowly on my end
    cy.get('text[role="option"]').contains('Germany').click({ force: true }); // clcik on germany
    cy.wait(1000);
    cy.get('div[role="gridcell"]').contains('Germany').should('be.visible'); // verify that only germany is shown in the table
  
    });

    it('TC002 Pie Chart Highlights Top 8 Inflation', () => {
    cy.visit('https://app.fabric.microsoft.com/view?r=eyJrIjoiYWMwNmI1ZmMtZGYwYS00ODljLWE4NzgtNzM1OGRkYWQzMWMxIiwidCI6IjZiZTgxZjIwLWFlY2MtNGQyZC1hMTM0LWJmZWJlOTAxODE4NCIsImMiOjl9');
    cy.wait(5000); //wait 5 sec because the page is loading too slowly on my end
    cy.get('div[role="columnheader"]').contains('Inflation').click({ force: true }); // click on the column inflation to sort table by Inflation
    cy.wait(1000);
    // check if the 8 table countries are with hishest inflation
    cy.get('div[role="gridcell"][aria-colindex="4"]') 
  .then($cells => {
    const top8 = [...$cells].slice(0, 8).map(cell => cell.textContent.trim());
    cy.wrap(top8).as('topInflationValues');
  });

  cy.get('@topInflationValues').then(top8 => {
    cy.get('path.slice[role="option"]').each($el => {
      const label = $el.attr('aria-label');
      const isTopCountry = top8.some(value => label.includes(value));
      expect(isTopCountry).to.be.true;
    });
      });
      
    });

    it('TC003 Export/Import Bar Chart Correctness', () => {
        cy.visit('https://app.fabric.microsoft.com/view?r=eyJrIjoiYWMwNmI1ZmMtZGYwYS00ODljLWE4NzgtNzM1OGRkYWQzMWMxIiwidCI6IjZiZTgxZjIwLWFlY2MtNGQyZC1hMTM0LWJmZWJlOTAxODE4NCIsImMiOjl9');
        cy.wait(5000); //wait 5 sec because the page is loading too slowly on my end
        cy.get('rect.bar[role="option"]').first() .click({ force: true }); // Clcicking on first country in import dashboard
        cy.wait(1000); 
        cy.get('div[role="gridcell"][aria-colindex="6"]').should('contain.text', '101'); //  Match value from chart in the table


          });
          
    it('TC004 Cross-filter Interaction', () => {
        cy.visit('https://app.fabric.microsoft.com/view?r=eyJrIjoiYWMwNmI1ZmMtZGYwYS00ODljLWE4NzgtNzM1OGRkYWQzMWMxIiwidCI6IjZiZTgxZjIwLWFlY2MtNGQyZC1hMTM0LWJmZWJlOTAxODE4NCIsImMiOjl9');
        cy.wait(5000); //wait 5 sec because the page is loading too slowly on my end
        cy.get('path.slice[role="option"]').first().click({ force: true }); // Click a Pie Chart Slice - Nigeria
        cy.wait(1000); // Wait for Table Update 
        cy.get('div[role="gridcell"]').contains('Nigeria').should('be.visible');// verify Nigeria is visible

        // verify only Nigeria is shown
        cy.get('div[role="gridcell"][aria-colindex="2"]') 
        .each($el => {
        expect($el.text()).to.include('Nigeria');  
        });

          });

    it('TC005 Table Sorting', () => {
        cy.visit('https://app.fabric.microsoft.com/view?r=eyJrIjoiYWMwNmI1ZmMtZGYwYS00ODljLWE4NzgtNzM1OGRkYWQzMWMxIiwidCI6IjZiZTgxZjIwLWFlY2MtNGQyZC1hMTM0LWJmZWJlOTAxODE4NCIsImMiOjl9');
        cy.wait(5000); //wait 5 sec because the page is loading too slowly on my end
        cy.get('div[role="columnheader"]').contains('GDP').click({ force: true }); // click on the column GDP to sort table by GDP
        cy.wait(1000);
      
          });

  });