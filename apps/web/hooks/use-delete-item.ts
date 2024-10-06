// src/hooks/useCreateMenuItem.ts
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMenuItem, TypeEnum, updateMenuItem } from '@/lib/store/menu'; // Adjust the import path as needed
import { RootState } from '@/lib/store';

const useDeleteMenuItem = () => {
    const dispatch = useDispatch();
    const loading = useSelector((state: RootState) => state.menu.loading);
    const type = useSelector((state: RootState) => state.menu.type);
    const error = useSelector((state: RootState) => state.menu.error);

    const deleteMenuAction = useCallback(
        async (
            id: string,
            onSuccess?: () => void,
            onError?: () => void,
        ) => {
            return await dispatch(deleteMenuItem({ id, onSuccess, onError }) as any);
        },
        [dispatch]
    );

    return { deleteMenuAction, loading: loading && type === TypeEnum.deleteItem, error };
};

export default useDeleteMenuItem;
