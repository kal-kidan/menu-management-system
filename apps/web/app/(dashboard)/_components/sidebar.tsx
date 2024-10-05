import { ChevronDown, ChevronRight, Folder, Menu } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { usePathname, useRouter } from "next/navigation"
import { Icons } from "@/components/icons"

export default function Component() {
    const [isCollapsed, setIsCollapsed] = useState(false)
    const [openMenus, setOpenMenus] = useState<string[]>(["Systems"])
    const path = usePathname()
    const router = useRouter()
    const isTabActive = (link: string) => {
        return path.startsWith(link)
    }

    const isLinkActive = (link: string) => {
        return path === link
    }


    const menuItems = [
        {
            name: "Systems",
            tabLink: "/system",
            subItems: [
                { name: "System Code", link: "/system/systemCode" },
                { name: "Properties", link: "/system/properties" },
                { name: "Menus", link: "/system/menu" },
                { name: "API List", link: "/system/apiList" },
            ],
        },
        {
            name: "Users & Group",
            tabLink: "/user",
            subItems: [
                { name: "User Management", link: "/user/useManagement" },
                { name: "Group Management", link: "/user/groupManagement" },
                { name: "Permissions", link: "/user/permissions" },
            ],
        },
        {
            name: "Competition",
            tabLink: "/competition",

        }
    ]

    const toggleMenu = (menuName: string) => {
        setOpenMenus((prevOpenMenus) =>
            prevOpenMenus.includes(menuName)
                ? prevOpenMenus.filter((item) => item !== menuName)
                : [...prevOpenMenus, menuName]
        )
    }

    return (
        <div
            className={`flex h-screen flex-col bg-background text-white transition-all duration-300 rounded-2xl ${isCollapsed ? "w-16" : "w-[230px]"
                }`}
        >
            <div className="flex items-center justify-between p-4">
                {!isCollapsed && <span className="text-xl font-bold">CLOIT</span>}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="text-white hover:bg-gray-800"
                >
                    <Icons.menu className="h-4 w-4" />
                </Button>
            </div>
            <ScrollArea className="flex-grow p-4">
                {menuItems.map((item) => (
                    <div key={item.name} className={`${isTabActive(item.tabLink ?? "") && "bg-background-100"}  px-2 rounded-xl py-2`}>
                        <Button
                            variant="ghost"
                            className={`w-full justify-start hover:bg-transparent hover:text-white text-left gap-2   ${isCollapsed ? "px-2" : "px-4"
                                }`}
                            onClick={() => !isCollapsed && toggleMenu(item.name)}
                        >
                            {!isTabActive(item.tabLink ?? "") ? <Folder size={18} /> : <Folder size={18} fill="white" />}
                            {!isCollapsed && item.name}

                        </Button>
                        {!isCollapsed && openMenus.includes(item.name) && item.subItems && (
                            <div className="ml-4 mt-2 space-y-2 ">
                                {item.subItems.map((subItem) => (
                                    <Button
                                        key={subItem?.name}
                                        variant="ghost"
                                        className={`w-full justify-start text-left text-sm rounded-xl ${isLinkActive(subItem?.link)
                                            ? "bg-[#9FF443] hover:bg-[#9FF443] text-black "
                                            : "text-muted-foreground hover:bg-[#9FF443] hover:text-black"
                                            }`}
                                        onClick={() => router?.push(subItem?.link)}
                                    >
                                        {!isLinkActive(subItem?.link ?? "")
                                            ? <Icons.layoutDashboard className="mr-2 h-4 w-4" />
                                            : <Icons.layoutDashboard className="mr-2 h-4 w-4" size={18} fill="black" />}

                                        {subItem?.name}
                                    </Button>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </ScrollArea>
        </div>
    )
}