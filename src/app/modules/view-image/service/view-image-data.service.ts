import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ResponseServer } from '../view-models';

@Injectable()
export class ViewImageService {
	constructor(private http: HttpClient) {}

	getTags(tags: string): Observable<string> {
		return this.http
			.get(
				`https://api.giphy.com/v1/gifs/random?api_key=gTJAO48YcpmrADUyo4opy4ES4g7iDBxx&tag=${tags}`
			)
			.pipe(
				<any>map((gif: ResponseServer) => {
					return gif.data.image_url;
				})
			);
	}
}
