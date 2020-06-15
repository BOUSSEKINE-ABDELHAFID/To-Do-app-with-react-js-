import React, { useState, useEffect } from "react";
import "./App.css";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";
import InputItems from "./components/InputItems";
import ListItems from "./components/ListItems";
import uuid from "uuid";

const theme = createMuiTheme({
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
  : [];

function App() {
  const [items, setItems] = useState(todo);
  const [task, setTask] = useState("");
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(0);
  const [step, setStep] = useState(0);

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(items));
  }, [items]);

  const handleChange = (e) => {
    setTask(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (task !== "") {
      if (edit) {
        items.map((item) => {
          if (item.id === id) {
            item.content = task;
          }
        });
        setEdit(false);
      } else {
        const newTask = { content: task, id: uuid() };
        const newList = [...items, newTask];
        setItems(newList);
      }
      setTask("");
    }
    setStep((prev) => prev - 1);
  };

  const handleDelete = (id) => {
    const filteredItems = items.filter((item) => item.id !== id);
    setItems(filteredItems);
  };

  const handleEdit = (id) => {
    setEdit(true);
    const elementEdit = items.find((item) => item.id === id);
    setTask(elementEdit.content);
    setId(elementEdit.id);
    setStep((prev) => prev + 1);
  };

  const handleAdd = () => {
    setStep((prev) => prev + 1);
  };

  const stepManagments = () => {
    switch (step) {
      case 0:
        return (
          <ListItems
            todo={items}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            handleAdd={handleAdd}
          />
        );
      case 1:
        return (
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
      <ThemeProvider theme={theme}>{stepManagments()}</ThemeProvider>
    </div>
  );
}

export default App;
