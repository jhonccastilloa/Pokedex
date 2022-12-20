import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BarSkill from "../components/pokedexInfo/BarSkill";
import {
  language,
  Pokemon,
  Specie,
  Sprite,
  Versions,
} from "../interfaces/types";
import "./style/pokedexInfo.css";

const PokedexInfo = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [pokemonSpecie, setpokemonSpecie] = useState<Specie | null>(null);

  useEffect(() => {
    getPokemon();
    getPokemonSpecie();
  }, [id]);

  const getPokemon = () => {
    const URL = `https://pokeapi.co/api/v2/pokemon/${id}`;
    axios
      .get(URL)
      .then((res) => setPokemon(res.data))
      .catch((err) => console.log(err));
  };
  const getPokemonSpecie = () => {
    const URL = `https://pokeapi.co/api/v2/pokemon-species/${id}`;
    axios
      .get(URL)
      .then((res) => {
        const genera = res.data.genera.find(
          (el: language) => el.language.name === "es"
        );
        const description = res.data.flavor_text_entries.find(
          (el: language) => el.language.name === "es"
        );
        const specie = {
          genera,
          description,
        };
        setpokemonSpecie(specie);
      })
      .catch((err) => console.log(err));
  };
  console.log("pokemon", pokemon?.sprites.versions);

  return (
    <div className={` bg-${pokemon?.types[0].type.name} pokedexInfo`}>
      <section className="section__header-info container">
        <div className="header__info">
          <p className="header__id">
            #{pokemon?.id.toString().padStart(4, "0")}
          </p>
          <div className="header__titles">
            <h1 className="header__title-info">{pokemon?.name} </h1>
            <span className="header__title-es">
              {pokemonSpecie?.genera.genus}
            </span>
          </div>
          <ul className="header__items">
            {pokemon?.types.map((type) => (
              <li
                className={`header__type bg-${type.type.name}`}
                key={type.type.name}
              >
                {type.type.name}
              </li>
            ))}
          </ul>
        </div>
        <figure className="header__figure">
          <div className="circle circle--top"></div>
          <div className="circle circle--bottom"></div>
          <p className="header__text-height">
            Altura: {pokemon && pokemon.height / 10} m
          </p>
          <img
            className="header__img"
            src={pokemon?.sprites.other.dream_world.front_default}
            alt=""
          />
          <p className="header__text-weight">
            Peso: {pokemon && pokemon.weight / 10} kg
          </p>
        </figure>
      </section>
      <section className="section__info container--sections">
        <div className="info__texts">
          <h2 className="info__title">{pokemon?.name}</h2>
          <p className="info__paragraph">
            {pokemonSpecie?.description.flavor_text}
          </p>
          <ul className="info__list">
            <li className="info__item">
              <span className="info__span">Peso: </span>
              {pokemon && pokemon.weight / 10} kg
            </li>
            <li className="info__item">
              <span className="info__span">Altura: </span>
              {pokemon && pokemon.height / 10} m
            </li>
            <li className="info__item">
              <span className="info__span">Orden: </span>
              {pokemon?.id}
            </li>
            <li className="info__item">
              <span className="info__span">Habilidades: </span>
              <ul className="info__skills">
                {pokemon?.abilities.map((ability) => (
                  <li
                    key={ability.ability.name}
                    className={` info__skills-item bg-${pokemon?.types[0].type.name} `}
                  >
                    {ability.ability.name} <i className="fa-solid fa-star"></i>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
        <div className="info__cards ">
          <div className={`info__card bg-${pokemon?.types[0].type.name} `}>
            <h2 className="info__card-title">Experiencia</h2>
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 512 512"
              className="info__svg text-5xl  text-grass"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M255 471L91.7 387V41h328.6v346zm-147.3-93.74L255 453l149.3-75.76V57H107.7v320.26zm187.61-168.34l-14.5-46 38.8-28.73-48.27-.43L256 87.94l-15.33 45.78-48.27.43 38.8 28.73-14.5 46 39.31-28zM254.13 311.5l98.27-49.89v-49.9l-98.14 49.82-94.66-48.69v50zm.13 32.66l-94.66-48.69v50l94.54 48.62 98.27-49.89v-49.9z"></path>
            </svg>
            <p className="info__card-paragraph">{pokemon?.base_experience}</p>
          </div>
          <div
            className={`info__card info__card--obscure bg-${pokemon?.types[0].type.name} `}
          >
            <h2 className="info__card-title info__card-title--white">
              Especie
            </h2>
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 16 16"
              className="info__svg text-5xl  text-contrastText"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M14 13.292A8 8 0 0 0 8.5.015v7.778l5.5 5.5zm-.708.708L8.5 9.206v6.778a7.967 7.967 0 0 0 4.792-1.986zM7.5 15.985V9.207L2.708 14A7.967 7.967 0 0 0 7.5 15.985zM2 13.292A8 8 0 0 1 7.5.015v7.778l-5.5 5.5z"></path>
            </svg>
            <p className="info__card-paragraph info__card-paragraph--white">
              {pokemon?.species.name}
            </p>
          </div>
          <div className={`info__card  bg-${pokemon?.types[0].type.name} `}>
            <h2 className="info__card-title">Tipo</h2>
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 16 16"
              className="info__svg text-5xl  text-grass"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M6 3.5A1.5 1.5 0 0 1 7.5 2h1A1.5 1.5 0 0 1 10 3.5v1A1.5 1.5 0 0 1 8.5 6v1H14a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0v-1A.5.5 0 0 1 2 7h5.5V6A1.5 1.5 0 0 1 6 4.5v-1zm-6 8A1.5 1.5 0 0 1 1.5 10h1A1.5 1.5 0 0 1 4 11.5v1A1.5 1.5 0 0 1 2.5 14h-1A1.5 1.5 0 0 1 0 12.5v-1zm6 0A1.5 1.5 0 0 1 7.5 10h1a1.5 1.5 0 0 1 1.5 1.5v1A1.5 1.5 0 0 1 8.5 14h-1A1.5 1.5 0 0 1 6 12.5v-1zm6 0a1.5 1.5 0 0 1 1.5-1.5h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5v-1z"
              ></path>
            </svg>
            <p className="info__card-paragraph">
              {pokemon?.types[0].type.name}
            </p>
          </div>
        </div>
      </section>
      <section className="section__statistics container--sections">
        <h2 className="statistics__title">Estadisticas Base</h2>

        <div className="statistics__container">
          {pokemon?.stats.map((stat) => (
            <BarSkill
              key={stat.stat.name}
              stat={stat}
              type={pokemon?.types[0].type.name}
            />
          ))}
        </div>
      </section>
      <section className="section__moves container--sections">
        <h2 className="moves__title">Movimientos</h2>
        <p className="moves__text">
          Un movimiento o ataque (Move en inglés, わざ Acción en japonés) es un
          esfuerzo de poder que puede ser físico, especial, o de apoyo y que los
          Pokémon son capaces de aprender y usar a lo largo de su desarrollo,
          dependiendo principalmente de su tipo y en la mayoría de casos de su
          fisionomía.
        </p>
        <ul className="moves__list">
          {pokemon?.moves.map((move) => (
            <li
              key={move.move.name}
              className={`moves__item bg-${pokemon?.types[0].type.name}`}
            >
              <i className="fa-solid fa-explosion"></i> {move.move.name}
            </li>
          ))}
        </ul>
      </section>
      <section className="section__sprites container--sections">
        <h2 className="sprites__title">Imagenes</h2>
        <p className="sprites__text">
          Pokémon se compone de siete generaciones. Estas se han sucedido desde
          1996, a lo largo de 20 años, por lo que las generaciones suelen durar
          entre tres y cuatro años. No reciben un nombre específico, sino que se
          numeran cronológicamente: primera, segunda, tercera, cuarta, quinta,
          sexta y séptima generación (o, alternativamente, generación I, II,
          III, IV, V, VI y VII1).
        </p>

        <div className="sprites__cards">
          {pokemon?.sprites &&
            Object.entries(pokemon.sprites.versions).map(([key, version]) =>
              Object.entries(version).filter((versionF) => (versionF[1] as Sprite).front_default).map((ver) => (
                <div key={(ver[1] as Sprite).front_default} className={`sprites__card `}>
                  <h3 className="sprites__subtitle">
                    {key} | <span className="sprites__span">{ver[0]}</span>
                  </h3>
                  <figure className="sprites__figure">
                    <img
                      className="sprites__img"
                      src={(ver[1] as Sprite).front_default}
                      alt=""
                    />
                  </figure>
                </div>
              ))
            )}
        </div>
      </section>
    </div>
  );
};

export default PokedexInfo;
