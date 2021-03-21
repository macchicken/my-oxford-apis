export class Message {
  private _status: number;
  public get status(): number {
    return this._status;
  }
  public set status(value: number) {
    this._status = value;
  }
  private _content: any;
  public get content(): any {
    return this._content;
  }
  public set content(value: any) {
    this._content = value;
  }

  constructor(status: number, content: any) {
    this._status = status;
    this._content = content;
  }
}
