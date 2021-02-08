import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ViewImageModule } from './modules/view-image/view-image.module';

@NgModule({
	declarations: [AppComponent],
	imports: [BrowserModule, ViewImageModule],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
