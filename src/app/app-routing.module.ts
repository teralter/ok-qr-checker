import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QrResolverService } from './_resolvers/qr-resolver.service';

const routes: Routes = [
  { path: '', redirectTo: 'qr-check', pathMatch: 'full' },
  { path: 'qr-check', loadChildren: './qr-check/qr-check.module#QrCheckPageModule' },
  {
    path: 'qr-info/:qrCode',
    resolve: {
      qrCheckResult: QrResolverService,
    },
    loadChildren: './qr-info/qr-info.module#QrInfoPageModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
