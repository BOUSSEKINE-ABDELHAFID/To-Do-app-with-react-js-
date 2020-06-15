import React, { useState } from "react";
import Item from "./Item";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import ReactDOM from "react-dom";
import { useSpring, animated } from "react-spring";

function ListItems({ todo, handleDelete, handleEdit, handleAdd }) {
  const [state, toggle] = useState(true);
  const { x } = useSpring({
    from: { x: 0 },
    x: state ? 1 : 0,
    config: { duration: 1000 },
  });

  return (
    <div className = "items">
      <div onClick={() => toggle(!state)}>
        <animated.div
          style={{
            opacity: x.interpolate({ range: [0, 1], output: [0.3, 1] }),
            transform: x
              .interpolate({
                range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
                output: [1, 0.97, 0.9, 1.1, 0.9, 1.1, 1.03, 1],
              })
              .interpolate((x) => `scale(${x})`),
          }}
        >
          <Fab
            color="primary"
            aria-label="add"
            className="add-btn"
            position="fixed"
            onClick={handleAdd}
          >
            <AddIcon />
          </Fab>
        </animated.div>
      </div>

      <ul>
        {todo.map((item) => (
          <Item
            key={item.id}
            item={item}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        ))}
      </ul>
    </div>
  );
}

export default ListItems;
