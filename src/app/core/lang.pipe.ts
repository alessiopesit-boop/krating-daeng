import { Pipe, PipeTransform, inject } from '@angular/core';
import { LangService } from './lang.service';

@Pipe({ name: 't', standalone: true, pure: false })
export class TPipe implements PipeTransform {
  private lang = inject(LangService);
  transform(value: string): string {
    // Touch the signal so the impure pipe recomputes on lang change.
    this.lang.lang();
    return this.lang.t(value);
  }
}
