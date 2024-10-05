"use client"
// import { dashboardConfig } from "@/config/dashboard";
import SideBar from "./_components/sidebar";


interface DashboardLayoutProps {
    children?: React.ReactNode;
}

export default async function DashboardLayout({
    children,
}: DashboardLayoutProps) {
    return (
        <div className=" min-h-screen bg-white ">
            <aside className="fixed inset-y-0  hidden w-[230px] flex-col md:flex bg-white p-4  ">
                <SideBar />
            </aside>
            <main className="fixed  w-full  sm:ml-[230px] m-4 pl-8 pt-4">
                {children}
            </main>
        </div>
    );
}
