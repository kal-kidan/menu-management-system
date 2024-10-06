// src/hooks/useCreateMenuItem.ts
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createMenuItem, TypeEnum } from '@/lib/store/menu'; // Adjust the import path as needed
import { RootState } from '@/lib/store';

const useCreateMenuItem = () => {
    const dispatch = useDispatch();
    const loading = useSelector((state: RootState) => state.menu.loading);
    const type = useSelector((state: RootState) => state.menu.type);
    const error = useSelector((state: RootState) => state.menu.error);

    const addMenuItem = useCallback(
        async (
            name: string,
            parentId: string | null,
            onSuccess?: () => void,
            onError?: () => void,
        ) => {
            return await dispatch(createMenuItem({ name, parentId, onSuccess, onError }) as any);
        },
        [dispatch]
    );

    return { addMenuItem, loading: loading && type === TypeEnum.addItem, error };
};

export default useCreateMenuItem;
