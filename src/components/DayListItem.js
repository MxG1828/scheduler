import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";
export default function DayListItem(props) {
  let listClass = classNames(
    "day-list__item",
    { "day-list__item--full": props.spots === 0 },
    { "day-list__item--selected": props.selected }
  );
  const formatSpots = (x) => {
    return x === 0 ? 
      `no spots remaining` :
      x === 1 ? `${x} spot remaining` :
                `${x} spots remaining`;
  };
  let remaining = formatSpots(props.spots);
  return (
    <li className={listClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{remaining}</h3>
    </li>
  );
}
