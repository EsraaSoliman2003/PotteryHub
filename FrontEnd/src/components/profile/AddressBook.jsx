// AddressBook.js - التصميم الجديد
"use client";

import { PlusIcon, MapPinIcon } from "@heroicons/react/24/outline";

const DEMO_ADDRESSES = [
  // Empty for demo - uncomment below to test with addresses
  /*
  {
    id: "a1",
    name: "Home",
    address: "123 Main Street, Apt 4B",
    city: "New York, NY 10001",
    isDefault: true
  }
  */
];

export default function AddressBook() {
  if (!DEMO_ADDRESSES.length) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm border border-amber-200/30 p-6 lg:p-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <MapPinIcon className="w-8 h-8 text-amber-600" />
          </div>
          <h3 className="text-xl font-light text-slate-800 mb-2 font-serif">
            No Saved Addresses
          </h3>
          <p className="text-slate-600 mb-6 text-sm">
            Add your shipping address to speed up checkout.
          </p>
          <button className="w-full flex items-center justify-center gap-2 bg-amber-500 text-white px-6 py-3 rounded-xl hover:bg-amber-600 transition-colors font-semibold">
            <PlusIcon className="w-5 h-5" />
            Add Address
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm border border-amber-200/30 p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-light text-slate-800 font-serif">
          Address Book
        </h3>
        <button className="flex items-center gap-2 text-amber-600 hover:text-amber-700 text-sm font-medium">
          <PlusIcon className="w-4 h-4" />
          Add New
        </button>
      </div>

      <div className="space-y-4">
        {DEMO_ADDRESSES.map((address) => (
          <div
            key={address.id}
            className="p-4 bg-white rounded-2xl border border-amber-200/30 hover:border-amber-300/50 transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <h4 className="font-semibold text-slate-800 flex items-center gap-2">
                  {address.name}
                  {address.isDefault && (
                    <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
                      Default
                    </span>
                  )}
                </h4>
                <p className="text-slate-600 text-sm mt-1">{address.address}</p>
                <p className="text-slate-600 text-sm">{address.city}</p>
              </div>
            </div>
            
            <div className="flex gap-2 mt-3">
              <button className="text-xs text-amber-600 hover:text-amber-700 font-medium">
                Edit
              </button>
              <button className="text-xs text-slate-500 hover:text-red-500 font-medium">
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}