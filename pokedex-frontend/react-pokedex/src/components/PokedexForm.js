import React, { useState, useEffect, useRef }  from 'react'

function PokedexForm(props) {
    const [name, setInputName] = useState(props.edit ? props.edit.name : '',);
    const [type, setInputType] = useState(props.edit ? props.edit.type : '',);
    const [generation, setInputGeneration] = useState(props.edit ? props.edit.generation : '',);

    const inputRefName = useRef(null);
    const inputRefType = useRef(null);
    const inputRefGeneration = useRef(null);


    const handleSubmit = e =>{
        e.preventDefault();
       props.onSubmit({
           id: Math.floor(Math.random() * 10000),
           name: name,
           type: type,
           generation: generation
       })
        clear();
    }

    const handleChangeName = e =>{
        setInputName(e.target.value);
    }

    const handleChangeType = e =>{
        setInputType(e.target.value);
    }

    const handleChangeGeneration = e =>{
        setInputGeneration(e.target.value);
    }

    const clear = () =>{
        setInputName('');
        setInputType('');
        setInputGeneration('');
    }

    return (
        <div>
            <form className="pokedex-form" onSubmit={handleSubmit}>

            {props.edit ? (
        <>
        <input
            placeholder='Atualizar Nome'
            value={name}
            onChange={handleChangeName}
            name='text'
            ref={inputRefName}
            className='input edit'
          />

          <input
            placeholder='Atualizar tipo'
            value={type}
            onChange={handleChangeType}
            name='text'
            ref={inputRefType}
            className='input edit'
          />

            <input
            placeholder='Atualizar geração'
            value={generation}
            onChange={handleChangeGeneration}
            name='text'
            ref={inputRefGeneration}
            className='input edit'
          />
          <button onClick={handleSubmit} className='pokemon-button edit'>
            Atualizar
          </button>
          
        </>
      ) : (
        <>
          <input type="text" placeholder="Nome do Pokemon" value={name}
                name="text" className="input" onChange={handleChangeName} />
                <input type="text" placeholder="Tipo do Pokemon" value={type}
                name="text" className="input" onChange={handleChangeType} />
                <input type="text" placeholder="Geração do Pokemon" value={generation}
                name="text" className="input" onChange={handleChangeGeneration} />

                <button className="pokemon-button">Adicionar</button>
        </>
      )}
                
                
            </form>
        </div>
    )
}

export default PokedexForm
