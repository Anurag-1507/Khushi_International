import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-green-800 text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* BRAND */}
        <div>
          <h2 className="text-xl font-bold mb-3">
            🍎🥕 Khushi International
          </h2>
          <p className="text-sm text-green-100">
            Fresh Fruits & Vegetables <br />
            Local Market • Export Quality
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-green-100">
            <li>
              <Link href="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link href="/shop" className="hover:underline">
                Shop
              </Link>
            </li>
            <li>
              <Link href="/account" className="hover:underline">
                My Account
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:underline">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="font-semibold mb-3">Contact</h3>
          <p className="text-sm text-green-100">
            📍 Maharashtra, India
          </p>
          <p className="text-sm text-green-100">
  📞 <a href="tel:+917028237058" className="hover:underline">
    +91 7028237058
  </a>
</p>
          <p className="text-sm text-green-100">
            📧 info@khushiinternational.com
          </p>
        </div>

        {/* TRUST */}
        <div>
          <h3 className="font-semibold mb-3">Why Choose Us</h3>
          <ul className="space-y-2 text-sm text-green-100">
            <li>✅ Farm Direct Products</li>
            <li>✅ Quality Checked</li>
            <li>✅ PAN India Delivery</li>
            <li>✅ Export Specialists</li>
          </ul>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-green-700 py-4 text-center text-sm text-green-200">
        © {new Date().getFullYear()} Khushi International. All rights reserved.
      </div>
    </footer>
  );
}