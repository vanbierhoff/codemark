import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTagModule } from 'app/components/inputTag/input-tag.module';

import { NavigationComponent } from './navigation.component';

@NgModule({
	imports: [InputTagModule, FormsModule, CommonModule, ReactiveFormsModule],
	exports: [NavigationComponent],
	declarations: [NavigationComponent],
	providers: []
})
export class NavigatonModule {}
