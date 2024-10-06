export interface IMenuItem {
    id: string;
    name: string;
    parentId?: string | null;
    parent?: MenuItem | null;
    children?: MenuItem[];
    actions?: string | null;
    createdAt: Date;
    updatedAt: Date;
}
