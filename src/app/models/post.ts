import { Observable } from 'rxjs';

export interface Post {
    username: string,
    message: string,
    file: boolean,
    timestamp: number,
    fileUrl?: Observable<string | null>
}