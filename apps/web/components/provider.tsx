"use client"
import { Provider } from 'react-redux';
import store from '@/lib/store';

const StoreProvider = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
};

export default StoreProvider;
