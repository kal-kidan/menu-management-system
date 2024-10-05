import {
    File,
    Folder,
    LayoutDashboard,
    type LucideProps,

} from "lucide-react";

export const Icons = {

    menu: ({ ...props }: LucideProps) => (
        <svg
            width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path d="M0 12V10H13V12H0ZM16.6 11L11.6 6L16.6 1L18 2.4L14.4 6L18 9.6L16.6 11ZM0 7V5H10V7H0ZM0 2V0H13V2H0Z" fill="white" />
        </svg>
    ),
    layoutDashboard: LayoutDashboard,
    folder: Folder,
    layout: ({ ...props }: LucideProps) => (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}

        >
            <rect x="3.65625" y="3.66992" width="6.69214" height="6.69336" rx="1" fill="white" />
            <rect x="3.65625" y="13.6523" width="6.69214" height="6.69336" rx="1" fill="white" />
            <rect x="13.6539" y="13.6523" width="6.69214" height="6.69336" rx="1" fill="white" />
            <circle cx="16.9871" cy="7.04102" r="3.69067" fill="white" />
        </svg>)


};
