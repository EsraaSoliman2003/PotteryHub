"use client";

import { useState } from "react";
import usersApi from "@/api/usersApi";
import useAuthStore from "@/store/useAuthStore";
import Input from "@/components/shared/Input";
import Button from "@/components/shared/Button";

export default function EditProfileForm() {
  const { user, setUser } = useAuthStore();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);
      setMessage(null);

      const res = await usersApi.updateMe({ name, email });

      // نحدّث الستور
      setUser(res.data);

      setMessage("Profile updated successfully");
    } catch (err) {
      setError(typeof err === "string" ? err : "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm border border-amber-200/30 p-6 lg:p-8 mt-6">
      <h3 className="text-lg font-medium text-slate-800 mb-4">
        Edit Profile
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {error && <p className="text-sm text-red-600">{error}</p>}
        {message && <p className="text-sm text-green-600">{message}</p>}

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </div>
  );
}
