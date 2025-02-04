import './index.css';
// import { createSignal } from "solid-js";
import { Sidebar } from "./components/Sidebar";

function App() {
    return (
	<main class="bg-gray-800 h-screen w-screen text-white p-1">
	    <div class="flex">
		<Sidebar/>
	    </div>
	</main>
    );
}

export default App;
