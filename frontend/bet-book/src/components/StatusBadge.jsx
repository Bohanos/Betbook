export default function StatusBadge({ status }) {
  const styles = {
    won: "bg-green-500 text-white",
    lost: "bg-red-500 text-white",
    pending: "bg-yellow-500 text-black",
  };
  return (
    <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${styles[status]}`}>
      {status}
    </span>
  );
}