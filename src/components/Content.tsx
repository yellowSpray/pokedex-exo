import CardPokemon from "./CardPokemon.tsx";
import BottomNav from "./BottomNav.tsx";
import {useState, useEffect, type MouseEventHandler} from "react";
import type {PokemonDetails, PokemonResponse} from "../types/PokemonRes.tsx";
import {getPokemon} from "@/utils/pokeApi.tsx";

export default function Content({dataList, previousPage, nextPage, numberPage, loading, error}: {
    dataList: PokemonResponse,
    previousPage: MouseEventHandler,
    nextPage: MouseEventHandler,
    numberPage: number,
    loading: boolean,
    error: boolean
}) {
    const [pokemonData, setPokemonData] = useState<PokemonDetails[]>([]);
    const {results} = dataList;

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const data = await getPokemon(results)
                setPokemonData(data)
            } catch (e) {
                console.error(e)
            }
        };
        fetchDetails();
    }, [results]);

    return (
        <main className={"flex flex-col items-center px-6 pt-6 w-7xl"}>

            <div className={"w-full flex flex-row justify-between items-center"}>
                <h2 className={"text-lg"}>Results :</h2>
                <aside className={"flex flex-row justify-between items-center"}>
                    <p className={"mr-2 text-sm"}>Filter by :</p>
                    <select className={"border border-gray-200 rounded-lg py-1 px-2"}>
                        <option value="Nom">Name</option>
                        <option value="Numéro">Number</option>
                        <option value="Type">Type</option>
                    </select>
                </aside>
            </div>

            {loading && <p>Loading...</p>}
            {error && <p>Error</p>}

            <div className={"grid grid-cols-4 gap-4 mt-5 w-full items-center"}>
                {pokemonData.map((pokemon: PokemonDetails) => (
                    <CardPokemon
                        key={pokemon.id}
                        id={pokemon.id}
                        name={pokemon.name}
                        image={pokemon.image}
                        types={pokemon.types}
                    />
                ))}
            </div>

            <BottomNav
                previous={previousPage}
                next={nextPage}
                numberPage={numberPage}
            />

        </main>
    );
}