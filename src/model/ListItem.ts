interface ListItemType {
  id: string;
  title: string;
  isChecked: boolean;
}

export default class ListItem implements ListItemType {
  constructor(
    private _id: string = "",
    private _title: string = "",
    private _isChecked: boolean = false
  ) {}

   get id() {
    return this._id;
  }

   set id(id: string) {
    this._id = id;
  }

   get title() {
    return this._title;
  }

   set title(title: string) {
    this._title = title;
  }

   get isChecked() {
    return this._isChecked;
  }

   set isChecked(isChecked: boolean) {
    this._isChecked = isChecked;
  }
}
