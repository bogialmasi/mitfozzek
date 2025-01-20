import MySidebar from "@/components/search/sidebar";


export default function SearchResultsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      {/* Sidebar */}
      <MySidebar />

      {/* Main Content */}
      <main className="flex-1 p-6">
        {children}
        </main>
    </div>
  );
}
