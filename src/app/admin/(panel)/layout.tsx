import type { ReactNode } from "react";
import { AdminSidebar } from "@/components/admin-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <main className="flex grow flex-col p-6">{children}</main>
    </SidebarProvider>
  );
}
