import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';


export class User {
    public login: string;
    public password: string;
    public email: string;
    public confirmPassword: string;
    constructor() {
    }
}


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    interpolation: ['{{', '}}']
})
export class LoginComponent implements OnInit {
    private readonly loginTitle = `Sign In`;
    private user: User;

    constructor(private http: HttpClient,
                private router: Router) {
        this.user = new User();
    }

    ngOnInit() {
    }

    loginRequest() {
        console.log(this.user);
        delete this.user.confirmPassword;
        this.http.post(`${environment.apiUrl}/login`, this.user, {observe: 'response'})
            .subscribe((res: any) => {
                    if (res.status === 200) {
                        alert(`Login was successful!`);
                        this.router.navigateByUrl('/home');
                        localStorage.setItem('auth_token', res.body.access_token);
                    }
                },
                (err: any) => {
                    if (err.error.error.statusCode === 404) {
                        alert(`Wrong login or password`);
                    } else {
                        alert(JSON.stringify(err.error));
                    }
                });
    }
}
