import { createSignal } from "solid-js";
import { invoke } from "@tauri-apps/api/core";
import { Button } from "./components/ui/button";
import './index.css';

function App() {
    return (
	<main class="bg-gray-800 h-screen w-screen text-white p-3">
	    <div class="flex">
		<Button>TEST</Button>
	    </div>
	</main>
    );
}

export default App;
