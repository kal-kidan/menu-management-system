import { ChevronDown, Plus } from "lucide-react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useDispatch, useSelector } from "react-redux"
import { selectSelectedMenu, selectMenu } from "@/lib/store/menu"
import useFetchRootMenus from "@/hooks/use-fetch-menue"
import { Button } from "@/components/ui/button"




export default function MenuSelect({ onClick }: { onClick: () => void }) {
    const dispatch = useDispatch()
    const selectedMenu = useSelector(selectSelectedMenu)
    const { loading, rootMenus } = useFetchRootMenus()
    return (
        <div className="max-w-[300px] pt-8 pb-4 rounded-lg">
            <h2 className="text-sm text-muted-foreground mb-2">Menu</h2>
            <div className="flex gap-2 items-center">
                <Select
                    value={selectedMenu?.id || ""}
                    defaultValue={selectedMenu?.id || ""}
                    onValueChange={(value) => {
                        const selected = rootMenus.find(menu => menu.id === value)
                        if (selected) {
                            dispatch(selectMenu(selected))
                        }
                    }}
                >
                    <SelectTrigger className="w-full justify-between bg-[#f2f4f6]">
                        <SelectValue placeholder="Select a menu" />
                        {/* <ChevronDown className="h-4 w-4 opacity-50" /> */}
                    </SelectTrigger>
                    <SelectContent>
                        {rootMenus?.map(rootMenu => (
                            <SelectItem key={rootMenu.id} value={rootMenu.id}>
                                {rootMenu.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Button
                    variant="outline"
                    size={"icon"}
                    onClick={onClick}
                >
                    <Plus size={13} />
                </Button>
            </div>
        </div>
    )
}



