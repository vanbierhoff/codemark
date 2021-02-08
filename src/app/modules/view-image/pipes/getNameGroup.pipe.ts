import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'getNameGroup'
})
export class GetNameGroupPipe implements PipeTransform {
	REGEXP = /-/gi;

	transform(value: string): string {
		return value.replace(this.REGEXP, ' ');
	}
}
