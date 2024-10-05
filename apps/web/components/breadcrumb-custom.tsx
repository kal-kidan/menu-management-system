import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";
import { Icons } from "./icons";

interface BreadcrumbProps {
    links: Array<{ name: string; href: string }>;
    currentPage: string;
}

export function BreadcrumbCustom({ links, currentPage }: BreadcrumbProps) {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/">
                        <Icons.folder size={15} fill="gray" className=" hover:text-gray-600" />
                    </BreadcrumbLink>
                </BreadcrumbItem>
                {links.map((link, index) => (
                    <React.Fragment key={index}>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href={link.href}>{link.name}</BreadcrumbLink>
                        </BreadcrumbItem>
                    </React.Fragment>
                ))}
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbPage>{currentPage}</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
}
