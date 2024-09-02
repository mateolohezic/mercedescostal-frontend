'use client' 

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react';
import { SelectLayoutStudio } from './SelectLayoutStudio';
import { StaticImageData } from 'next/image';
import { ListCollectionStudio } from './ListCollectionStudio';
import { GridCollectionStudio } from './GridCollectionStudio';

interface Option{
    title: 'Covers'|'Grid'|'List'|'Scroll';
    value: 'cover'|'grid'|'list'|'scroll'
}

interface Collection{
    img: StaticImageData;
    title: string;
    year: string
}

interface Props{
    options: Array<Option>;
    collections: Array<Collection>;
 
}

export const LayoutHandlerStudio = ({options, collections}:Props) => {

    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const layout:string|null = searchParams.get('layout')
    let initialLayout:'cover'|'grid'|'list'|'scroll'|null
    if(layout && typeof layout === 'string' && ['cover', 'grid', 'list', 'scroll'].includes(layout)){
        initialLayout = layout as 'cover'|'grid'|'list'|'scroll';
    } else {
        initialLayout = null;
        router.replace(`${pathname}?layout=grid`, { scroll: true });
    }

    const [selectedLayout, setSelectedLayout] = useState<'cover'|'grid'|'list'|'scroll'>(initialLayout || 'grid')

    useEffect(() => {
        if (layout && typeof layout === 'string') {
            if (['cover', 'grid', 'list', 'scroll'].includes(layout)) {
                setSelectedLayout(layout as 'cover'|'grid'|'list'|'scroll');
            }
        }
    }, [layout]);

    const handleLayoutChange = (layout: 'cover'| 'grid'| 'list'|'scroll') => {
        setSelectedLayout(layout);
        router.replace(`${pathname}?layout=${layout}`, { scroll: true });
    };

    return (
        <>
            <SelectLayoutStudio options={options} selectedLayout={selectedLayout} setSelectedLayout={handleLayoutChange}/>
            { selectedLayout === 'list' && <ListCollectionStudio collections={collections}/> }
            { selectedLayout === 'grid' && <GridCollectionStudio collections={collections}/> }
        </>
    )
}
