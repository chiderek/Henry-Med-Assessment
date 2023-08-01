import { Appointments } from "../pageObjects/Appointments";
import { ContactDetails } from "../pageObjects/ContactDetails";
import { States } from "../pageObjects/States";
import { SharedObjects } from "../pageObjects/shared/SharedObjects";

describe("Appointments Page", () => {
    beforeEach(() => {
        cy.visit("/");
        cy.get(`${States.appointmentSlot}:visible`).first().click();
    })

    it("clicking on an appointment slot redirects to the contacts details page", () => {
        cy.get(Appointments.appointmentSlot).first().click();

        cy.get(Appointments.providerInfo.image).should('be.visible');
        cy.get(SharedObjects.continue).should('be.visible');
        cy.get(SharedObjects.continue).click();
        cy.get(ContactDetails.base).within(() => {
            cy.get(ContactDetails.form.header).should('be.visible');
        });
    })

    it.skip("clicking on an appointment reserves that timeslot for 30 minutes", () => {
        /**
         * TODO: Depending on how the time slots are reserved, could be done by reseting
         * the page and revisiting to check that the timeslot is no longer available
         * 
         * If the timer is cookie based, could delete the cookie to also check that appointment
         * becomes available again. Really depends on how it's tracked and timeslot is reserved
         * Not enough information/time to complete this section without interrupting customers 
         * trying to book appointments.
         */
    })

    it.skip("a reserved appointment time is reserved and released after 30 minutes if all forms aren't filed out", () => {
        //see comment above
    })
})