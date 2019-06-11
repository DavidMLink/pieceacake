import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

interface Location {
  latitude: string;
  longitude: string;
  country_name: string;
}

@Injectable({
  providedIn: 'root'
})
export class MapsService {

  constructor(private _http : HttpClient) { }


  getLocation(){
    return this._http.get<Location>('https://ipapi.co/json/')
  }
}
