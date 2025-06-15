import {Search} from "lucide-react";

export default function Header() {
    return (
        <header className={"flex flex-col items-center p-6 border-b-1 border-gray-200 w-full"}>
            <div className="flex flex-row justify-center w-7xl p-6">
                <img src="/pokemon-icon.svg" alt="Pokédex" className={"w-10 h-10 mr-2"} />
                <h1 className={"text-4xl"}>Pokédex</h1>
            </div>
            <div className={"flex flex-row justify-center my-5 w-7xl p-6"}>
                <div className={"flex flex-col items-start w-1/2 py-5 pr-5"}>
                    <h3 className={"text-2xl mb-2"}>Name or number</h3>
                    <fieldset className={"flex flex-row justify-start w-full"}>
                        <input type="text" className={"w-full p-2 border border-gray-400 mr-2 py-1 rounded-sm"}/>
                        <button className={"p-2 border border-gray-400 py-1 rounded-sm hover:bg-gray-200"}>
                            <Search size={"20"}/>
                        </button>
                    </fieldset>
                </div>
                <p className={"w-1/2 flex flex-col justify-center p-5 bg-green-500 rounded-sm text-white font-bold tracking-wide"}>
                    Look for a Pokémon by name or national Pokédex number.
                </p>
            </div>
        </header>
    )
}