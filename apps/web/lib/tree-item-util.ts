import { TreeDataItem } from "@/components/tree";

export function addActionsToTreeData(
    data: TreeDataItem[],
    renderActionButton: (id: string, name: string) => React.ReactNode
): TreeDataItem[] {
    return data.map((item) => {
        const newItem: TreeDataItem = {
            ...item,
            actions: renderActionButton(item?.id, item?.name),
        };

        if (item?.children) {
            newItem.children = addActionsToTreeData(item.children, renderActionButton);
        }

        return newItem;
    });
}
