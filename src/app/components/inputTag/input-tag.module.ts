import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InputTagComponent } from './input-tag.component';

@NgModule({
	imports: [FormsModule, CommonModule, ReactiveFormsModule],
	exports: [InputTagComponent],
	declarations: [InputTagComponent],
	providers: []
})
export class InputTagModule {}
