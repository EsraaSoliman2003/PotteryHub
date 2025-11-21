// src/components/profile/EditProfileForm.jsx
"use client";

import { useState } from "react";
import usersApi from "@/api/usersApi";
import useAuthStore from "@/store/useAuthStore";
import Input from "@/components/shared/Input";
import Button from "@/components/shared/Button";

export default function EditProfileForm({
  variant = "standalone",
  onProfileUpdated,
  onClose,
}) {
  const { user, setUser } = useAuthStore();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  if (!user) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);
      setMessage(null);

      const res = await usersApi.updateMe({ name, email });

      setUser(res.data);
      onProfileUpdated?.(res.data);
      setMessage("Profile updated successfully ✨");

      // لو جوّه المودال، نقفل بعد النجاح
      if (onClose) {
        setTimeout(onClose, 500);
      }
    } catch (err) {
      setError(typeof err === "string" ? err : "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (variant === "standalone") {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm border border-amber-200/30 p-6 lg:p-8 mt-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-2">
          Edit profile
        </h3>
        <p className="text-sm text-slate-500 mb-4">
          Update your name and email address.
        </p>
        <FormContent
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
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
      name={name}
      setName={setName}
      email={email}
      setEmail={setEmail}
      loading={loading}
      error={error}
      message={message}
      onSubmit={handleSubmit}
    />
  );
}

function FormContent({
  name,
  setName,
  email,
  setEmail,
  loading,
  error,
  message,
  onSubmit,
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2">
        <Input
          label="Full name"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <Input
          label="Email address"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
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
          {loading ? "Saving..." : "Save changes"}
        </Button>

        <span className="text-xs text-slate-400">
          Your changes will be applied immediately.
        </span>
      </div>
    </form>
  );
}
