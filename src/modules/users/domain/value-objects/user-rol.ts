export class UserRole {
  constructor(private readonly value: 'user' | 'admin') {}

  getValue(): 'user' | 'admin' {
    return this.value;
  }

  equals(role: UserRole): boolean {
    return this.value === role.getValue();
  }

  isAdmin(): boolean {
    return this.value === 'admin';
  }

  isUser(): boolean {
    return this.value === 'user';
  }

  static admin(): UserRole {
    return new UserRole('admin');
  }

  static user(): UserRole {
    return new UserRole('user');
  }
}
