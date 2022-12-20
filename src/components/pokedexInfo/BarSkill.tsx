import React, { FC } from "react";
import { stat, StatMax } from "../../interfaces/types";

interface BarSkillProps {
  stat: stat;
  type: string;
}

const BarSkill: FC<BarSkillProps> = ({ stat, type }) => {

  const statMax: StatMax = {
    hp: {
      value: 274,
      icon: "fa-solid fa-heart-circle-plus",
    },
    attack: {
      value: 229,
      icon: "fa-solid fa-virus",
    },
    defense: {
      value: 196,
      icon: "fa-solid fa-shield",
    },
    ["special-attack"]: {
      value: 218,
      icon: "fa-solid fa-viruses",
    },
    ["special-defense"]: {
      value: 218,
      icon: "fa-solid fa-shield-halved",
    },
    speed: {
      value: 306,
      icon: "fa-solid fa-forward",
    },
  };
  const typeStat: string = stat.stat.name;
  const statSelect = statMax[typeStat as keyof StatMax];
  const widthPorcent = stat.base_stat / (statSelect.value / 100);

  const style = {
    width: widthPorcent + "%",
  };
  return (
    <div className="statistics__skill">
      <p className="statistics__subtitle">
      <span className="statistics__text">
        <i className={`statistics__icon bg-${type} ${statSelect.icon}`}></i>
          {stat.stat.name}:
      </span>
        <span className="statistics__span">{stat.base_stat}</span>
      </p>
      <div className="statistic__bar">
        <div className="bar">
          <div className=" bar--container">
            <div className={`bar--area bg-${type}`} style={style}></div>
            <p className={`bar__text bg-${type}`}>
              <span className="bar__span">{stat.base_stat}</span>
            </p>
          </div>
        </div>
        <p className="statistic__max">{statSelect.value}</p>
      </div>
    </div>
  );
};

export default BarSkill;
