import ToDoItemData from "../interfaces/to-do-item";

interface ToDoItemProps {
  toDoItem: ToDoItemData;
  markItemComplete: () => void;
  deleteItem: () => void;
}

export default function ToDoItem({
  toDoItem,
  markItemComplete,
  deleteItem,
}: ToDoItemProps) {
  return (
    <li className="flex gap-3 justify-between items-center p-3 w-6/12 border-b">
      <p
        className={
          (toDoItem.isCompleted ? "line-through" : "italic") + " text-xl"
        }
      >
        {toDoItem.desc}
      </p>
      <div className="flex gap-3 items-center">
        <button
          onClick={markItemComplete}
          className={
            (toDoItem.isCompleted
              ? "bg-gray-300"
              : "bg-blue-500 hover:bg-blue-700") +
            " text-white py-2 px-4 font-bold rounded "
          }
          disabled={toDoItem.isCompleted}
        >
          Mark as Complete
        </button>
        <button
          onClick={deleteItem}
          className="py-2 px-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
        >
          Delete Item
        </button>
      </div>
    </li>
  );
}
