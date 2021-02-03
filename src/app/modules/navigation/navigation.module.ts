import { NgModule } from '@angular/core';
import { InputTagModule } from 'app/components/inputTag/input-tag.module';

import { NavigationComponent } from './navigation.component';

@NgModule({
	imports: [InputTagModule],
	exports: [NavigationComponent],
	declarations: [NavigationComponent],
	providers: []
})
export class NavigatonModule {}
