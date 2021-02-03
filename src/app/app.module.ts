import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavigatonModule } from './modules/navigation/navigation.module';

@NgModule({
	declarations: [AppComponent],
	imports: [BrowserModule, NavigatonModule],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
