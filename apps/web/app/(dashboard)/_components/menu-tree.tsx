'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { TreeView, TreeDataItem } from '@/components/tree'
import { Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import SystemForm from './menu-form'
import { findTreeItemInfo } from '@/lib/utils'
import { addActionsToTreeData } from '@/lib/tree-item-util'
import { rootMenuItem, selectMenuItems, selectSelectedItem, selectSelectedMenu, setMenuItems, selectMenuItem } from '@/lib/store/menu'
import { useDispatch, useSelector } from 'react-redux'
import useFetchSingleMenu from '@/hooks/use-fetch-items'
import MenuSelect from './menu-select'


export default function FileSystemTree() {


    const handleSelectChange = (item: TreeDataItem | undefined) => {
        dispatch(selectMenuItem(item))
        setCreateMode(false)

    }
    const selectedItem = useSelector(selectSelectedItem);
    const selectedMenu = useSelector(selectSelectedMenu);
    const dispatch = useDispatch();




    const renderActionButton = (id: string, name: string) => (
        <div
            className=' bg-blue-600 rounded-full p-1 text-white'
            onClick={(e) => {
                e.stopPropagation()
                setCreateMode(true)
                dispatch(selectMenuItem({ id, name }))
            }}
        >
            <Plus className="h-4 w-4" />
        </div>
    )


    const { menuItems, } = useFetchSingleMenu(selectedMenu?.id ?? "")
    const itemWithAction = addActionsToTreeData(menuItems, renderActionButton)
    const rootMenus = useSelector(rootMenuItem)

    const [expandActive, setExpandActive] = useState(true)
    const [createMode, setCreateMode] = useState(false)
    const [rootCreateMode, setRootCreateMode] = useState(false)

    const offCreateMode = () => {
        setCreateMode(false)
    }

    useEffect(() => {
        if (selectedMenu) {
            const newItem = rootMenus?.find((root) => root?.id === selectedMenu?.id)
            if (newItem)
                dispatch(setMenuItems([newItem]))
        }
    }, [selectedMenu])


    const handleExpandClick = () => {
        setExpandActive(true)
    }
    const handleCollapseClick = () => {
        setExpandActive(false)
    }



    const selectedTreeInfo = useMemo(() => {
        return findTreeItemInfo(menuItems, selectedItem);
    }, [menuItems, selectedItem]);

    return (
        <div className='max-md:flex max-md:flex-col max-md:items-center'>
            <MenuSelect
                onClick={() => {
                    setCreateMode(true)
                    setRootCreateMode(true)
                    dispatch(selectMenuItem({
                        id: selectedMenu?.id ?? "",
                        name: selectedMenu?.name ?? ""
                    }))
                }}

            />
            <div className='flex  justify-between flex-col gap-10 md:gap-0 md:flex-row md:items-start items-center'>
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

                </div>
                <div className=' flex-1 md:grid md:place-content-center '>
                    <SystemForm
                        selectedTreeInfo={selectedTreeInfo}
                        createMode={createMode}
                        rootCreateMode={rootCreateMode}
                        offCreateMode={offCreateMode}
                    />
                </div>
            </div>
        </div>

    )
}