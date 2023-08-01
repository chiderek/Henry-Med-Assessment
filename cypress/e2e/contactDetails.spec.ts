import { Appointments } from "../pageObjects/Appointments";
import { ContactDetails } from "../pageObjects/ContactDetails";
import { Shipping } from "../pageObjects/Shipping";
import { States } from "../pageObjects/States";
import { SharedObjects } from "../pageObjects/shared/SharedObjects";

describe("Contact Details Page", () => {
    beforeEach(() => {
        cy.visit("/");
        cy.get(`${States.appointmentSlot}:visible`).first().click();
        cy.get(Appointments.appointmentSlot).first().click();
        cy.get(SharedObjects.continue).click();
    })
    
    it("filling out the form redirects to the shipping information page", () => {
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

    it("should have form validation on all the fields", () => {
        cy.get(SharedObjects.continue).click();

        cy.get(ContactDetails.base).within(() => {
            //Each of the fields should have the class 'error' which marks it as required
            cy.get(ContactDetails.form.firstName).should('have.class', 'error');
            cy.get(ContactDetails.form.lastName).should('have.class', 'error');
            cy.get(ContactDetails.form.email).should('have.class', 'error');
            cy.get(ContactDetails.form.dob).should('have.class', 'error');
            cy.get(ContactDetails.form.phoneNumber).should('have.class', 'error');
            cy.get(ContactDetails.form.sexAssignAtBirth).should('have.class', 'error');
            cy.get(ContactDetails.form.gender).should('have.class', 'error');
        })
    });

    it("phone number should only accept numbers", () => {
        cy.get(ContactDetails.base).within(() => {
            cy.get(ContactDetails.form.phoneNumber).type("asdf");
            cy.get(ContactDetails.form.phoneNumber).should('have.value', "");
            cy.get(ContactDetails.form.phoneNumber).type("5555555555");
            cy.get(ContactDetails.form.phoneNumber).should('have.value', "5555555555");
        })
    })

    it("Date of birth must be a valid date", () => {
        cy.get(ContactDetails.base).within(() => {
            cy.get(ContactDetails.form.dob).type("asdf");
            cy.get(ContactDetails.form.dob).should('have.value', "");
            cy.get(ContactDetails.form.dob).type("13121800");
            cy.get(ContactDetails.form.dob).should('have.class', "error");


        })
    })

    it("email address should only accept valid email addresses", () => {
        //What's currently valid is any text containing `@` with values after the `@`
        cy.get(ContactDetails.base).within(() => {
            cy.get(ContactDetails.form.email).type("notvalidemailaddress");
            cy.get(ContactDetails.form.email).should('have.class', "error");
            cy.get(ContactDetails.form.email).type("validemailaddress@test.com");
            cy.get(ContactDetails.form.email).should('not.have.class', "error");
        })
    })
})