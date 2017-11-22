import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class YoutubeService {

  private youtubeUrl:string = "https://www.googleapis.com/youtube/v3";
  private apiKey:string = "AIzaSyA8lMM1wOhJpPMKxPrOE1cmFtu9qpe8HEQ";
  private playlistId:string = "UUX9NJ471o7Wie1DQe94RVIg";

  private nextPageToken:string = "";

  constructor(public http:Http) { }

  getVideos() {

    let url = `${this.youtubeUrl}/playlistItems`;
    let params = new URLSearchParams();

    params.set('part', 'snippet');
    params.set('maxResults', '12');
    params.set('playlistId', this.playlistId);
    params.set('key', this.apiKey);

    if(this.nextPageToken){
      params.set('pageToken', this.nextPageToken);
    }

    return this.http.get(url, {search: params})
            .map( res => {
              console.log(res.json());
              this.nextPageToken = res.json().nextPageToken;

              let videos:any[]=[];
              for (let video of res.json().items){
                let snippet = video.snippet;
                videos.push(snippet);
              }

              return videos;

            });

  }

}
