import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenreService } from 'src/app/core/services/genre.service';
import { AddGenreDialogComponent } from '../../components/add-genre-dialog/add-genre-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { ConfirmDialogComponent } from 'src/app/core/components/confirm-dialog/confirm-dialog.component';
import { Genre } from 'src/app/core/models/genre.interface';
import { LogMessageService } from 'src/app/core/services/log-message.service';

@Component({
  selector: 'app-genres-page',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    ConfirmDialogComponent,
  ],
  templateUrl: './genres-page.component.html',
  styleUrls: ['./genres-page.component.scss'],
})
export class GenresPageComponent {
  displayedColumns: string[] = ['name', 'actions'];
  genres: Genre[] = [];

  constructor(
    private genreService: GenreService,
    private dialog: MatDialog,
    private logMessageService: LogMessageService
  ) {}

  ngOnInit(): void {
    this.getGenres();
  }

  addGenre(): void {
    const dialogRef = this.dialog.open(AddGenreDialogComponent, {
      width: '400px',
      height: '250px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((genre: string) => {
      if (genre) {
        this.genreService.addGenre(genre).subscribe((result) => {
          if (result) {
            this.getGenres();
          }
        });
      }
    });
  }

  editGenre(name: string): void {
    const dialogRef = this.dialog.open(AddGenreDialogComponent, {
      width: '400px',
      height: '250px',
      disableClose: true,
      data: name,
    });

    dialogRef.afterClosed().subscribe((genre) => {
      if (genre) {
        const updatedGenre = {
          newName: genre,
        };
        this.genreService.update(name, updatedGenre).subscribe((result) => {
          if (result) {
            this.logMessageService.logConfirm('¡Género editado correctamente!');
            this.getGenres();
          }
        });
      }
    });
  }

  deleteGenre(name: string): void {
    this.dialog
      .open(ConfirmDialogComponent, {
        data: '¿Estás seguro que quieres eliminar este género?',
      })
      .afterClosed()
      .subscribe((confirm: boolean) => {
        if (confirm) {
          this.genreService.delete(name).subscribe((res) => {
            this.logMessageService.logConfirm(res.message);
            this.getGenres();
          });
        }
      });
  }

  private getGenres(): void {
    this.genreService.getAll().subscribe((result) => (this.genres = result));
  }
}
