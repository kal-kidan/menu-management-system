"use client"
import { BreadcrumbCustom } from "@/components/breadcrumb-custom"
import { MenuHeader } from "@/components/header"
import { Icons } from "@/components/icons"
import MenuSelect from "../../_components/menu-select";
import FileSystemTree from "../../_components/menu-tree";

export default function MenuPage({ searchParams }: { searchParams: { expand: string } }) {
    return (
        <div className="p-4">
            <BreadcrumbCustom currentPage="Menu" links={[]} />
            <div className="mt-6">
                <MenuHeader
                    title="Menus"
                    icon={Icons.layout}
                />
            </div>
            <FileSystemTree
                expand={searchParams?.expand}

            />
        </div>
    )
}






