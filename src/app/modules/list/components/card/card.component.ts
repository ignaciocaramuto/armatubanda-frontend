import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  @Input() id!: number;
  @Input() description!: string;
  @Input() name!: string;
  @Input() image!: string;
  @Input() rate!: number;
  @Input() rol!: string;
  @Input() opinions!: number;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  openProfile(): void {
    this.router.navigate(['/perfil', this.id]);
  }

}
