import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { Genre } from 'src/app/core/models/genre.interface';
import { Instrument } from 'src/app/core/models/instrument.interface';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { GenreService } from 'src/app/shared/services/genre.service';
import { InstrumentService } from 'src/app/shared/services/instrument.service';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { InputSelectComponent } from '../../../../core/components/input-select/input-select.component';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        InputSelectComponent,
        ButtonComponent,
    ],
})
export class HomePageComponent implements OnInit {
  formGroup: FormGroup;
  genres: Genre[] = [];
  instruments: Instrument[] = [];
  disableMultiselect = true;

  private authService = inject(AuthService);

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private genreService: GenreService,
    private instrumentService: InstrumentService
  ) {
    this.formGroup = this.fb.group({
      genres: [''],
      instruments: [''],
    });
  }

  ngOnInit(): void {
    this.authService.checkAuthentication();
    this.getGenres();
    this.getInstruments();
  }

  onSubmit(): void {
    if (
      !!this.formGroup.get('genres')?.value ||
      !!this.formGroup.get('imstrumnts')?.value
    ) {
      const queryParams = this.formGroup.value;
      this.router.navigate(['/', 'list'], {
        queryParams,
      });
    } else {
      this.router.navigate(['/list']);
    }
  }

  getGenres(): void {
    this.genreService
      .getGenres()
      .pipe(tap((res) => (this.genres = res)))
      .subscribe();
  }

  getInstruments(): void {
    this.instrumentService
      .getInstruments()
      .pipe(tap((res) => (this.instruments = res)))
      .subscribe();
  }
}
