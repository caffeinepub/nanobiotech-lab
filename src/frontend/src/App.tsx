import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  BookMarked,
  BookOpen,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  FlaskConical,
  FolderOpen,
  GlassWater,
  Home,
  Info,
  Mail,
  MapPin,
  Microscope,
  Package,
  Phone,
  Wrench,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

type Department = "SBSR" | "Other" | null;
type Section =
  | "home"
  | "about"
  | "projects"
  | "publications"
  | "services"
  | "logistics"
  | "contact";

const INSTRUMENTS = [
  {
    id: "ftir",
    name: "FTIR",
    color: "#1a6b3c",
    booking: "https://forms.gle/hDMMwZGsU4D1Ed7L6",
    info: "/assets/uploads/FTIR-1.png",
    sop: "https://docs.google.com/document/d/1HRA2q6woUx-yhExKqjOqE7kBdxSN6JSx/edit?usp=sharing&ouid=115405116506700249547&rtpof=true&sd=true",
  },
  {
    id: "contact-angle",
    name: "Contact Angle",
    color: "#1a3d6b",
    booking: "https://forms.gle/AkdvJvcfmfXNyBnW6",
    info: "/assets/uploads/Contact-angle-2.png",
    sop: "https://docs.google.com/document/d/11iQ0-JoNKxRKF4fkrDRp8NEPZR_mJoo0/edit?usp=sharing&ouid=115405116506700249547&rtpof=true&sd=true",
  },
  {
    id: "lyophilizer",
    name: "Lyophilizer",
    color: "#5c1a6b",
    booking: "https://forms.gle/1d4sgsG1Qc7mhGXY7",
    info: "/assets/uploads/Lyophilizer-vacuum-concentrator-3.png",
    sop: "https://docs.google.com/document/d/12M50mCDskSvB70EeFtGLRcVgCez2vHKp/edit?usp=sharing&ouid=115405116506700249547&rtpof=true&sd=true",
  },
  {
    id: "probe-sonicator",
    name: "Probe Sonicator",
    color: "#6b3a1a",
    booking: "https://forms.gle/eHnH8NZJ1dP2WHpB9",
    info: "/assets/uploads/Probe-sonicator-4.png",
    sop: "https://docs.google.com/document/d/1gc9swXp8XZmcPjXfoslw-v068gqNsRZ2/edit?usp=sharing&ouid=115405116506700249547&rtpof=true&sd=true",
  },
  {
    id: "zetasizer",
    name: "Zetasizer",
    color: "#3a6b1a",
    booking: "https://forms.gle/RnP51CkJq13QW4a79",
    info: null,
    sop: null,
  },
];

const PROJECTS = [
  {
    id: 1,
    img: "/assets/uploads/Student-project-1-4.png",
    title:
      "GreenNanoCure-Harnessing Oxidized Nano-Cellulose for advanced Medicated Bandages",
  },
  {
    id: 2,
    img: "/assets/uploads/Student-project-2-5.png",
    title:
      "SANISAFE- Noval Technological Solutions for safe disposal of Menstrual waste",
  },
  {
    id: 3,
    img: "/assets/uploads/Student-project-3-2.png",
    title: "ALFA- DEVELOPMENT OF READY TO USE FIRST AID KIT",
  },
  {
    id: 4,
    img: "/assets/uploads/Student-project-4-3.png",
    title:
      "BIOPLASTIC- Preparation of Biodegradable Polymeric for Bio-Medical Application",
  },
];

