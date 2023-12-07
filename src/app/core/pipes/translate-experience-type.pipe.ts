import { Pipe, PipeTransform } from '@angular/core';
import { ExperienceType } from '../enums/experienceType.enum';

@Pipe({
  name: 'translateExperienceType',
  standalone: true,
})
export class TranslateExperienceTypePipe implements PipeTransform {
  transform(value: ExperienceType): string {
    switch (value) {
      case ExperienceType.Novice:
        return 'Novato';
      case ExperienceType.Advanced:
        return 'Avanzado';
      case ExperienceType.Expert:
        return 'Experto';
      default:
        return '';
    }
  }
}
