import { Component, forwardRef, OnInit } from '@angular/core';
import {
	ControlValueAccessor,
	FormControl,
	NG_VALUE_ACCESSOR
} from '@angular/forms';
import { filter } from 'rxjs/operators';

export const INPUT_CONTROLS_ACCESS = {
	provide: NG_VALUE_ACCESSOR,
	useExisting: forwardRef(() => InputTagComponent),
	multi: true
};

@Component({
	selector: 'input-tag',
	template: `
		<input [formControl]="value" />
	`,
	providers: [INPUT_CONTROLS_ACCESS]
})
export class InputTagComponent implements OnInit, ControlValueAccessor {
	value: FormControl = new FormControl('');

	TAG_REGEXP: RegExp = /[Aa-Zz,]/gi;

	ngOnInit() {
		this.value.valueChanges
			.pipe(filter(value => this.TAG_REGEXP.test(value)))
			.subscribe(val => this.value.setValue(val));
	}

	writeValue() {}

	onChange: Function = () => {};

	onTouch: Function = () => {};

	registerOnChange(fn: Function): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: Function): void {
		this.onTouch = fn;
	}
}
