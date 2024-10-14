"use client";
import { useState, useEffect } from "react";
import Title from "./components/title";
import Sidebar from "./components/sidebar";
import ToDoList from "./components/to-do-list";
import ToDoItemData from "./interfaces/to-do-item";
import FilterStates from "./interfaces/filter-states";

export default function Home() {
  // the list of tasks and current id are stored in localStorage
  const [toDoList, setToDoList] = useState<ToDoItemData[]>(() => {
    const listData = localStorage.getItem("toDoList");
    return listData ? JSON.parse(listData) : [];
  });
  const [id, setId] = useState<number>(() => {
    const lastId = localStorage.getItem("id");
    return lastId ? parseInt(lastId) : 1;
  });
  const [filterOption, setFilterOption] = useState<FilterStates>(
    FilterStates.All
  );

  useEffect(() => {
    localStorage.setItem("toDoList", JSON.stringify(toDoList));
    localStorage.setItem("id", id.toString());
  }, [toDoList, id]);

  return (
    <div>
      <Title></Title>
      <div className="flex flex-row h-screen">
        <Sidebar
          toDoList={toDoList}
          filterOption={filterOption}
          setFilterOption={setFilterOption}
        ></Sidebar>
        <ToDoList
          toDoList={toDoList}
          id={id}
          setToDoList={setToDoList}
          setId={setId}
          filterOption={filterOption}
        ></ToDoList>
      </div>
    </div>
  );
}
