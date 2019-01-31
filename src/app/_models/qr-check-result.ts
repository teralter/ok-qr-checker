import { QrInfo } from './qr-info';

export class QrCheckResult {
  constructor(
    public code: string,
    public data: QrInfo,
    public message: string
  ) { }
}
