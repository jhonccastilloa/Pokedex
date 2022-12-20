import React, { FormEvent, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setTrainerGlobal } from "../store/slices/trainer.slice";
import { useNavigate } from "react-router-dom";
import "./style/home.css";

const Home = () => {
  const dispatch = useDispatch();
  const inputValue = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setTrainerGlobal(inputValue.current?.value.trim()));
    if (inputValue.current) {
      inputValue.current.value = "";
    }
    navigate("/pokedex");
  };
  return (
    <div className="home">
      <div className="home__main">
        <figure className="home__figure">
          <img className="home__img" src="/Home/pokemonLogo.webp" alt="" />
        </figure>
        <div className="home__info">
          <h1 className="home__title">Hola Entrenador!</h1>
          <p className="home__paragraph">
            Escribe tu nombre para empezar tu aventura Pokemon.
          </p>
          <form className="home__form" onSubmit={handleSubmit}>
            <input className="home__input" type="text" ref={inputValue} />
            <button className="home__btn">Start</button>
          </form>
          <figure className="home__figure-pikachu">

          <img className="home__img-pikachu" src="/pikachu.png" alt="" />
          </figure>
        </div>
      </div>
    </div>
  );
};

export default Home;
