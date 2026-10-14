"use client";

import { useState } from "react";
import {
  Inbox,
  Search,
  Download,
  Mail,
  Phone,
  Trash2,
  CheckCircle,
  X,
  FileText,
  Save,
  MessageSquare,
  Sparkles,
} from "lucide-react";

export function LeadsInbox({ initialLeads }: { initialLeads: any[] }) {
  const [leads, setLeads] = useState(initialLeads);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [selectedLead, setSelectedLead] = useState<any | null>(null);
  const [notes, setNotes] = useState("");

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setLeads((prev) =>
          prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
        );
        if (selectedLead?.id === id) {
          setSelectedLead({ ...selectedLead, status: newStatus });
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedLead) return;
    try {
      const res = await fetch(`/api/leads/${selectedLead.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes }),
      });
      if (res.ok) {
        setLeads((prev) =>
          prev.map((l) => (l.id === selectedLead.id ? { ...l, notes } : l))
        );
        setSelectedLead({ ...selectedLead, notes });
        alert("Notes saved successfully.");
      }
    } catch (e) {
      alert("Failed to save notes.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this lead submission?")) return;
    try {
      const res = await fetch(`/api/leads/${id}`, { method: "DELETE" });
      if (res.ok) {
        setLeads((prev) => prev.filter((l) => l.id !== id));
        if (selectedLead?.id === id) setSelectedLead(null);
      }
    } catch (e) {
      alert("Error deleting lead.");
    }
  };

  const exportCSV = () => {
    const headers = ["Name", "Email", "Phone", "Project Type", "Budget", "Message", "UTM Source", "Status", "Date"];
    const rows = leads.map((l) => [
      `"${l.name}"`,
      `"${l.email}"`,
      `"${l.phone || ""}"`,
      `"${l.projectType}"`,
      `"${l.budgetRange || ""}"`,
      `"${l.message.replace(/"/g, '""')}"`,
      `"${l.utmSource || ""}"`,
      `"${l.status}"`,
      `"${new Date(l.createdAt).toISOString()}"`,
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `leads_export_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
  };

  const filteredLeads = leads.filter((l) => {
    const matchesStatus = filterStatus === "All" || l.status === filterStatus;
    const matchesSearch =
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.email.toLowerCase().includes(search.toLowerCase()) ||
      l.projectType.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusCount = (st: string) => {
    if (st === "All") return leads.length;
    return leads.filter((l) => l.status === st).length;
  };

  return (
    <div className="space-y-6">
      {/* Search & Export Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs">
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto py-1">
          {["All", "NEW", "CONTACTED", "CLOSED"].map((st) => {
            const count = getStatusCount(st);
            const isActive = filterStatus === st;
            return (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? "bg-[#0a192f] text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                }`}
              >
                <span>{st}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                    isActive ? "bg-amber-400 text-slate-950 font-bold" : "bg-slate-200 text-slate-600"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search leads..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20 transition-all"
            />
          </div>

          <button
            onClick={exportCSV}
            className="px-4 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 hover:text-[#0a192f] font-semibold text-xs flex items-center gap-1.5 shrink-0 shadow-2xs transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Inbox Table Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50/90 text-slate-500 font-semibold border-b border-slate-200 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="p-4">Client Contact</th>
                <th className="p-4">Project Category</th>
                <th className="p-4">Budget Range</th>
                <th className="p-4">Status</th>
                <th className="p-4">Source</th>
                <th className="p-4">Submitted</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-12 text-center text-slate-400">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Inbox className="w-8 h-8 text-slate-300" />
                      <span>No lead submissions found.</span>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredLeads.map((l) => (
                  <tr
                    key={l.id}
                    onClick={() => {
                      setSelectedLead(l);
                      setNotes(l.notes || "");
                    }}
                    className={`hover:bg-slate-50/80 cursor-pointer transition-colors ${
                      selectedLead?.id === l.id ? "bg-amber-50/60 border-l-3 border-[#c5a059]" : ""
                    }`}
                  >
                    <td className="p-4">
                      <div className="font-bold text-[#0a192f] text-sm">{l.name}</div>
                      <div className="text-[11px] text-slate-500 font-mono">{l.email}</div>
                    </td>

                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 font-semibold text-[11px]">
                        {l.projectType}
                      </span>
                    </td>

                    <td className="p-4 text-[#c5a059] font-bold">
                      {l.budgetRange || "Flexible"}
                    </td>

                    <td className="p-4">
                      <select
                        value={l.status}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => handleStatusChange(l.id, e.target.value)}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border focus:outline-none cursor-pointer ${
                          l.status === "NEW"
                            ? "bg-amber-100 text-amber-800 border-amber-300"
                            : l.status === "CONTACTED"
                            ? "bg-blue-100 text-blue-800 border-blue-200"
                            : "bg-slate-100 text-slate-600 border-slate-200"
                        }`}
                      >
                        <option value="NEW">NEW</option>
                        <option value="CONTACTED">CONTACTED</option>
                        <option value="CLOSED">CLOSED</option>
                      </select>
                    </td>

                    <td className="p-4 font-mono text-[10px] text-slate-500">
                      {l.utmSource || "Direct"}
                    </td>

                    <td className="p-4 font-mono text-[11px] text-slate-500">
                      {new Date(l.createdAt).toLocaleDateString()}
                    </td>

                    <td className="p-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => handleDelete(l.id)}
                        className="p-2 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 transition-colors cursor-pointer"
                        title="Delete Lead"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-2xl w-full p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setSelectedLead(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-[#0a192f] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-extrabold text-[#0a192f]">{selectedLead.name}</h3>
                <span
                  className={`px-2.5 py-0.5 rounded text-[10px] font-bold border ${
                    selectedLead.status === "NEW"
                      ? "bg-amber-100 text-amber-800 border-amber-300"
                      : selectedLead.status === "CONTACTED"
                      ? "bg-blue-100 text-blue-800 border-blue-200"
                      : "bg-slate-100 text-slate-600 border-slate-200"
                  }`}
                >
                  {selectedLead.status}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Submitted on {new Date(selectedLead.createdAt).toLocaleString()}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Email Address</span>
                <a
                  href={`mailto:${selectedLead.email}`}
                  className="text-blue-600 font-semibold hover:underline flex items-center gap-1.5 mt-0.5"
                >
                  <Mail className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>{selectedLead.email}</span>
                </a>
              </div>

              <div>
                <span className="text-slate-400 block text-[11px]">Phone / WhatsApp</span>
                <span className="text-[#0a192f] font-semibold flex items-center gap-1.5 mt-0.5">
                  <Phone className="w-3.5 h-3.5 text-blue-500" />
                  <span>{selectedLead.phone || "Not provided"}</span>
                </span>
              </div>

              <div>
                <span className="text-slate-400 block text-[11px]">Project Category</span>
                <span className="text-[#0a192f] font-semibold block mt-0.5">{selectedLead.projectType}</span>
              </div>

              <div>
                <span className="text-slate-400 block text-[11px]">Budget Range</span>
                <span className="text-[#c5a059] font-bold block mt-0.5">
                  {selectedLead.budgetRange || "Not specified"}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
                Inquiry Message Requirements
              </label>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 text-xs leading-relaxed whitespace-pre-line">
                {selectedLead.message}
              </div>
            </div>

            {/* Internal Notes Editor */}
            <div className="space-y-2 pt-2 border-t border-slate-200">
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
                Internal Studio Notes
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add internal notes (e.g. Call scheduled, proposal sent on Oct 14)..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#c5a059] transition-all"
              />
              <button
                onClick={handleSaveNotes}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#c5a059] to-[#d4af37] text-slate-950 font-bold text-xs hover:opacity-95 transition-all shadow-md shadow-[#c5a059]/20 flex items-center gap-1.5 cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Notes</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
