import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-successful-register-page',
  standalone: true,
  templateUrl: './successful-register-page.component.html',
  styleUrls: ['./successful-register-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuccessfulRegisterPageComponent {}
