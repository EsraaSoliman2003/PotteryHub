"use client";

import { useEffect, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import Loader from "@/components/shared/Loader";
import EmptyState from "@/components/shared/EmptyState";
import useAuthStore from "@/store/useAuthStore";
import ordersApi from "@/api/ordersApi";

const STATUS_OPTIONS = ["Pending", "Approved", "Completed", "Cancelled"];

function getStatusClasses(status) {
  switch (status) {
    case "Pending":
      return "bg-amber-100 text-amber-700 border-amber-200";
    case "Approved":
      return "bg-blue-100 text-blue-700 border-blue-200";
    case "Completed":
      return "bg-green-100 text-green-700 border-green-200";
    case "Cancelled":
      return "bg-red-100 text-red-700 border-red-200";
    default:
      return "bg-slate-100 text-slate-700 border-slate-200";
  }
}

export default function AdminDashboardPage() {
  const { user, isAuthenticated } = useAuthStore();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const [filterStatus, setFilterStatus] = useState("All");

  const isAdmin = isAuthenticated && user?.role === "Admin";

  useEffect(() => {
    if (!isAdmin) {
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await ordersApi.getAll();
        setOrders(res.data || []);
      } catch (err) {
        console.error("Admin orders fetch error:", err);
        setError(
          typeof err === "string" ? err : "Failed to load orders"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [isAdmin]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      setUpdatingId(orderId);
      await ordersApi.updateStatus(orderId, newStatus);

      setOrders((prev) =>
        prev.map((o) =>
          o.id === orderId ? { ...o, status: newStatus } : o
        )
      );
    } catch (err) {
      console.error("Update status error:", err);
      alert(
        typeof err === "string"
          ? err
          : "Failed to update status, please try again."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  // فلترة حسب الحالة
  const filteredOrders =
    filterStatus === "All"
      ? orders
      : orders.filter((o) => o.status === filterStatus);

  // شوية إحصائيات بسيطة
  const totalOrders = orders.length;
  const pendingCount = orders.filter((o) => o.status === "Pending").length;
  const approvedCount = orders.filter((o) => o.status === "Approved").length;
  const completedCount = orders.filter((o) => o.status === "Completed").length;
  const cancelledCount = orders.filter((o) => o.status === "Cancelled").length;

  // لو مش أدمن
  if (!isAdmin) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center">
          <EmptyState
            title="Not authorized"
            description="You do not have permission to view this page."
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
            title="Error loading orders"
            description={error}
          />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl lg:text-4xl font-light text-slate-800 mb-2 font-serif">
                Admin <span className="text-amber-600">Dashboard</span>
              </h1>
              <p className="text-slate-600">
                Manage and monitor all store orders
              </p>
            </div>

            {/* Filter by status */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-600">Filter by:</span>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white shadow-sm"
              >
                <option value="All">All</option>
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm">
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Total Orders
              </p>
              <p className="text-2xl font-semibold text-slate-800 mt-1">
                {totalOrders}
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-amber-100 p-4 shadow-sm">
              <p className="text-xs uppercase tracking-wide text-amber-600">
                Pending
              </p>
              <p className="text-2xl font-semibold text-amber-700 mt-1">
                {pendingCount}
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-blue-100 p-4 shadow-sm">
              <p className="text-xs uppercase tracking-wide text-blue-600">
                Approved
              </p>
              <p className="text-2xl font-semibold text-blue-700 mt-1">
                {approvedCount}
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-green-100 p-4 shadow-sm">
              <p className="text-xs uppercase tracking-wide text-green-600">
                Completed
              </p>
              <p className="text-2xl font-semibold text-green-700 mt-1">
                {completedCount}
              </p>
            </div>
          </div>

          {/* Orders Table */}
          {filteredOrders.length === 0 ? (
            <EmptyState
              title="No orders for this filter"
              description="Try changing the status filter above."
            />
          ) : (
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-slate-50 border-b border-slate-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">
                        Order
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">
                        Customer
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">
                        Date
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wide">
                        Total
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">
                        Status
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wide">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order) => (
                      <tr
                        key={order.id}
                        className="border-b border-slate-50 hover:bg-slate-50/60"
                      >
                        <td className="px-4 py-3">
                          <div className="font-semibold text-slate-800">
                            #{order.id}
                          </div>
                          <div className="text-xs text-slate-500">
                            {order.items?.length || 0} items
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-slate-800 text-sm">
                            {order.user?.name || "—"}
                          </div>
                          <div className="text-xs text-slate-500">
                            {order.user?.email || ""}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-700">
                          {order.createdAt
                            ? new Date(order.createdAt).toLocaleString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )
                            : "—"}
                        </td>
                        <td className="px-4 py-3 text-right text-sm font-semibold text-slate-800">
                          ${Number(order.totalPrice || 0).toFixed(2)}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusClasses(
                              order.status
                            )}`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <select
                            value={order.status}
                            disabled={updatingId === order.id}
                            onChange={(e) =>
                              handleStatusChange(order.id, e.target.value)
                            }
                            className="text-xs border border-slate-200 rounded-lg px-2 py-1 bg-white"
                          >
                            {STATUS_OPTIONS.map((s) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
