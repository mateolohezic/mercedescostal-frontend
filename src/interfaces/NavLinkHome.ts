interface NavLinkOption{
    title: string;
    href: string;
}

export interface NavLinkHome{
    title: string;
    href?: string;
    menu?: boolean;
    links?: Array<NavLinkOption>;
}