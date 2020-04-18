import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeFeedService {

  constructor() {  }

  getPosts(): Object[] {
    return [
      {
        id: 3,
        userid: 1,
        textcontent: "my message",
        posttime: "temp-time",
        postloc: "temp-location"
      },
      {
        id: 3,
        userid: 1,
        textcontent: "my message",
        posttime: "temp-time",
        postloc: "temp-location"
      },
      {
        id: 3,
        userid: 1,
        textcontent: "my message",
        posttime: "temp-time",
        postloc: "temp-location"
      },
      {
        id: 3,
        userid: 1,
        textcontent: "my message",
        posttime: "temp-time",
        postloc: "temp-location"
      }
    ];
  }
}
