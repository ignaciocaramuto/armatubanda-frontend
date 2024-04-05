import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Post } from '../../../models/post.interface';
import { DatePipe, JsonPipe, NgIf } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/core/components/confirm-dialog/confirm-dialog.component';
import { ProfileService } from '../../../services/profile.service';
import { LogMessageService } from 'src/app/core/services/log-message.service';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { BandService } from 'src/app/modules/band/services/band.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  standalone: true,
  imports: [NgIf, JsonPipe, DatePipe],
})
export class PostComponent implements OnInit {
  @Input() post!: Post;
  @Input() userId!: number;
  @Input() bandId!: number;
  @Output() postDeleted = new EventEmitter<void>();

  user = this.authService.currentUser();

  srcSafeUrl: SafeUrl = '';

  constructor(
    private sanitizer: DomSanitizer,
    private dialog: MatDialog,
    private profileService: ProfileService,
    private logMessageService: LogMessageService,
    private authService: AuthService,
    private bandService: BandService
  ) {}

  ngOnInit(): void {
    if (this.post.videoUrl) {
      this.srcSafeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        this.getEmbedUrlVideo(this.post.videoUrl)
      );
    }
  }

  deletePost(): void {
    this.dialog
      .open(ConfirmDialogComponent, {
        data: '¿Estás seguro que quieres eliminar esta publicación?',
      })
      .afterClosed()
      .subscribe((confirm: boolean) => {
        if (confirm) {
          if (!this.bandId) {
            this.profileService
              .deletePost(this.post.id)
              .subscribe(() => this.emitPostDeletedEvent());
          } else {
            this.bandService
              .deletePost(this.bandId, this.post.id)
              .subscribe(() => this.emitPostDeletedEvent());
          }
        }
      });
  }

  private getEmbedUrlVideo(url: string): string {
    const patron =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const coincidencias = url.match(patron);

    // TODO: Delete this when update API to save only embed url video
    if (coincidencias && coincidencias[1]) {
      return `https://www.youtube.com/embed/${coincidencias[1]}`;
    } else {
      return '';
    }
  }

  private emitPostDeletedEvent(): void {
    this.postDeleted.emit();
    this.logMessageService.logConfirm('¡Publicación eliminada exitosamente!');
  }
}
