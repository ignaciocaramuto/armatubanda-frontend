import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { environment } from 'src/environments/environment.local';
import {
  Instrument,
  MusicianContactInformation,
} from '../../interfaces/profile-creation.interface';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-instrument-form',
  templateUrl: './instrument-form.component.html',
  styleUrls: ['./instrument-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InstrumentFormComponent implements OnInit {
  instrumentSelectionForm = new FormControl<Instrument | null>(
    null,
    Validators.required
  );
  data: Instrument[] = [];
  musicianBasicInfo: MusicianContactInformation | undefined = undefined;

  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);
  private fb = inject(FormBuilder);
  private readonly baseUrl: string = environment.apiUrl;

  ngOnInit(): void {
    this.getInstruments();
    this.route.paramMap.subscribe((params) => {
      const myObject = window.history.state;
      this.musicianBasicInfo = myObject;
    });
    console.log(this.musicianBasicInfo);
  }

  getInstruments(): void {
    const url = `${this.baseUrl}/instrument/all`;

    this.http.get<Instrument[]>(url).subscribe({
      next: (list) => {
        this.data = list;
      },
      error: (e) => console.log(e),
    });
  }
}