export default function App() {
  const [department, setDepartment] = useState<Department>(null);
  const [showDeptPopup, setShowDeptPopup] = useState(true);
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [instrumentModal, setInstrumentModal] = useState<
    (typeof INSTRUMENTS)[0] | null
  >(null);
  const [instrumentSubModal, setInstrumentSubModal] = useState<"info" | null>(
    null,
  );
  const [projectModal, setProjectModal] = useState<(typeof PROJECTS)[0] | null>(
    null,
  );
  const [contactModal, setContactModal] = useState(false);
  const [labSopOpen, setLabSopOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState<"lab" | "course" | null>(null);

  const selectDepartment = (dept: Department) => {
    setDepartment(dept);
    setShowDeptPopup(false);
  };

  const navItems: { id: Section; label: string; icon: React.ReactNode }[] = [
    { id: "home", label: "Home", icon: <Home size={16} /> },
    { id: "about", label: "About", icon: <Info size={16} /> },
    { id: "projects", label: "Projects", icon: <FolderOpen size={16} /> },
    {
      id: "publications",
      label: "Publications & Patents",
      icon: <BookMarked size={16} />,
    },
    { id: "services", label: "Services", icon: <Wrench size={16} /> },
    { id: "logistics", label: "Logistics", icon: <Package size={16} /> },
    { id: "contact", label: "Contact", icon: <Phone size={16} /> },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Department Selection Popup */}
      <Dialog open={showDeptPopup} onOpenChange={() => {}}>
        <DialogContent
          className="max-w-sm"
          onInteractOutside={(e) => e.preventDefault()}
          data-ocid="dept.dialog"
        >
          <DialogHeader>
            <DialogTitle className="text-center text-lg font-bold">
              Welcome to Nanobiotech Lab
            </DialogTitle>
          </DialogHeader>
          <p className="text-center text-muted-foreground text-sm mb-4">
            Please select your department to continue
          </p>
          <div className="flex flex-col gap-3">
            <Button
              className="w-full py-6 text-base font-semibold"
              style={{ background: "#1a6b3c" }}
              onClick={() => selectDepartment("SBSR")}
              data-ocid="dept.sbsr_button"
            >
              SBSR Department
            </Button>
            <Button
              className="w-full py-6 text-base font-semibold"
              variant="outline"
              onClick={() => selectDepartment("Other")}
              data-ocid="dept.other_button"
            >
              Other Department
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between gap-4">
          <img
            src="/assets/uploads/NBL-logo-1-1.png"
            alt="NBL Logo"
            className="w-14 h-14 object-contain flex-shrink-0"
          />
          <div className="flex flex-col items-center gap-1 flex-1">
            <img
              src="/assets/uploads/NBL-logo-1-1.png"
              alt="NBL Center Logo"
              className="w-44 h-44 object-contain hidden sm:block"
              style={{ maxHeight: 180 }}
            />
            <span className="font-bold text-sm text-center text-gray-700 hidden sm:block">
              Nanobiotech Lab | MIT-ADT University, Pune
            </span>
          </div>
          <div className="flex flex-col items-end gap-2 flex-shrink-0">
            <img
              src="/assets/uploads/mitbio_logo.png-1.png"
              alt="MIT-ADTU Bioengineering"
              className="w-14 h-14 object-contain"
            />
            {department && (
              <button
                type="button"
                onClick={() => setShowDeptPopup(true)}
                data-ocid="dept.badge_button"
              >
                <Badge
                  className="cursor-pointer text-xs"
                  style={{
                    background: department === "SBSR" ? "#1a6b3c" : "#555",
                  }}
                >
                  {department === "SBSR"
                    ? "SBSR Department"
                    : "Other Department"}
                </Badge>
              </button>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="bg-gray-800 overflow-x-auto">
          <ul className="flex min-w-max">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() =>
                    item.id === "contact"
                      ? setContactModal(true)
                      : setActiveSection(item.id)
                  }
                  className={`flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium transition-colors whitespace-nowrap ${
                    activeSection === item.id && item.id !== "contact"
                      ? "bg-blue-600 text-white"
                      : "text-gray-200 hover:bg-gray-700"
                  }`}
                  data-ocid={`nav.${item.id}_link`}
                >
                  {item.icon}
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* HOME */}
        {activeSection === "home" && (
          <section
            className="relative min-h-[80vh] flex flex-col items-center justify-center px-4 py-12"
            style={{
              background:
                "linear-gradient(160deg, #1a3d8f 0%, #2563eb 50%, #eff6ff 100%)",
            }}
          >
            {/* Watermark */}
            <img
              src="/assets/uploads/NBL-logo-1-1.png"
              alt=""
              aria-hidden
              className="pointer-events-none select-none absolute inset-0 m-auto w-80 h-80 object-contain"
              style={{ opacity: 0.06 }}
            />

            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl font-bold text-white mb-4 text-center relative z-10"
            >
              Welcome to Nanobiotech Lab
            </motion.h1>

            {/* Bold animated note */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="relative z-10 mb-10 text-center max-w-2xl"
            >
              <p className="text-blue-100 font-bold text-base md:text-lg leading-relaxed animate-amber-pulse">
                Note:- If you wish to book a slot for instrument usage, please
                click on the{" "}
                <span className="text-white">&ldquo;Services&rdquo;</span>{" "}
                option.
              </p>
              <p className="text-blue-100 font-bold text-base md:text-lg leading-relaxed mt-2 animate-amber-pulse">
                For internal use only: If you need to issue chemicals,
                glassware, or plasticware (consumables), please click on the{" "}
                <span className="text-white">&ldquo;Logistics&rdquo;</span>{" "}
                option.
              </p>
            </motion.div>

            {/* Nav Cards Grid */}
            <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full max-w-3xl">
              {[
                {
                  id: "about" as Section,
                  label: "About",
                  color: "#1a6b3c",
                  icon: <Info size={28} />,
                },
                {
                  id: "projects" as Section,
                  label: "Projects",
                  color: "#1a3d6b",
                  icon: <FolderOpen size={28} />,
                },
                {
                  id: "publications" as Section,
                  label: "Publications & Patents",
                  color: "#5c1a6b",
                  icon: <BookMarked size={28} />,
                },
                {
                  id: "services" as Section,
                  label: "Services",
                  color: "#6b3a1a",
                  icon: <Wrench size={28} />,
                },
                {
                  id: "logistics" as Section,
                  label: "Logistics",
                  color: "#3a6b1a",
                  icon: <Package size={28} />,
                },
                {
                  label: "Contact",
                  color: "#6b1a1a",
                  icon: <Phone size={28} />,
                  action: () => setContactModal(true),
                },
                {
                  id: "about" as Section,
                  label: "Lab SOP",
                  color: "#1a5a6b",
                  icon: <BookOpen size={28} />,
                  action: () => setLabSopOpen(true),
                },
                {
                  id: "projects" as Section,
                  label: "Research",
                  color: "#4a1a6b",
                  icon: <Microscope size={28} />,
                  action: undefined,
                },
              ].map((card, i) => (
                <motion.button
                  key={card.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * i }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    if (card.action) card.action();
                    else if (card.id) setActiveSection(card.id);
                  }}
                  className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl text-white font-semibold text-sm shadow-lg aspect-square"
                  style={{ background: card.color }}
                  data-ocid={`home.${card.label.toLowerCase().replace(/[^a-z0-9]/g, "_")}_button`}
                >
                  {card.icon}
                  <span className="text-center leading-tight">
                    {card.label}
                  </span>
                </motion.button>
              ))}
            </div>
          </section>
        )}

        {/* ABOUT */}
        {activeSection === "about" && (
          <section className="max-w-3xl mx-auto px-4 py-8">
            <div className="flex items-center gap-2 mb-6">
              <button
                type="button"
                onClick={() => setActiveSection("home")}
                className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                data-ocid="about.home_link"
              >
                <Home size={14} /> Home
              </button>
              <span className="text-gray-400">/</span>
              <span className="font-semibold text-gray-700">About</span>
            </div>
            <h2 className="text-2xl font-bold mb-6">About</h2>

            {/* Laboratory Details Accordion */}
            <div className="border rounded-xl mb-4 overflow-hidden shadow-sm">
              <button
                type="button"
                className="w-full flex items-center justify-between px-5 py-4 bg-gray-50 hover:bg-gray-100 font-semibold text-left"
                onClick={() => setAboutOpen(aboutOpen === "lab" ? null : "lab")}
                data-ocid="about.lab_details_toggle"
              >
                <span>Laboratory Details</span>
                {aboutOpen === "lab" ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </button>
              <AnimatePresence>
                {aboutOpen === "lab" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4">
                      <img
                        src="/assets/uploads/Laboratory-details-1.png"
                        alt="Laboratory Details"
                        className="w-full rounded-lg"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Course Work Accordion */}
            <div className="border rounded-xl overflow-hidden shadow-sm">
              <button
                type="button"
                className="w-full flex items-center justify-between px-5 py-4 bg-gray-50 hover:bg-gray-100 font-semibold text-left"
                onClick={() =>
                  setAboutOpen(aboutOpen === "course" ? null : "course")
                }
                data-ocid="about.course_work_toggle"
              >
                <span>Course Work</span>
                {aboutOpen === "course" ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </button>
              <AnimatePresence>
                {aboutOpen === "course" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4">
                      <img
                        src="/assets/uploads/courcework-6.png"
                        alt="Course Work"
                        className="w-full rounded-lg"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </section>
        )}

        {/* PROJECTS */}
        {activeSection === "projects" && (
          <section className="max-w-5xl mx-auto px-4 py-8">
            <div className="flex items-center gap-2 mb-6">
              <button
                type="button"
                onClick={() => setActiveSection("home")}
                className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                data-ocid="projects.home_link"
              >
                <Home size={14} /> Home
              </button>
              <span className="text-gray-400">/</span>
              <span className="font-semibold text-gray-700">Projects</span>
            </div>
            <h2 className="text-2xl font-bold mb-6">Student Projects</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {PROJECTS.map((proj, i) => (
                <motion.div
                  key={proj.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i }}
                  className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setProjectModal(proj)}
                  data-ocid={`projects.item.${i + 1}`}
                >
                  <img
                    src={proj.img}
                    alt={proj.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <p className="font-semibold text-sm text-gray-800 leading-snug">
                      {proj.title}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* PUBLICATIONS */}
        {activeSection === "publications" && (
          <section className="max-w-3xl mx-auto px-4 py-8">
            <div className="flex items-center gap-2 mb-6">
              <button
                type="button"
                onClick={() => setActiveSection("home")}
                className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                data-ocid="publications.home_link"
              >
                <Home size={14} /> Home
              </button>
              <span className="text-gray-400">/</span>
              <span className="font-semibold text-gray-700">
                Publications & Patents
              </span>
            </div>
            <h2 className="text-2xl font-bold mb-4">Publications & Patents</h2>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 text-center">
              <BookMarked className="mx-auto mb-3 text-blue-500" size={40} />
              <p className="text-gray-600 font-medium">
                Coming soon — Publications and Patents will be listed here.
              </p>
            </div>
          </section>
        )}

        {/* SERVICES */}
        {activeSection === "services" && (
          <section className="max-w-5xl mx-auto px-4 py-8">
            <div className="flex items-center gap-2 mb-6">
              <button
                type="button"
                onClick={() => setActiveSection("home")}
                className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                data-ocid="services.home_link"
              >
                <Home size={14} /> Home
              </button>
              <span className="text-gray-400">/</span>
              <span className="font-semibold text-gray-700">Services</span>
            </div>
            <h2 className="text-2xl font-bold mb-6">Services</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {INSTRUMENTS.map((inst, i) => (
                <motion.button
                  key={inst.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.08 * i }}
                  whileHover={{ scale: 1.04 }}
                  onClick={() => setInstrumentModal(inst)}
                  className="flex flex-col items-center justify-center gap-3 p-5 rounded-xl text-white font-semibold shadow-md aspect-square text-sm"
                  style={{ background: inst.color }}
                  data-ocid={`services.${inst.id}_button`}
                >
                  <Microscope size={32} />
                  {inst.name}
                </motion.button>
              ))}
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.48 }}
                whileHover={{ scale: 1.04 }}
                onClick={() => setLabSopOpen(true)}
                className="flex flex-col items-center justify-center gap-3 p-5 rounded-xl text-white font-semibold shadow-md aspect-square text-sm"
                style={{ background: "#1a5a6b" }}
                data-ocid="services.lab_sop_button"
              >
                <BookOpen size={32} />
                Lab SOP
              </motion.button>
            </div>
          </section>
        )}

        {/* LOGISTICS */}
        {activeSection === "logistics" && (
          <section className="max-w-3xl mx-auto px-4 py-8">
            <div className="flex items-center gap-2 mb-6">
              <button
                type="button"
                onClick={() => setActiveSection("home")}
                className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                data-ocid="logistics.home_link"
              >
                <Home size={14} /> Home
              </button>
              <span className="text-gray-400">/</span>
              <span className="font-semibold text-gray-700">Logistics</span>
            </div>
            <h2 className="text-2xl font-bold mb-6">Logistics</h2>

            {department === "Other" ? (
              <div
                className="bg-gray-100 rounded-xl p-10 text-center text-gray-500 font-medium"
                data-ocid="logistics.restricted_panel"
              >
                This section is for SBSR Department members only.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Chemicals */}
                <motion.a
                  href="https://docs.google.com/spreadsheets/d/127aRtlugmYL_1h5886KKk3BjuySBllQGEdZDYIlu9p0/edit?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.04 }}
                  className="flex flex-col items-center justify-center gap-3 p-8 rounded-xl text-white font-bold text-lg shadow-lg cursor-pointer"
                  style={{ background: "#1a3d6b" }}
                  data-ocid="logistics.chemicals_button"
                >
                  <FlaskConical size={40} />
                  Chemicals
                </motion.a>

                {/* Glassware & Plasticware (consumables) */}
                <motion.a
                  href="https://lab-issue-return-manager-8mw.caffeine.xyz"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  whileHover={{ scale: 1.04 }}
                  className="flex flex-col items-center justify-center gap-3 p-8 rounded-xl text-white font-bold text-lg shadow-lg cursor-pointer text-center"
                  style={{ background: "#3a6b1a" }}
                  data-ocid="logistics.glassware_button"
                >
                  <GlassWater size={40} />
                  Glassware & Plasticware (consumables)
                </motion.a>
              </div>
            )}
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 text-center py-4 text-xs">
        &copy; {new Date().getFullYear()}. Built with love using{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:underline"
        >
          caffeine.ai
        </a>
      </footer>

      {/* Instrument Modal */}
      <AnimatePresence>
        {instrumentModal && (
          <Dialog
            open
            onOpenChange={() => {
              setInstrumentModal(null);
              setInstrumentSubModal(null);
            }}
          >
            <DialogContent
              className="max-w-md"
              data-ocid="services.instrument_modal"
            >
              <DialogHeader>
                <DialogTitle>{instrumentModal.name}</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-1 gap-3 mt-2">
                {/* Booking */}
                <a
                  href={instrumentModal.booking}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-lg text-white font-semibold shadow"
                  style={{ background: instrumentModal.color }}
                  data-ocid="services.booking_button"
                >
                  <BookOpen size={20} />
                  Instrument Booking
                  <ExternalLink size={14} className="ml-auto opacity-70" />
                </a>

                {/* Instrument Information */}
                {instrumentModal.info ? (
                  <button
                    type="button"
                    onClick={() => setInstrumentSubModal("info")}
                    className="flex items-center gap-3 p-4 rounded-lg font-semibold shadow border hover:bg-gray-50"
                    data-ocid="services.info_button"
                  >
                    <Info size={20} className="text-blue-600" />
                    Instrument Information
                    <ChevronDown size={14} className="ml-auto text-gray-400" />
                  </button>
                ) : (
                  <div className="flex items-center gap-3 p-4 rounded-lg font-semibold border bg-gray-50 text-gray-400">
                    <Info size={20} />
                    Instrument Information — Coming soon
                  </div>
                )}

                {/* SOP */}
                {instrumentModal.sop ? (
                  <a
                    href={instrumentModal.sop}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 rounded-lg font-semibold shadow border hover:bg-gray-50"
                    data-ocid="services.sop_link"
                  >
                    <BookMarked size={20} className="text-green-600" />
                    Instrument SOP
                    <ExternalLink size={14} className="ml-auto text-gray-400" />
                  </a>
                ) : (
                  <div className="flex items-center gap-3 p-4 rounded-lg font-semibold border bg-gray-50 text-gray-400">
                    <BookMarked size={20} />
                    Instrument SOP — Coming soon
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>

      {/* Instrument Info Image Modal */}
      <AnimatePresence>
        {instrumentSubModal === "info" && instrumentModal?.info && (
          <Dialog open onOpenChange={() => setInstrumentSubModal(null)}>
            <DialogContent
              className="max-w-2xl"
              data-ocid="services.info_modal"
            >
              <DialogHeader>
                <DialogTitle>{instrumentModal.name} — Information</DialogTitle>
              </DialogHeader>
              <img
                src={instrumentModal.info}
                alt={`${instrumentModal.name} information`}
                className="w-full rounded-lg mt-2"
              />
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>

      {/* Lab SOP Modal */}
      <AnimatePresence>
        {labSopOpen && (
          <Dialog open onOpenChange={() => setLabSopOpen(false)}>
            <DialogContent
              className="max-w-4xl w-full"
              data-ocid="services.lab_sop_modal"
            >
              <DialogHeader>
                <DialogTitle>Lab SOP</DialogTitle>
              </DialogHeader>
              <div className="flex justify-end mb-2">
                <a
                  href="https://docs.google.com/document/d/1U3EDIqQfNZA8dJDbmBNUE9Kp-2MpD7zpru9m6lhyIE8/edit?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
                  data-ocid="services.sop_open_link"
                >
                  <ExternalLink size={14} /> Open in Google Docs
                </a>
              </div>
              <iframe
                src="https://docs.google.com/document/d/1U3EDIqQfNZA8dJDbmBNUE9Kp-2MpD7zpru9m6lhyIE8/preview"
                className="w-full rounded-lg border"
                style={{ height: 500 }}
                title="Lab SOP"
              />
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>

      {/* Project Modal */}
      <AnimatePresence>
        {projectModal && (
          <Dialog open onOpenChange={() => setProjectModal(null)}>
            <DialogContent
              className="max-w-2xl"
              data-ocid="projects.detail_modal"
            >
              <DialogHeader>
                <DialogTitle className="text-base leading-snug">
                  {projectModal.title}
                </DialogTitle>
              </DialogHeader>
              <img
                src={projectModal.img}
                alt={projectModal.title}
                className="w-full rounded-lg mt-2"
              />
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>

      {/* Contact Modal */}
      <AnimatePresence>
        {contactModal && (
          <Dialog open onOpenChange={() => setContactModal(false)}>
            <DialogContent className="max-w-sm" data-ocid="contact.dialog">
              <DialogHeader>
                <DialogTitle>Contact Us</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-2">
                <div className="flex items-start gap-3">
                  <Phone
                    size={18}
                    className="text-blue-600 mt-0.5 flex-shrink-0"
                  />
                  <div>
                    <p className="font-semibold text-sm text-gray-700 mb-0.5">
                      Phone
                    </p>
                    <p className="text-sm text-gray-600">9284234954</p>
                    <p className="text-sm text-gray-600">9833691660</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail
                    size={18}
                    className="text-green-600 mt-0.5 flex-shrink-0"
                  />
                  <div>
                    <p className="font-semibold text-sm text-gray-700 mb-0.5">
                      Email
                    </p>
                    <p className="text-sm text-gray-600 break-all">
                      nanobiotechlabmitbio@gmail.com
                    </p>
                    <p className="text-sm text-gray-600 break-all">
                      pradip.ivare@mituniversity.edu.in
                    </p>
                    <p className="text-sm text-gray-600 break-all">
                      preetam.bala@mituniversity.edu.in
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin
                    size={18}
                    className="text-red-500 mt-0.5 flex-shrink-0"
                  />
                  <div>
                    <p className="font-semibold text-sm text-gray-700 mb-0.5">
                      Address
                    </p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Nanobiotech Lab, 3rd Floor, School of Bioengineering
                      Science &amp; Research, MIT-ADT University, Loni Kalbhor,
                      Pune-412201
                    </p>
                  </div>
                </div>
              </div>
              <Button
                className="mt-4 w-full"
                variant="outline"
                onClick={() => setContactModal(false)}
                data-ocid="contact.close_button"
              >
                <X size={14} className="mr-1" /> Close
              </Button>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
}
