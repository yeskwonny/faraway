import { useState } from "react";
import Item from "./Item";

export default function List({ items, onToggle, onDelete, onClear }) {
  const [sortedBy, setSortedBy] = useState("input");
  let sortedList = [];
  //sort by input default
  if (sortedBy === "input") {
    sortedList = items;
  }
  //sort by alphabet
  if (sortedBy === "description") {
    sortedList = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  }
  //sort by packing
  if (sortedBy === "packed") {
    sortedList = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  }
  if (!items) return;

  return (
    <div className="list">
      <ul>
        {sortedList.map((item) => (
          <Item
            key={item.id}
            item={item}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))}
      </ul>
      <div className="action">
        <select onChange={(e) => setSortedBy(e.target.value)}>
          <option value="input">sort by input</option>
          <option value="description">sort by description</option>
          <option value="packed">sort by packing</option>
        </select>
        <button onClick={onClear}>Clear</button>
      </div>
    </div>
  );
}
