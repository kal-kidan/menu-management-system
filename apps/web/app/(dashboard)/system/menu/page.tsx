import { BreadcrumbCustom } from "@/components/breadcrumb-custom"
import { MenuHeader } from "@/components/header"
import { Icons } from "@/components/icons"
import { TreeDataItem, TreeView } from "@/components/tree";
import { Grid2X2 } from "lucide-react"
import MenuSelect from "../../_components/menu-select";

export default function MenuPage() {
    const data: TreeDataItem[] = [
        {
            id: '1',
            name: 'Item 1',
            children: [
                {
                    id: '2',
                    name: 'Item 1.1',
                    children: [
                        {
                            id: '3',
                            name: 'Item 1.1.1',
                        },
                        {
                            id: '4',
                            name: 'Item 1.1.2',
                        },
                    ],
                },
                {
                    id: '5',
                    name: 'Item 1.2',
                },
            ],
        },
        {
            id: '6',
            name: 'Item 2',
        },
    ];

    return (
        <div className="p-4">
            <BreadcrumbCustom currentPage="Menu" links={[]} />
            <div className="mt-6">
                <MenuHeader
                    title="Menus"
                    icon={Icons.layout}
                />
            </div>
            <MenuSelect />

            <div className=" max-w-[400px]">
                <TreeView
                    data={data}
                />
            </div>
        </div>
    )
}






