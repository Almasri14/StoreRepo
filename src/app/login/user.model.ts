export class User {
  public email: string;
  public password: string;
  public status: string;

  constructor( email: string, password: string, status: string) {
    this.email = email;
    this.password = password;
    this.status = status;
  }
}

