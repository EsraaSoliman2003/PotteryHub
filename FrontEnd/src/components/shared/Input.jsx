export default function Input({ label, error, className = "", ...props }) {
  return (
    <label className="block text-sm mb-3">
      {label && (
        <span className="block mb-1 font-medium text-slate-700">
          {label}
        </span>
      )}
      <input
        className={`w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${className}`}
        {...props}
      />
      {error && (
        <span className="mt-1 block text-xs text-red-500">{error}</span>
      )}
    </label>
  );
}
