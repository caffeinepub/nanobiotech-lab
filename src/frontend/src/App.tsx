import {
  ArrowLeft,
  BookOpen,
  ChevronDown,
  FlaskConical,
  Home,
  Layers,
  Mail,
  MapPin,
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

const studentProjects = [
  {
    id: "proj1",
    title: "GreenNanoCure",
    subtitle:
      "Harnessing Oxidized Nano-Cellulose for advanced Medicated Bandages",
    image: "/assets/uploads/Student-project-1-4.png",
    bg: "#4dabf7",
  },
  {
    id: "proj2",
    title: "SANISAFE",
    subtitle:
      "Noval Technological Solutions for safe disposal of Menstrual waste",
    image: "/assets/uploads/Student-project-2-5.png",
    bg: "#20c997",
  },
  {
    id: "proj3",
    title: "ALFA",
    subtitle: "DEVELOPMENT OF READY TO USE FIRST AID KIT",
    image: "/assets/uploads/Student-project-3-2.png",
    bg: "#9775fa",
  },
  {
    id: "proj4",
    title: "BIOPLASTIC",
    subtitle:
      "Preparation of Biodegradable Polymeric for Bio-Medical Application",
    image: "/assets/uploads/Student-project-4-3.png",
    bg: "#fd7e14",
  },
];

type InstrumentTool = {
  id: string;
  emoji: string;
  label: string;
  bookingHref: string;
  infoImage: string | null;
  sopHref: string | null;
  bg: string;
};

const instrumentTools: InstrumentTool[] = [
  {
    id: "ftir",
    emoji: "🔬",
    label: "FTIR",
    bookingHref: "https://forms.gle/hDMMwZGsU4D1Ed7L6",
    infoImage: "/assets/uploads/FTIR-1.png",
    sopHref:
      "https://docs.google.com/document/d/1HRA2q6woUx-yhExKqjOqE7kBdxSN6JSx/edit?usp=sharing&ouid=115405116506700249547&rtpof=true&sd=true",
    bg: "#4dabf7",
  },
  {
    id: "contact_angle",
    emoji: "📐",
    label: "Contact Angle",
    bookingHref: "https://forms.gle/AkdvJvcfmfXNyBnW6",
    infoImage: "/assets/uploads/Contact-angle-2.png",
    sopHref:
      "https://docs.google.com/document/d/11iQ0-JoNKxRKF4fkrDRp8NEPZR_mJoo0/edit?usp=sharing&ouid=115405116506700249547&rtpof=true&sd=true",
    bg: "#9775fa",
  },
  {
    id: "lyo",
    emoji: "❄️",
    label: "Lyophilizer",
    bookingHref: "https://forms.gle/1d4sgsG1Qc7mhGXY7",
    infoImage: "/assets/uploads/Lyophilizer-vacuum-concentrator-3.png",
    sopHref:
      "https://docs.google.com/document/d/12M50mCDskSvB70EeFtGLRcVgCez2vHKp/edit?usp=sharing&ouid=115405116506700249547&rtpof=true&sd=true",
    bg: "#20c997",
  },
  {
    id: "sonicator",
    emoji: "🔊",
    label: "Probe Sonicator",
    bookingHref: "https://forms.gle/eHnH8NZJ1dP2WHpB9",
    infoImage: "/assets/uploads/Probe-sonicator-4.png",
    sopHref:
      "https://docs.google.com/document/d/1gc9swXp8XZmcPjXfoslw-v068gqNsRZ2/edit?usp=sharing&ouid=115405116506700249547&rtpof=true&sd=true",
    bg: "#fd7e14",
  },
  {
    id: "zeta",
    emoji: "⚛️",
    label: "Zetasizer",
    bookingHref: "https://forms.gle/RnP51CkJq13QW4a79",
    infoImage: null,
    sopHref: null,
    bg: "#12b886",
  },
];

const LAB_SOP_DOC_ID = "1U3EDIqQfNZA8dJDbmBNUE9Kp-2MpD7zpru9m6lhyIE8";
const labSopPdfEmbedUrl = `https://docs.google.com/document/d/${LAB_SOP_DOC_ID}/preview`;
const labSopHref =
  "https://docs.google.com/document/d/1U3EDIqQfNZA8dJDbmBNUE9Kp-2MpD7zpru9m6lhyIE8/edit?usp=sharing";

const logisticsTools = [
  {
    id: "chemicals",
    emoji: "🧪",
    label: "Chemicals",
    href: "https://docs.google.com/spreadsheets/d/127aRtlugmYL_1h5886KKk3BjuySBllQGEdZDYIlu9p0/edit?usp=sharing",
    bg: "#ff6b6b",
  },
  {
    id: "plasticwares",
    emoji: "🧴",
    label: "Plasticwares",
    href: "#",
    bg: "#748ffc",
  },
  {
    id: "glasswares",
    emoji: "🧫",
    label: "Glasswares",
    href: "#",
    bg: "#38d9a9",
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
  const [selectedProject, setSelectedProject] = useState<
    (typeof studentProjects)[0] | null
  >(null);
  const [selectedInstrument, setSelectedInstrument] =
    useState<InstrumentTool | null>(null);
  const [infoImageOpen, setInfoImageOpen] = useState(false);
  const [showLabSop, setShowLabSop] = useState(false);

  // About accordion state
  const [aboutOpen, setAboutOpen] = useState<Record<string, boolean>>({});
  const toggleAbout = (key: string) =>
    setAboutOpen((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleNav = (id: Section) => {
    if (id === "contact") {
      setContactOpen(true);
    } else {
      setActiveSection(id);
      setSelectedInstrument(null);
      setShowLabSop(false);
    }
    setMobileMenuOpen(false);
  };

  const goHome = () => {
    setActiveSection("home");
    setSelectedInstrument(null);
    setShowLabSop(false);
  };

  return (
    <div
      style={{ background: "#eef2f3", minHeight: "100vh" }}
      className="flex flex-col"
    >
      {/* Keyframe styles */}
      <style>{`
        @keyframes noteGlow {
          0%, 100% { text-shadow: 0 0 4px rgba(245,158,11,0.3), 0 0 8px rgba(245,158,11,0.15); }
          50% { text-shadow: 0 0 10px rgba(245,158,11,0.7), 0 0 20px rgba(245,158,11,0.35); }
        }
        .note-glow {
          animation: noteGlow 2.5s ease-in-out infinite;
        }
        .accordion-content {
          overflow: hidden;
          transition: max-height 0.4s ease, opacity 0.3s ease;
        }
        .accordion-content.open {
          max-height: 2000px;
          opacity: 1;
        }
        .accordion-content.closed {
          max-height: 0;
          opacity: 0;
        }
      `}</style>

      {/* Header */}
      <header
        style={{ background: "#0b5ed7" }}
        className="text-white px-4 py-3 shadow-md"
      >
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-shrink-0">
            <img
              src="/assets/uploads/NBL-logo-1-1.png"
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
          <div className="hidden md:flex items-center overflow-x-auto">
            <button
              type="button"
              onClick={goHome}
              className={`flex items-center gap-1.5 px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${
                activeSection === "home"
                  ? "text-white border-b-2 border-white bg-blue-900/30"
                  : "text-blue-100 hover:text-white hover:bg-blue-800/40"
              }`}
            >
              <Home size={16} />
              Home
            </button>
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
              <button
                type="button"
                onClick={goHome}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors text-left ${
                  activeSection === "home"
                    ? "text-white bg-blue-900/40"
                    : "text-blue-100 hover:text-white hover:bg-blue-800/40"
                }`}
              >
                <Home size={16} />
                Home
              </button>
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
          {/* Home */}
          {activeSection === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
              className="text-center py-10"
              style={{ position: "relative" }}
            >
              {/* Watermark */}
              <div
                style={{
                  position: "fixed",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 380,
                  height: 380,
                  backgroundImage: "url('/assets/uploads/NBL-logo-1-1.png')",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  opacity: 0.06,
                  pointerEvents: "none",
                  zIndex: 0,
                }}
              />

              <div style={{ position: "relative", zIndex: 1 }}>
                <img
                  src="/assets/uploads/NBL-logo-1-1.png"
                  alt="Lab Logo"
                  style={{
                    width: 180,
                    height: 180,
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
                <p className="text-gray-600 mb-6 max-w-md mx-auto text-sm">
                  MIT-ADT University, Pune — Your central hub for lab resources,
                  equipment booking, and more.
                </p>

                {/* Note - plain bold text with glow animation, no box */}
                <div className="max-w-lg mx-auto mb-8 text-center">
                  <p
                    className="font-bold text-sm mb-2 note-glow"
                    style={{ color: "#92400e" }}
                  >
                    <span style={{ color: "#b45309" }}>Note:-</span> If you wish
                    to book a slot for instrument usage, please click on the{" "}
                    <strong style={{ color: "#0b5ed7" }}>"Services"</strong>{" "}
                    option.
                  </p>
                  <p
                    className="font-bold text-sm note-glow"
                    style={{ color: "#92400e", animationDelay: "1.25s" }}
                  >
                    <span style={{ fontStyle: "italic", color: "#b45309" }}>
                      For internal use only:
                    </span>{" "}
                    If you need to issue chemicals, glassware, or plasticware
                    (consumables), please click on the{" "}
                    <strong style={{ color: "#0b5ed7" }}>"Logistics"</strong>{" "}
                    option.
                  </p>
                </div>

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
              <button
                type="button"
                onClick={goHome}
                className="flex items-center gap-1.5 text-blue-600 text-sm font-medium mb-4 hover:underline"
              >
                <Home size={15} /> Home
              </button>
              <h2
                style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  color: "#0b5ed7",
                }}
                className="text-xl font-bold mb-4"
              >
                About
              </h2>
              <div className="bg-white rounded-2xl p-6 shadow-md text-gray-700 text-sm leading-relaxed mb-5">
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

              {/* Accordion: Laboratory Details */}
              <div className="mb-3 rounded-2xl shadow-md overflow-hidden border border-blue-100">
                <button
                  type="button"
                  onClick={() => toggleAbout("lab")}
                  className="w-full flex items-center justify-between px-5 py-4 bg-white hover:bg-blue-50 transition-colors"
                >
                  <span
                    style={{
                      color: "#1971c2",
                      fontFamily: "'Bricolage Grotesque', sans-serif",
                      fontWeight: 700,
                      fontSize: "0.95rem",
                    }}
                  >
                    🔬 Laboratory Details
                  </span>
                  <motion.span
                    animate={{ rotate: aboutOpen.lab ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    style={{ color: "#1971c2", display: "flex" }}
                  >
                    <ChevronDown size={20} />
                  </motion.span>
                </button>
                <div
                  className={`accordion-content ${
                    aboutOpen.lab ? "open" : "closed"
                  }`}
                >
                  <div className="bg-white px-0 pb-0">
                    <img
                      src="/assets/uploads/Laboratory-details-1.png"
                      alt="Laboratory Details"
                      style={{ width: "100%", display: "block" }}
                    />
                  </div>
                </div>
              </div>

              {/* Accordion: Course Work */}
              <div className="rounded-2xl shadow-md overflow-hidden border border-blue-100">
                <button
                  type="button"
                  onClick={() => toggleAbout("course")}
                  className="w-full flex items-center justify-between px-5 py-4 bg-white hover:bg-blue-50 transition-colors"
                >
                  <span
                    style={{
                      color: "#1971c2",
                      fontFamily: "'Bricolage Grotesque', sans-serif",
                      fontWeight: 700,
                      fontSize: "0.95rem",
                    }}
                  >
                    📚 Course Work
                  </span>
                  <motion.span
                    animate={{ rotate: aboutOpen.course ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    style={{ color: "#1971c2", display: "flex" }}
                  >
                    <ChevronDown size={20} />
                  </motion.span>
                </button>
                <div
                  className={`accordion-content ${
                    aboutOpen.course ? "open" : "closed"
                  }`}
                >
                  <div className="bg-white px-0 pb-0">
                    <img
                      src="/assets/uploads/courcework-6.png"
                      alt="Nanobiotechnology Course BT603"
                      style={{ width: "100%", display: "block" }}
                    />
                  </div>
                </div>
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
              <button
                type="button"
                onClick={goHome}
                className="flex items-center gap-1.5 text-blue-600 text-sm font-medium mb-4 hover:underline"
              >
                <Home size={15} /> Home
              </button>
              <h2
                style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  color: "#0b5ed7",
                }}
                className="text-xl font-bold mb-2"
              >
                Student Projects
              </h2>
              <p className="text-gray-500 text-sm mb-5">
                Click on a project to view details.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {studentProjects.map((proj, i) => (
                  <motion.button
                    key={proj.id}
                    type="button"
                    onClick={() => setSelectedProject(proj)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className="rounded-2xl overflow-hidden shadow-md text-left cursor-pointer border-0 p-0 bg-transparent"
                  >
                    <div style={{ background: proj.bg }} className="px-4 py-3">
                      <p className="text-white font-bold text-sm leading-snug">
                        {proj.title}
                      </p>
                      <p className="text-white/80 text-xs mt-1">
                        {proj.subtitle}
                      </p>
                    </div>
                    <div className="bg-white">
                      <img
                        src={proj.image}
                        alt={proj.title}
                        style={{
                          width: "100%",
                          maxHeight: 220,
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                    </div>
                  </motion.button>
                ))}
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
              <button
                type="button"
                onClick={goHome}
                className="flex items-center gap-1.5 text-blue-600 text-sm font-medium mb-4 hover:underline"
              >
                <Home size={15} /> Home
              </button>
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
              <button
                type="button"
                onClick={goHome}
                className="flex items-center gap-1.5 text-blue-600 text-sm font-medium mb-4 hover:underline"
              >
                <Home size={15} /> Home
              </button>

              {/* Lab SOP inline PDF view */}
              {showLabSop ? (
                <div>
                  <button
                    type="button"
                    onClick={() => setShowLabSop(false)}
                    className="flex items-center gap-1.5 text-gray-500 text-sm font-medium mb-4 hover:underline"
                  >
                    <ArrowLeft size={15} /> Back to Services
                  </button>
                  <div className="flex items-center justify-between mb-3">
                    <h2
                      style={{
                        fontFamily: "'Bricolage Grotesque', sans-serif",
                        color: "#0b5ed7",
                      }}
                      className="text-xl font-bold"
                    >
                      📖 Lab SOP
                    </h2>
                    <a
                      href={labSopHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ background: "#845ef7" }}
                      className="flex items-center gap-1.5 text-white text-xs font-semibold px-3 py-2 rounded-xl no-underline hover:opacity-90 transition-opacity"
                    >
                      Open in Google Docs ↗
                    </a>
                  </div>
                  <div
                    className="bg-white rounded-2xl shadow-md overflow-hidden"
                    style={{ height: "80vh" }}
                  >
                    <iframe
                      src={labSopPdfEmbedUrl}
                      title="Lab SOP"
                      style={{
                        width: "100%",
                        height: "100%",
                        border: "none",
                        display: "block",
                      }}
                      allow="fullscreen"
                    />
                  </div>
                </div>
              ) : selectedInstrument ? (
                <div>
                  <button
                    type="button"
                    onClick={() => setSelectedInstrument(null)}
                    className="flex items-center gap-1.5 text-gray-500 text-sm font-medium mb-4 hover:underline"
                  >
                    <ArrowLeft size={15} /> Back to Services
                  </button>
                  <h2
                    style={{
                      fontFamily: "'Bricolage Grotesque', sans-serif",
                      color: "#0b5ed7",
                    }}
                    className="text-xl font-bold mb-5"
                  >
                    {selectedInstrument.emoji} {selectedInstrument.label}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <motion.a
                      href={selectedInstrument.bookingHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                      style={{ background: selectedInstrument.bg }}
                      className="flex flex-col items-center justify-center text-white font-semibold text-sm rounded-2xl px-3 py-8 shadow-md cursor-pointer no-underline text-center gap-2"
                    >
                      <span className="text-3xl">📅</span>
                      {selectedInstrument.label} Instrument Booking
                    </motion.a>

                    {selectedInstrument.infoImage ? (
                      <motion.button
                        type="button"
                        onClick={() => setInfoImageOpen(true)}
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        style={{ background: "#1971c2" }}
                        className="flex flex-col items-center justify-center text-white font-semibold text-sm rounded-2xl px-3 py-8 shadow-md cursor-pointer text-center gap-2"
                      >
                        <span className="text-3xl">ℹ️</span>
                        Instrument Information
                      </motion.button>
                    ) : (
                      <div
                        style={{ background: "#adb5bd" }}
                        className="flex flex-col items-center justify-center text-white font-semibold text-sm rounded-2xl px-3 py-8 shadow-md text-center gap-2 opacity-70"
                      >
                        <span className="text-3xl">ℹ️</span>
                        Instrument Information
                        <span className="text-xs font-normal">
                          (Coming soon)
                        </span>
                      </div>
                    )}

                    {selectedInstrument.sopHref ? (
                      <motion.a
                        href={selectedInstrument.sopHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        style={{ background: "#e67700" }}
                        className="flex flex-col items-center justify-center text-white font-semibold text-sm rounded-2xl px-3 py-8 shadow-md cursor-pointer no-underline text-center gap-2"
                      >
                        <span className="text-3xl">📋</span>
                        Instrument SOP
                      </motion.a>
                    ) : (
                      <div
                        style={{ background: "#adb5bd" }}
                        className="flex flex-col items-center justify-center text-white font-semibold text-sm rounded-2xl px-3 py-8 shadow-md text-center gap-2 opacity-70"
                      >
                        <span className="text-3xl">📋</span>
                        Instrument SOP
                        <span className="text-xs font-normal">
                          (Coming soon)
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div>
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
                    Click on an instrument to explore booking, information, and
                    SOP.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {instrumentTools.map((tool, i) => (
                      <motion.button
                        key={tool.id}
                        type="button"
                        onClick={() => setSelectedInstrument(tool)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.07 }}
                        style={{ background: tool.bg }}
                        className="flex flex-col items-center justify-center text-white font-semibold text-sm rounded-2xl px-3 py-7 shadow-md cursor-pointer select-none text-center gap-2"
                      >
                        <span className="text-2xl">{tool.emoji}</span>
                        {tool.label}
                      </motion.button>
                    ))}
                    {/* Lab SOP button — opens inline PDF viewer */}
                    <motion.button
                      type="button"
                      onClick={() => setShowLabSop(true)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.97 }}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: instrumentTools.length * 0.07 }}
                      style={{ background: "#845ef7" }}
                      className="flex flex-col items-center justify-center text-white font-semibold text-sm rounded-2xl px-3 py-7 shadow-md cursor-pointer select-none text-center gap-2"
                    >
                      <span className="text-2xl">📖</span>
                      Lab SOP
                    </motion.button>
                  </div>
                </div>
              )}
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
              <button
                type="button"
                onClick={goHome}
                className="flex items-center gap-1.5 text-blue-600 text-sm font-medium mb-4 hover:underline"
              >
                <Home size={15} /> Home
              </button>
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
                  <Phone size={18} /> Call: 9284234954
                </a>
                <a
                  href="tel:9833691660"
                  className="flex items-center gap-2 font-bold text-white rounded-xl px-4 py-4 no-underline transition-opacity hover:opacity-90"
                  style={{ background: "#0b5ed7" }}
                >
                  <Phone size={18} /> Call: 9833691660
                </a>
                <a
                  href="mailto:nanobiotechlabmitbio@gmail.com"
                  className="flex items-center gap-2 font-bold text-white rounded-xl px-4 py-4 no-underline transition-opacity hover:opacity-90 break-all"
                  style={{ background: "#20c997" }}
                >
                  <Mail size={18} className="shrink-0" />{" "}
                  nanobiotechlabmitbio@gmail.com
                </a>
                <a
                  href="mailto:pradip.ivare@mituniversity.edu.in"
                  className="flex items-center gap-2 font-bold text-white rounded-xl px-4 py-4 no-underline transition-opacity hover:opacity-90 break-all"
                  style={{ background: "#20c997" }}
                >
                  <Mail size={18} className="shrink-0" />{" "}
                  pradip.ivare@mituniversity.edu.in
                </a>
                <a
                  href="mailto:preetam.bala@mituniversity.edu.in"
                  className="flex items-center gap-2 font-bold text-white rounded-xl px-4 py-4 no-underline transition-opacity hover:opacity-90 break-all"
                  style={{ background: "#20c997" }}
                >
                  <Mail size={18} className="shrink-0" />{" "}
                  preetam.bala@mituniversity.edu.in
                </a>
                <div
                  className="flex items-start gap-2 rounded-xl px-4 py-4"
                  style={{ background: "#f1f3f5" }}
                >
                  <MapPin
                    size={18}
                    className="shrink-0 mt-0.5"
                    style={{ color: "#0b5ed7" }}
                  />
                  <p className="text-sm font-medium text-gray-700 leading-snug">
                    Nanobiotech Lab, 3rd Floor, School of Bioengineering Science
                    &amp; Research, MIT-ADT University, Loni Kalbhor, Pune -
                    412201
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Project Image Popup */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(0,0,0,0.85)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              if (e.target === e.currentTarget) setSelectedProject(null);
            }}
          >
            <motion.div
              className="bg-white rounded-2xl overflow-hidden shadow-2xl w-full max-w-lg"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <div
                style={{ background: selectedProject.bg }}
                className="px-5 py-4 flex justify-between items-start"
              >
                <div>
                  <p className="text-white font-bold text-base leading-snug">
                    {selectedProject.title}
                  </p>
                  <p className="text-white/80 text-xs mt-1">
                    {selectedProject.subtitle}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="text-white/80 hover:text-white transition-colors ml-3 mt-0.5"
                >
                  <X size={22} />
                </button>
              </div>
              <div style={{ maxHeight: "70vh", overflowY: "auto" }}>
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  style={{ width: "100%", display: "block" }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instrument Info Image Popup */}
      <AnimatePresence>
        {infoImageOpen && selectedInstrument?.infoImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(0,0,0,0.85)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              if (e.target === e.currentTarget) setInfoImageOpen(false);
            }}
          >
            <motion.div
              className="bg-white rounded-2xl overflow-hidden shadow-2xl w-full max-w-lg"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <div
                style={{ background: selectedInstrument.bg }}
                className="px-5 py-4 flex justify-between items-center"
              >
                <p className="text-white font-bold text-base">
                  {selectedInstrument.emoji} {selectedInstrument.label} —
                  Instrument Information
                </p>
                <button
                  type="button"
                  onClick={() => setInfoImageOpen(false)}
                  className="text-white/80 hover:text-white transition-colors ml-3"
                >
                  <X size={22} />
                </button>
              </div>
              <div style={{ maxHeight: "75vh", overflowY: "auto" }}>
                <img
                  src={selectedInstrument.infoImage}
                  alt={`${selectedInstrument.label} Information`}
                  style={{ width: "100%", display: "block" }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
