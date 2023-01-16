import { Children } from "react";

interface type {
  type: {
    name: string;
  };
}
interface stat {
  base_stat: number;
  stat: {
    name: string;
  };
}
interface ability {
  ability: {
    name: string;
  };
}

interface moves {
  move: {
    name: string;
  };
}

export interface Sprite {
  front_default: string;
}
export interface Pokemon {
  base_experience: string;
  abilities: ability[];
  species: {
    name: string;
  };
  sprites: {
    other: {
      dream_world: {
        front_default: string;
      };
      ["official-artwork"]: {
        front_default: string;
      };
    };
    versions:Versions
  };
  name: string;
  id: number;
  moves: moves[];
  types: type[];
  stats: stat[];
  height: number;
  weight: number;
}

interface Sprite{
  sprite:{
    front_default:string
  }
}
 interface Versions {
  "generation-i":    GenerationI;
  "generation-ii":   GenerationIi;
  "generation-iii":  GenerationIii;
  "generation-iv":   GenerationIv;
  "generation-v":    GenerationV;
  "generation-vi":   { [key: string]: Home };
  "generation-vii":  GenerationVii;
  "generation-viii": GenerationViii;
}
export interface language {
  language: {
    name: string;
  };
}

export interface Specie {
  description: {
    flavor_text: string;
  };
  genera: {
    genus: string;
  };
}

export interface StatMax {
  hp: {
    value: number;
    icon: string;
  };
  attack: {
    value: number;
    icon: string;
  };
  defense: {
    value: number;
    icon: string;
  };
  ["special-attack"]: {
    value: number;
    icon: string;
  };
  ["special-defense"]: {
    value: number;
    icon: string;
  };
  speed: {
    value: number;
    icon: string;
  };
}

export interface Children{
  children: JSX.Element| JSX.Element[]
}