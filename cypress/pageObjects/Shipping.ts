export class Shipping {
    static base = "[id='shipping-step']";
    static form = {
        header: "h3",
        addressLine1: "input[name='line1']",
        addressLine2: "input[name='line2']",
        city: "input[name='city']",
        state: "input[name='state']",
        zip: "input[name='zip']",
        shippingBillingSame: "input[name='shipping-is-billing']"
    }
}