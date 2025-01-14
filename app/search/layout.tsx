export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center justify-center">
      <div className="w-full max-w-xl text-center justify-center">
        {children}
      </div>
    </section>
  );
}
