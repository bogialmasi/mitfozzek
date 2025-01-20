'use client'
import { Pantry } from "@/components/profile/pantry";
import { usePathname } from "next/navigation";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const pathname = usePathname();
  const isNotSubRoute = pathname === '/profile' || pathname === '/profile/';

  if(isNotSubRoute) { return (
    <section className="flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 h-screen gap-x-6">
          {children}
          <Pantry />
        </div>
      </section>
  )}
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          {children}
        </div>
      </section>
  )
}
