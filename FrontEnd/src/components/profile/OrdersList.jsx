// OrdersList.js - التصميم الجديد
"use client";

import { TruckIcon, CheckCircleIcon, ClockIcon } from "@heroicons/react/24/outline";

const DEMO_ORDERS = [
  {
    id: "PO-12345",
    date: "2025-02-10",
    total: 199.99,
    status: "Delivered",
    items: 3,
    tracking: "TRK123456789"
  },
  {
    id: "PO-12346",
    date: "2025-03-01",
    total: 85.50,
    status: "Processing",
    items: 2,
    tracking: null
  },
  {
    id: "PO-12347",
    date: "2025-01-15",
    total: 245.00,
    status: "Delivered",
    items: 5,
    tracking: "TRK987654321"
  }
];

const getStatusIcon = (status) => {
  switch (status) {
    case 'Delivered':
      return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
    case 'Processing':
      return <ClockIcon className="w-5 h-5 text-amber-500" />;
    default:
      return <TruckIcon className="w-5 h-5 text-blue-500" />;
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case 'Delivered':
      return 'bg-green-100 text-green-700 border-green-200';
    case 'Processing':
      return 'bg-amber-100 text-amber-700 border-amber-200';
    default:
      return 'bg-blue-100 text-blue-700 border-blue-200';
  }
};

export default function OrdersList() {
  if (!DEMO_ORDERS.length) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm border border-amber-200/30 p-8 text-center">
        <div className="text-6xl mb-6">📦</div>
        <h2 className="text-2xl font-light text-slate-800 mb-4">No orders yet</h2>
        <p className="text-slate-600 mb-8">When you place an order, it will appear here.</p>
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
          {DEMO_ORDERS.length} orders
        </span>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {DEMO_ORDERS.map((order) => (
          <div
            key={order.id}
            className="p-4 bg-white rounded-2xl border border-amber-200/30 hover:border-amber-300/50 transition-all duration-300 group"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-slate-800 text-lg">
                  {order.id}
                </h3>
                <p className="text-slate-500 text-sm">
                  {new Date(order.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              
              <div className="text-right">
                <div className="text-xl font-bold text-slate-800">
                  ${order.total.toFixed(2)}
                </div>
                <div className="flex items-center gap-1 justify-end">
                  <span className="text-slate-500 text-sm">{order.items} items</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-amber-200/30">
              <div className="flex items-center gap-2">
                {getStatusIcon(order.status)}
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </div>

              <div className="flex gap-2">
                {order.tracking && (
                  <button className="px-3 py-1.5 text-xs bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors font-medium">
                    Track Order
                  </button>
                )}
                <button className="px-3 py-1.5 text-xs bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors font-medium">
                  View Details
                </button>
              </div>
            </div>
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