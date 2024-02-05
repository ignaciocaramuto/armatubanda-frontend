import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Post } from '../../../models/post.interface';
import { SanitizeImagePipe } from '../../../../../core/pipes/sanitize-image.pipe';
import { JsonPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  standalone: true,
  imports: [NgIf, SanitizeImagePipe, JsonPipe],
})
export class PostComponent implements OnInit {
  @Input() post!: Post;

  srcSafeUrl: SafeUrl = '';

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    if (this.post.videoUrl) {
      this.srcSafeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        this.getEmbedUrlVideo(this.post.videoUrl)
      );
    }
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
}
