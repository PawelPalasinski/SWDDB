import React from 'react'

const CardList = ({cards}) => {
  return (
    <ul className="pokemonList">
    {cards.map((c) => (
      <li key={c.code}>
            <p>{c.name}</p>
        <img src={c.imagesrc} alt={c.name} />
      </li>
    ))}
  </ul>
  )
}

export default CardList