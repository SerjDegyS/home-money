export class Message {
  constructor(
    public type: string = '',
    public text: string = ''
  ) {}

  showMessage(type: string, text: string, timer = 5000) {
    this.text = text;
    this.type = type;
    setTimeout(() => this.text = '', timer);
  }
}
