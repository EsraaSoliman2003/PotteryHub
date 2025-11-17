// EmptyState.js - مكون جديد للدولة الفارغة
export default function EmptyState({ title, text, icon = "🔍" }) {
  return (
    <div className="text-center py-16 lg:py-24">
      <div className="text-6xl mb-6">{icon}</div>
      <h3 className="text-2xl font-light text-slate-800 mb-3">{title}</h3>
      <p className="text-slate-600 max-w-md mx-auto">{text}</p>
    </div>
  );
}