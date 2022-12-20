import axios from "axios";
import React, { FC, RefObject, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Pokemon } from "../../interfaces/types";

import "./style/pokeCard.css";

interface pokeCardProps {
  url: string;
  sectionStart: RefObject<HTMLElement>;
}

const pokeCard: FC<pokeCardProps> = ({ url,sectionStart }) => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    getPokemon();
  }, []);

  const getPokemon = () => {
    axios
      .get(url)
      .then((res) => setPokemon(res.data))
      .catch((err) => console.log(err));
  };

  const handleClick = () => {
    scrollTo({
      top: sectionStart.current?.offsetTop,
      behavior: "smooth",
    });
    navigate(`/pokedex/${pokemon?.id}`);
    
  };

  return (
    <div
      onClick={handleClick}
      className={`card bg-${pokemon?.types[0].type.name}`}
    >
      <img
        className="card__img--bg"
        src="/pokeball.svg"
        alt=""
      />
      <section className="card__section">
        <p className="card__id">
          #{pokemon?.id.toString().padStart(4, "0")}
        </p>
        <h3 className="card__name">{pokemon?.name}</h3>
        <ul className="card__items">
          {pokemon?.types.map((type) => (
            <li
              className={`card__type bg-${type.type.name}`}
              key={type.type.name}
            >
              {type.type.name}
            </li>
          ))}
        </ul>
      </section>

      <figure className="card__figure">
        <img
          className="card__img"
          src={pokemon?.sprites.other.dream_world.front_default || pokemon?.sprites.other["official-artwork"].front_default}
          alt=""
        />
      </figure>
    </div>
  );
};

export default pokeCard;
