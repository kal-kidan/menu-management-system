// src/hooks/useCreateMenuItem.ts
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TypeEnum, updateMenuItem } from '@/lib/store/menu'; // Adjust the import path as needed
import { RootState } from '@/lib/store';

const useUpdateMenuItem = () => {
    const dispatch = useDispatch();
    const loading = useSelector((state: RootState) => state.menu.loading);
    const type = useSelector((state: RootState) => state.menu.type);
    const error = useSelector((state: RootState) => state.menu.error);

    const updateMenuItemAction = useCallback(
        async (
            id: string,
            name: string,
            onSuccess?: () => void,
            onError?: () => void,
        ) => {
            return await dispatch(updateMenuItem({ id, name, onSuccess, onError }) as any);
        },
        [dispatch]
    );

    return { updateMenuItemAction, loading: loading && type === TypeEnum.editItem, error };
};

export default useUpdateMenuItem;
