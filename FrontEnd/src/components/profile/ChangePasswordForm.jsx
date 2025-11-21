"use client";

import { useState } from "react";
import usersApi from "@/api/usersApi";
import Input from "@/components/shared/Input";
import Button from "@/components/shared/Button";

export default function ChangePasswordForm() {
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

      setMessage("Password updated successfully");
      setCurrentPassword("");
      setNewPassword("");
      setNewPasswordConfirm("");
    } catch (err) {
      setError(typeof err === "string" ? err : "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm border border-amber-200/30 p-6 lg:p-8 mt-6">
      <h3 className="text-lg font-medium text-slate-800 mb-4">
        Change Password
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="password"
          label="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
        />
        <Input
          type="password"
          label="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <Input
          type="password"
          label="Confirm New Password"
          value={newPasswordConfirm}
          onChange={(e) => setNewPasswordConfirm(e.target.value)}
          required
        />

        {error && <p className="text-sm text-red-600">{error}</p>}
        {message && <p className="text-sm text-green-600">{message}</p>}

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Saving..." : "Update Password"}
        </Button>
      </form>
    </div>
  );
}
