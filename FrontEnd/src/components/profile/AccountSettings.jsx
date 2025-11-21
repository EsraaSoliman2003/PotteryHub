// src/components/profile/AccountSettings.jsx
"use client";

import { useState } from "react";
import {
  UserCircleIcon,
  LockClosedIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import EditProfileForm from "@/components/profile/EditProfileForm";
import ChangePasswordForm from "@/components/profile/ChangePasswordForm";

export default function AccountSettings({ open, onClose, onProfileUpdated }) {
  const [activeTab, setActiveTab] = useState("profile"); // "profile" | "security"

  if (!open) return null;

  const tabs = [
    {
      id: "profile",
      label: "Profile info",
      description: "Update your personal details",
      icon: UserCircleIcon,
    },
    {
      id: "security",
      label: "Security",
      description: "Change your password",
      icon: LockClosedIcon,
    },
  ];

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/40">
      <div className="relative w-full max-w-2xl mx-4 rounded-3xl border border-amber-100/70 bg-white/90 shadow-[0_18px_45px_rgba(15,23,42,0.18)] backdrop-blur-xl p-6 lg:p-8">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1.5 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700 transition-colors"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <span className="inline-flex items-center rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-amber-700">
            Account
          </span>
          <h2 className="mt-3 text-2xl lg:text-3xl font-light text-slate-900 font-serif">
            Account settings
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Keep your information up to date and your account secure.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-3 mb-6">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`group relative flex min-w-[180px] flex-1 items-center gap-3 rounded-2xl border px-3 py-3 text-left transition-all md:flex-none ${
                  isActive
                    ? "border-amber-400 bg-gradient-to-r from-amber-500 to-orange-400 text-white shadow-lg shadow-amber-500/30"
                    : "border-slate-200 bg-white/70 text-slate-600 hover:border-amber-200 hover:bg-amber-50/60"
                }`}
              >
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-2xl border text-sm ${
                    isActive
                      ? "border-white/40 bg-white/10 text-white"
                      : "border-amber-100 bg-amber-50 text-amber-600"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <span
                    className={`text-sm font-semibold ${
                      isActive ? "text-white" : "text-slate-800"
                    }`}
                  >
                    {tab.label}
                  </span>
                  <span
                    className={`text-xs ${
                      isActive ? "text-amber-50/90" : "text-slate-500"
                    }`}
                  >
                    {tab.description}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="mt-4 border-t border-amber-100/70 pt-6">
          {activeTab === "profile" && (
            <div className="max-w-xl">
              <EditProfileForm
                variant="insideCard"
                onProfileUpdated={onProfileUpdated}
                onClose={onClose}
              />
            </div>
          )}

          {activeTab === "security" && (
            <div className="max-w-xl">
              <ChangePasswordForm variant="insideCard" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
