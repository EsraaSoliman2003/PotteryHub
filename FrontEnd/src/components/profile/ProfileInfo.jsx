// src/components/profile/ProfileInfo.jsx
"use client";

import {
  UserIcon,
  EnvelopeIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";

export default function ProfileInfo({ user, onEditClick }) {
  if (!user) return null;

  const joinedAt = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "—";

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm border border-amber-200/30 p-6 lg:p-8">
      {/* Profile Header */}
      <div className="text-center mb-6">
        <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <UserIcon className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-light text-slate-800 mb-2 font-serif">
          {user.name}
        </h2>
        <p className="text-slate-600">
          {user.role === "Admin" ? "Administrator" : "Member"}
        </p>
      </div>

      {/* User Details */}
      <div className="space-y-4 mb-6">
        <div className="flex items-center gap-3 p-3 bg-amber-50/50 rounded-xl border border-amber-200/30">
          <EnvelopeIcon className="w-5 h-5 text-amber-600" />
          <div>
            <p className="text-sm font-medium text-slate-700">Email</p>
            <p className="text-slate-600 text-sm">{user.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-amber-50/50 rounded-xl border border-amber-200/30">
          <CalendarIcon className="w-5 h-5 text-amber-600" />
          <div>
            <p className="text-sm font-medium text-slate-700">Member Since</p>
            <p className="text-slate-600 text-sm">{joinedAt}</p>
          </div>
        </div>
      </div>

      {/* Edit button */}
      <button
        onClick={onEditClick}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium rounded-xl bg-amber-500 text-white hover:bg-amber-600 transition-colors"
      >
        Edit profile
      </button>
    </div>
  );
}
