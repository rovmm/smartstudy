export interface AuthResponse {
    accessToken: string;
    tokenType: string;
    id: number;
    username: string;
    email: string;
    roles: string[];
}