import {
  SidebarHeader,
  SidebarContent,
  Sidebar,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupContent,
  SidebarFooter,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { BoxIcon, LogOutIcon, NewspaperIcon, TagIcon } from "lucide-react";
import { signOut } from "../../auth";
import Link from "next/link";

const menus = [
  {
    label: "Categories",
    href: "/admin/categories",
    icon: TagIcon,
  },
  {
    label: "Products",
    href: "/admin/products",
    icon: BoxIcon,
  },
  {
    label: "Articles",
    href: "/admin/articles",
    icon: NewspaperIcon,
  },
];

export function AdminSidebar() {
  async function handleSignOut() {
    "use server";
    await signOut({ redirectTo: "/admin/login" });
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <h1 className="text-xl font-medium tracking-tight">Admin Panel</h1>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menus.map((menu, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild>
                    <Link prefetch href={menu.href}>
                      <menu.icon className="size-4" />
                      <span>{menu.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleSignOut}>
              <LogOutIcon />
              Sign Out
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
