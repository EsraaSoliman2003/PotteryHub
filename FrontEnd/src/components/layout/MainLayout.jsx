import Header from "./Header";
import Footer from "./Footer";
import Snackbar from "@/components/shared/Snackbar";

export default function MainLayout({ children }) {
  return (
    <div className="">
      <Header />
      <main className="flex-1">
        {children}
        <Snackbar />
      </main>
      <Footer />
    </div>
  );
}
