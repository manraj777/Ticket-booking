import { describe, expect, test, it} from 'vitest';
import { axios } from "./axios";
import { get } from 'axios';
import { getRandomNumber } from './utils/number';

const BACKEND_URL = 'http://localhost:8080';

const PHONE_NUMBER_1 = getRandomNumber(10);
const NAME_1 = 'Manraj';

describe("Signin endpoint", () => {

    it('Signin doesnt works for user how doesnt exits in db', async () => {
            
        const response = await axios.post(`${BACKEND_URL}/api/v1/admin/signin`, {
            number: PHONE_NUMBER_1,
        });
        expect(response.status).toBe(411);
    });

    it('Signin works for admin', async () => {
        const response = await axios.post(`${BACKEND_URL}/api/v1/test/create-admin`, {
            number: PHONE_NUMBER_1,
            name: "manraj",
        });

        const responseSignin = await axios.post(`${BACKEND_URL}/api/v1/admin/signin`, {
            number: PHONE_NUMBER_1,
        });

        expect(response.status).toBe(200);
        expect(response.data.token).not.toBeNull();
        expect(responseSignin.status).toBe(200);
        expect(responseSignin.data.token).not.toBeNull();
    });
}) 
