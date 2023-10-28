import { INewUser } from "@/types";
import { ID } from 'appwrite';
import { account } from "@/lib/appwrite/config.ts";

export async function createUserAccount(user: INewUser) {
    try {
        return await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name
        );

    } catch (error) {
        console.log(error);
        return error;
    }
}