import { Index } from 'solid-js';

type MenuItem = {
    label: string,
    iconPath: string,
    onClick: (e: Event) => void
}

interface SidebarProps {
    menuItems: MenuItem[];
}

export function Sidebar({ menuItems }: SidebarProps) {
    return (
	<main class="border-l-3 border-r-3 border-white bg-gray-500 flex flex-col justify-center">
	    <Index each={menuItems}>
		{(getItem) => (
		    <li class="flex justify-center p-2" onclick={getItem().onClick}>
			<img src={getItem().iconPath}/>
			<span>{getItem().label}</span>
		    </li>
		)}
	    </Index>
	</main>
    )
}
