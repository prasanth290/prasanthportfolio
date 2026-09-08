"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  ExternalLink,
  Code2,
  Layers,
  MessageSquare,
  Phone,
  FileText,
  X,
  ArrowRight,
  Sparkles,
  Command,
} from "lucide-react";

interface CommandItem {
  id: string;
  category: "Demos" | "Navigation" | "Contact";
  title: string;
  description: string;
  href?: string;
  action?: () => void;
  icon: any;
  badge?: string;
}

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Listen for Cmd+K / Ctrl+K and custom trigger events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    const handleCustomOpen = () => {
      setIsOpen(true);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-command-palette", handleCustomOpen);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-command-palette", handleCustomOpen);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  const items: CommandItem[] = [
    {
      id: "demo-rental",
      category: "Demos",
      title: "PropFlow — Rental & Property Management",
      description: "Live interactive demo with landlord credentials",
      href: "/projects/propflow-rental-management",
      icon: Layers,
      badge: "Live System",
    },
    {
      id: "demo-inventory",
      category: "Demos",
      title: "NexusStock — Multi-Warehouse Inventory",
      description: "Live barcode scanning & real-time stock sync",
      href: "/projects/nexusstock-inventory-system",
      icon: Layers,
      badge: "Live System",
    },
    {
      id: "demo-booking",
      category: "Demos",
      title: "OmniBooking — Appointment & Scheduling",
      description: "Multi-staff booking calendar & Stripe checkout",
      href: "/projects/omnibooking-platform",
      icon: Layers,
    },
    {
      id: "demo-analytics",
      category: "Demos",
      title: "PulseAnalytics — Real-Time SaaS Dashboard",
      description: "Interactive analytics suite with live filters",
      href: "/projects/pulseanalytics-saas-dashboard",
      icon: Layers,
    },
    {
      id: "nav-projects",
      category: "Navigation",
      title: "All Projects & Case Studies",
      description: "Browse completed enterprise systems",
      href: "/projects",
      icon: Code2,
    },
    {
      id: "nav-services",
      category: "Navigation",
      title: "Custom Systems & Architecture Services",
      description: "Bespoke development, tech stack & SLAs",
      href: "/services",
      icon: Code2,
    },
    {
      id: "nav-quote",
      category: "Contact",
      title: "Request a Fixed-Price Quote",
      description: "Guaranteed proposal response within 12 hours",
      href: "/contact",
      icon: Sparkles,
      badge: "Priority SLA",
    },
    {
      id: "contact-whatsapp",
      category: "Contact",
      title: "Chat with Senior Engineer on WhatsApp",
      description: "Direct instant mobile consultation",
      action: () => {
        window.open("https://wa.me/919876543210?text=Hi%20Prasanth,%20I'm%20interested%20in%20discussing%20a%20custom%20system.", "_blank");
      },
      icon: MessageSquare,
      badge: "Instant",
    },
  ];

  const filteredItems = items.filter((item) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    );
  });

  const handleSelect = (item: CommandItem) => {
    setIsOpen(false);
    if (item.action) {
      item.action();
    } else if (item.href) {
      router.push(item.href);
    }
  };

  const handleKeyNavigation = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1));
    } else if (e.key === "Enter" && filteredItems[selectedIndex]) {
      e.preventDefault();
      handleSelect(filteredItems[selectedIndex]);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-xl flex items-start justify-center pt-16 sm:pt-28 px-4 animate-in fade-in duration-150"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="w-full max-w-2xl rounded-2xl glass-card border border-slate-700/80 bg-slate-900/95 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyNavigation}
      >
        {/* Search Header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-800">
          <Search className="w-5 h-5 text-emerald-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search live demos, architecture services, or actions..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            className="w-full bg-transparent text-white placeholder-slate-500 text-sm focus:outline-none"
          />
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-2 space-y-1">
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-500">
              No matching systems or commands found for &ldquo;{query}&rdquo;
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all duration-150 ${
                    isSelected
                      ? "bg-emerald-500/10 border border-emerald-500/30 text-white"
                      : "hover:bg-slate-800/60 text-slate-300 border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                        isSelected
                          ? "bg-emerald-500/20 text-emerald-400"
                          : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold text-sm truncate flex items-center gap-2">
                        <span>{item.title}</span>
                        {item.badge && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 truncate">{item.description}</p>
                    </div>
                  </div>
                  <ArrowRight
                    className={`w-4 h-4 text-emerald-400 shrink-0 transition-transform ${
                      isSelected ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"
                    }`}
                  />
                </div>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-slate-800 bg-slate-950/60 text-[11px] text-slate-400 font-mono">
          <div className="flex items-center gap-2">
            <span>Use</span>
            <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300">↑</kbd>
            <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300">↓</kbd>
            <span>to navigate</span>
            <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300">↵</kbd>
            <span>to select</span>
          </div>
          <div>
            <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300">ESC</kbd>
            <span className="ml-1">to close</span>
          </div>
        </div>
      </div>
    </div>
  );
}
