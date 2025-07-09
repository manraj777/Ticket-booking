import { z } from 'zod';

export const CreateEventSchema = z.object({
    name: z.string(),
    description: z.string(),
    startTime: z.string(),
    location: z.string(),
    locationId: z.string(),
    imageUrl: z.string(),
    banner: z.string(),
    seats: z.array(z.object({
        
    }))
})

export const CreateLocationSchema = z.object({
    name: z.string(),
    description: z.string(),
    imageUrl: z.string()
})

export const UpdateEventSchema = z.object({
    name: z.string(),
    description: z.string(),
    startTime: z.string(),
    location: z.string(),
    banner: z.string(),
    published: z.boolean(),
    ended: z.boolean()
})