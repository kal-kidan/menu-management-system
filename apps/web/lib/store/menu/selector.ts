import { RootState } from "../../store";

export const selectMenuItems = (state: RootState) => state?.menu.items;
export const selectSelectedItem = (state: RootState) => state.menu.selectedItem;
export const rootMenuItem = (state: RootState) => state.menu.rootMenus;
export const selectSelectedMenu = (state: RootState) => state.menu.selectedMenu;
