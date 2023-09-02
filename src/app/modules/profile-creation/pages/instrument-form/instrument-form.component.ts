import { Component, OnInit, inject } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Instrument, MusicianContactInformation } from '../../interfaces/profile-creation.interface';
import { HttpClient } from '@angular/common/http';
import { Observable, delay } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-instrument-form',
  templateUrl: './instrument-form.component.html',
  styleUrls: ['./instrument-form.component.scss']
})
export class InstrumentFormComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);
  private fb = inject(FormBuilder);

  private readonly baseUrl: string = environment.baseUrl;

  public InstrumentSelectionForm : FormGroup = this.fb.group({
    instruments:['',[]]
  });

  data: Instrument[] = [];
  musicianBasicInfo: MusicianContactInformation|undefined = undefined;

  ngOnInit(): void {
    this.getInstruments();
    this.route.paramMap.subscribe(params => {
    const myObject = window.history.state;
    this.musicianBasicInfo = myObject;
  }
    )
    console.log(this.musicianBasicInfo);

  }

  getInstruments(): void {
    const url = `${this.baseUrl}/instrument/all`;

    this.http.get<Instrument[]>(url).subscribe({

      next: (list) => {this.data = list;},
      error: (e) => console.log(e),
    }
    );
  }

}
