import Sidebar from "../components/sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 bg-white">
        {children}
      </main>
    </div>
  );
}
