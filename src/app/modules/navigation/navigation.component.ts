import {
	AfterViewInit,
	Component,
	ElementRef,
	EventEmitter,
	Input,
	Output,
	ViewChild
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MessageService } from 'app/components/toast/message-service/message.service';

import { fromEvent, interval, Observable, of } from 'rxjs';
import { switchMap, takeWhile } from 'rxjs/operators';

@UntilDestroy()
@Component({
	selector: 'navigation',
	templateUrl: './navigation.component.html',
	styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements AfterViewInit {
	constructor(
		private messageService: MessageService,
		private fb: FormBuilder
	) {}

	@ViewChild('buttonDownload') buttonDownload: ElementRef;

	@Input() isLoad$: Observable<boolean>;

	@Output() loading = new EventEmitter<string[]>();

	@Output() toggleGrouping = new EventEmitter();

	@Output() clear = new EventEmitter();

	@Input() setTag$: Observable<string>;

	toggler = false;

	form: FormGroup = this.fb.group({
		tag: new FormControl('')
	});

	inerval$ = interval(5000);

	ngAfterViewInit() {
		fromEvent(this.buttonDownload.nativeElement, 'click')
			.pipe(
				untilDestroyed(this),
				switchMap(() => {
					if (this.form.controls.tag.value === 'delay') {
						return this.inerval$.pipe(
							takeWhile(() => {
								return this.form.controls.tag.value === 'delay';
							})
						);
					}
					return of(this.form.controls.tag.value);
				})
			)
			.subscribe(() => {
				const tag = this.form.controls.tag.value;
				this.loadingEvent(tag);
			});

		this.setTag$.subscribe(tag => {
			this.form.controls.tag.patchValue(tag);
		});
	}

	loadingEvent(tag: string) {
		if (tag === 'delay') {
			this.loading.emit(['random']);
			return;
		}
		if (tag === '') {
			this.messageService.add({
				typeMessage: 'info',
				message: 'Введите тэг'
			});
			return;
		}
		const tags: string[] = tag.split(',');
		this.loading.emit(tags);
	}

	toggleEvent() {
		this.toggler = !this.toggler;
		this.toggleGrouping.emit(this.toggler);
	}

	clearEvent() {
		this.form.controls.tag.patchValue('');
		this.clear.emit();
	}
}
