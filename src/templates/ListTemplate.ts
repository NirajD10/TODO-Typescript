import FullListItem from "../model/FullListItem";

interface DOMListType {
  ul: HTMLUListElement;
  clearList(): void;
  render(fullList: FullListItem): void;
}

export default class DomList implements DOMListType {
  ul: HTMLUListElement;

  static instance: DomList = new DomList();

  private constructor() {
    this.ul = document.getElementById("lists") as HTMLUListElement;
  }

  clearList(): void {
    this.ul.innerHTML = "";
  }

  render(fullList: FullListItem): void {
    this.ul.innerHTML = "";
    fullList.list.forEach((item) => {
      const liNode = document.createElement("li") as HTMLLIElement;
      liNode.setAttribute("class", "lists-item");

      const checkDivWrapper = document.createElement("div") as HTMLDivElement;
      checkDivWrapper.setAttribute("class", "checkbox-item");

      const checkNode = document.createElement("input") as HTMLInputElement;
      checkNode.type = "checkbox";
      checkNode.checked = item.isChecked;
      checkNode.setAttribute("class", "checkbox");
      checkNode.setAttribute("id", item.id);

      checkDivWrapper.appendChild(checkNode);
      liNode.append(checkDivWrapper);

      const titleNode = document.createElement("label") as HTMLLabelElement;
      titleNode.setAttribute("class", "text-item");
      titleNode.htmlFor = item.id;
      titleNode.textContent = item.title;
      liNode.append(titleNode);

      if (item.isChecked === true) {
        titleNode.style.textDecoration = "line-through";
      } else {
        titleNode.style.textDecoration = "none";
      }

      checkNode.addEventListener("change", () => {
        item.isChecked = !item.isChecked;
        fullList.save();
        if (item.isChecked === true) {
          titleNode.style.textDecoration = "line-through";
        } else {
          titleNode.style.textDecoration = "none";
        }
      });

      const deleteDivWrapper = document.createElement("div") as HTMLDivElement;
      deleteDivWrapper.setAttribute("class", "delete-item");

      const deleteBtn = document.createElement("button") as HTMLButtonElement;
      deleteBtn.setAttribute("class", "btn-delete");
      deleteBtn.title = "Delete Item from select list";
      deleteBtn.ariaLabel = "Delete selected item";
      deleteBtn.innerHTML = `<svg
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M3 6h18"></path>
      <path
        d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
      ></path>
    </svg>`;

      deleteDivWrapper.appendChild(deleteBtn);
      liNode.append(deleteDivWrapper);

      deleteBtn.addEventListener("click", () => {
        fullList.removeItem(item.id);
        this.render(fullList);
      });

      this.ul.append(liNode);
    });
  }
}
