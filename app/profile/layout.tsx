export default function ProfileLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <section className="flex flex-col gap-4">
        <div className="inline-block max-w-lg">
          {children}
        </div>
      </section>
    );
  }
  