import type {PokemonType} from "../types/PokemonRes.tsx";

export default function CardPokemon({id, name, image, types}: { id: number, name: string, image: string, types: PokemonType[] }) {

    const colorType = (type: string): string  => {
        switch (type) {
            case "normal":
                return "bg-gray-400 text-white";
            case "fire":
                return "bg-red-500 text-white";
            case "water":
                return "bg-blue-500 text-white";
            case "electric":
                return "bg-yellow-400 text-black";
            case "grass":
                return "bg-green-500 text-white";
            case "ice":
                return "bg-cyan-500 text-white";
            case "fighting":
                return "bg-red-700 text-white";
            case "poison":
                return "bg-purple-500 text-white";
            case "ground":
                return "bg-orange-500 text-white";
            case "flying":
                return "bg-indigo-500 text-white";
            case "psychic":
                return "bg-pink-500 text-white";
            case "bug":
                return "bg-lime-500 text-white";
            case "rock":
                return "bg-gray-500 text-white";
            case "ghost":
                return "bg-indigo-700 text-white";
            case "dragon":
                return "bg-indigo-600 text-white";
            case "dark":
                return "bg-gray-800 text-white";
            case "steel":
                return "bg-gray-400 text-white";
            case "fairy":
                return "bg-pink-400 text-white";
            default:
                return "bg-gray-300 text-black";
        }
    }

    return (
        <article className={"flex flex-col items-center"}>
            <div className={"flex flex-row justify-center items-center p-5 bg-gray-100"}>
                <img src={image} alt={name} className={"w-full"}/>
            </div>
            <p>N° {id}</p>
            <h4 className={"uppercase font-bold"}>{name}</h4>
            <ul className={"flex flex-row justify-center items-center gap-2 mt-2 w-full"}>
                {types.map(type => (
                    <li key={type.type.name} className={`text-sm text-center rounded-full py-1 px-1 w-1/3 ${colorType(type.type.name)}`}>{type.type.name}</li>
                ))}
            </ul>
        </article>
    )
}