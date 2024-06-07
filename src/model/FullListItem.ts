import ListItem from "./ListItem";

interface FullListItemType {
  list: ListItem[];
  save(): void;
  load(): void;
  clearList(): void;
  addItem(item: ListItem): void;
  removeItem(id: string): void;
}

export default class FullListItem implements FullListItemType {
  static instance: FullListItem = new FullListItem();

  constructor(private _list: ListItem[] = []) {}

  get list() {
    return this._list;
  }

  save(): void {
    localStorage.setItem("myList", JSON.stringify(this._list));
  }

  public load(): void {
    const storeList: string | null = localStorage.getItem("myList");
    if (typeof storeList !== "string") return;

    const parsedList: { _id: string; _title: string; _isChecked: boolean }[] =
      JSON.parse(storeList);
    parsedList.forEach((element) => {
      const newListItem = new ListItem(
        element._id,
        element._title,
        element._isChecked
      );
      FullListItem.instance.addItem(newListItem);
    });
  }

  public clearList(): void {
    this._list = [];
    this.save();
  }

  public addItem(item: ListItem): void {
    this._list.push(item);
    this.save();
  }

  public removeItem(id: string): void {
    this._list = this._list.filter((item) => item.id !== id);
    this.save();
  }
}
