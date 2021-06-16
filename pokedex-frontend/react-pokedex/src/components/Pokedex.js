import React, {useState} from 'react'
import PokedexForm from './PokedexForm'
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';


const Pokedex = ({ pokemons, completePokemon, removePokemon, updatePokemon }) => {
        const [edit, setEdit] = useState({
          id: null,
          name: '',
          type: '',
          generation: ''
        });
      
        const submitUpdate = value => {
          updatePokemon(edit.id, value);
          setEdit({
            id: null,
            name: '',
            type: '',
            generation: ''
        });
    };

    if (edit.id) {
        return <PokedexForm edit={edit} onSubmit={submitUpdate} />;
    }

    return pokemons.map((pokemon, index) =>(
        <div className={pokemon.isComplete ? 'pokemon-row complete' : 'pokemon-row'} key={index}>
            <div key={pokemon.id} onClick={() => completePokemon(pokemon.id)}>
                <div className="items-pokemon">Nome: {pokemon.name} |</div>
                <div className="items-pokemon">Tipo: {pokemon.type} |</div>
                <div className="items-pokemon">Geração: {pokemon.generation}</div>
          </div>
      <div className='icons'>
        <RiCloseCircleLine
          onClick={() => removePokemon(pokemon.id)}
          className='delete-icon'
        />
        <TiEdit
          onClick={() => setEdit({ id: pokemon.id, name: pokemon.name, type: pokemon.type, generation: pokemon.generation })}
          className='edit-icon'
        />
      </div>
        </div>
    ));
}

export default Pokedex
