export default function Select({ label, children, className = "", ...props }) {
  return (
    <label className="block text-xs mb-3">
      {label && (
        <span className="block mb-1 font-medium text-slate-700 tracking-wide">
          {label}
        </span>
      )}
      <select
        className={`w-full rounded-full border border-slate-200 bg-[#f5f4f1] px-4 py-2 text-xs text-slate-800 
        outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 ${className}`}
        {...props}
      >
        {children}
      </select>
    </label>
  );
}
