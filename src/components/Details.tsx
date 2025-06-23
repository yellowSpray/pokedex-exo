import { useParams } from "react-router";
import { getDetailsPokemon, getSpeciesPokemon } from "@/utils/pokeApi";
import { useEffect, useState } from "react";
import type { PokemonDetails, PokemonSpecies } from "@/types/PokemonRes";
import {
  CircleX,
  Heart,
  Sword,
  Shield,
  Swords,
  ShieldHalf,
  CircleGauge,
  Ruler,
  Weight,
  Smile,
  BowArrow,
} from "lucide-react";

export default function Details() {
  const { id } = useParams();

  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails | undefined>();  
  const [pokemonSpecies, setPokemonSpecies] = useState<PokemonSpecies | undefined>();
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getDetailsPokemon(id)
        .then((data) => setPokemonDetails(data))
        .catch((e) => {
          console.error(e);
          setError(true);
        })
        .finally(() => setIsLoading(false));

      getSpeciesPokemon(id)
        .then((raw) => setPokemonSpecies(raw))
        .catch((x) => {
          console.error(x);
          setError(true);
        })
        .finally(() => setIsLoading(false));
    }
  }, [id]);

  if (!pokemonDetails || !pokemonSpecies) {return error;}      
  if (isLoading) {return <p>Loading ...</p>;}
      
  function convertToMeter(height: number) {
    return (height / 10).toFixed(1).replace(".", ",") + " m";
  }

  function convertToKilo(weight: number) {
    return (weight / 10).toFixed(1).replace(".", ",") + " kg";
  }

  function convertId(num: string) {
    if (num.length === 1) {
      return "000" + num;
    } else if (num.length === 2) {
      return "00" + num;
    } else {
      return "0" + num;
    }
  }

  function iconStats(name: string) {
    switch (name) {
      case 'hp':
        return <Heart size={18} />
      case 'attack':
        return <Sword size={18} />
      case 'defense':
        return <Shield size={18} />
      case 'special-attack':
        return <Swords size={18} />
      case 'special-defense':
        return <ShieldHalf size={18} />
      case 'speed':
        return <CircleGauge size={18} />
      default:
        return null
    }
  }

  return (
    <div className="w-full h-lvh flex flex-col justify-center align-center z-10 p-10">

      <header className="flex flex-col items-center justify-center">
        <button className="z-5">
          <CircleX className="text-gray-400" size={25} />
        </button>
      </header>

      <div className="absolute top-0 bottom-0 left-0 right-0 z-0 flex flex-col justify-center">
        <h2 className="text-[200px] text-center font-extrabold text-gray-200 z-0">
          {pokemonSpecies.names[0].name}
        </h2>
      </div>

      <main className="w-full flex flex-row items-center justify-center z-10">

        <section className="w-1/2">

          <div>
            <p className="lowTitle text-gray-500">N° {convertId(id ?? "")}</p>
            <h2 className="uppercase font-bold text-2xl">{pokemonDetails.name}</h2>
          </div>

          <div className="grid grid-cols-8 gap-5 mt-10">
            <ul className="col-start-1 col-span-2 border-gray-500 border-l pl-5">
              {pokemonDetails.stats.map((statObj) => (
                <li
                  key={statObj.stat.name}
                  className="flex flex-row items-center gap-5"
                >
                  {iconStats(statObj.stat.name)} {statObj.base_stat}
                </li>
              ))}
            </ul>

            <ul className="col-start-3 col-span-2 border-gray-500 border-l pl-5">
              <li className="flex flex-row items-center gap-5">
                <Ruler size={18} /> {convertToMeter(pokemonDetails.height)}
              </li>
              <li className="flex flex-row items-center gap-5">
                <Weight size={18} /> {convertToKilo(pokemonDetails.weight)}
              </li>
              <li className="flex flex-row items-center gap-5">
                <Smile size={18} /> {pokemonSpecies.base_happiness}
              </li>
              <li className="flex flex-row items-center gap-5">
                <BowArrow size={18} /> {pokemonSpecies.capture_rate}
              </li>
            </ul>

            <p className="col-start-5 col-span-4 border-gray-500 border-l pl-5">
              {pokemonSpecies.flavor_text_entries[0].flavor_text}
            </p>

          </div>
          
        </section>

        <section className="w-1/2 flex flex-col justify-center items-center">
          <img src={pokemonDetails.image} alt={pokemonDetails.name} className="w-5/8"/>
        </section>
      </main>
    </div>
  );
}
