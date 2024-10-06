import { TreeDataItem } from '@/components/tree';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './store';



interface MenuState {
    items: TreeDataItem[];
    selectedItem?: TreeDataItem | null
}
const initialFileSystemData: TreeDataItem[] = [
    {
        id: '1',
        name: 'Documents',
        children: [
            {
                id: '2',
                name: 'Work',
                children: [
                    { id: '3', name: 'Project1.docx' },
                    { id: '4', name: 'Project2.xlsx' },
                ],
            },
            {
                id: '5',
                name: 'Personal',
                children: [
                    { id: '6', name: 'Resume.pdf' },
                    { id: '7', name: 'Budget.xlsx' },
                ],
            },
        ],
    },
]

const initialState: MenuState = {
    items: initialFileSystemData,
    selectedItem: initialFileSystemData?.[0],
};

const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        setMenuItems: (state, action: PayloadAction<TreeDataItem[]>) => {
            state.items = action.payload;
            state.selectedItem = action?.payload?.[0]
        },
        selectMenuItem: (state, action: PayloadAction<TreeDataItem | undefined>) => {
            state.selectedItem = action.payload;
        },

        addItem: (
            state,
            action: PayloadAction<{ item: TreeDataItem; parentId?: string | null }>
        ) => {
            const { item, parentId } = action.payload;
            const addToParent = (items: TreeDataItem[]): TreeDataItem[] => {
                return items.map(menuItem => {
                    if (menuItem.id === parentId) {
                        return {
                            ...menuItem,
                            children: [...(menuItem?.children ?? []), item],
                        };
                    }
                    if (menuItem?.children?.length) {
                        return {
                            ...menuItem,
                            children: addToParent(menuItem.children),
                        };
                    }
                    return menuItem;
                });
            };
            state.items = addToParent(state.items);
            state.selectedItem = item

        },


        updateItem: (
            state,
            action: PayloadAction<{ id: string; name: string }>
        ) => {
            const { id, name } = action.payload;

            const updateMenu = (items: TreeDataItem[]): TreeDataItem[] => {
                return items.map(menuItem => {
                    if (menuItem.id === id) {
                        return {
                            ...menuItem,
                            name,  // Update the name of the item
                        };
                    }
                    if (menuItem?.children?.length) {
                        return {
                            ...menuItem,
                            children: updateMenu(menuItem.children),
                        };
                    }
                    return menuItem;
                });
            };

            state.items = updateMenu(state.items);
            state.selectedItem = { name, id }
        },
        deleteItem: (
            state,
            action: PayloadAction<{ id: string }>
        ) => {
            const { id } = action.payload;
            const deleteFromMenu = (items: TreeDataItem[]): TreeDataItem[] => {
                return items
                    .map(menuItem => {
                        if (menuItem?.children?.length) {
                            return {
                                ...menuItem,
                                children: deleteFromMenu(menuItem.children),
                            };
                        }
                        return menuItem;
                    })
                    .filter(menuItem => menuItem.id !== id);
            };

            state.items = deleteFromMenu(state.items);
        },
    },
});

export const { setMenuItems, addItem, selectMenuItem, updateItem, deleteItem } = menuSlice.actions;
export default menuSlice.reducer;



export const selectMenuItems = (state: RootState) => state.menu.items;
export const selectSelectedItem = (state: RootState) => state.menu.selectedItem;


// export const selectParentMenuItems = createSelector(
//     [selectMenuItems],
//     (menuItems) => menuItems.filter(item => !item.)
// );
