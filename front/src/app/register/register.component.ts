import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {User} from '../login/login.component';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: [
        './register.component.scss',
        '../login/login.component.scss'
    ]
})
export class RegisterComponent implements OnInit {
    private readonly registerTitle = `Sign Up`;
    private user: User;

    constructor(private http: HttpClient,
                private router: Router) {
        this.user = new User();
    }

    ngOnInit() {
    }

    async registerRequest() {
        await delete this.user.confirmPassword;
        console.log(this.user);
        await this.http.post(`${environment.apiUrl}/register`, this.user, {observe: 'response'})
            .subscribe(
                (res: any) => {
                    if (res.status === 201) {
                        alert(`Register successfully!`);
                        this.router.navigateByUrl('');
                    }
                },
                (err: any) => {
                    alert(JSON.stringify(err.error));
                    console.log(err);
                }
            );
    }


}
