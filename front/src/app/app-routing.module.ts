import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {HomeComponent} from './home/home.component';
import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'home',
        component: HomeComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
        FormsModule,
        CommonModule],
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
}
