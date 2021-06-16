package com.fatec.pokedex.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fatec.pokedex.dao.PokemonRepository;
import com.fatec.pokedex.model.Pokemon;

@RestController
@CrossOrigin
public class PokemonController {

	@Autowired
	private PokemonRepository pokemonRepository;
	
	@RequestMapping(method = RequestMethod.POST,
			path = "/pokemon/add")
	public String postPokemon(@RequestBody Pokemon pokemon) {
		this.pokemonRepository.save(pokemon);
		return "Pokemon adicionado com sucesso!";
	}
	
	@RequestMapping(method = RequestMethod.PUT,
			path = "/pokemon/update")
	public String updatePokemon(@RequestBody Pokemon pokemon) {
		Pokemon pokemonUpdated = this.pokemonRepository.findByName(pokemon.getName());
		if(pokemonUpdated != null) {
			pokemonUpdated.setName(pokemon.getName());
			pokemonUpdated.setType(pokemon.getType());
			pokemonUpdated.setGeneration(pokemon.getGeneration());
			this.pokemonRepository.save(pokemonUpdated);
			return "Pokemon atualizado com sucesso!";
		}
		return "Pokemon inexistente";
	}
	
	@RequestMapping(method = RequestMethod.DELETE,
			path = "/pokemon/del/{id}")
	public String delete(@PathVariable("id") Integer id) {
		this.pokemonRepository.deleteById(id);
		return "Pokemon deletado com sucesso!";
	}
	
	@RequestMapping(method = RequestMethod.GET,
			path = "/pokemon/getByName")
	public ResponseEntity<Pokemon> getPokemon(@RequestBody Pokemon pokemon){
		Pokemon pokemonResponse = this.pokemonRepository.findByName(pokemon.getName());
		return ResponseEntity.ok(pokemonResponse);
	}
	
	@RequestMapping(method = RequestMethod.GET,
			path = "/pokemon/getAll")
	public ResponseEntity<List<Pokemon>> getAllPokemon(){
		List<Pokemon> lista = this.pokemonRepository.findAll();
		return ResponseEntity.ok(lista);
	}
}
