import { useState } from "react";

export default function Form({ onSubmit }) {
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
