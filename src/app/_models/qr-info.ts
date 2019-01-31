export class QrInfo {
  constructor(
    public companyId: number,
    public companyName: string,
    public factoryName: string,
    public invoiceDate: Date,
    public orderNumber: string,
    public prodDate: Date,
    public qrCode: string,
    public sku: string,
    public skuName: string
  ) { }
}
