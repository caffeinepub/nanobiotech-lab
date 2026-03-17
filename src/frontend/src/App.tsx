import {
  BookOpen,
  FlaskConical,
  Layers,
  Mail,
  Phone,
  PhoneCall,
  Truck,
  Wrench,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

type Section =
  | "home"
  | "about"
  | "projects"
  | "publications"
  | "services"
  | "logistics"
  | "contact";

const serviceTools = [
  {
    id: "ftir",
    emoji: "🔬",
    label: "FTIR",
    href: "https://forms.gle/hDMMwZGsU4D1Ed7L6",
    bg: "#4dabf7",
  },
  {
    id: "contact_angle",
    emoji: "📐",
    label: "Contact Angle",
    href: "https://forms.gle/AkdvJvcfmfXNyBnW6",
    bg: "#9775fa",
  },
  {
    id: "lyo",
    emoji: "❄️",
    label: "Lyophilizer",
    href: "https://forms.gle/1d4sgsG1Qc7mhGXY7",
    bg: "#20c997",
  },
  {
    id: "sonicator",
    emoji: "🔊",
    label: "Probe Sonicator",
    href: "https://forms.gle/eHnH8NZJ1dP2WHpB9",
    bg: "#fd7e14",
  },
  {
    id: "zeta",
    emoji: "⚛️",
    label: "Zetasizer",
    href: "https://forms.gle/RnP51CkJq13QW4a79",
    bg: "#12b886",
  },
];

const logisticsTools = [
  {
    id: "chemicals",
    emoji: "🧪",
    label: "Chemicals",
    href: "https://docs.google.com/spreadsheets/d/127aRtlugmYL_1h5886KKk3BjuySBllQGEdZDYIlu9p0/edit?usp=sharing",
    bg: "#ff6b6b",
    description: "Chemical Issue Reporting",
  },
  {
    id: "plasticwares",
    emoji: "🧴",
    label: "Plasticwares",
    href: "#",
    bg: "#748ffc",
    description: "Coming Soon",
  },
  {
    id: "glasswares",
    emoji: "🧫",
    label: "Glasswares",
    href: "#",
    bg: "#38d9a9",
    description: "Coming Soon",
  },
];

const navItems: { id: Section; label: string; icon: React.ReactNode }[] = [
  { id: "about", label: "About", icon: <BookOpen size={16} /> },
  { id: "projects", label: "Projects", icon: <Layers size={16} /> },
  {
    id: "publications",
    label: "Publications & Patents",
    icon: <FlaskConical size={16} />,
  },
  { id: "services", label: "Services", icon: <Wrench size={16} /> },
  { id: "logistics", label: "Logistics", icon: <Truck size={16} /> },
  { id: "contact", label: "Contact", icon: <PhoneCall size={16} /> },
];

export default function App() {
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [contactOpen, setContactOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (id: Section) => {
    if (id === "contact") {
      setContactOpen(true);
    } else {
      setActiveSection(id);
    }
    setMobileMenuOpen(false);
  };

  return (
    <div
      style={{ background: "#eef2f3", minHeight: "100vh" }}
      className="flex flex-col"
    >
      {/* Header */}
      <header
        style={{ background: "#0b5ed7" }}
        className="text-white px-4 py-3 shadow-md"
      >
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          {/* Left Logo */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <img
              src="/assets/generated/logo-bio.dim_300x300.png"
              alt="Nanobiotech Lab Logo"
              style={{
                width: 56,
                height: 56,
                objectFit: "contain",
                borderRadius: 8,
                background: "white",
                padding: 4,
              }}
            />
            <div>
              <h1
                style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
                className="text-lg font-bold leading-tight"
              >
                Nanobiotech Lab
              </h1>
              <p className="text-xs text-blue-200 leading-tight">
                MIT-ADT University, Pune
              </p>
            </div>
          </div>

          {/* Right Logo */}
          <div className="flex-shrink-0">
            <img
              src="/assets/uploads/mitbio_logo.png-1.png"
              alt="MIT-ADTU Bioengineering"
              style={{
                height: 56,
                objectFit: "contain",
                background: "white",
                borderRadius: 8,
                padding: 4,
              }}
            />
          </div>
        </div>
      </header>

      {/* Navigation Bar */}
      <nav style={{ background: "#1971c2" }} className="shadow-sm">
        <div className="max-w-5xl mx-auto">
          {/* Desktop nav */}
          <div className="hidden md:flex items-center overflow-x-auto">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNav(item.id)}
                className={`flex items-center gap-1.5 px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${
                  activeSection === item.id
                    ? "text-white border-b-2 border-white bg-blue-900/30"
                    : "text-blue-100 hover:text-white hover:bg-blue-800/40"
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile nav toggle */}
          <div className="md:hidden flex items-center justify-between px-4 py-2">
            <span className="text-blue-100 text-sm font-medium">
              {activeSection === "home"
                ? "Menu"
                : (navItems.find((n) => n.id === activeSection)?.label ??
                  "Menu")}
            </span>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="text-white p-1"
            >
              <div className="w-5 h-0.5 bg-white mb-1" />
              <div className="w-5 h-0.5 bg-white mb-1" />
              <div className="w-5 h-0.5 bg-white" />
            </button>
          </div>
          {mobileMenuOpen && (
            <div className="md:hidden flex flex-col border-t border-blue-700">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNav(item.id)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors text-left ${
                    activeSection === item.id
                      ? "text-white bg-blue-900/40"
                      : "text-blue-100 hover:text-white hover:bg-blue-800/40"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-6">
        <AnimatePresence mode="wait">
          {/* Home / default view */}
          {activeSection === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
              className="text-center py-10"
            >
              <img
                src="/assets/generated/logo-bio.dim_300x300.png"
                alt="Lab Logo"
                style={{
                  width: 120,
                  height: 120,
                  objectFit: "contain",
                  borderRadius: 12,
                  margin: "0 auto 20px",
                }}
                className="shadow-md"
              />
              <h2
                style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  color: "#0b5ed7",
                }}
                className="text-2xl font-bold mb-2"
              >
                Welcome to Nanobiotech Lab
              </h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto text-sm">
                MIT-ADT University, Pune — Your central hub for lab resources,
                equipment booking, and more.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-lg mx-auto">
                {navItems.map((item, i) => (
                  <motion.button
                    key={item.id}
                    type="button"
                    onClick={() => handleNav(item.id)}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 }}
                    style={{ background: "#0b5ed7" }}
                    className="flex flex-col items-center gap-2 text-white rounded-2xl px-3 py-5 shadow-md text-sm font-semibold"
                  >
                    <span className="text-lg">{item.icon}</span>
                    {item.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* About */}
          {activeSection === "about" && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
            >
              <h2
                style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  color: "#0b5ed7",
                }}
                className="text-xl font-bold mb-4"
              >
                About
              </h2>
              <div className="bg-white rounded-2xl p-6 shadow-md text-gray-700 text-sm leading-relaxed">
                <p>
                  The Nanobiotech Lab at MIT-ADT University is a cutting-edge
                  research facility focused on nanobiotechnology,
                  bioengineering, and interdisciplinary science. Our lab is
                  equipped with state-of-the-art instruments for advanced
                  research in nanotechnology and life sciences.
                </p>
                <p className="mt-3">
                  We work at the intersection of nanotechnology and biology to
                  develop innovative solutions for healthcare, environmental
                  monitoring, and material science.
                </p>
              </div>
            </motion.div>
          )}

          {/* Projects */}
          {activeSection === "projects" && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
            >
              <h2
                style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  color: "#0b5ed7",
                }}
                className="text-xl font-bold mb-4"
              >
                Projects
              </h2>
              <div className="bg-white rounded-2xl p-6 shadow-md text-gray-700 text-sm leading-relaxed">
                <p className="text-gray-500 italic">
                  Project details will be added here. Please contact the lab to
                  learn about ongoing and completed research projects.
                </p>
              </div>
            </motion.div>
          )}

          {/* Publications & Patents */}
          {activeSection === "publications" && (
            <motion.div
              key="publications"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
            >
              <h2
                style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  color: "#0b5ed7",
                }}
                className="text-xl font-bold mb-4"
              >
                Publications & Patents
              </h2>
              <div className="bg-white rounded-2xl p-6 shadow-md text-gray-700 text-sm leading-relaxed">
                <p className="text-gray-500 italic">
                  Publications and patent details will be listed here. Please
                  contact the lab for a full list of research outputs.
                </p>
              </div>
            </motion.div>
          )}

          {/* Services */}
          {activeSection === "services" && (
            <motion.div
              key="services"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
            >
              <h2
                style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  color: "#0b5ed7",
                }}
                className="text-xl font-bold mb-2"
              >
                Services
              </h2>
              <p className="text-gray-500 text-sm mb-5">
                Click on an instrument to book it.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {serviceTools.map((tool, i) => (
                  <motion.a
                    key={tool.id}
                    href={tool.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 }}
                    style={{ background: tool.bg }}
                    className="flex flex-col items-center justify-center text-white font-semibold text-sm rounded-2xl px-3 py-7 shadow-md cursor-pointer no-underline select-none text-center gap-2"
                  >
                    <span className="text-2xl">{tool.emoji}</span>
                    {tool.label}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}

          {/* Logistics */}
          {activeSection === "logistics" && (
            <motion.div
              key="logistics"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
            >
              <h2
                style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  color: "#0b5ed7",
                }}
                className="text-xl font-bold mb-2"
              >
                Logistics
              </h2>
              <p className="text-gray-500 text-sm mb-5">
                Manage lab supplies and consumables.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {logisticsTools.map((tool, i) => (
                  <motion.a
                    key={tool.id}
                    href={tool.href !== "#" ? tool.href : undefined}
                    onClick={
                      tool.href === "#" ? (e) => e.preventDefault() : undefined
                    }
                    target={tool.href !== "#" ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 }}
                    style={{
                      background: tool.bg,
                      opacity: tool.href === "#" ? 0.75 : 1,
                    }}
                    className="flex flex-col items-center justify-center text-white font-semibold text-sm rounded-2xl px-3 py-7 shadow-md cursor-pointer no-underline select-none text-center gap-2"
                  >
                    <span className="text-2xl">{tool.emoji}</span>
                    {tool.label}
                    {tool.href === "#" && (
                      <span className="text-xs font-normal opacity-80">
                        (Link coming soon)
                      </span>
                    )}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="text-center py-4 text-sm" style={{ color: "#555" }}>
        <p>Nanobiotech Laboratory Dashboard</p>
        <p className="mt-1">
          © {new Date().getFullYear()}.{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#0b5ed7" }}
          >
            Built with ❤️ using caffeine.ai
          </a>
        </p>
      </footer>

      {/* Contact Modal */}
      <AnimatePresence>
        {contactOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              if (e.target === e.currentTarget) setContactOpen(false);
            }}
          >
            <motion.div
              className="bg-white rounded-2xl p-6 shadow-2xl w-[90%] max-w-sm"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <div className="flex justify-between items-center mb-3">
                <h3
                  className="text-lg font-bold"
                  style={{
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                    color: "#000",
                  }}
                >
                  Lab Contact Details
                </h3>
                <button
                  type="button"
                  onClick={() => setContactOpen(false)}
                  className="text-gray-400 hover:text-gray-700 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              <hr className="mb-4" />
              <div className="flex flex-col gap-3">
                <a
                  href="tel:9284234954"
                  className="flex items-center gap-2 font-bold text-white rounded-xl px-4 py-4 no-underline transition-opacity hover:opacity-90"
                  style={{ background: "#0b5ed7" }}
                >
                  <Phone size={18} />
                  Call: 9284234954
                </a>
                <a
                  href="tel:9833691660"
                  className="flex items-center gap-2 font-bold text-white rounded-xl px-4 py-4 no-underline transition-opacity hover:opacity-90"
                  style={{ background: "#0b5ed7" }}
                >
                  <Phone size={18} />
                  Call: 9833691660
                </a>
                <a
                  href="mailto:nanobiotechlabmitbio@gmail.com"
                  className="flex items-center gap-2 font-bold text-white rounded-xl px-4 py-4 no-underline transition-opacity hover:opacity-90 break-all"
                  style={{ background: "#20c997" }}
                >
                  <Mail size={18} className="shrink-0" />
                  nanobiotechlabmitbio@gmail.com
                </a>
                <a
                  href="mailto:pradip.ivare@mituniversity.edu.in"
                  className="flex items-center gap-2 font-bold text-white rounded-xl px-4 py-4 no-underline transition-opacity hover:opacity-90 break-all"
                  style={{ background: "#20c997" }}
                >
                  <Mail size={18} className="shrink-0" />
                  pradip.ivare@mituniversity.edu.in
                </a>
                <a
                  href="mailto:preetam.bala@mituniversity.edu.in"
                  className="flex items-center gap-2 font-bold text-white rounded-xl px-4 py-4 no-underline transition-opacity hover:opacity-90 break-all"
                  style={{ background: "#20c997" }}
                >
                  <Mail size={18} className="shrink-0" />
                  preetam.bala@mituniversity.edu.in
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
