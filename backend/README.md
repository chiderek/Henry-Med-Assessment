# Test Cases

### Create Appointment
1. Creates an appointment successfully
2. Can create an appointment with a blank description
2. Can create an appointment with a `null` description
3. Can create an appointment with description will odd characters
4. Cannot create an appoinment with no start time
5. Cannot create an appointment with no end time
### Delete Appointment
1. Can delete an appointment successfully
2. Throws relevant error when deleting an appointment that does exist
3. Throws error when attempting to delete an appointment `id` that is not an integer
### Update Appointment
1. Updates an appointment successfully
2. Does not update an appointment if the appointment does not exist
3. Throws error when attempting to update appointment with invalid `StartDateTime` or `EndDateTime`
5. Can update appoinment with a `null` description
### Get Appointment
1. Can retrieve an appointment successfully
2. Returns `NotFound` when appointment does not exist
### Get Appointments
1. Can retrieve a list of appointments successfully
2. Can retrieve a big list of appointments successfully (1000+ results)

## Bugs Found
1. In `api/createappointment` there is a typo in the SQL `Dscrption -> Description`
2. Create appointment has an inline string for the query, should be changed to be parameterized
3. In `api/getappointments`, the SQL connection closes prematurely, likely cause of line 113
4. In `api/getappointments`, there does not look like there is any pagination, when a lot of appointments the endpoint can either timeout, provide a slow response time, or consume a bunch of memory when called. Recommend paginating the response results to a reasonable limit 

## Overall Recommendations
1. Move the SQL commands to a service layer to allow more unit testing of the controller layer. Currently, not need with the simple use case of the controller since it's a pass through to the database. Would make it easier to provide a service layer of testing to validate the SQL queries and then add a layer of controller testing in the case of the controllers modifying data. 