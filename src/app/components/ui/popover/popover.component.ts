import { Component } from '@angular/core';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { Options } from '@popperjs/core';

@Component({
  selector: 'app-popover',
  standalone: true,
  imports: [NgbPopoverModule],
  templateUrl: './popover.component.html',
  styleUrl: './popover.component.scss',
})
export class PopoverComponent {
  popperOptions = (options: Partial<Options>) => {

    options.onFirstUpdate = (state) => {
      if (state.elements?.arrow) {
        state.elements.arrow.style.display = 'none';
      }
    };

    return options;
  };
}
