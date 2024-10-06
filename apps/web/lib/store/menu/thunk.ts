import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosAuth } from "../../axiosConfig";

export const fetchRootMenus = createAsyncThunk(
    'menu/fetchRootMenus',
    async () => {
        const response = await axiosAuth.get('/menu');
        return response.data;
    }
)



interface CreateMenuItemParams {
    name: string;
    parentId: string | null;
    onSuccess?: () => void;
    onError?: (error: any) => void;
}
export const createMenuItem = createAsyncThunk(
    'menu/createMenuItem',
    async (
        { name, parentId, onSuccess, onError }: CreateMenuItemParams,
        thunkAPI
    ) => {

        try {
            const response = await axiosAuth.post('/menu',
                {
                    name,
                    ... (parentId && { parentId })
                });
            if (onSuccess) {
                onSuccess();
            }
            return response.data;
        } catch (error: any) {
            if (onError) {
                onError(error.response?.data || 'Failed to create menu item');
            }
            return thunkAPI.rejectWithValue(error.response?.data || 'Failed to create menu item');
        }
    }
);



export const fetchRootMenuItem = createAsyncThunk(
    'menu/fetchRootMenuItem',
    async (
        { id }: { id: string },
        thunkAPI
    ) => {
        try {
            const response = await axiosAuth.get(`/menu/${id}`); // Replace with actual API
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data || 'Failed to fetch root menu item');
        }
    }
);



export const deleteMenuItem = createAsyncThunk(
    'menu/deleteMenuItem',
    async ({ id, onSuccess, onError }: { id: string; onSuccess?: () => void; onError?: (error: any) => void }, thunkAPI) => {
        try {
            await axiosAuth.delete(`/menu/${id}`);
            if (onSuccess) onSuccess();
            return id
        } catch (error: any) {
            if (onError) onError(error.response?.data || 'Failed to delete menu item');
            return thunkAPI.rejectWithValue(error.response?.data || 'Failed to delete menu item');
        }
    }
);


export const updateMenuItem = createAsyncThunk(
    'menu/updateMenuItem',
    async ({ id, name, onSuccess, onError }: { id: string; name: string; onSuccess?: () => void; onError?: (error: any) => void }, thunkAPI) => {
        try {
            const response = await axiosAuth.patch(`/menu/${id}`, { name });
            if (onSuccess) onSuccess();
            return response.data;
        } catch (error: any) {
            if (onError) onError(error.response?.data || 'Failed to update menu item');
            return thunkAPI.rejectWithValue(error.response?.data || 'Failed to update menu item');
        }
    }
);
