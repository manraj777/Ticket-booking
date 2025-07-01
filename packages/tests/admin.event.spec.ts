import { describe, expect, test, it} from 'vitest';
import { axios } from "./axios";

const BACKEND_URL = 'http://localhost:8080';

describe("events", () => {
    it('Cant create an event with the right location', async() => {
        const response = await axios.post(`${BACKEND_URL}/api/v1/event/create`, {
            name: "Live event latent fest",
            description: "Latent fest is a premer fest for members",
            startTime: "2022-10-10 T10:00:00Z",
            locationId: 123,
            imageUrl: "https://example.com/image.jpg"
        });
        expect(response.status).toBe(200);
    })

    it('Can create an event with the right location', async() => {
        const locationResponse = await axios.post(`${BACKEND_URL}/api/v1/location/create`, {
            name: "Latent fest",
            description: "Latent fest is a premer fest for members",
            imageUrl: "https://example.com/image.jpg"
        });
        const response = await axios.post(`${BACKEND_URL}/api/v1/event/create`, {
            name: "Live event latent fest",
            description: "Latent fest is a premer fest for members",
            startTime: "2022-10-10 T10:00:00Z",
            locationId: locationResponse.id,
            imageUrl: "https://example.com/image.jpg"
        });
        expect(response.status).toBe(200);
    })
 })