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
import { addItem, updateItem, deleteItem } from '../../../lib/store/menuSlice';
import { useDispatch } from "react-redux"
import { useToast } from "@/hooks/use-toast"
import { Trash } from "lucide-react"
import { DeleteModal } from "@/components/delete-modal"


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

export default function SystemForm({ selectedTreeInfo, createMode, offCreateMode }: { selectedTreeInfo: TreeItemInfo | null, createMode: boolean, offCreateMode: () => void }) {
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
    const dispatch = useDispatch();
    const { toast } = useToast()
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

    function onSubmit(values: z.infer<typeof formSchema>) {
        if (createMode) {
            const item = {
                name: values?.name,
                id: `new-${Date.now()}`,
            }
            const payload = {
                item,
                parentId: values?.menuId
            }
            dispatch(addItem(payload))
            offCreateMode()
            form.reset()
            toast({
                title: "Menu Item Created",
                description: "New item has been added",
            })
        } else {
            dispatch(updateItem({ id: values?.menuId ?? "", name: values?.name }))
            toast({
                title: "Menu Item Update",
                description: `${values?.name} item has been updated`,
            })
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
            dispatch(deleteItem({ id }))
        }
    }


    useEffect(() => {
        if (selectedTreeInfo) {
            form.setValue("menuId", selectedTreeInfo?.id ?? "")
            form.setValue("depth", selectedTreeInfo?.depth ?? 0)
            form.setValue("parentData", { parentId: selectedTreeInfo?.parent?.id, parentName: selectedTreeInfo?.parent?.name } ?? "")
            form.setValue("name", selectedTreeInfo?.name ?? "")
        }

    }, [selectedTreeInfo])


    useEffect(() => {
        if (createMode) {
            form.setValue("name", "")
            form.setValue("parentData", { parentId: selectedTreeInfo?.parent?.id, parentName: selectedTreeInfo?.parent?.name })
        }

    }, [createMode])




    return (
        <Form {...form}>
            <DeleteModal
                onDelete={() => onDelete(form.watch("menuId") ?? "", form.watch("parentData.parentId") ?? "")}
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                isLoading={false}
            />
            <form onSubmit={form.handleSubmit(onSubmit)} className=" w-64 relative">
                <div className="space-y-2 mb-6">
                    {!createMode && <>
                        <FormField
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
                        />
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
                        /></>}
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
                <Button
                    type="button"
                    onClick={() => setIsDeleteModalOpen(false)}
                    variant={"outline"}
                    size="icon"
                    className=" absolute -top-8 right-0"
                >
                    <Trash size={14} />
                </Button>
                <Button type="submit" className=" w-full rounded-full bg-blue-600 hover:bg-blue-600/90 py-5">Save</Button>

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