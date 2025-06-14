import { describe, expect, test, it} from 'vitest';
import { axios } from "./axios";

const BACKEND_URL = 'http://localhost:8080';

const PHONE_NUMBER_1 = '6261543983';
const NAME_1 = 'Manraj';

describe("Signup endpoint", () => {

    it('Double signup doesnt work', async () => {
        const response1 = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, {
            number: PHONE_NUMBER_1,
        });

        const response2 = await axios.post(`${BACKEND_URL}/api/v1/user/signup/verify`, {
            number: PHONE_NUMBER_1,
            name: NAME_1, 
            otp: "000000",
        });

        expect(response1.status).toBe(200);
        expect(response2.status).toBe(200);
        expect(response1.data.id).not.toBeNull();

    });
})


describe("Signin endpoint", () => {

    it('Signin works as expected', async () => {
        const response1 = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, {
            number: PHONE_NUMBER_1,
        });

        const response2 = await axios.post(`${BACKEND_URL}/api/v1/user/signin/verify`, {
            number: PHONE_NUMBER_1,
            name: NAME_1, 
            otp: "000000",
        });

        expect(response1.status).toBe(200);
        expect(response2.status).toBe(200);
        expect(response1.data.id).not.toBeNull();
        expect(response2.data.token).not.toBeNull();

});

    it('Signin doesnt works for user how doesnt exits in db', async () => {
        
        const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, {
            number: PHONE_NUMBER_1 + "123",
        });
        expect(response.status).toBe(411);

    });
})
