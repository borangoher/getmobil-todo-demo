import ToDoItem from "./to-do-item";
import ToDoItemData from "../interfaces/to-do-item";
import FilterStates from "../interfaces/filter-states";

interface ToDoListProps {
  toDoList: ToDoItemData[];
  setToDoList: (list: ToDoItemData[]) => void;
  id: number;
  setId: (id: number) => void;
  filterOption: FilterStates;
}

export default function ToDoList({
  toDoList,
  setToDoList,
  id,
  setId,
  filterOption,
}: ToDoListProps) {
  function getId(): number {
    // this is the only method used to read and update ids. incrementing id value
    // at each read ensures that we have unique identifiers.
    const currentId = id;
    setId(currentId + 1);
    return currentId;
  }

  function addItem(desc: string): void {
    // don't add empty tasks
    if (!desc) return;

    const currentId = getId();
    const newItem = { id: currentId, desc: desc, isCompleted: false };
    setToDoList([...toDoList, newItem]);
  }

  function deleteItem(itemId: number): void {
    setToDoList(
      toDoList.filter((item) => {
        return item.id !== itemId;
      })
    );
  }

  function markItemComplete(itemId: number): void {
    setToDoList(
      toDoList.map((item) => {
        return item.id !== itemId ? item : { ...item, isCompleted: true };
      })
    );
  }

  function onItemAdd(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const inputElement = (event.target as HTMLFormElement).elements.namedItem(
      "itemDesc"
    ) as HTMLInputElement;

    addItem(inputElement.value);
    inputElement.value = "";
  }

  const filteredList =
    filterOption === FilterStates.All
      ? toDoList
      : filterOption === FilterStates.Uncompleted
      ? toDoList.filter((item) => !item.isCompleted)
      : toDoList.filter((item) => item.isCompleted);

  const itemList = filteredList.map((item) => {
    return (
      <ToDoItem
        key={item.id}
        toDoItem={item}
        markItemComplete={() => markItemComplete(item.id)}
        deleteItem={() => deleteItem(item.id)}
      ></ToDoItem>
    );
  });

  return (
    <div className="flex flex-col gap-3 p-3 w-full border bg-slate-50">
      <ul>{itemList}</ul>
      {filteredList.length <= 0 && (
        <p className="text-lg">No items matching selected filter.</p>
      )}
      <form
        id="addItemForm"
        onSubmit={onItemAdd}
        className="flex gap-3 justify-between p-3 w-6/12 border-t"
      >
        <input
          type="text"
          id="itemDesc"
          name="itemDesc"
          placeholder="Enter task description"
          className="p-2 w-8/12 rounded"
        ></input>
        <button
          type="submit"
          className="py-2 px-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
        >
          Add Task
        </button>
      </form>
    </div>
  );
}
