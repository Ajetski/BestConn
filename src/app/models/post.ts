import { Observable } from 'rxjs';

export interface Post {
    userUid?: string,
    username: string,
    message: string,
    file: boolean,
    timestamp: number,
    fileUrl?: Observable<string | null>
    followers: string[] // array of userUid's
}