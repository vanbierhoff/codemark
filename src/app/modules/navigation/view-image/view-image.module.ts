import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MessageService } from 'app/components/toast/message-service/message.service';
import { ToastModule } from 'app/components/toast/toast.module';
import { NavigatonModule } from '../navigation.module';
import { LoadingImageService } from './service/loading-image.service';
import { ViewImageService } from './service/view-image-data.service';
import { ViewImageComponent } from './view-image.component';

@NgModule({
	imports: [NavigatonModule, CommonModule, HttpClientModule, ToastModule],
	exports: [ViewImageComponent],
	declarations: [ViewImageComponent],
	providers: [ViewImageService, MessageService, LoadingImageService]
})
export class ViewImageModule {}
