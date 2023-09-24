import { Component, Input, OnInit, Sanitizer } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  @Input() src: string = '';

  srcSafeUrl: SafeUrl = '';

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.srcSafeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.src);
  }
}
