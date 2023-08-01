import axios from "axios"
import { getMinutes } from "date-fns";

/**
 * Todo: These variables should be inject either are runtime
 * Along with the variables at runtime, an ApiClient.ts should be used so that any cookies/authorization need can be used and cached 
 * if any APIs require them
 */

axios.defaults.baseURL = "https://onboard.henrymeds.com/api";
axios.defaults.headers.post["Content-Type"] = "application/json";

describe("Appointment API", () => {
    it("should have appointment times in 15 minute increments", async () => {
        const {status, data} = await axios.get("/appointment");

        expect(status).toEqual(200);
        expect(data).toBeDefined();

        //verify that all the appointments are 15 minute increments.
        //looks like it's 0, 15, 30, 45

        //casting the data to a type like this isn't ideal and can run into issues
        //todo: fix this cast
        for (let appt of data as Appointment[]) {

            //these assertions could have a custom matcher instead of this OR statement
            //todo: implement the matcher if time permits
            expect(
                getMinutes(new Date(appt.start)) === 0 ||
                getMinutes(new Date(appt.start)) === 15 ||
                getMinutes(new Date(appt.start)) === 30 ||
                getMinutes(new Date(appt.start)) === 45
            ).toBeTruthy();
            expect(
                getMinutes(new Date(appt.end)) === 0 ||
                getMinutes(new Date(appt.end)) === 15 ||
                getMinutes(new Date(appt.end)) === 30 ||
                getMinutes(new Date(appt.end)) === 45
            ).toBeTruthy();
        }
    })
})

type Appointment = {
    start: string;
    end: string;
    providerId: string;
}