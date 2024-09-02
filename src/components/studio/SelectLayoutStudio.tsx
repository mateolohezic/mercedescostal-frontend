'use client'

interface Option{
    title: 'Covers'|'Grid'|'List'|'Scroll'
    value: 'cover'|'grid'|'list'|'scroll';
}

interface Props{
    options: Array<Option>
    selectedLayout: 'cover'|'grid'|'list'|'scroll';
    setSelectedLayout: (layout: "cover" | "grid" | "list" | "scroll") => void
}

export const SelectLayoutStudio = ({options, selectedLayout, setSelectedLayout}:Props) => {
    return (
        <nav className="w-full flex justify-center items-center gap-8">
            {
                options.map(({title, value}) => (
                    <button key={value} type="button" className="group uppercase" onClick={ () =>  { setSelectedLayout(value) }}>
                        [<span className={selectedLayout === value? 'opacity-100' :'opacity-0 group-hover:opacity-100'}>X</span>] {title}
                    </button>
                ))
            }
        </nav>
    )
}
