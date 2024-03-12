import { useState } from "react";
import Header from "./Header";
import Form from "./Form";
import List from "./List";
import Stats from "./Stats";

function App() {
  const [items, setItems] = useState([]);

  function handleAdd(newItem) {
    setItems((prev) => [...prev, newItem]);
  }
  //checked input
  function toggleItem(id) {
    setItems((items) =>
      items.map((i) => (i.id === id ? { ...i, packed: !i.packed } : i))
    );
  }

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

export default App;
