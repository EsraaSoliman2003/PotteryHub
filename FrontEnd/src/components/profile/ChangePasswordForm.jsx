// src/components/profile/ChangePasswordForm.jsx
"use client";

import { useState } from "react";
import usersApi from "@/api/usersApi";
import Input from "@/components/shared/Input";
import Button from "@/components/shared/Button";

export default function ChangePasswordForm({ variant = "standalone" }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== newPasswordConfirm) {
      setError("New passwords do not match");
      setMessage(null);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setMessage(null);

      await usersApi.changePassword({
        currentPassword,
        newPassword,
      });

      setMessage("Password updated successfully 🔐");
      setCurrentPassword("");
      setNewPassword("");
      setNewPasswordConfirm("");
    } catch (err) {
      setError(typeof err === "string" ? err : "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  if (variant === "standalone") {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm border border-amber-200/30 p-6 lg:p-8 mt-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-2">
          Change password
        </h3>
        <p className="text-sm text-slate-500 mb-4">
          Make sure your password is strong and unique.
        </p>
        <FormContent
          currentPassword={currentPassword}
          setCurrentPassword={setCurrentPassword}
          newPassword={newPassword}
          setNewPassword={setNewPassword}
          newPasswordConfirm={newPasswordConfirm}
          setNewPasswordConfirm={setNewPasswordConfirm}
          loading={loading}
          error={error}
          message={message}
          onSubmit={handleSubmit}
        />
      </div>
    );
  }

  return (
    <FormContent
      currentPassword={currentPassword}
      setCurrentPassword={setCurrentPassword}
      newPassword={newPassword}
      setNewPassword={setNewPassword}
      newPasswordConfirm={newPasswordConfirm}
      setNewPasswordConfirm={setNewPasswordConfirm}
      loading={loading}
      error={error}
      message={message}
      onSubmit={handleSubmit}
    />
  );
}

function FormContent({
  currentPassword,
  setCurrentPassword,
  newPassword,
  setNewPassword,
  newPasswordConfirm,
  setNewPasswordConfirm,
  loading,
  error,
  message,
  onSubmit,
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="space-y-4">
        <Input
          type="password"
          label="Current password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
        />
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            type="password"
            label="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <Input
            type="password"
            label="Confirm new password"
            value={newPasswordConfirm}
            onChange={(e) => setNewPasswordConfirm(e.target.value)}
            required
          />
        </div>
      </div>

      {(error || message) && (
        <div
          className={`rounded-2xl border px-3 py-2 text-xs font-medium md:text-sm flex items-center gap-2 bg-gradient-to-r ${
            error
              ? "from-red-50 to-rose-50 border-red-100 text-red-700"
              : "from-emerald-50 to-amber-50 border-emerald-100 text-emerald-700"
          }`}
        >
          <span>{error || message}</span>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <Button
          type="submit"
          disabled={loading}
          className="rounded-2xl px-6 py-2 text-sm font-semibold shadow-sm"
        >
          {loading ? "Saving..." : "Update password"}
        </Button>
        <span className="text-xs text-slate-400">
          You&apos;ll need this to sign in next time.
        </span>
      </div>
    </form>
  );
}
