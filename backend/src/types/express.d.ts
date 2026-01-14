import { JwtPayload } from 'jsonwebtoken';

declare global {
    namespace Express {
        interface Request {
            user?: string | JwtPayload | any; // 'any' for simplicity in intern assignment, or strict typed
        }
    }
}
