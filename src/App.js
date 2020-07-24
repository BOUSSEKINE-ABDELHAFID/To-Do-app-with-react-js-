import React, { useState, useEffect } from "react";
import "./App.css";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";
import InputItems from "./components/InputItems";
import ListItems from "./components/ListItems";
import uuid from "uuid";

const theme = createMuiTheme({//customasing a material ui theme
  palette: {
    primary: {
      main: "#ffff00",
    },
    secondary: green,
  },
  status: {
    danger: "orange",
  },
});

const todo = localStorage.getItem("todo")
  ? JSON.parse(localStorage.getItem("todo"))
  : [];//using the local storage in order to not loosing the items when closing or reloading the page

function App() {
  const [items, setItems] = useState(todo);//for the items
  const [task, setTask] = useState("");//for the task
  const [edit, setEdit] = useState(false);//for the edit operation
  const [id, setId] = useState(0);//for the id
  const [step, setStep] = useState(0);//for the step that allows us to transition between the list and the item input

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(items));//loading the items from the local storage
  }, [items]);

  const handleChange = (e) => {//affecting the value to the task
    setTask(e.target.value);
  };
  const handleSubmit = (e) => {//handling the submit operation in both adding a new item or editing an existing one
    e.preventDefault();
    if (task !== "") {//if the task is not an empty string
      if (edit) {//if we are  in the case of editing an existing task
        items.map((item) => {
          if (item.id === id) {
            item.content = task;
          }
        });
        setEdit(false);
      } else {
        const newTask = { content: task, id: uuid() };//adding a new task with a uuid id 
        const newList = [...items, newTask];
        setItems(newList);
      }
      setTask("");
    }
    setStep((prev) => prev - 1);
  };

  const handleDelete = (id) => {//handling the operation of deleting an item by taking his id and then filtering the list of items
    const filteredItems = items.filter((item) => item.id !== id);
    setItems(filteredItems);
  };

  const handleEdit = (id) => {//handling the edit operation by finding the item and the replace it with the new item
    setEdit(true);
    const elementEdit = items.find((item) => item.id === id);
    setTask(elementEdit.content);
    setId(elementEdit.id);
    setStep((prev) => prev + 1);
  };

  const handleAdd = () => {//transition between the two pages
    setStep((prev) => prev + 1);
  };

  const stepManagments = () => {//this allows us to change the display between the list of items and the form where adding a new item by contronlling the step
    switch (step) {
      case 0://return the list of items
        return (
          <ListItems
            todo={items}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            handleAdd={handleAdd}
          />
        );
      case 1:
        return (//return the input items
          <InputItems
            handleChange={handleChange}
            task={task}
            handleSubmit={handleSubmit}
            edit={edit}
          />
        );

      default:
        break;
    }
  };

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
              {stepManagments()}
      </ThemeProvider>
    </div>
  );
}

export default App;
