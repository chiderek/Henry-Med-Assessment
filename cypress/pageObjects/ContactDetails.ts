export class ContactDetails {
    static base = "form[id='contact-step']";
    static form = {
        header: "h3",
        firstName: "input[name='first_name']",
        lastName: "input[name='last_name']",
        email: "input[name='email']",
        dob: "input[name='dob']",
        phoneNumber: "input[name='phone']",
        sexAssignAtBirth: "select[name='sex']",
        gender: "select[name='gender']"
    };
}