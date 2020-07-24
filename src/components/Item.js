import React from "react";
import { MdDelete, MdEdit } from "react-icons/md";
//an item
function Item({ item, handleDelete, handleEdit }) {
  return (
    <div>
      <li>
        <div>
          <span>{item.content}</span>
        </div>
        <div>
          <button className="btn edit-btn" onClick={() => handleEdit(item.id)}>
            <MdEdit />
          </button>
          <button
            className="btn delete-btn"
            onClick={() => handleDelete(item.id)}
          >
            <MdDelete />
          </button>
        </div>
      </li>
    </div>
  );
}

export default Item;
