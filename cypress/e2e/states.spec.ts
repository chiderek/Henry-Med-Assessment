import { States } from "../pageObjects/States";

describe('States Page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should show only supported states have buttons with `Other`', () => {
    const expectedStates = [
      "Arizona",
      "California",
      "Colorado",
      "Florida",
      "Georgia",
      "Illinois",
      "Maryland",
      "New Hampshire",
      "Texas",
      "Utah",
      "Virginia",
      "Washington",
      "Other"
    ];
    const hiddenStates = ["Arizona"];
    
    cy.get(States.appointmentSlot).should('have.length', expectedStates.length);
    cy.get(States.appointmentSlot).each((el) => {
      //element text should exist in the array
      const text = el.text();
      expect(expectedStates.indexOf(text)).not.equal(-1);
    });
    //Arizona is currently hidden
    for (let hidden of hiddenStates) {
      cy.get(`#state-${hidden.toLowerCase()}-button`).should('be.hidden');
    }
  });

  it.only('Other should redirect to a form to connect with a licensed provider', () => {
    cy.get("#state-other-button").click();
    //Wait for the submit button to be visible
    cy.origin("https://ft4aaz62fi7.typeform.com", () => {
      cy.contains("button", "OK").should('be.visible');
      cy.url().should("eq",
        "https://ft4aaz62fi7.typeform.com/to/KK72Q2GE?typeform-source=onboard.henrymeds.com#treatment=weightloss");
    })
  })
})