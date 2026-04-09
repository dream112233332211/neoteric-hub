import Link from "next/link";
import { Zap, GitBranch, MessageCircle, Globe2, Mail } from "lucide-react";

const footerLinks = {
  Products: [
    { label: "UI Components", href: "/products?category=components" },
    { label: "Templates", href: "/products?category=templates" },
    { label: "Developer Tools", href: "/products?category=tools" },
    { label: "APIs", href: "/products?category=apis" },
  ],
  Services: [
    { label: "Web Development", href: "/services" },
    { label: "API Architecture", href: "/services" },
    { label: "Cloud Infrastructure", href: "/services" },
    { label: "Security Audit", href: "/services" },
  ],
  Company: [
    { label: "About", href: "/" },
    { label: "Contact", href: "/" },
    { label: "Blog", href: "/" },
    { label: "Careers", href: "/" },
  ],
};

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-gray-950">
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/95 to-transparent pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 mb-8 lg:mb-0">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white">
                Neoteric<span className="text-cyan-400">.hub</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-gray-500 max-w-xs">
              The premier digital marketplace for sophisticated digital assets
              and elite programming services.
            </p>
            <div className="mt-6 flex gap-3">
              {[GitBranch, MessageCircle, Globe2, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-gray-500 hover:text-cyan-400 hover:border-cyan-500/30 transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-white">{title}</h3>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-500 hover:text-cyan-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-600">
            &copy; {new Date().getFullYear()} Neoteric Hub. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
