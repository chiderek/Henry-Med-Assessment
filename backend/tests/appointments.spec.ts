import axios from "axios";
import { Appointment } from "./Appointment"

/**
 * TODO
 * Move these variables to be consumed through env vars or set in an ApiClient.ts base class where default headers could be class.
 * Having the ApiClient.ts base class for all HTTP calls would make it easier to set any headers or cookies if the api requires a log in and 
 * needs the cookies/session set for authorization into the API. The ApiClient could cache the result instead of each test having to reauthorize.
 */
axios.defaults.baseURL = "https://localhost:5000/api";
axios.defaults.headers.post['Content-Type'] = 'application/json';

describe("Appointment Controller", () => {
    describe("Create", () => {
        it("should create an appointment successfully", async () => {
            const request: Appointment = {
                description: "some unique description, possibily a guid",
                startDateTime: new Date().toISOString(),
                endDateTime: new Date().toISOString(),
            };

            const result = await axios.post("/Appointments", request);
            expect(result.status).toEqual(200);
            expect(result.data.description).toEqual("some unique description, possibily a guid");
        })
    
        it("should create an appointment with a blank description", async () => {
            const request: Appointment = {
                description: "",
                startDateTime: new Date().toISOString(),
                endDateTime: new Date().toISOString(),
            };

            const result = await axios.post("/Appointments", request);
            expect(result.status).toEqual(200);
            expect(result.data.description).toEqual("");
        })
    
        //skipping due to no knowledge of whether this is allowed
        it.skip("should create an appointment with a null description", () => {})

        it("should create an appointment with a description that has odd characters", async () => {
            const request: Appointment = {
                description: " `!~. /\\á¿` ",
                startDateTime: new Date().toISOString(),
                endDateTime: new Date().toISOString(),
            };

            const result = await axios.post("/Appointments", request);
            expect(result.status).toEqual(200);
            expect(result.data.description).toEqual(" `!~. /\\á¿` ");
        })
    
        it("should throw when creating an appointment with no start time", async () => {
            const request: Appointment = {
                description: "some description",
                endDateTime: new Date().toISOString(),
            };

            //use toThrowError, unsure if what error we want to actually throw. Right now, it'd be the database error
            expect(async () => {
                await axios.post("/Appointments", request);
            }).toThrowError();
        })
    
        it("should throw when creating an appointment with no end time", async () => {
            const request: Appointment = {
                description: "some description",
                startDateTime: new Date().toISOString(),
            };
            
            //use toThrowError, unsure if what error we want to actually throw. Right now, it'd be the database error
            expect(async () => {
                await axios.post("/Appointments", request);
            }).toThrowError();
        })
    })

    describe("Delete", () => {
        it("should delete an appointment successfully", async () => {})
        it("should throw an error when deleting an appointment that does not exist", async () => {})
        it("should throw an error when deleting an appointment with a non-integer id", async () => {})
    })

    describe("Update", () => {
        it("should update an appointment successfully", async () => {})
        it("should not update an apointment if the appointment does not exist", async () => {})
        it("should throw an error when updating appointment with an invalid StartDateTime", async () => {})
        it("should throw an error when updating appointment with an invalid EndDateTime", async () => {})
    })

    describe("Get", () => {
        it("should be able to retrieve an appointment by its `id`", async () => { })
        it("should be able to retrieve a list of appointments", async () => { })
        it("should be able to retrieve a big list of appointments (1000+)", async () => { })
        it("should return `Not Found` when an appointment does not exist", async () => {})
    })
})