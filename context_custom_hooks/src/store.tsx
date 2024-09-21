import { useEffect, createContext, useContext, useReducer, useCallback, useMemo } from 'react'
import './App.css'

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

function usePokemonSource() {

    type PokemonState = {
        pokemon: Pokemon[];
        search: string;

    }

    type PokemonAction = { type: "setPokemon"; payload: Pokemon[] } | { type: "setSearch"; payload: string };

    const [{ pokemon, search }, dispatch] = useReducer(
        (state: PokemonState, action: PokemonAction) => {
            switch (action.type) {
                case "setPokemon":
                return { ...state, pokemon: action.payload };
                case "setSearch":
                return { ...state, search: action.payload };
            }
        },
        {
            pokemon: [],
            search: "foo",
        }
    );

  useEffect(() => {
    fetch('/pokemon.json')
      .then((response) => response.json())
      .then((data) => 
        dispatch({
            type: 'setPokemon',
            payload: data,
        }))
  }, [])

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