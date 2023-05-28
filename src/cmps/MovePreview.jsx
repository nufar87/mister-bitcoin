import React from 'react';

export function MovePreview({ move }) {
  const { type, from, to, amount } = move;
  return (
    <article className={`move-preview ${type}`}>
      <h2 >{from}</h2>
      <h2 className='amount'>
        {new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(amount)}
      </h2>
      <h2 >{to}</h2>
    </article>
  );
}