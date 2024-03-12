export default function Stats({ items }) {
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
