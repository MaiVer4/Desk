type Role = "admin" | "agent" | "client";

export interface User {
    id: string,
    name: string,
    email: string,
    role: Role,
    createdAt: string
}
