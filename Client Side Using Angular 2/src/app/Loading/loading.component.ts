import { Component, Input } from '@angular/core';


@Component({
    selector: 'loader',
    templateUrl: `./loading.component.html`
})

export class loadingComponent {

    @Input() loading: boolean = false;
}