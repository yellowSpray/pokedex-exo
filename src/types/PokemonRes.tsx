export interface PokemonResponse {
    prevPage: () => void;
    nextPage: () => void;
    count : number;
    next : string | null;
    previous : string | null;
    results : PokemonResult[];
}

export interface PokemonResult {
    name: string;
    url: string;
}

export interface PokemonDetails {
    id: number;
    name: string;
    image: string;
    types: PokemonType[];
}

export interface PokemonType {
    slot: number;
    type: {
        name: string;
        url: string;
    };
}
