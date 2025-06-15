import { describe, expect, test, it} from 'vitest';
import { axios } from "./axios";

const BACKEND_URL = 'http://localhost:8080';

const PHONE_NUMBER_1 = '6261543983';
const NAME_1 = 'Manraj';

describe("Signin endpoint", () => {

    it('Signin doesnt works for user how doesnt exits in db', async () => {
            
            const response = await axios.post(`${BACKEND_URL}/api/v1/admin/signin`, {
                number: PHONE_NUMBER_1 + "123",
            });
            expect(response.status).toBe(411);
    
        });
})
