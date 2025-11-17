// ProfileInfo.js - التصميم الجديد
"use client";

import { UserIcon, EnvelopeIcon, CalendarIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";

export default function ProfileInfo() {
  const user = {
    name: "Demo User",
    email: "demo@example.com",
    joinedAt: "January 2025",
    orders: 12,
    loyaltyPoints: 450
  };

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
        <p className="text-slate-600">Premium Member</p>
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
            <p className="text-slate-600 text-sm">{user.joinedAt}</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center p-3 bg-white rounded-xl border border-amber-200/30">
          <div className="text-lg font-bold text-amber-600">{user.orders}</div>
          <div className="text-xs text-slate-600">Orders</div>
        </div>
        <div className="text-center p-3 bg-white rounded-xl border border-amber-200/30">
          <div className="text-lg font-bold text-amber-600">{user.loyaltyPoints}</div>
          <div className="text-xs text-slate-600">Points</div>
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-2">
        <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-slate-50 rounded-xl transition-colors text-sm font-medium">
          <Cog6ToothIcon className="w-5 h-5" />
          Account Settings
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-slate-50 rounded-xl transition-colors text-sm font-medium">
          <UserIcon className="w-5 h-5" />
          Edit Profile
        </button>
      </div>
    </div>
  );
}