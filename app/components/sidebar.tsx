import ToDoItemData from "../interfaces/to-do-item";
import FilterStates from "../interfaces/filter-states";

interface sidebarProps {
  filterOption: FilterStates;
  setFilterOption: (option: FilterStates) => void;
  toDoList: ToDoItemData[];
}

export default function Sidebar({
  toDoList,
  filterOption,
  setFilterOption,
}: sidebarProps) {
  return (
    <div className="flex flex-col gap-3 p-3 w-3/12 border bg-slate-100">
      <div className="flex flex-col gap-3 p-3 border-2">
        <h2 className="text-xl text-sky-700">Show:</h2>
        <label className="flex gap-2 text-lg">
          <input
            type="radio"
            name="filters"
            value={FilterStates.All}
            checked={filterOption === FilterStates.All}
            onChange={() => setFilterOption(FilterStates.All)}
          />
          All Tasks
        </label>
        <label className="flex gap-2 text-lg">
          <input
            type="radio"
            name="filters"
            value={FilterStates.Uncompleted}
            checked={filterOption === FilterStates.Uncompleted}
            onChange={() => setFilterOption(FilterStates.Uncompleted)}
          />
          Only Uncompleted
        </label>
        <label className="flex gap-2 text-lg">
          <input
            type="radio"
            name="filters"
            value={FilterStates.Completed}
            checked={filterOption === FilterStates.Completed}
            onChange={() => setFilterOption(FilterStates.Completed)}
          />
          Only Completed
        </label>
      </div>

      <h2 className="text-xl border-b text-sky-700">Get To-do Statistics</h2>
      <p className="text-lg text-amber-700">
        Number of uncompleted tasks:{" "}
        {
          toDoList.filter((item) => {
            return !item.isCompleted;
          }).length
        }
      </p>
      <p className="text-lg text-lime-700">
        Number of completed tasks:{" "}
        {
          toDoList.filter((item) => {
            return item.isCompleted;
          }).length
        }
      </p>
      <p className="text-lg text-sky-700">
        Total number of tasks: {toDoList.length}
      </p>
    </div>
  );
}
