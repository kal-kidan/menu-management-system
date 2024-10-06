import { TreeDataItem } from '@/components/tree';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createMenuItem, deleteMenuItem, fetchRootMenuItem, fetchRootMenus, updateMenuItem } from './thunk';

export enum TypeEnum {
    fetchRootMenu = "fetchRootMenu",
    editItem = "editItem",
    deleteItem = "deleteItem",
    getSingleItem = "getSingleItem",
    addItem = "addItem",

}

interface MenuState {
    items: TreeDataItem[];
    selectedItem?: TreeDataItem | null,
    rootMenus: TreeDataItem[];
    selectedMenu?: TreeDataItem | null,
    loading: boolean;
    error: string | null;
    type: TypeEnum | null
}
const initialState: MenuState = {
    items: [],
    rootMenus: [],
    selectedMenu: null,
    selectedItem: null,
    type: null,
    loading: false,
    error: ""
};

const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        setMenuItems: (state, action: PayloadAction<TreeDataItem[]>) => {
            state.items = action.payload;
            state.selectedItem = action?.payload?.[0]
        },
        setRootMenus: (state, action: PayloadAction<TreeDataItem[]>) => {
            state.rootMenus = action.payload;
        },
        selectMenuItem: (state, action: PayloadAction<TreeDataItem | undefined>) => {
            state.selectedItem = action.payload;
        },
        selectMenu: (state, action: PayloadAction<TreeDataItem | undefined>) => {
            state.selectedMenu = action.payload;
        },

        addItem: (
            state,
            action: PayloadAction<{ item: TreeDataItem; parentId?: string | null }>
        ) => {
            const { item, parentId } = action.payload;
            console.log({ item, parentId })
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
    extraReducers: (builder) => {
        builder
            .addCase(fetchRootMenus.pending, (state) => {
                state.loading = true;
                state.type = TypeEnum.fetchRootMenu
                state.error = null;
            })
            .addCase(fetchRootMenus.fulfilled, (state, action) => {
                state.loading = false;
                state.rootMenus = action.payload;

                state.selectedMenu = action.payload?.[0]
                state.selectedItem = action.payload?.[0]
            })
            .addCase(fetchRootMenus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch root menus';
            })
        builder
            .addCase(createMenuItem.pending, (state) => {
                state.loading = true;
                state.type = TypeEnum.addItem
                state.error = null;
            })
            .addCase(createMenuItem.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload?.parentId)
                    menuSlice.caseReducers.addItem(state, {
                        payload: { item: action.payload, parentId: action.payload?.parentId },
                        type: ''
                    });
                else {
                    state.rootMenus = [...state?.rootMenus, action.payload]
                    
                }
            })
            .addCase(createMenuItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
        builder
            .addCase(fetchRootMenuItem.pending, (state) => {
                state.loading = true;
                state.type = TypeEnum.getSingleItem
                state.error = null;
            })
            .addCase(fetchRootMenuItem.fulfilled, (state, action: PayloadAction<any>) => {
                state.items = [action.payload]
                state.loading = false;
            })
            .addCase(fetchRootMenuItem.rejected, (state, action: PayloadAction<any>) => {
                state.error = action.payload;
                state.loading = false;
            })
        builder
            .addCase(deleteMenuItem.pending, (state) => {
                state.loading = true;
                state.type = TypeEnum.deleteItem
                state.error = null;
            })
            .addCase(deleteMenuItem.fulfilled, (state, action: PayloadAction<string>) => {
                menuSlice.caseReducers.deleteItem(state, {
                    payload: { id: action.payload, },
                    type: ''
                });
                state.loading = false;
            })
            .addCase(deleteMenuItem.rejected, (state, action: PayloadAction<any>) => {
                state.error = action.payload;
                state.loading = false;
            });
        builder
            .addCase(updateMenuItem.pending, (state) => {
                state.loading = true;
                state.type = TypeEnum.editItem
                state.error = null;
            })
            .addCase(updateMenuItem.fulfilled, (state, action: PayloadAction<any>) => {
                menuSlice.caseReducers.updateItem(state, {
                    payload: { id: action.payload?.id, name: action.payload?.name },
                    type: ''
                });
                updateItem(action.payload)
                state.loading = false;
            })
            .addCase(updateMenuItem.rejected, (state, action: PayloadAction<any>) => {
                state.error = action.payload;
                state.loading = false;
            });
    },
});

export const {
    setMenuItems,
    addItem,
    selectMenuItem,
    updateItem,
    deleteItem,
    setRootMenus,
    selectMenu } = menuSlice.actions;
export default menuSlice.reducer;






// export const selectParentMenuItems = createSelector(
//     [selectMenuItems],
//     (menuItems) => menuItems.filter(item => !item.)
// );
