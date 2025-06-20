import Header from "./components/Header.tsx";
import Content from "./components/Content.tsx";
import {useEffect, useState} from "react";
import type {PokemonResponse} from "./types/PokemonRes.tsx";
import {getListPokemon} from "@/utils/pokeApi.tsx";

function App() {

    const [pokemon, setPokemon] = useState<PokemonResponse | null>();
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

        getListPokemon(page)
            .then(data => setPokemon(data))
            .catch((e) => {
                console.error(e)
                setHasError(true)
            })
            .finally(() => setIsLoading(false));

    }, [page])

    if( !pokemon ) {
        return null
    }

    return (
        <>
            <Header/>
            <Content
                key={page}
                dataList={pokemon}
                previousPage={prevPage}
                nextPage={nextPage}
                numberPage={page}
                loading={isLoading}
                error={hasError}
            />
            <footer className={"border-t-1 border-gray-200 w-full mt-6"}>
                <p className={"text-center py-5 text-sm"}>copyright 2025 | all rights reserved</p>
            </footer>
        </>
    )
}

export default App
