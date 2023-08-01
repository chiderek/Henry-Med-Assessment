## Test Cases

### States
1. Only support states are displayed in the button
    * [California, Colorado, Florida, Georgia, Illinois, Maryland, New Hampshire, Texas, Utah, Virginia, Washington, Other]
2. Other redirects to form that getting connected with a licensed provider `https://ft4aaz62fi7.typeform.com/to/KK72Q2GE?typeform-source=onboard.henrymeds.com#treatment=weightloss`

### Appointment Times `api/appointment`
1. Reservations are in 15 minute time slots (returned by the API)
2. Available times are displayed according to local timezone (Not implemented)
3. Appointment times cannot be 24 hours from now (Not implemented)
4. Clicking on appointment continues to page with provider information and timeslot
5. Clicking continue on the redirects to the contacts details page
6. Appointment times are reserved upon clicking for 30 minutes (Not implemented)

#### Questions and comments
1. More testing on the API side should be done on this, the UI is just displaying information received from the API
2. Need more information on how the timeslots are reserved upon clicking to be able to write a test

### Contact Details
1. Form validation works as expected. All fields are required
2. Phone number input only allows numbers
3. Date of birthday must be a valid date of birth (13 as the month should not work)
4. A valid email address must be provided

#### Questions and comments
1. For `Date of Birth`, other than the 12 months in the calendar, what are the min and max years allowed?
2. Does this also do calculations on leap years?

### Shipping
1. State field is unchangable
2. All fields are validated except `Address Line 2`
3. Billing and shipping address are not the same redirects to form for billing address
4. Billing address fields are all required

## General Thoughts
* Initially assumpation was the page was a regular single SPA, but it behaves by hiding/showing certain sections. Became a small hurdle when creating the page object locators
* While thinking about and looking at the network tab, the appointment reserving isn't using a POST request of some kind to let the server know (unless I missed it). Leads me to think that it's UI controlled, but that also doesn't make sense when another customer in a different state is viewing the same page. The API is supposed to know, so I just need more information on how that works to write a test.



## How to run
1. Pull down the repository via `git clone git@github.com:chiderek/Henry-Med-Assessment.git`
2. Navigate into the repository folder and run `npm install`
3. To run the cypress tests, run `npm run cypress:run`
4. To debug and utilize Cypress's debugability run: `npm run cypress:open`
5. For running the API test run `npm run api:test`