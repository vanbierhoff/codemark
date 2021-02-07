import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from './message-service/message.service';

import { ToastComponent } from './toast.component';

@NgModule({
	imports: [CommonModule, BrowserAnimationsModule],
	exports: [ToastComponent],
	declarations: [ToastComponent],
	providers: [MessageService]
})
export class ToastModule {}
