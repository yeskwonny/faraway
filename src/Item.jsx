export default function Item({ item, onToggle, onDelete }) {
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
