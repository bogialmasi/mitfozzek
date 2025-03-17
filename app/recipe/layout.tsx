export default function RecipeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center justify-center">
      <div className="max-w-7xl text-center justify-center py-6 py-16 md:px-10">
        {children}
      </div>
    </section>
  );
}
