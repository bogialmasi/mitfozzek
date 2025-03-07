export default function ShoppingLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <section className="flex flex-col items-center justify-center py-8 md:py-10">
        <div className="w-full text-center items-center justify-center">
          {children}
        </div>
      </section>
    );
  }
  