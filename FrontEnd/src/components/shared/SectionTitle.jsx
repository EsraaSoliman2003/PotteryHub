// SectionTitle.js - عنوان القسم
export default function SectionTitle({ title, subtitle, alignment = "left" }) {
  const alignmentClass = {
    left: "text-left",
    center: "text-center",
    right: "text-right"
  }[alignment];

  return (
    <div className={`mb-12 ${alignmentClass}`}>
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-slate-900 tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}