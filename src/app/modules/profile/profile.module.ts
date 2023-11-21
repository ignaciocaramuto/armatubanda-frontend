import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileResumeComponent } from './components/profile-resume/profile-resume.component';
import { ProfileFeedComponent } from './components/profile-feed/profile-feed.component';
import { ProfileReviewsComponent } from './components/profile-reviews/profile-reviews.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { ButtonComponent } from 'src/app/core/components/button/button.component';
import { PostComponent } from './components/profile-feed/post/post.component';
import { ReviewComponent } from './components/profile-reviews/review/review.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { ProfileImageComponent } from 'src/app/core/components/profile-image/profile-image.component';
import { ProfileInfoPageComponent } from './pages/profile-info-page/profile-info-page.component';

@NgModule({
  declarations: [
    ProfilePageComponent,
    ProfileResumeComponent,
    ProfileFeedComponent,
    ProfileReviewsComponent,
    PostComponent,
    ReviewComponent,
    ProfileInfoPageComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    ButtonComponent,
    SharedModule,
    MatDialogModule,
    ProfileImageComponent,
  ],
})
export class ProfileModule {}
