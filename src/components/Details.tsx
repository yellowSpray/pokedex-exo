import { useParams } from "react-router"
import { getDetailsPokemon, getSpeciesPokemon } from "@/utils/pokeApi"
import { useEffect, useState } from "react"
import type { PokemonDetails, PokemonSpecies } from "@/types/PokemonRes"

export default function Details () {

    const { id } = useParams()

    const [ pokemonDetails , setPokemonDetails ] = useState<PokemonDetails | undefined>()
    const [ pokemonSpecies , setPokemonSpecies ] = useState<PokemonSpecies | undefined>()
    const [ error , setError ] = useState(false)
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect(() => {
        if (id) {
            getDetailsPokemon(id)
                .then(data => setPokemonDetails(data))
                .catch((e) => {
                    console.error(e)
                    setError(true)
                })
                .finally(() => setIsLoading(false)) 
            
            getSpeciesPokemon(id)
                .then(raw => setPokemonSpecies(raw))
                .catch((x) => {
                    console.error(x)
                    setError(true)
                })
                .finally(() => setIsLoading(false)) 
        }
    }, [id])


    if (!pokemonDetails || !pokemonSpecies) {
        return error
    }

    if (isLoading) {
        return <p>Loading ...</p>
    }

    function convertToMeter(height: number) {
        return (height / 10).toFixed(1).replace('.',',') + ' m'
    }

    function convertToKilo(weight: number) {
        return (weight / 10).toFixed(1).replace('.',',') + ' kg'
    }

    
    return (
        <>
            <h1>{pokemonSpecies.names[0].name}</h1>
            <p>pokemon ID : { id }</p>
            <ul>
                <li>{pokemonDetails.name}</li>
                <li><img src={pokemonDetails.image} alt={pokemonDetails.name} /></li>
                <li>size : {convertToMeter(pokemonDetails.height)}</li>
                <li>weight : {convertToKilo(pokemonDetails.weight)}</li>
                {pokemonDetails.stats.map((statObj) => (
                    <li key={statObj.stat.name}>{statObj.stat.name} : {statObj.base_stat}</li>
                ))}
                <li>Base happiness : {pokemonSpecies.base_happiness}</li>
                <li>Capture rate : {pokemonSpecies.capture_rate}</li>
            </ul>
            <p>{pokemonSpecies.flavor_text_entries[0].flavor_text}</p>
            {pokemonSpecies.evolution_chain.url}
            
        </>
    )
}