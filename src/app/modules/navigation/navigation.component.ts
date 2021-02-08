import {
	AfterViewInit,
	Component,
	ElementRef,
	EventEmitter,
	Input,
	Output,
	ViewChild
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { fromEvent, interval, Observable, of } from 'rxjs';
import { switchMap, takeWhile } from 'rxjs/operators';

@UntilDestroy()
@Component({
	selector: 'navigation',
	templateUrl: './navigation.component.html',
	styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements AfterViewInit {
	@ViewChild('buttonDownload') buttonDownload: ElementRef;

	@Input() isLoad$: Observable<boolean>;

	@Output() loading = new EventEmitter<string[]>();

	@Output() toggleGrouping = new EventEmitter();

	@Output() clear = new EventEmitter();

	tag: string;

	toggler = false;

	inerval$ = interval(5000);

	ngAfterViewInit() {
		fromEvent(this.buttonDownload.nativeElement, 'click')
			.pipe(
				untilDestroyed(this),
				switchMap(() => {
					if (this.tag === 'delay') {
						return this.inerval$.pipe(
							takeWhile(() => {
								return this.tag === 'delay';
							})
						);
					}
					return of(this.tag);
				})
			)
			.subscribe(() => {
				this.loadingEvent();
			});
	}

	loadingEvent() {
		if (this.tag === 'delay') {
			this.loading.emit(['random']);
			return;
		}
		const tags: string[] = this.tag.split(',');
		this.loading.emit(tags);
	}

	toggleEvent() {
		this.toggler = !this.toggler;
		this.toggleGrouping.emit(this.toggler);
	}
}
