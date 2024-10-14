// every to-do item is made up of a unique id, a description, and completion status
export default interface ToDoItemData {
  id: number;
  isCompleted: boolean;
  desc: string;
}
