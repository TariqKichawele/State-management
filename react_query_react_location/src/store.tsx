import { createContext, useContext, useReducer, useCallback, useMemo } from 'react'
import './App.css'
import { useQuery } from '@tanstack/react-query';

interface Pokemon {
  id: number;
  name: string;
  type: string[];
  hp: number;
  attack: number;
  defense: number;
  speed: number;
  special_attack: number;
  special_defense: number;
}

function usePokemonSource():{
  pokemon: Pokemon[];
  setSearch: (search: string) => void;
  search: string;
} {

  const { data: pokemon } = useQuery<Pokemon[]>({
    queryKey: ["pokemon"],
    queryFn: () => fetch("/pokemon.json").then((res) => res.json()),
    initialData: [],
  });

  type PokemonState = {
        search: string;
  }

  type PokemonAction = { type: "setSearch"; payload: string };

  const [{ search }, dispatch] = useReducer(
        (state: PokemonState, action: PokemonAction) => {
            switch (action.type) {
                case "setSearch":
                return { ...state, search: action.payload };
            }
        },
        {
            search: "",
        }
  );

  const setSearch = useCallback((search: string) => {
        dispatch({
            type:'setSearch',
            payload: search,
        })
  },[]);

  const filteredPokemon = useMemo(
    () =>
        pokemon
            .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
            .slice(0, 20),
    [pokemon, search],
  );

  const sortedPokemon = useMemo(
    () => [ ...filteredPokemon].sort((a, b) =>a.name.localeCompare(b.name)),
    [filteredPokemon],
  );


  return { pokemon: sortedPokemon, search, setSearch };
}

const PokemonContext = createContext<ReturnType<typeof usePokemonSource>>(
  {} as unknown as ReturnType<typeof usePokemonSource>
);

export function usePokemon() {
  return useContext(PokemonContext);
}

export function PokemonProvider({ children }: { children: React.ReactNode }  ) {
    return (
      <PokemonContext.Provider value={usePokemonSource()}>
        {children}
      </PokemonContext.Provider>
    );
}