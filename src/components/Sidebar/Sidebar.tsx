import { createSignal, For, JSXElement } from "solid-js";
import { open } from '@tauri-apps/plugin-dialog';
import { invoke } from "@tauri-apps/api/core";

import { LibraryBig, Book } from "lucide-solid";

export type MenuItem = {
    label: string,
    Icon: () => JSXElement,
    onClick: (e: Event) => void
}

function ListItem({ label, Icon, onClick }: MenuItem) {
    return (
	<li class="flex justify-start space-x-1 hover:bg-gray-600 cursor-default p-2" onClick={onClick}>
	    <i><Icon/></i>
	    <span>{label}</span>
	</li>
    )
}


export function Sidebar() {
    const [files, setFiles] = createSignal([""])

    const openFileDialog = async () => {
	const files = await open({
	  multiple: true,
	  directory: false,
	  filters: [{ name: 'Books', extensions: ['epub']}]
	});
	if (files && files.length > 0) {
	    const results: string[] = await invoke("read_files", { files });
	    setFiles(results[0].split(","));
	}
    }
    return (
	<main class="border-l-3 border-r-3 border-gray-600 bg-gray-700 py-8 h-screen">
	    <ul class="flex flex-col">
		<ListItem
		    label="Library"
		    Icon={() => <LibraryBig/>}
		    onClick={() => void(0)}
		/>
		<ListItem
		    label="Add Books"
		    Icon={() => <Book/>}
		    onClick={openFileDialog}
		/>
		<For each={files()}>
		{
		    (file) => (
			<ListItem
			    label={file}
			    Icon={() => <Book/>}
			    onClick={openFileDialog}
			/>
		    )
		}
		</For>
	    </ul>
	</main>
    )
}
