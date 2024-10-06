// src/hooks/useFetchSingleMenu.ts
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRootMenuItem, TypeEnum } from '@/lib/store/menu'; // Adjust the import path as needed
import { RootState } from '@/lib/store';

const useFetchSingleMenu = (menuId: string) => {
    const dispatch = useDispatch();
    const menuItems = useSelector((state: RootState) => state.menu.items);
    const loading = useSelector((state: RootState) => state.menu.loading);
    const type = useSelector((state: RootState) => state.menu.type);
    const error = useSelector((state: RootState) => state.menu.error);

    useEffect(() => {
        const fetchMenuItem = async () => {
            if (menuId) {
                dispatch(fetchRootMenuItem({ id: menuId }) as any);
            }
        };
        fetchMenuItem();
    }, [dispatch, menuId]);

    return { menuItems, loading: loading && type === TypeEnum.fetchRootMenu, error };
};

export default useFetchSingleMenu;
