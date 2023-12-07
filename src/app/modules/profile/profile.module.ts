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
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { InfoCardComponent } from './pages/profile-info-page/info-card/info-card.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateExperienceTypePipe } from 'src/app/core/pipes/translate-experience-type.pipe';

@NgModule({
  declarations: [
    ProfilePageComponent,
    ProfileResumeComponent,
    ProfileFeedComponent,
    ProfileReviewsComponent,
    PostComponent,
    ReviewComponent,
    ProfileInfoPageComponent,
    InfoCardComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    ButtonComponent,
    SharedModule,
    MatDialogModule,
    ProfileImageComponent,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    TranslateExperienceTypePipe,
  ],
})
export class ProfileModule {}
