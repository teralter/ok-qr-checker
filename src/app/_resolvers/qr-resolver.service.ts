import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';
import { of } from 'rxjs';
import { delay, tap, catchError, map } from 'rxjs/operators';

import { QrInfo } from '../_models/qr-info';
import { QrCheckResult } from '../_models/qr-check-result';


@Injectable({
  providedIn: 'root'
})
export class QrResolverService implements Resolve<any> {

  constructor(
    private http: HttpClient,
    private loadingCtrl: LoadingController
  ) { }

  resolve(route: ActivatedRouteSnapshot) {
    const qrCode = route.paramMap.get('qrCode');
    this.presentLoading();

    // const qrInfo: QrInfo = {
    //   companyId: 9733,
    //   companyName: 'ООО АСКОН, г. ВОРОНЕЖ',
    //   factoryName: 'ОАО "Красный Октябрь"',
    //   invoiceDate: new Date('2018-11-27T00:00:00'),
    //   orderNumber: 'ЗК18-093779',
    //   prodDate: new Date('2018-11-04T00:00:00'),
    //   qrCode: 'КО01174КО112042041118319814',
    //   sku: 'КО01174K547',
    //   skuName: 'ШОКОЛАД_Аленка_шоу_б_1/100'
    // };

    // return of(new QrCheckResult(qrCode, qrInfo, null))
    //   .pipe(
    //     delay(1000),
    //     tap(() => this.loadingCtrl.dismiss()),
    //     // tap(() => { throw new Error('not found'); }),
    //     catchError(() => {
    //       return of(new QrCheckResult(qrCode, null, 'QR код не найден.'));
    //     })
    //   );

    return this.http.get<QrInfo>(`https://dashboard.gutagroup.ru/api/qr/qr-info?qrCode=${qrCode}`)
      .pipe(
        map((result) => new QrCheckResult(qrCode, result, null)),
        catchError(() => {
          return of(new QrCheckResult(qrCode, null, 'Информация по данному QR не доступна'));
        })
      )
      .pipe(
        tap(() => this.loadingCtrl.dismiss()),
      );
  }

  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      spinner: null,
      message: 'Загрузка...'
    });
    return await loading.present();
  }
}
