export class UserSex {
  constructor(private readonly value: 'male' | 'female') {}

  static male(): UserSex {
    return new UserSex('male');
  }

  static female(): UserSex {
    return new UserSex('female');
  }

  getValue(): 'male' | 'female' {
    return this.value;
  }

  equals(other: UserSex): boolean {
    return this.value === other.getValue();
  }
}
