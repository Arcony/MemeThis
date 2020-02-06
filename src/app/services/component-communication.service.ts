import { EventEmitter, Injectable, Output } from '@angular/core';
import { SERVER_API_URL } from './../app.constants';

@Injectable({
    providedIn: 'root'
})

export class ComponentCommunicationService {
    @Output() updateMemes: EventEmitter<any> = new EventEmitter();

    constructor() {
    }
}
