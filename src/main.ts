import "./style.css";
import ListItem from "./model/ListItem";
import FullListItem from "./model/FullListItem";
import DomList from "./templates/ListTemplate";

const initialApp = (): void => {
  const fulllistitem = FullListItem.instance;
  const templates = DomList.instance;

  const formEntryNode = document.getElementById(
    "itemEntryForm"
  ) as HTMLFormElement;
  formEntryNode.addEventListener("submit", (event: SubmitEvent) => {
    event.preventDefault();

    const input = document.getElementById("input") as HTMLInputElement;
    const newEntryText = input.value.trim();
    if (!newEntryText) return;

    const itemid: number = fulllistitem.list.length
      ? parseInt(fulllistitem.list[fulllistitem.list.length - 1].id) + 1
      : 1;

    const newItem = new ListItem(itemid.toString(), newEntryText);
    fulllistitem.addItem(newItem);
    templates.render(fulllistitem);
  });

  const clearList = document.getElementById("clear-btn") as HTMLButtonElement;
  clearList.addEventListener("click" , () => {
    fulllistitem.clearList();
    templates.render(fulllistitem);
  })

  fulllistitem.load();
  templates.render(fulllistitem);
};

document.addEventListener("DOMContentLoaded", initialApp);
