export class AuthService {

  private isAuthenticated = false;

  login() {
    this.isAuthenticated = true;
  }

  logout() {
    this.isAuthenticated = false;
    window.localStorage.clear();
  }

  isLogged(): boolean {
    return this.isAuthenticated;
  }

}
