import { $Enums } from '@prisma/client';

export interface CustomRequest {
  user: {
    id: string;
    username: string;
    name: string;
    email: string;
    role: $Enums.UserRoleEnum;
  };
}
