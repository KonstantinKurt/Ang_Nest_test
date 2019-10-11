import {
    Component,
    OnInit
} from '@angular/core';
import {checkToken} from '../helpers/check-token';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {User} from '../login/login.component';


export class Employee {
    public firstName: string;
    public lastName: string;
    public position: string;
    public info: string;
    public gender: string;
    public salary: number;
    public createdAt: string;
    public _id: string;

    constructor() {
    }
}

export interface SearchParams {
    [key: string]: any;
}

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: [
        './home.component.scss',
        '../login/login.component.scss'
    ]
})
export class HomeComponent implements OnInit {
    private user: User;
    private token: string;
    private httpOptions: object;
    private employees: Employee[];
    private selectedEmployee: Employee;
    private pagination: number;
    private search: boolean;
    private searchParams: SearchParams;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.token = localStorage.getItem('auth_token');
        this.httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                authorization: this.token
            }),
            observe: 'response' as 'body'
        };
        this.user = new User();
        this.selectedEmployee = new Employee();
        this.pagination = 10;
        this.search = false;
        this.searchParams = {};
    }

    ngOnInit() {
        checkToken(this.router);
        this.getCurrentUserData();
        this.getEmployees(this.pagination);
    }

    async getCurrentUserData() {
        await this.http.post(`${environment.apiUrl}/user`, this.user, this.httpOptions)
            .subscribe(
                (res: any) => {
                    console.log(res.body);
                    this.user.email = res.body.email;
                    this.user.password = '';
                    this.user.confirmPassword = '';
                    this.user.login = res.body.login;
                },
                (err: any) => {
                    alert(JSON.stringify(err.error));
                }
            );
    }

    async updateRequest() {
        delete this.user.confirmPassword;
        await this.http.put(`${environment.apiUrl}/user`, this.user, this.httpOptions)
            .subscribe(
                (res: any) => {
                    this.getCurrentUserData();
                },
                (err: any) => {
                    alert(JSON.stringify(err.error));
                }
            );

    }

    async getEmployees(pagination: number) {
        await this.http.get(`${environment.apiUrl}/employee/${pagination}`, this.httpOptions)
            .subscribe(
                (res: any) => {
                    this.employees = res.body;
                },
                (err: any) => {
                    alert(JSON.stringify(err.error));
                }
            );
    }

    async paginationDecrease() {
        if (this.search === false) {
            this.pagination -= await 10;
            this.getEmployees(this.pagination);
        } else {
            this.pagination -= await 10;
            this.getEmployeesByParams(this.pagination);
        }
    }

    async paginationIncrease() {
        if (this.search === false) {
            this.pagination += await 10;
            this.getEmployees(this.pagination);
        } else {
            this.pagination += await 10;
            this.getEmployeesByParams(this.pagination);
        }
    }

    async getSelectedEmployee(employee: Employee) {
        this.selectedEmployee = employee;
        console.log(this.selectedEmployee);
    }

    async createEmployeeRequest() {
        await delete this.selectedEmployee._id;
        console.log(this.selectedEmployee);
        await this.http.post(`${environment.apiUrl}/employee`, this.selectedEmployee, this.httpOptions)
            .subscribe(
                (res: any) => {
                    alert(`Employee created successfully`);
                },
                (err: any) => {
                    if (err.error.statusCode === 400) {
                        for (const message of err.error.message) {
                            alert(JSON.stringify(message.constraints));
                        }
                    } else {
                        alert(JSON.stringify(err.error));
                    }
                }
            );
    }

    async updateEmployeeRequest() {
        const requestId = await this.selectedEmployee._id;
        await delete this.selectedEmployee._id;
        const requestObj = {
            id: requestId,
            properties: this.selectedEmployee,
        };
        await this.http.put(`${environment.apiUrl}/employee`, requestObj, this.httpOptions)
            .subscribe(
                (res: any) => {
                    alert(`Employee updated successfully!`);
                    this.selectedEmployee = res.body;
                    this.getEmployees(this.pagination);
                },
                (err: any) => {
                    alert(JSON.stringify(err.error));
                }
            );

    }

    async deleteEmployeeRequest() {
        await this.http.delete(`${environment.apiUrl}/employee/${this.selectedEmployee._id}`, this.httpOptions)
            .subscribe(
                (res: any) => {
                    alert(`Employee deleted successfully!`);
                    this.getEmployees(this.pagination);
                },
                (err: any) => alert(JSON.stringify(err.error))
            );
    }

    async getEmployeesByParams(pagination: number) {
        this.searchParams.pagination = this.pagination;
        this.search = true;
        const requestParams = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                authorization: this.token
            }),
            params: this.searchParams,
            observe: 'response' as 'body'
        };
        await this.http.get(`${environment.apiUrl}/employee/`, requestParams)
            .subscribe(
                (res: any) => {
                    console.log(res.body);
                    this.employees = res.body;
                    if (this.employees.length) {
                        alert(`Search results. Use pagination buttons.`);
                    } else {
                        alert(`No employees with such params`);
                    }
                },
                (err: any) => {
                    alert(JSON.stringify(err.error));
                }
            );
    }

    async stopSearching() {
        window.location.reload();
    }
}

