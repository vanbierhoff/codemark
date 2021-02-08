import {
	AfterViewInit,
	Component,
	ElementRef,
	forwardRef,
	ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

export const INPUT_CONTROLS_ACCESS = {
	provide: NG_VALUE_ACCESSOR,
	useExisting: forwardRef(() => InputTagComponent),
	multi: true
};

@UntilDestroy()
@Component({
	selector: 'input-tag',
	template: `
		<input #input [ngModel]="control" />
	`,
	styleUrls: [],
	providers: [INPUT_CONTROLS_ACCESS]
})
export class InputTagComponent implements AfterViewInit, ControlValueAccessor {
	@ViewChild('input') input: ElementRef;

	valueInput = '';

	control: string;

	TAG_REGEXP = /[a-z,]/i;

	ngAfterViewInit() {
		fromEvent(this.input.nativeElement, 'input')
			.pipe(
				untilDestroyed(this),
				map<any, string>((value: InputEvent) => {
					if (this.TAG_REGEXP.test(value.data as string)) {
						return this.input.nativeElement.value;
					}
					const REGEXP = new RegExp(value.data as string, 'ig');
					return this.input.nativeElement.value.replace(REGEXP, '');
				})
			)
			.subscribe(value => {
				this.input.nativeElement.value = value;
				this.onChange(this.input.nativeElement.value);
			});
	}

	writeValue(val: any) {
		this.control = val;
	}

	onChange: Function = () => {};

	onTouch: Function = () => {};

	registerOnChange(fn: Function): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: Function): void {
		this.onTouch = fn;
	}
}
