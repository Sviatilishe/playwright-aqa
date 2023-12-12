import * as zod from 'zod'

export const SignUpSchema = zod.object({
    "userId": zod.number().min(1),
    "distanceUnits": zod.literal("km"),
    "photoFilename": zod.literal("default-user.png"),
    "currency": zod.literal("usd")
})