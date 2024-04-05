import { Role } from 'src/app/core/enums/role.enum.js';

export interface CurrentUser {
  id: number;
  role: Role;
  token: string;
  email: string;
  isProfileSet: boolean;
  firstName: string;
  lastName: string;
  imagePath: string;
}
