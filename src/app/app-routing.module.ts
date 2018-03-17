import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Page404Component } from '@app/pages';
import { SharedModule } from './modules/shared.module';


const routes: Routes = [
  { path: 'home', loadChildren: 'app/modules/home/home.module#HomeModule' },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: '404' },
  { path: '404', component: Page404Component }
];

@NgModule({
  declarations: [
    Page404Component,
  ],
  imports: [
    SharedModule,
    RouterModule.forRoot(routes, { enableTracing: true }),
  ],
  exports: [RouterModule],
  providers: [{ provide: LocationStrategy, useClass: PathLocationStrategy }]
})
export class AppRoutingModule {
}
