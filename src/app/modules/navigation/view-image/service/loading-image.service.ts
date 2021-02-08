import { Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MessageService } from 'app/components/toast/message-service/message.service';
import { forkJoin, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ErrorNoGifs, Gifs } from '../view-models';
import { ViewImageService } from './view-image-data.service';

@UntilDestroy()
@Injectable()
export class LoadingImageService {
	constructor(
		private messageService: MessageService,
		private imageDataService: ViewImageService
	) {}

	loading(tags: string[]): Observable<Gifs | ErrorNoGifs> {
		const isComposite = this.isCompositeTag(tags);
		const request: Observable<string>[] = [];

		tags.forEach((tag: string) => {
			request.push(this.imageDataService.getTags(tag));
		});

		return forkJoin([...request]).pipe(
			untilDestroyed(this),
			catchError(err => {
				this.messageService.add({
					typeMessage: 'error',
					message: err.error?.message || err.message
				});
				return throwError(err);
			}),
			map((res: string[]) => {
				if (res[0] === undefined) {
					this.messageService.add({
						typeMessage: 'error',
						message: 'По тегу ничего не найдено'
					});
					return { error: true } as ErrorNoGifs;
				}
				const image = {
					img: [...res],
					tagName: this.getTagName(tags),
					isComposite
				};
				return image as Gifs;
			})
		);
	}

	isCompositeTag(tags: string[]): boolean {
		if (tags.length > 1) {
			return true;
		}
		return false;
	}

	getTagName(tags: string[]) {
		return tags.join('-');
	}
}
