"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { TreeItemInfo } from "@/lib/utils"
import { useEffect, useState } from "react"
import { deleteMenuItem } from '../../../lib/store/menu';
import { useDispatch } from "react-redux"
import { useToast } from "@/hooks/use-toast"
import { Trash } from "lucide-react"
import { DeleteModal } from "@/components/delete-modal"
import useCreateMenuItem from "@/hooks/use-create-item"
import useUpdateMenuItem from "@/hooks/use-update-item"
import useDeleteMenuItem from "@/hooks/use-delete-item"


const parentSchema = z.object({
    parentId: z.string().optional(),
    parentName: z.string().optional()
})

const formSchema = z.object({
    menuId: z.string().optional(),
    depth: z.coerce.number().min(0).optional(),
    parentData: parentSchema,
    name: z.string().min(1),
})

export default function SystemForm(
    {
        selectedTreeInfo,
        createMode,
        offCreateMode,
        rootCreateMode
    }:
        {
            selectedTreeInfo: TreeItemInfo | null,
            createMode: boolean,
            offCreateMode: () => void,
            rootCreateMode: boolean
        }) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            menuId: "",
            depth: 0,
            parentData: {
                parentId: "",
                parentName: ""
            },
            name: "",
        },
    })
    const { toast } = useToast()
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const { addMenuItem, loading, error } = useCreateMenuItem();
    const { updateMenuItemAction, loading: updateLoading, error: updateError } = useUpdateMenuItem();
    const { deleteMenuAction, loading: deleteLoading, } = useDeleteMenuItem();



    function onSubmit(values: z.infer<typeof formSchema>) {
        const onSuccess = () => {
            form.reset();
            offCreateMode?.();
            toast({
                title: createMode ? "Menu Item Created" : "Menu Item Updated",
                description: createMode ? "New item has been added" : "Item has been updated",
            });
        };
        if (createMode) {
            const parentId = rootCreateMode ? "" : selectedTreeInfo?.id ?? "";
            addMenuItem(values?.name, parentId, onSuccess);
        } else {
            updateMenuItemAction(selectedTreeInfo?.id ?? "", values?.name, onSuccess);
        }
    }


    const onDelete = (id: string, parentId: string) => {
        if (!parentId)
            toast({
                variant: "destructive",
                title: "You cant delete this item",
                description: "This is root item you cant delete it from here"
            })
        else {
            deleteMenuAction(
                id,
                () => setIsDeleteModalOpen(false)
            )
        }


    }

    useEffect(() => {
        if (createMode || rootCreateMode) {
            form.setValue("name", "");
            form.setValue("depth", rootCreateMode ? 0 : (selectedTreeInfo?.depth ?? 0) + 1);
            form.setValue("parentData", rootCreateMode
                ? { parentId: "", parentName: "" }
                : { parentId: selectedTreeInfo?.id, parentName: selectedTreeInfo?.name }
            );
        } else if (selectedTreeInfo && !createMode) {
            form.setValue("menuId", selectedTreeInfo?.id ?? "");
            form.setValue("depth", selectedTreeInfo?.depth ?? 0);
            form.setValue("parentData", { parentId: selectedTreeInfo?.parent?.id, parentName: selectedTreeInfo?.parent?.name });
            form.setValue("name", selectedTreeInfo?.name ?? "");
        }
    }, [createMode, rootCreateMode, selectedTreeInfo, form]);


    return (
        <Form {...form}>

            <DeleteModal
                onDelete={() => onDelete(form.watch("menuId") ?? "", form.watch("parentData.parentId") ?? "")}
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                isLoading={deleteLoading}
            />
            <form onSubmit={form.handleSubmit(onSubmit)} className=" w-64 relative">
                <div className="space-y-2 mb-6">

                    {!createMode && <FormField
                        control={form.control}
                        name="menuId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Menu ID</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={true}
                                        placeholder="56320ee9-6af6-11ed-a7"
                                        {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />}
                    <FormField
                        control={form.control}
                        name="depth"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Depth</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={true}
                                        type="number"
                                        {...field}
                                        onChange={e => field.onChange(parseInt(e.target.value))}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="parentData.parentName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Parent Data</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={true}
                                        value={field?.value ?? "------"}
                                        onChange={(e) => field?.onChange(e)}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input  {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                {!createMode && <Button
                    isLoading={deleteLoading}
                    type="button"
                    onClick={() => setIsDeleteModalOpen(true)}
                    variant={"outline"}
                    size="icon"
                    className=" absolute -top-8 right-0"
                >
                    <Trash size={14} />
                </Button>}
                <Button
                    isLoading={loading || updateLoading}
                    type="submit"
                    className=" w-full rounded-full bg-blue-600 hover:bg-blue-600/90 py-5">Save</Button>

                {/* {
                    selectedTreeInfo ?
                        <div className="flex gap-4 items-center ">
                            <Button type="submit">Save</Button>
                            <Button type="submit">Cancel</Button>

                        </div> :
                        <div className="">
                            <Button type="submit">Save</Button>
                        </div>

                } */}

            </form>
        </Form >
    )
}