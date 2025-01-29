import './index.css';
// import { createSignal } from "solid-js";
// import { invoke } from "@tauri-apps/api/core";
import { LibraryBig, Book } from "lucide-solid";
import { MenuItem, Sidebar } from "./components/Sidebar";
import { JSXElement } from 'solid-js';

const GenericJSX = (Elem: <P extends Obj>(props: P) => JSXElement) => () => <Elem/>
const menuItems: MenuItem[] = [
    { label: "Library", Icon: GenericJSX(LibraryBig), onClick: (e) => { console.log("hello", e)}},
    { label: "Add Book", Icon: GenericJSX(Book), onClick: (e) => { console.log("adding book", e)}},
]

function App() {
    return (
	<main class="bg-gray-800 h-screen w-screen text-white p-1">
	    <div class="flex">
		<Sidebar menuItems={menuItems}/>
	    </div>
	</main>
    );
}

export default App;
