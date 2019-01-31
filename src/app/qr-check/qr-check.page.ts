import { Component, OnInit } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-qr-check',
  templateUrl: './qr-check.page.html',
  styleUrls: ['./qr-check.page.scss'],
})
export class QrCheckPage implements OnInit {
  isScanning: boolean;

  constructor(
    private platform: Platform,
    private router: Router,
    private qrScanner: QRScanner,
    private vibration: Vibration
  ) { }

  ngOnInit() {
    this.isScanning = true;
    this.platform.ready().then(() => {
      this.qrScanner.prepare()
        .then(() => {
          this.scan();
        });
    });
  }

  ionViewDidEnter() {
    if (!this.isScanning) {
      this.isScanning = true;
      this.scan();
    }

  }

  scan() {
    this.qrScanner.scan().subscribe(async (text: string) => {
      const code = text.replace('http://www.shop.alenka.ru/', '');
      this.isScanning = false;
      this.vibration.vibrate(300);
      this.router.navigate(['/qr-info', code]);
    });

    this.qrScanner.show();
  }
}
