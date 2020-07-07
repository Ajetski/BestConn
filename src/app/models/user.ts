export interface User {
    uid: string,
    username: string,
    email: string,
    bio: string,
    followers: string[], //array of uid's
    following: string[], //array of uid's
    //private: boolean
}