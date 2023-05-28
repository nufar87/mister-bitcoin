import React from 'react';
import { MovePreview } from './MovePreview.jsx';
export function MovesList({ moves }) {
  return (
    <div className='move-list'>
      {moves.map((move) => (
        <MovePreview move={move} key={move._id} />
      ))}
      {/* <pre>{JSON.stringify(moves, null, 2)}</pre> */}
    </div>
  );
}