import { describe, expect, test } from 'vitest';
import axios from "axios";

const BACKEND_URL = 'http://localhost:8080';

const USERNAME1 = 'testuser';
const USERNAME2 = 'testuser2';

const PASSWORD1 = 'testpassword';
const PASSWORD2 = 'testpassword2';

describe("Signup endpoint", () => {
    test('Double signup doesnt work', async () => {
    const response1 = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
        username: USERNAME1,
        password: PASSWORD1
    })
     const response2 = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
        username: USERNAME1,
        password: PASSWORD1
    })
    expect(response1.status).toBe(200);
    expect(response1.status).toBe(403);
});
})
