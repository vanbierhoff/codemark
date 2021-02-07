import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Observable } from 'rxjs';

@Component({
	selector: 'navigation',
	templateUrl: './navigation.component.html',
	styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
	tag: string;

	toggler = false;

	@Input() isLoad$: Observable<boolean>;

	@Output() loading = new EventEmitter<string[]>();

	@Output() toggleGrouping = new EventEmitter();

	@Output() clear = new EventEmitter();

	loadingEvent() {
		const tags: string[] = this.tag.split(',');
		this.loading.emit(tags);
	}

	toggleEvent() {
		this.toggler = !this.toggler;
		this.toggleGrouping.emit(this.toggler);
	}
}
