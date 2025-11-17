// ProfilePage.js - التصميم الجديد
import MainLayout from "@/components/layout/MainLayout";
import ProfileInfo from "@/components/profile/ProfileInfo";
import OrdersList from "@/components/profile/OrdersList";
import AddressBook from "@/components/profile/AddressBook";

export default function ProfilePage() {
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
            
            {/* Left Sidebar - Profile Info */}
            <div className="lg:col-span-1 space-y-6">
              <ProfileInfo />
              <AddressBook />
            </div>

            {/* Right Content - Orders */}
            <div className="lg:col-span-2">
              <OrdersList />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}