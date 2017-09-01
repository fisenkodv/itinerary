import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { Page404Component } from './page404/page404.component';
import { SignInComponent } from './signin/signin.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'signin', component: SignInComponent },
  { path: '**', redirectTo: '404' },
  { path: '404', component: Page404Component }
];

@NgModule({
  declarations: [Page404Component, SignInComponent],
  imports: [
    RouterModule.forRoot(routes/*,{ enableTracing: true}*/),
    TranslateModule.forChild()
  ],
  exports: [RouterModule],
  providers: [{ provide: LocationStrategy, useClass: PathLocationStrategy }]
})
export class AppRoutingModule {
}
