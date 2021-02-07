import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NavigatonModule } from '../navigation.module';
import { ViewImageService } from './service/view-image-data.service';
import { ViewImageComponent } from './view-image.component';

@NgModule({
	imports: [NavigatonModule, CommonModule, HttpClientModule],
	exports: [ViewImageComponent],
	declarations: [ViewImageComponent],
	providers: [ViewImageService]
})
export class ViewImageModule {}
