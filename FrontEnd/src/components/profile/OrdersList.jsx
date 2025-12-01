// src/components/profile/OrdersList.jsx
"use client";

import { useState, useEffect } from "react";
import {
  TruckIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import ordersApi from "@/api/ordersApi";

const getStatusIcon = (status) => {
  switch (status) {
    case "Pending":      // جاري المراجعة
      return <ClockIcon className="w-5 h-5 text-amber-500" />;
    case "Approved":     // تمت الموافقة / قيد التنفيذ
      return <TruckIcon className="w-5 h-5 text-blue-500" />;
    case "Completed":    // تم التسليم
      return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
    case "Cancelled":    // تم الإلغاء
      return <XCircleIcon className="w-5 h-5 text-red-500" />;
    default:
      return <TruckIcon className="w-5 h-5 text-slate-400" />;
  }
};

const getStatusColor = (status) => {
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
};

export default function OrdersList({ orders }) {
  // نشتغل بنسخة محلية من الأوردرات عشان نعدّلها بعد الإلغاء
  const [localOrders, setLocalOrders] = useState(orders || []);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [cancelLoadingId, setCancelLoadingId] = useState(null);

  // لو الـ props اتغيّرت (مثلاً بعد refetch) نحدّث النسخة المحلية
  useEffect(() => {
    setLocalOrders(orders || []);
  }, [orders]);

  const toggleDetails = (orderId) => {
    setExpandedOrderId((prev) => (prev === orderId ? null : orderId));
  };

  const handleCancelOrder = async (orderId) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this order?"
    );
    if (!confirmCancel) return;

    try {
      setCancelLoadingId(orderId);
      await ordersApi.cancel(orderId);

      // نحدّث حالة الأوردر في الواجهة
      setLocalOrders((prev) =>
        prev.map((o) =>
          o.id === orderId ? { ...o, status: "Cancelled" } : o
        )
      );
    } catch (err) {
      console.error("Cancel order error:", err);
      alert(
        typeof err === "string"
          ? err
          : "Failed to cancel order, please try again."
      );
    } finally {
      setCancelLoadingId(null);
    }
  };

  if (!localOrders || localOrders.length === 0) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm border border-amber-200/30 p-8 text-center">
        <div className="text-6xl mb-6">📦</div>
        <h2 className="text-2xl font-light text-slate-800 mb-4">
          No orders yet
        </h2>
        <p className="text-slate-600 mb-8">
          When you place an order, it will appear here.
        </p>
        <button className="bg-amber-500 text-white px-8 py-3 rounded-xl hover:bg-amber-600 transition-colors font-semibold">
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm border border-amber-200/30 p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-light text-slate-800 font-serif">
          Order History
        </h2>
        <span className="text-slate-600 text-sm">
          {localOrders.length} orders
        </span>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {localOrders.map((order) => (
          <div
            key={order.id}
            className="p-4 bg-white rounded-2xl border border-amber-200/30 hover:border-amber-300/50 transition-all duration-300 group"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-slate-800 text-lg">
                  #{order.id}
                </h3>
                <p className="text-slate-500 text-sm">
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : ""}
                </p>
              </div>

              <div className="text-right">
                <div className="text-xl font-bold text-slate-800">
                  ${Number(order.total || order.totalPrice || 0).toFixed(2)}
                </div>
                <div className="flex items-center gap-1 justify-end">
                  <span className="text-slate-500 text-sm">
                    {(order.itemsCount || order.items?.length || 0)} items
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-amber-200/30">
              <div className="flex items-center gap-2">
                {getStatusIcon(order.status)}
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>
              </div>

              <div className="flex gap-2">
                {/* View / Hide details */}
                <button
                  onClick={() => toggleDetails(order.id)}
                  className="px-3 py-1.5 text-xs bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors font-medium"
                >
                  {expandedOrderId === order.id
                    ? "Hide Details"
                    : "View Details"}
                </button>

                {/* Cancel button: يظهر فقط لو الأوردر Pending */}
                {order.status === "Pending" && (
                  <button
                    onClick={() => handleCancelOrder(order.id)}
                    disabled={cancelLoadingId === order.id}
                    className="px-3 py-1.5 text-xs bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors font-medium disabled:opacity-60"
                  >
                    {cancelLoadingId === order.id
                      ? "Cancelling..."
                      : "Cancel Order"}
                  </button>
                )}
              </div>
            </div>

            {/* تفاصيل الأوردر تحت الكارت */}
            {expandedOrderId === order.id && (
              <div className="mt-4 pt-3 border-t border-dashed border-amber-200/60">
                {order.items && order.items.length > 0 ? (
                  <div className="space-y-2">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between text-sm text-slate-700"
                      >
                        <div className="flex flex-col">
                          <span className="font-medium">
                            {item.productTitle ||
                              item.product?.title ||
                              "Item"}
                          </span>
                          <span className="text-slate-500 text-xs">
                            Qty: {item.quantity} × $
                            {Number(
                              item.unitPrice ||
                                item.price ||
                                item.totalPrice / item.quantity ||
                                0
                            ).toFixed(2)}
                          </span>
                        </div>
                        <div className="font-semibold text-slate-900">
                          $
                          {Number(
                            item.total ||
                              item.totalPrice ||
                              (item.unitPrice || item.price || 0) *
                                item.quantity
                          ).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-slate-500">
                    No items available for this order.
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* View All Orders */}
      <div className="text-center mt-8 pt-6 border-t border-amber-200/30">
        <button className="text-amber-600 hover:text-amber-700 font-medium">
          View All Orders →
        </button>
      </div>
    </div>
  );
}
