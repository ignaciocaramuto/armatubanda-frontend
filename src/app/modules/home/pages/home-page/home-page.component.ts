import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements OnInit {
  formGroup: FormGroup;
  musicGenres: any[] = [];
  instruments: any[] = [];
  disableMultiselect = true;

  private authService = inject(AuthService);

  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      genres: ['', Validators.required],
      instruments: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.authService.checkAuthentication();

    this.musicGenres = [
      { name: 'Rock', code: 'AS' },
      { name: 'Pop', code: 'AS' },
      { name: 'Cumbia', code: 'ASD' },
      { name: 'Jazz', code: 'DAS' },
    ];

    this.instruments = [
      { name: 'Guitar', code: 'ASD' },
      { name: 'Trumpet', code: 'ASD' },
      { name: 'Bass', code: 'ASD' },
      { name: 'Saxophone', code: 'AS' },
    ];
  }

  onSubmit(): void {
    // TODO: request with form values
  }
}
