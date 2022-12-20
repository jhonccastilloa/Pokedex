import axios from "axios";
import { useState, useEffect, FormEvent, ChangeEvent, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import PokeCard from "../components/pokedex/PokeCard";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/pokedex/Pagination";
import "./style/pokedex.css";

interface PokemonUrl {
  name: string;
  url: string;
}

interface TypesPokemonUrl {
  pokemon: PokemonUrl;
}
const Pokedex = () => {
  const { trainer } = useSelector((state: RootState) => state);
  const [pokemons, setPokemons] = useState<PokemonUrl[] | null>(null);
  const [types, setTypes] = useState<PokemonUrl[] | null>(null);
  const [selectType, setSelectType] = useState("All");
  const navigate = useNavigate();

  const sectionCards = useRef<HTMLElement>(null);

  useEffect(() => {
    getTypes();
  }, []);
  const getTypes = () => {
    const URL = `https://pokeapi.co/api/v2/type`;
    axios
      .get(URL)
      .then((res) => setTypes(res.data.results))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getData();
  }, [selectType]);

  const getData = () => {
    if (selectType == "All") {
      const URL = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=10000`;
      axios
        .get(URL)
        .then((res) => setPokemons(res.data.results))
        .catch((err) => console.log(err));
    } else {
      console.log(selectType);

      axios
        .get(selectType)
        .then((res) =>
          setPokemons(res.data.pokemon.map((el: TypesPokemonUrl) => el.pokemon))
        )
        .catch((err) => console.log(err));
    }
  };

  // console.log(pokemons);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = (e.currentTarget.search as HTMLInputElement).value
      .trim()
      .toLowerCase();

    navigate("/pokedex/" + input);
  };
  console.log();
  const handleChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectType(e.target.value);
    setPage(1);
  };

  //pagination Logic

  const [page, setPage] = useState(1);
  const [pokeForPage, setPokeForPage] = useState(32);
  const maxPage = pokemons && Math.ceil(pokemons.length / pokeForPage);

  const handleChangeSelectQuantity = (e: ChangeEvent<HTMLSelectElement>) => {
    setPokeForPage(Number(e.target.value));
  };
  return (
    <div>
      <section className="section__navbar container">
        <img className="navbar__img" src="/headerPokemon2.jpg" alt="pokemon navbar" />
      </section>
      <section className="section__header container" ref={sectionCards}>
        <h1 className="header__title">Pokedex</h1>
        <p className="header__paragraph">
          Bienvenido <span className="header__trainer">{trainer}</span> Aqui
          podras encontrar todos tus pokemones preferidos.
        </p>
        <div className="header__search">
          <form className="header__form" onSubmit={handleSubmit}>
            <input
              className="header__input"
              id="search"
              type="text"
              placeholder="Buscar Pokemon"
            />
            <button className="header__btn">Buscar</button>
          </form>
          <div className="header__type">
            <select className="header__select"  onChange={handleChangeSelect}>
              <option className="header__option" value="All">
                All Pokemon
              </option>
              {types?.map((type) => (
                <option
                  className="header__option"
                  key={type.name}
                  value={type.url}
                >
                  {type.name}
                </option>
              ))}
            </select>
            <button className="header__btn">Tipo</button>
          </div>

          <div className="header__quantity">
            <select
              className="header__select"
              onChange={handleChangeSelectQuantity}
            >
              <option className="header__option-quantity" value="16">
                16
              </option>
              <option value="32">32</option>
              <option value="64">64</option>
              <option value="96">96</option>
            </select>
            <button className="header__btn">Cantidad</button>

          </div>
        </div>
      </section>
      <section className="section__cards container">
        {pokemons
          ?.slice((page - 1) * pokeForPage, page * pokeForPage)
          .map((pokemon) => (
            <PokeCard key={pokemon.name} url={pokemon.url} />
          ))}
      </section>
      <section className="section__pagination">
        <Pagination
          page={page}
          maxPage={maxPage}
          setPage={setPage}
          sectionCards={sectionCards}
        />
      </section>
    </div>
  );
};

export default Pokedex;
