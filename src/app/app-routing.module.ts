import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {NotFoundComponent} from './shared/components/not-found/not-found.component';
import {AuthComponent} from './auth/auth.component';
import {HomePageComponent} from './shared/components/home-page/home-page.component';

// @ts-ignore
const routes: Routes = [
  {path: '', component: HomePageComponent, pathMatch: 'full'},
  {path: 'auth', component: AuthComponent},
  {path: 'system', loadChildren: () => import('./system/system.module').then(x => x.SystemModule)},
  {path: '**', component: NotFoundComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {}

