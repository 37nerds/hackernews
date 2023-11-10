import { z } from "zod";
import { TUser } from "./repository";

export const registerOrLoginUserBodySchema = z.object({
    username: z.string(),
    password: z.string().min(6),
});

const idSchema = z.string().length(24);

export const getUserQuerySchema = z.object({
    id: idSchema.optional(),
    username: z.string().optional(),
});

export type TGetUserQuerySchema = z.infer<typeof getUserQuerySchema>;

export const returnLoggedUser = (
    user: TUser,
): {
    [K in keyof TUser]: K extends "password" ? undefined : TUser[K];
} => {
    return { ...user, password: undefined };
};

export const returnUser = (
    user: TUser,
): {
    [K in keyof TUser]: K extends "password" ? undefined : TUser[K];
} => {
    return { ...user, password: undefined };
};

// export type TUserResponse = {
//     _id: ObjectId;
//     createdAt: Date;
//     updatedAt: Date;
//     username: string;
//     email: string;
//     name?: string;
// };
//
//
// const userStatusSchema = z.enum(["active", "inactive"]);
//
// export const loginUserBodySchema = z
//     .object({
//         username: z.string().optional(),
//         email: z.string().optional(),
//         password: z.string(),
//     })
//     .refine((data) => data.username || data.email, {
//         message: "Either 'username' or 'email' is required.",
//     });
//
// export const postUserBodySchema = registerUserBodySchema.merge(
//     z.object({
//         status: userStatusSchema.optional(),
//     }),
// );
//
// export const updateBodySchema = z.object({
//     username: z.string().optional(),
//     email: z.string().optional(),
//     password: z.string().optional(),
//     name: z.string().optional(),
//     status: userStatusSchema.optional(),
// });
//
//
// export const updateQuerySchema = z.object({
//     id: idSchema,
// });
//

// export type TUpdateUserBody = z.infer<typeof updateBodySchema>;
// export type TUpdateUserQuery = z.infer<typeof updateQuerySchema>;
// export type TGetUserQuery = z.infer<typeof getUserQuerySchema>;
// export type TDeleteUserQuery = z.infer<typeof updateQuerySchema>;
// export type TLoginUserBody = z.infer<typeof loginUserBodySchema>;
// export type TRegisterUserBody = z.infer<typeof registerUserBodySchema>;
//
