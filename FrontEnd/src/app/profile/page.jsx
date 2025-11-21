// src/app/profile/page.jsx
"use client";

import { useEffect, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import ProfileInfo from "@/components/profile/ProfileInfo";
import OrdersList from "@/components/profile/OrdersList";
import AddressBook from "@/components/profile/AddressBook";

import useAuthStore from "@/store/useAuthStore";
import usersApi from "@/api/usersApi";
import ordersApi from "@/api/ordersApi";
import Loader from "@/components/shared/Loader";
import EmptyState from "@/components/shared/EmptyState";
import ChangePasswordForm from "@/components/profile/ChangePasswordForm";
import EditProfileForm from "@/components/profile/EditProfileForm";

export default function ProfilePage() {
  const { user, isAuthenticated } = useAuthStore();

  const [profile, setProfile] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // لو مش عامل لوجين
    if (!isAuthenticated || !user) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [userRes, ordersRes] = await Promise.all([
          usersApi.getById(user.id),
          ordersApi.getMyOrders(),
        ]);

        setProfile(userRes.data);
        setOrders(ordersRes.data);
      } catch (err) {
        console.error("Profile load error:", err);
        setError(typeof err === "string" ? err : "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isAuthenticated, user]);

  if (!isAuthenticated) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center">
          <EmptyState
            title="You are not logged in"
            description="Please login to view your profile."
            actionLabel="Go to Login"
            actionHref="/auth/login"
          />
        </div>
      </MainLayout>
    );
  }

  if (loading) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center">
          <Loader />
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center">
          <EmptyState
            title="Error loading profile"
            description={error}
          />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-amber-50/30 to-white py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-light text-slate-800 mb-4 font-serif">
              My <span className="text-amber-600">Profile</span>
            </h1>
            <p className="text-lg text-slate-600">
              Manage your account, orders, and addresses
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Sidebar - Profile Info + Addresses + Change Password */}
            <div className="lg:col-span-1 space-y-6">
              <ProfileInfo user={profile} />
              {/* <AddressBook /> */}
                <ChangePasswordForm />
                  <EditProfileForm />

            </div>

            {/* Right Content - Orders */}
            <div className="lg:col-span-2">
              <OrdersList orders={orders} />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
