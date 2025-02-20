import { Routes } from '@angular/router';
import { HomeComponentComponent } from './components/home-component/home-component.component';
import { LoginComponent } from './components/login/login.component';
import { MenuCreationComponent } from './components/menu-creation/menu-creation.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ListMenusComponent } from './components/list-menus/list-menus.component';
import { EditMenuComponent } from './components/edit-menu/edit-menu.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

export const routes: Routes = [
    {path:'', component:HomeComponentComponent},
    {path: 'login', component:LoginComponent},
    {path:'register',component:RegisterComponent},    
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: 'create', component: MenuCreationComponent, canActivate: [AdminGuard] },
    { path: 'list', component: ListMenusComponent, canActivate: [AdminGuard] },
    { path: 'edit/:id', component: EditMenuComponent, canActivate: [AdminGuard] },
    { path: '**', redirectTo: '' }
];
