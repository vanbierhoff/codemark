import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Messages } from '../toast.component';

@Injectable()
export class MessageService {
	senderMessage: Subject<Messages> = new Subject();

	add(message: Messages) {
		this.senderMessage.next(message);
	}
}
