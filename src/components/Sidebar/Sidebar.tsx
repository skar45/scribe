import { Index, JSXElement } from 'solid-js';

export type MenuItem = {
    label: string,
    Icon: () => JSXElement,
    onClick: (e: Event) => void
}

interface SidebarProps {
    menuItems: MenuItem[];
}

export function Sidebar({ menuItems }: SidebarProps) {
    return (
	<main class="border-l-3 border-r-3 border-gray-600 bg-gray-700 flex flex-col py-8 px-4 h-screen">
	    <Index each={menuItems}>
		{(getItem) => {
		    const { label, Icon, onClick } = getItem();
		    return (
			<li class="flex justify-start space-x-1 p-2 hover:bg-gray-600 hover:rounded-lg hover:cursor-pointer" onclick={onClick}>
			    <i><Icon/></i>
			    <span>{label}</span>
			</li>
		    )
		}}
	    </Index>
	</main>
    )
}
