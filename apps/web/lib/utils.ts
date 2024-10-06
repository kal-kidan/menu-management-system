import { TreeDataItem } from "@/components/tree"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export interface TreeItemInfo {
  id: string
  parent: TreeDataItem | null
  depth: number,
  name: string
}

export function findTreeItemInfo(
  data: TreeDataItem[],
  selectedItem?: TreeDataItem | null
): TreeItemInfo | null {
  function search(
    items: TreeDataItem[],
    parent: TreeDataItem | null = null,
    depth: number = 0
  ): TreeItemInfo | null {
    for (let i = 0; i < items.length; i++) {
      const item = items[i]

      if (item.id === selectedItem?.id) {
        return {
          id: item.id,
          parent: parent,
          depth: depth,
          name: selectedItem?.name
        }
      }
      if (item.children) {
        const result = search(item.children, item, depth + 1)
        if (result) return result
      }
    }

    return null
  }

  // Start the search with the root data array
  return search(data)
}
