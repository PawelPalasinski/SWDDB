import React, { lazy, Suspense } from 'react';

const CardImage = (c) => {
  return (

    <Suspense fallback={<div>Loading...</div>}>
    <img src={c.imagesrc} alt={c.name} />
  </Suspense>

    
  )
}

export default CardImage