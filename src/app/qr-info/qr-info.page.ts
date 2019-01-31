import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QrCheckResult } from '../_models/qr-check-result';
import { QrInfo } from '../_models/qr-info';

@Component({
  selector: 'app-qr-info',
  templateUrl: './qr-info.page.html',
  styleUrls: ['./qr-info.page.scss'],
})
export class QrInfoPage implements OnInit {
  qrCode: string;
  qrInfo: QrInfo;
  errorMessage: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const qrCheckResult: QrCheckResult = this.route.snapshot.data['qrCheckResult'];
    this.qrCode = qrCheckResult.code;
    this.qrInfo = qrCheckResult.data;
    this.errorMessage = qrCheckResult.message;
  }

  done() {
    this.router.navigate(['/qr-check']);
  }

}
