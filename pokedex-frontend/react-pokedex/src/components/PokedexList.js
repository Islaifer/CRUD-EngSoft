import React, {useState, useEffect} from 'react'
import PokedexForm from './PokedexForm'
import Pokedex from './Pokedex'
import PokemonService from '../service/PokemonService'

function PokedexList() {
    const [pokemons, setPokemons] = useState([])

    useEffect(() => {
      fetchPokemon();
    }, []);
  
    const fetchPokemon = () => {
      PokemonService.getAll()
        .then(response => {
          setPokemons(response.data);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    };

    const addPokemon = pokemon =>{
        if(!pokemon.name || !pokemon.type || !pokemon.generation
             || /^\s*$/.test(pokemon.name) || /^\s*$/.test(pokemon.type) 
             || /^\s*$/.test(pokemon.generation)){
                console.log("Leonidas, vai da nao, cabei de noiva");
            return;
        }
        var data = {
          name : pokemon.name,
          type: pokemon.type,
          generation: parseInt(pokemon.generation)
        }
        console.log(pokemon);

      PokemonService.create(data)
        .then(response => {
      const newPokemons = [pokemon, ...pokemons];
      setPokemons(newPokemons);
      console.log(...pokemons);
        })
        .catch(e => {
        console.log(e);
        });

        const newPokemons = [pokemon, ... pokemons];
        setPokemons(newPokemons);
        console.log(... pokemons);
    }

    const updatePokemon = (pokemonId, newValue) => {
        if (!newValue.type || /^\s*$/.test(newValue.type)) {
          return;
        }

        var data = {
          name: newValue.name,
          type: newValue.type,
          generation: parseInt(newValue.generation)
        };

        PokemonService.update(data)
        .then(response => {
      setPokemons(prev => prev.map(item => (item.id === pokemonId ? newValue : item)));
      console.log(...pokemons);
        })
        .catch(e => {
        console.log(e);
        });
    
        
    };

    const removePokemon = id => {
        const removedArr = [...pokemons].filter(pokemon => pokemon.id !== id);

        PokemonService.remove(id)
        .then(response => {
          const removedArr = [...pokemons].filter(pokemon => pokemon.id !== id);
          setPokemons(removedArr);
        })
        .catch(e => {
          console.log(e);
        });
      };
    
      const completePokemon= id => {
        let updatedPokemons = pokemons.map(pokemon => {
          if (pokemon.id === id) {
            pokemon.isComplete = !pokemon.isComplete;
          }
          return pokemon;
        });
        setPokemons(updatedPokemons);
      };
    
      return (
        <>
          <h1>Qual pokemon teremos?</h1>
          <PokedexForm onSubmit={addPokemon} />
          <Pokedex
            pokemons={pokemons}
            completePokemon={completePokemon}
            removePokemon={removePokemon}
            updatePokemon={updatePokemon}
          />
        </>
      );
}

export default PokedexList
