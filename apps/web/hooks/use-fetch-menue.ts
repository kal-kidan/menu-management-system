import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRootMenus, TypeEnum } from '@/lib/store/menu';
import { RootState } from '@/lib/store';

const useFetchRootMenus = () => {
    const dispatch = useDispatch();
    const rootMenus = useSelector((state: RootState) => state.menu.rootMenus);
    const loading = useSelector((state: RootState) => state.menu.loading);
    const type = useSelector((state: RootState) => state.menu.type);
    const error = useSelector((state: RootState) => state.menu.error);

    useEffect(() => {
        const fetchMenus = async () => {
            dispatch(fetchRootMenus() as any);
        };
        fetchMenus();
    }, [dispatch]);

    return { rootMenus, loading: loading && type === TypeEnum.fetchRootMenu, error };
};

export default useFetchRootMenus;
