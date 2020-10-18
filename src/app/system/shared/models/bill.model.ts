export class Bill {
  constructor(
    public value: number,
    public currency: string,
    public userId: number,
    public id?: number
  ) {}
}
