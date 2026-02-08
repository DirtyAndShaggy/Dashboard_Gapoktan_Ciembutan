import Sidebar from "../components/sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen
      bg-gray-50 text-gray-900
      dark:bg-gray-900 dark:text-gray-100
    ">
      <Sidebar />

      <main
        className="
          flex-1 min-h-screen
          pt-14 md:pt-0
          bg-gray-50
          dark:bg-gray-900
        "
      >
        {children}
      </main>
    </div>
  );
}
