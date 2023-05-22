import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  formGroup!: FormGroup;

  musicGenres: any[] = [];
  instruments: any[] = [];

  selectedMusicGenre!: string;
  selectedInstruments!: string[];

  disableMultiselect = true;

  ngOnInit(): void {
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
