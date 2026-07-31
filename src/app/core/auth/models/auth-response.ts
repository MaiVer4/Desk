import { User } from "./user";

export interface AuthResponse {
    accessToken: string,
    refreshToke: string,
    user: User,

}
