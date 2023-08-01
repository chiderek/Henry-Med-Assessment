## Test Cases

### States
1. Only support states are displayed in the button
    * [California, Colorado, Florida, Georgia, Illinois, Maryland, New Hampshire, Texas, Utah, Virginia, Washington, Other]
2. Other redirects to form that getting connected with a licensed provider `https://ft4aaz62fi7.typeform.com/to/KK72Q2GE?typeform-source=onboard.henrymeds.com#treatment=weightloss`

### Appointment Times `api/appointment`
1. Reservations are in 15 minute time slots (returned by the API)
2. Available times are displayed according to local timezone
3. Appointment times cannot be 24 hours from now
4. Clicking on appointment continues to page with provider information and timeslot
5. Clicking continue on the redirects to the contacts details page

#### Questions and comments
1. More testing on the API side should be done on this, the UI is just displaying information received from the API

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
4. Billing address fields are all required with