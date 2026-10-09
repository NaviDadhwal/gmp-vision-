import React, { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  ChevronRight,
  Command,
  Search,
  ShieldCheck,
  Activity,
  Wind,
  Layers,
  FileText,
  PhoneCall,
} from "lucide-react";

export const GMPModernHero: React.FC = () => {
  const [commandQuery, setCommandQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"terminal" | "specs" | "compliance">("terminal");

  const quickLinks = [
    { title: "Modular Cleanrooms (Class 100 - 100,000)", href: "/solutions/cleanroom-partitioning-panels", tag: "ISO 5-8" },
    { title: "HVAC & Air Handling Units (AHU / DX)", href: "/solutions/hvac-systems", tag: "EC Plug Fan" },
    { title: "H14 HEPA & ULPA Air Filtration", href: "/solutions/air-filtration", tag: "99.997%" },
    { title: "DQ / IQ / OQ / PQ Validation Protocols", href: "/solutions/automation-validation", tag: "Annex 1" },
  ];

  const filteredLinks = quickLinks.filter((item) =>
    item.title.toLowerCase().includes(commandQuery.toLowerCase()) ||
    item.tag.toLowerCase().includes(commandQuery.toLowerCase())
  );

  return (
    <section className="relative flex min-h-screen w-full flex-col items-center bg-[#050505] font-sans text-white selection:bg-[#3DAE2B] selection:text-black overflow-hidden pt-12 pb-24">
      {/* Subtle grid background */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.03]" 
        style={{
          backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }}
      />

      {/* Radial glow backdrop */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-[#0A3B85]/20 via-[#3DAE2B]/10 to-transparent blur-[120px] rounded-full" />

      {/* Top minimal status bar */}
      <div className="absolute top-0 w-full border-b border-white/[0.08] h-14 bg-[#050505]/80 backdrop-blur-md flex items-center justify-between px-6 z-20 text-xs text-neutral-400">
        <div className="flex items-center gap-3">
          <span className="flex h-2 w-2 rounded-full bg-[#3DAE2B] animate-pulse" />
          <span className="font-mono text-neutral-300 tracking-wider">GMP VISION MEP SYSTEMS</span>
          <span className="hidden sm:inline text-neutral-600">|</span>
          <span className="hidden sm:inline text-neutral-400">ISO 14644-1 & Schedule M Compliant</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="tel:+919999999999" className="hover:text-white transition-colors flex items-center gap-1.5 font-mono">
            <PhoneCall className="h-3.5 w-3.5 text-[#3DAE2B]" />
            <span>+91 99999 99999</span>
          </a>
          <a 
            href="/Broucher.pdf" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hidden md:flex items-center gap-1 text-neutral-300 hover:text-white transition-colors border border-white/[0.1] rounded px-2 py-0.5"
          >
            <FileText className="h-3 w-3" />
            <span>Brochure.pdf</span>
          </a>
        </div>
      </div>

      <main className="flex w-full max-w-[1100px] flex-col items-center px-6 pt-28 text-center md:pt-36 z-10">
        {/* Pill Badge - Linear inspired */}
        <Link 
          to="/solutions"
          className="group mb-8 inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.03] py-1.5 pl-1.5 pr-3 text-xs font-medium text-neutral-300 backdrop-blur-md transition-all hover:bg-white/[0.08] hover:border-[#3DAE2B]/40"
        >
          <span className="rounded-full bg-gradient-to-r from-[#0A3B85] to-[#3DAE2B] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white shadow-sm">
            EU GMP Annex 1
          </span>
          <span>Turnkey Cleanroom & HVAC Engineering</span>
          <ChevronRight className="h-3.5 w-3.5 text-neutral-400 transition-transform group-hover:translate-x-0.5 group-hover:text-white" />
        </Link>

        {/* Headline - High contrast typography */}
        <h1 className="mb-6 max-w-4xl text-balance text-4xl font-medium tracking-tighter text-white sm:text-6xl lg:text-7xl">
          Engineered for <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-white via-neutral-200 to-neutral-500 bg-clip-text text-transparent">
            Zero Particle Leaks.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mb-10 max-w-[680px] text-balance text-base leading-relaxed text-neutral-400 sm:text-lg">
          Complete turnkey cleanroom enclosures, custom AHUs, and H14 filtration engineered for pharmaceutical, biotech, and semiconductor facilities across India and the GCC.
        </p>

        {/* Call to Actions */}
        <div className="flex w-full flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            to="/rfq"
            className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-white px-8 text-sm font-semibold text-black transition-all hover:bg-neutral-200 active:scale-[0.98] sm:w-auto shadow-lg shadow-white/10"
          >
            Request Turnkey Quote
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/solutions"
            className="flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-white/[0.15] bg-white/[0.02] px-8 text-sm font-medium text-white transition-all hover:bg-white/[0.08] active:scale-[0.98] sm:w-auto backdrop-blur-sm"
          >
            <Layers className="h-4 w-4 text-[#3DAE2B]" />
            Explore 7 Divisions
          </Link>
        </div>

        {/* Engineering Bento Element */}
        <div className="mt-16 w-full max-w-4xl rounded-2xl border border-white/[0.12] bg-[#0A0A0A] shadow-2xl shadow-black/80 overflow-hidden text-left">
          {/* Header Bar */}
          <div className="flex items-center justify-between border-b border-white/[0.08] bg-white/[0.02] px-4 py-3 gap-3">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-white/[0.15]" />
                <div className="h-2.5 w-2.5 rounded-full bg-white/[0.15]" />
                <div className="h-2.5 w-2.5 rounded-full bg-white/[0.15]" />
              </div>
              <span className="ml-2 font-mono text-xs text-neutral-400 hidden sm:inline">cleanroom-telemetry.sys</span>
            </div>

            {/* Quick Command Palette */}
            <div className="relative flex-1 max-w-md">
              <div className="flex h-8 w-full items-center gap-2 rounded-md border border-white/[0.08] bg-black/60 px-2.5 text-xs text-neutral-400">
                <Search className="h-3.5 w-3.5 text-neutral-500" />
                <input
                  type="text"
                  placeholder="Jump to Division, AHU, HEPA, or validation..."
                  value={commandQuery}
                  onChange={(e) => setCommandQuery(e.target.value)}
                  className="bg-transparent text-xs text-white placeholder-neutral-500 outline-none w-full"
                />
                <div className="ml-auto flex items-center gap-1 opacity-60">
                  <Command className="h-3 w-3" />
                  <span className="font-mono text-[10px]">K</span>
                </div>
              </div>
            </div>

            {/* View Tabs */}
            <div className="hidden sm:flex items-center gap-1 bg-white/[0.04] p-0.5 rounded-md text-[11px] font-mono">
              <button 
                onClick={() => setActiveTab("terminal")}
                className={cn("px-2.5 py-1 rounded", activeTab === "terminal" ? "bg-white/[0.12] text-white" : "text-neutral-400 hover:text-white")}
              >
                Telemetry
              </button>
              <button 
                onClick={() => setActiveTab("specs")}
                className={cn("px-2.5 py-1 rounded", activeTab === "specs" ? "bg-white/[0.12] text-white" : "text-neutral-400 hover:text-white")}
              >
                Engineering
              </button>
            </div>
          </div>

          {/* Search Dropdown Results if Querying */}
          {commandQuery && (
            <div className="border-b border-white/[0.08] bg-[#070707] p-2 space-y-1">
              {filteredLinks.length > 0 ? (
                filteredLinks.map((link) => (
                  <Link
                    key={link.title}
                    to={link.href}
                    className="flex items-center justify-between p-2 rounded hover:bg-white/[0.06] text-xs transition-colors"
                  >
                    <span className="text-neutral-200">{link.title}</span>
                    <span className="font-mono text-[10px] bg-white/[0.08] px-1.5 py-0.5 rounded text-[#3DAE2B]">{link.tag}</span>
                  </Link>
                ))
              ) : (
                <p className="text-xs text-neutral-500 p-2">No matching systems found. Type 'HVAC' or 'HEPA'.</p>
              )}
            </div>
          )}

          {/* Main Display Window */}
          {activeTab === "terminal" ? (
            <div className="p-6 font-mono text-xs leading-relaxed text-neutral-400 bg-[#050505]/90 space-y-3">
              <div className="flex items-center justify-between text-neutral-500 border-b border-white/[0.04] pb-2">
                <span>[LIVE SENSOR TELEMETRY]</span>
                <span className="text-[#3DAE2B] flex items-center gap-1">
                  <Activity className="h-3 w-3" /> NORMAL (ALL PARAMS VALIDATED)
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                <div className="space-y-1.5 bg-white/[0.02] p-3 rounded-lg border border-white/[0.04]">
                  <div className="text-neutral-500 text-[11px]">DIFFERENTIAL PRESSURE</div>
                  <div className="text-sm font-bold text-white flex items-center gap-2">
                    <span className="text-[#3DAE2B]">+32.4 Pa</span>
                    <span className="text-[10px] text-neutral-400 font-normal">Cascaded Air Lock (Class B)</span>
                  </div>
                  <div className="text-[11px] text-neutral-500">Threshold: &gt; +25.0 Pa | Target: +30.0 Pa</div>
                </div>

                <div className="space-y-1.5 bg-white/[0.02] p-3 rounded-lg border border-white/[0.04]">
                  <div className="text-neutral-500 text-[11px]">PARTICLE COUNT (0.5 µm)</div>
                  <div className="text-sm font-bold text-white flex items-center gap-2">
                    <span className="text-[#38BDF8]">1,420 / m³</span>
                    <span className="text-[10px] text-neutral-400 font-normal">ISO Class 5 Compliant</span>
                  </div>
                  <div className="text-[11px] text-neutral-500">ISO 14644-1 Limit: 3,520 / m³</div>
                </div>

                <div className="space-y-1.5 bg-white/[0.02] p-3 rounded-lg border border-white/[0.04]">
                  <div className="text-neutral-500 text-[11px]">HEPA H14 INTEGRITY (DOP / PAO)</div>
                  <div className="text-sm font-bold text-white flex items-center gap-2">
                    <span className="text-[#3DAE2B]">99.997% Efficiency</span>
                    <span className="text-[10px] text-neutral-400 font-normal">Tested @ 0.3 µm</span>
                  </div>
                  <div className="text-[11px] text-neutral-500">Zero Seal Bypass Detected</div>
                </div>

                <div className="space-y-1.5 bg-white/[0.02] p-3 rounded-lg border border-white/[0.04]">
                  <div className="text-neutral-500 text-[11px]">AIR CHANGE RATE (ACR)</div>
                  <div className="text-sm font-bold text-white flex items-center gap-2">
                    <span className="text-white">52 ACH</span>
                    <span className="text-[10px] text-neutral-400 font-normal">Laminar Unidirectional Flow</span>
                  </div>
                  <div className="text-[11px] text-neutral-500">Air Velocity: 0.45 m/s ± 20%</div>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-[11px] text-neutral-500 border-t border-white/[0.04]">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#3DAE2B]" />
                  <span>Validation Protocol: DQ-IQ-OQ-PQ Ready</span>
                </div>
                <Link to="/solutions/automation-validation" className="text-white hover:underline flex items-center gap-1">
                  View Validation Standards &rarr;
                </Link>
              </div>
            </div>
          ) : (
            <div className="p-6 font-sans text-xs text-neutral-300 bg-[#050505]/90 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                  <div className="flex items-center gap-2 text-[#3DAE2B] font-semibold mb-1">
                    <ShieldCheck className="h-4 w-4" />
                    Cleanroom Wall Panels
                  </div>
                  <p className="text-neutral-400 text-[11px]">50mm / 80mm / 100mm PIR / Rockwool core with 0.8mm GI / SS 304 skins. Flush double-glazed viewing windows.</p>
                </div>
                <div className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                  <div className="flex items-center gap-2 text-[#38BDF8] font-semibold mb-1">
                    <Wind className="h-4 w-4" />
                    Double Skin AHU
                  </div>
                  <p className="text-neutral-400 text-[11px]">Thermal break extruded aluminium profiles, EC plug fans, DX / chilled water coils, VFD integration.</p>
                </div>
                <div className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                  <div className="flex items-center gap-2 text-[#F59E0B] font-semibold mb-1">
                    <Layers className="h-4 w-4" />
                    Filtration Stages
                  </div>
                  <p className="text-neutral-400 text-[11px]">Pre (G4, 10µm) &rarr; Micro (F9, 1-3µm) &rarr; Terminal HEPA (H14, 0.3µm) with gel-seal housings.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </section>
  );
};
