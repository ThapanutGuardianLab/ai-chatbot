"use client";

import type { User } from "next-auth";
import { useRouter } from "next/navigation";

import { PlusIcon } from "@/components/icons";
import { SidebarUserNav } from "@/components/sidebar-user-nav";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";

export function AppKnowledgeSidebar({ user }: { user: User | undefined }) {
  const { setOpenMobile } = useSidebar();

  return (
    <Sidebar className="group-data-[side=left]:border-r-0">
      <SidebarHeader>
        <SidebarMenu>
          <div className="flex flex-row justify-between items-center">
            <Link
              href="/"
              onClick={() => {
                setOpenMobile(false);
              }}
              className="flex flex-row gap-3 items-center !w-full"
            >
              <span className="text-lg font-semibold px-2 hover:bg-muted rounded-md cursor-pointer">
                Chatbot
              </span>
            </Link>
          </div>
          <Link
            href="/knowledge"
            onClick={() => {
              setOpenMobile(false);
            }}
            className="flex flex-row gap-3 items-center"
          >
            <span className="text-lg font-semibold px-2 hover:bg-muted rounded-md cursor-pointer w-full">
              Knowledge
            </span>
          </Link>
          <Link
            href="/faq"
            onClick={() => {
              setOpenMobile(false);
            }}
            className="flex flex-row gap-3 items-center"
          >
            <span className="text-lg font-semibold px-2 hover:bg-muted rounded-md cursor-pointer w-full">
              FAQ
            </span>
          </Link>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>{/* <SidebarHistory user={user} /> */}</SidebarContent>
      <SidebarFooter>{user && <SidebarUserNav user={user} />}</SidebarFooter>
    </Sidebar>
  );
}
