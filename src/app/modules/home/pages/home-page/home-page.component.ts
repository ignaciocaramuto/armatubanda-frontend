import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  formGroup!: FormGroup;

  private authService = inject(AuthService);

  musicGenres: any[] = [];
  instruments: any[] = [];

  selectedMusicGenre!: string;
  selectedInstruments!: string[];

  disableMultiselect = true;

  ngOnInit(): void {

    this.authService.checkAuthentication();

    this.formGroup = new FormGroup({
      musicGenres: new FormControl<string | null>(null),
      instruments: new FormControl<string | null>(null)
    });

    this.musicGenres = [
      { name: 'Rock', code: 'AS' },
      { name: 'Pop', code: 'AS' },
      { name: 'Cumbia', code: 'ASD' },
      { name: 'Jazz', code: 'DAS' }
    ];

    this.instruments = [
      { name: 'Guitar', code: 'ASD' },
      { name: 'Trumpet', code: 'ASD' },
      { name: 'Bass', code: 'ASD' },
      { name: 'Saxophone', code: 'AS' }
    ];
  }

}
