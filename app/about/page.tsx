export default function AboutPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-6 py-20">

        <h1 className="text-4xl font-bold text-green-800 mb-6">
          About Khushi International
        </h1>

        <p className="text-gray-700 leading-relaxed mb-6">
          Khushi International is a trusted supplier of fresh fruits and
          vegetables serving local markets and international export buyers.
          We work directly with farmers to ensure quality, freshness, and
          fair sourcing.
        </p>

        <p className="text-gray-700 leading-relaxed mb-6">
          From farm to market, our focus is on consistency, hygiene,
          and timely delivery. We supply fruits and vegetables across
          India and internationally to wholesalers, retailers, and exporters.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <Info title="🌱 Farm Direct" desc="Direct sourcing from trusted farmers" />
          <Info title="✅ Quality Assured" desc="Export & domestic grade produce" />
          <Info title="🚚 Reliable Delivery" desc="PAN India & export logistics" />
        </div>
      </div>
    </div>
  );
}

function Info({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{desc}</p>
    </div>
  );
}