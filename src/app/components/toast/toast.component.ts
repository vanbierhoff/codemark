import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MessageService } from './message-service/message.service';

export interface Messages {
	typeMessage: string;
	message: string;
	index?: number;
}

@Component({
	selector: 'toast',
	templateUrl: './toast.component.html',
	styleUrls: ['./toast.component.scss'],
	animations: [
		trigger('messageState', [
			transition('void => *', [
				style({ transform: '{{showTransformParams}}', opacity: 0 }),
				animate('{{showTransitionParams}}')
			]),
			transition('* => void', [
				animate(
					'{{hideTransitionParams}}',
					style({
						height: 0,
						opacity: 0,
						transform: '{{hideTransformParams}}'
					})
				)
			])
		])
	]
})
export class ToastComponent implements OnInit {
	constructor(private messageService: MessageService) {}

	messageObserver: Observable<Messages>;

	showTransitionOptions = '300ms ease-out';

	hideTransitionOptions = '200ms cubic-bezier(0.86, 0, 0.07, 1)';

	showTransformOptions = 'translateY(100%)';

	hideTransformOptions = 'translateY(-100%)';

	meessages: Messages[] = [];

	index: number;

	ngOnInit() {
		this.messageObserver = this.messageService.senderMessage;
		this.messageObserver.subscribe(message => {
			this.meessages.push(message);
		});
	}

	deleteMessage(index: number) {
		this.meessages.splice(index, 1);
	}
}
