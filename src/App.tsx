import Header from "./components/Header.tsx";
import Content from "./components/Content.tsx";
import {useEffect, useState} from "react";
import type {PokemonResponse} from "./types/PokemonRes.tsx";

function App() {

    const [pokemon, setPokemon] = useState<PokemonResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [page, setPage] = useState<number>(0);

    const nextPage = () => {
        setPage(e => e + 1)
    }

    const prevPage = () => {
        setPage(x => Math.max(0, x - 1))
    }

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${page * 20}&limit=20`);
                const data: PokemonResponse = await response.json();
                setPokemon(data);
            } catch (error) {
                console.log(error);
                setHasError(true);
            } finally {
                setIsLoading(false);
            }
        }
        fetchPokemon();
    }, [page])

    if (isLoading) return <p>Chargement ...</p>
    if (hasError || !pokemon) return <p>Erreur de chargement</p>;

    return (
        <>
            <Header/>
            <Content pokemon={pokemon} previousPage={prevPage} nextPage={nextPage} numberPage={page}/>
            <footer className={"border-t-1 border-gray-200 w-full mt-6"}>
                <p className={"text-center py-5 text-sm"}>copyright 2025 | all rights reserved</p>
            </footer>
        </>
    )
}

export default App
