import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { InputTagComponent } from './input-tag.component';

@NgModule({
	imports: [ReactiveFormsModule],
	exports: [InputTagComponent],
	declarations: [InputTagComponent],
	providers: []
})
export class InputTagModule {}
