import type { ReactNode } from "react";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return <main className="flex flex-col">{children}</main>;
}
