'use client'

import React, { useState } from 'react'
import { TreeView, TreeDataItem } from '@/components/tree'
import { Folder, File, ChevronRight, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import SystemForm from './menu-form'
import { findTreeItemInfo } from '@/lib/utils'
import { addActionsToTreeData } from '@/lib/tree-item-util'
import { selectMenuItems, selectSelectedItem } from '@/lib/store/menuSlice'
import { useDispatch, useSelector } from 'react-redux'
import { setMenuItems, selectMenuItem } from '../../../lib/store/menuSlice';


export default function FileSystemTree() {


    const handleSelectChange = (item: TreeDataItem | undefined) => {
        dispatch(selectMenuItem(item))
        setCreateMode(false)

    }

    const addNewItem = (parentId: string) => {
        const newItem: TreeDataItem = {
            id: `new-${Date.now()}`,
            name: 'New Item',
        }

        const updateTree = (items: TreeDataItem[]): TreeDataItem[] => {
            return items.map(item => {
                if (item.id === parentId) {
                    return {
                        ...item,
                        children: [...(item.children || []), newItem],
                    }
                } else if (item.children) {
                    return {
                        ...item,
                        children: updateTree(item.children),
                    }
                }
                return item
            })
        }

        // setFileSystemData(updateTree(fileSystemData))
    }


    const renderActionButton = (id: string, name: string) => (
        <div
            className=' bg-blue-600 rounded-full p-1 text-white'
            onClick={(e) => {
                e.stopPropagation()
                dispatch(selectMenuItem({ id, name }))
                setCreateMode(true)

                // addNewItem(id)
            }}
        >
            <Plus className="h-4 w-4" />
        </div>
    )


    const menuItems = useSelector(selectMenuItems);
    const selectedItem = useSelector(selectSelectedItem);
    const dispatch = useDispatch();


    const itemWithAction = addActionsToTreeData(menuItems, renderActionButton)

    const [expandActive, setExpandActive] = useState(true)
    const [createMode, setCreateMode] = useState(false)
    const offCreateMode = () => {
        setCreateMode(false)
    }

    const handleExpandClick = () => {
        setExpandActive(true)
    }
    const handleCollapseClick = () => {
        setExpandActive(false)
    }

    const selectedTreeInfo = findTreeItemInfo(menuItems, selectedItem)

    return (
        <div className='flex justify-between items-start'>
            <div className="w-[300px]">
                <div className="flex space-x-2 my-2">
                    <Button
                        variant={expandActive ? "default" : "outline"}
                        onClick={handleExpandClick}
                        className="w-32 rounded-full"
                    >
                        Expand All
                    </Button>
                    <Button
                        variant={expandActive ? "outline" : "default"}
                        onClick={handleCollapseClick}
                        className="w-32 rounded-full"
                    >
                        Collapse All
                    </Button>
                </div>
                <TreeView
                    data={itemWithAction.map(item => ({
                        ...item,
                        children: item.children?.map(child => ({
                            ...child,
                        }))
                    }))}
                    onSelectChange={handleSelectChange}
                    expandAll={expandActive}
                // defaultNodeIcon={Folder}
                // defaultLeafIcon={File}
                />
                {/* {selectedItem && (
                <div className="mt-4 p-2 bg-accent rounded">
                    <p>Selected: {selectedItem.name}</p>
                </div>
            )} */}
            </div>
            <div className=' flex-1 grid place-content-center '>
                <SystemForm
                    selectedTreeInfo={selectedTreeInfo}
                    createMode={createMode}
                    offCreateMode={offCreateMode}
                />
            </div>
        </div>
    )
}