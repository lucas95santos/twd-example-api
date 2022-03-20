import {
  UserRepository,
  UserData,
} from 'usecases/register-user-on-mailing-list/ports';

export class InMemoryUserRepository implements UserRepository {
  private repository: UserData[];

  constructor(repository: UserData[]) {
    this.repository = repository;
  }

  async add(user: UserData): Promise<void> {
    const exists = await this.exists(user);

    if (!exists) {
      this.repository.push(user);
    }
  }

  async findUserByEmail(email: string): Promise<UserData | null> {
    const found = this.repository.find((user) => user.email === email);
    return new Promise((resolve) => resolve(found || null));
  }

  async findAllUsers(): Promise<UserData[]> {
    return new Promise((resolve) => resolve(this.repository));
  }

  async exists(user: UserData): Promise<boolean> {
    let found = false;

    if ((await this.findUserByEmail(user.email)) !== null) {
      found = true;
    }

    return new Promise((resolve) => resolve(found));
  }
}
