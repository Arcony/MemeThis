import { EventEmitter, Injectable, Output } from '@angular/core';
@Injectable({
    providedIn: 'root'
})

export class ComponentCommunicationService {
    @Output() updateMemes: EventEmitter<any> = new EventEmitter();

    constructor() {
    }
}
