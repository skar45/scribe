import { For } from "solid-js"

export interface Book {
    coverImg: string,
    title: string
    onClick: (e: Event) => void;
}

interface ShelfProps {
    books: Book[]
}

export function Shelf({ books }: ShelfProps) {
    return (
	<main>
	    <For each={books}>
		{(book, index) => {
		    const { title, coverImg, onClick } = book;
		    return (
			<ol>
			    #{index()}
			    <div class="flex flex-col space-y-1 h-14 bg-gray-800 hover:cursor-pointer">
				<img onClick={onClick} height={20} width={12} src={coverImg} alt={title}/>
				<span onClick={onClick} class="font-semibold">{title}</span>
			    </div>
			</ol>
		    )
		}}
	    </For>
	</main>
    )
}
