export class User {
  public id: string;
  public firtname: string;
  public lastname: string;
  public fullname: string;
  public phone: string;
  public email: string;
  public role: 'user' | 'seller';
  public store_id: string;
  public password: string;
  public avatar: string | null;
  public created_at: Date;
  public updated_at: Date;

  constructor(props: Partial<User>) {
    Object.assign(this, props);
  }
}
