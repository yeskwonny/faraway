import { useState } from "react";

function App() {
  const [items, setItems] = useState([]);
  //add item
  function handleAdd(newItem) {
    setItems((prev) => [...prev, newItem]);
  }
  //checked input
  function toggleItem(id) {
    setItems((items) =>
      items.map((i) => (i.id === id ? { ...i, packed: !i.packed } : i))
    );
  }
  //Delete item
  function deleteItem(id) {
    setItems((items) => items.filter((i) => i.id !== id));
  }

  function clearList() {
    setItems([]);
  }

  return (
    <div className="app">
      <Header />
      <Form onSubmit={handleAdd} />
      <List
        items={items}
        onToggle={toggleItem}
        onDelete={deleteItem}
        onClear={clearList}
      />
      <Stats items={items} />
    </div>
  );
}

function Header() {
  return <h1>Far AWAY</h1>;
}

function Form({ onSubmit }) {
  const [qty, setQTY] = useState(1);
  const [description, setDescription] = useState("");

  // handle submit button and create new item
  function handleSubmit(e) {
    if (!description) return;
    e.preventDefault();

    const newItem = {
      id: Date.now(),
      qty: qty,
      description: description,
      packed: false,
    };
    //create new item and push in the array
    onSubmit(newItem);
    //clear the input
    setDescription("");
    setQTY(1);
  }
  return (
    <form className="add-form ">
      <h3>What do you need for your trip?</h3>
      {/* create select option  */}
      <select value={qty} onChange={(e) => setQTY(Number(e.target.value))}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></input>
      <button onClick={(e) => handleSubmit(e)}>ADD</button>
    </form>
  );
}

function List({ items, onToggle, onDelete, onClear }) {
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

function Item({ item, onToggle, onDelete }) {
  return (
    <li>
      <input type="checkbox" onChange={() => onToggle(item.id)} />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.qty} {item.description}
      </span>
      <button onClick={() => onDelete(item.id)}>❌</button>
    </li>
  );
}
function Stats({ items }) {
  const numItem = items.length;
  const packedItem = items.filter((i) => i.packed).length;
  const percentage = Math.round((packedItem / numItem) * 100);
  if (!items.length) {
    return <footer className="stats">Are you ready to pack?</footer>;
  }
  return (
    <footer className="stats">
      {percentage === 100
        ? "Time to leave!!!"
        : `You have ${numItem} item and packed ${packedItem} (${percentage}%) of total`}
    </footer>
  );
}

export default App;

