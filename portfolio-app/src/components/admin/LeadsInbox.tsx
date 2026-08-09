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

  return (
    <div className="space-y-6">
      {/* Search & Export Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 glass-card p-4 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {["All", "NEW", "CONTACTED", "CLOSED"].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                filterStatus === st
                  ? "bg-emerald-500 text-slate-950 font-bold"
                  : "bg-slate-900 text-slate-400 hover:text-white"
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search leads..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <button
            onClick={exportCSV}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs flex items-center gap-1.5 shrink-0"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Inbox Table */}
      <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/90 text-slate-400 font-semibold border-b border-slate-800">
              <tr>
                <th className="p-4">Contact</th>
                <th className="p-4">Project Category</th>
                <th className="p-4">Budget</th>
                <th className="p-4">Status</th>
                <th className="p-4">Source</th>
                <th className="p-4">Submitted</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-500">
                    No lead submissions found.
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
                    className={`hover:bg-slate-900/60 cursor-pointer transition-colors ${
                      selectedLead?.id === l.id ? "bg-slate-900/90 border-l-2 border-emerald-500" : ""
                    }`}
                  >
                    <td className="p-4">
                      <div className="font-bold text-white">{l.name}</div>
                      <div className="text-[11px] text-slate-400">{l.email}</div>
                    </td>

                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-200 font-medium text-[11px]">
                        {l.projectType}
                      </span>
                    </td>

                    <td className="p-4 text-emerald-400 font-medium">
                      {l.budgetRange || "Flexible"}
                    </td>

                    <td className="p-4">
                      <select
                        value={l.status}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => handleStatusChange(l.id, e.target.value)}
                        className={`px-2 py-1 rounded-lg text-[10px] font-bold border focus:outline-none ${
                          l.status === "NEW"
                            ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                            : l.status === "CONTACTED"
                            ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/40"
                            : "bg-slate-800 text-slate-400 border-slate-700"
                        }`}
                      >
                        <option value="NEW">NEW</option>
                        <option value="CONTACTED">CONTACTED</option>
                        <option value="CLOSED">CLOSED</option>
                      </select>
                    </td>

                    <td className="p-4 font-mono text-[10px] text-slate-400">
                      {l.utmSource || "Direct"}
                    </td>

                    <td className="p-4 font-mono text-[11px] text-slate-400">
                      {new Date(l.createdAt).toLocaleDateString()}
                    </td>

                    <td className="p-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => handleDelete(l.id)}
                        className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 transition-colors"
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
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card max-w-2xl w-full p-8 rounded-3xl border border-slate-800 space-y-6 max-h-[90vh] overflow-y-auto relative animate-in fade-in">
            <button
              onClick={() => setSelectedLead(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-white">{selectedLead.name}</h3>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {selectedLead.status}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Submitted on {new Date(selectedLead.createdAt).toLocaleString()}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs">
              <div>
                <span className="text-slate-500 block">Email Address</span>
                <a href={`mailto:${selectedLead.email}`} className="text-emerald-400 font-semibold flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5" />
                  <span>{selectedLead.email}</span>
                </a>
              </div>

              <div>
                <span className="text-slate-500 block">Phone / WhatsApp</span>
                <span className="text-white font-semibold flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{selectedLead.phone || "Not provided"}</span>
                </span>
              </div>

              <div>
                <span className="text-slate-500 block">Project Category</span>
                <span className="text-white font-semibold">{selectedLead.projectType}</span>
              </div>

              <div>
                <span className="text-slate-500 block">Budget Range</span>
                <span className="text-emerald-400 font-semibold">{selectedLead.budgetRange || "Not specified"}</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                Inquiry Message Requirements
              </label>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-xs leading-relaxed whitespace-pre-line">
                {selectedLead.message}
              </div>
            </div>

            {/* Internal Notes Editor */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                Internal Studio Notes
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add internal notes (e.g. Call scheduled, proposal sent on Aug 10)..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
              <button
                onClick={handleSaveNotes}
                className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-colors flex items-center gap-1.5"
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
