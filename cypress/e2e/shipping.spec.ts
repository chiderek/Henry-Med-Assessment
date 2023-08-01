import { add } from "cypress/types/lodash";
import { Appointments } from "../pageObjects/Appointments";
import { ContactDetails } from "../pageObjects/ContactDetails";
import { Shipping } from "../pageObjects/Shipping";
import { States } from "../pageObjects/States";
import { SharedObjects } from "../pageObjects/shared/SharedObjects";
import { Payment } from "../pageObjects/Payment";

describe("Shipping Page", () => {
    beforeEach(() => {
        cy.visit("/");
        cy.get(`${States.appointmentSlot}:visible`).first().click();
        cy.get(Appointments.appointmentSlot).first().click();
        cy.get(SharedObjects.continue).click();
        const formDetails = {
            firstName: "Bilbo",
            lastName: "Baggins",
            email: "bilbo.baggins@shire.com",
            dob: "11112011",
            phone: "5555555555",
            sexAssignAtBirth: "Male",
            gender: "He/Him"
        };

        cy.get(ContactDetails.base).within(() => {
            cy.get(ContactDetails.form.firstName).type(formDetails.firstName);
            cy.get(ContactDetails.form.lastName).type(formDetails.lastName);
            cy.get(ContactDetails.form.email).type(formDetails.email);
            cy.get(ContactDetails.form.dob).type(formDetails.dob);
            cy.get(ContactDetails.form.phoneNumber).type(formDetails.phone);
            cy.get(ContactDetails.form.sexAssignAtBirth).select(formDetails.sexAssignAtBirth);
            cy.get(ContactDetails.form.gender).select(formDetails.gender);
        });

        cy.get(SharedObjects.continue).click();
        cy.get(Shipping.base).within(() => {
            cy.get(Shipping.form.header).should("be.visible");
        })
    })
    
    it("should have validation on the form fields", () => {
        cy.get(SharedObjects.continue).click();

        cy.get(Shipping.base).within(() => {
            cy.get(Shipping.form.addressLine1).should("have.class", "error");
            cy.get(Shipping.form.addressLine2).should("not.have.class", "error");
            cy.get(Shipping.form.city).should("have.class", "error");
            cy.get(Shipping.form.state).should("not.have.class", "error");
            cy.get(Shipping.form.zip).should("have.class", "error");
        });
    })

    it("filling out the form fields with same billing and shipping redirects to payment details page", () => {
        const addressInfo = {
            addressLine1: "123 Main St",
            city: "Fake",
            zip: "00000"
        }

        cy.get(Shipping.base).within(() => {
            cy.get(Shipping.form.addressLine1).type(addressInfo.addressLine1);
            cy.get(Shipping.form.city).type(addressInfo.city);
            cy.get(Shipping.form.zip).type(addressInfo.zip);
        });

        cy.get(SharedObjects.continue).click();

        //todo: verify the payment details page
        cy.get(Payment.base).within(() => {
            cy.get(Payment.form.header).should("be.visible").and('have.text', "Payment Method");
        })
    })

    it("unchecking the same shipping and billing address redirects to billing address form", () => {
        const addressInfo = {
            addressLine1: "123 Main St",
            city: "Fake",
            zip: "00000"
        }

        cy.get(Shipping.base).within(() => {
            cy.get(Shipping.form.addressLine1).type(addressInfo.addressLine1);
            cy.get(Shipping.form.city).type(addressInfo.city);
            cy.get(Shipping.form.zip).type(addressInfo.zip);
            cy.get(Shipping.form.shippingBillingSame).uncheck();
        });

        cy.get(SharedObjects.continue).click();

        cy.get(Shipping.base).within(() => {
            cy.get(Shipping.form.header).should('have.text', "Billing")
        })
    })

    it("billing address form fields should have validation", () => {
        const addressInfo = {
            addressLine1: "123 Main St",
            city: "Fake",
            zip: "00000"
        }

        cy.get(Shipping.base).within(() => {
            cy.get(Shipping.form.addressLine1).type(addressInfo.addressLine1);
            cy.get(Shipping.form.city).type(addressInfo.city);
            cy.get(Shipping.form.zip).type(addressInfo.zip);
            cy.get(Shipping.form.shippingBillingSame).uncheck();
        });

        cy.get(SharedObjects.continue).click();

        cy.get(Shipping.base).within(() => {
            cy.get(Shipping.form.header).should('have.text', "Billing")
        });
        
        cy.get(SharedObjects.continue).click();

        cy.get(Shipping.base).within(() => {
            cy.get(Shipping.form.addressLine1).should("have.class", "error");
            cy.get(Shipping.form.addressLine2).should("not.have.class", "error");
            cy.get(Shipping.form.city).should("have.class", "error");
            cy.get(Shipping.form.state).should("have.class", "error");
            cy.get(Shipping.form.zip).should("have.class", "error");
        });
    })

    it("bililng address redirects to payment details page when correctly filled out", () => {
        const addressInfo = {
            addressLine1: "123 Main St",
            city: "Fake",
            zip: "00000"
        }

        cy.get(Shipping.base).within(() => {
            cy.get(Shipping.form.addressLine1).type(addressInfo.addressLine1);
            cy.get(Shipping.form.city).type(addressInfo.city);
            cy.get(Shipping.form.zip).type(addressInfo.zip);
            cy.get(Shipping.form.shippingBillingSame).uncheck();
        });

        cy.get(SharedObjects.continue).click();

        cy.get(Shipping.base).within(() => {
            cy.get(Shipping.form.header).should('have.text', "Billing")
        });
        
        cy.get(Shipping.base).within(() => {
            cy.get(Shipping.form.addressLine1).type(addressInfo.addressLine1);
            cy.get(Shipping.form.city).type(addressInfo.city);
            cy.get(Shipping.form.zip).type(addressInfo.zip);
            cy.get(Shipping.form.shippingBillingSame).uncheck();
        });

        cy.get(SharedObjects.continue).click();

        cy.get(Payment.base).within(() => {
            cy.get(Payment.form.header).should('be.visible').and('have.text', "Payment Method")
        })
    })
})