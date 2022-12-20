import React, { FormEvent, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setTrainerGlobal } from "../store/slices/trainer.slice";
import { useNavigate } from "react-router-dom";
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
    navigate("/pokedex")
  };
  return (
    <div>
      <img src="/Home/pokedex.png" alt="" />
      <h1>Hi Trainer!</h1>
      <p>Give me your name to start</p>
      <form onSubmit={handleSubmit}>
        <input type="text" ref={inputValue} />
        <button>Start</button>
      </form>
    </div>
  );
};

export default Home;
