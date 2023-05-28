import React from 'react';

import dollarImg from '../assets/img/dollar.png'
import bitcoinImg from '../assets/img/bitcoin.png'

export function UserPreview({ user, rate }) {
  return (
    <section className='user-preview'>
      <h2> Hello {user.name}&nbsp;!</h2>
      <article className='user-info'>
        <img src={require('../assets/img/dollar.png')} alt='dollar' />
        <h5>
          Coins&nbsp;:
          <span>{user.info.coins}</span>
        </h5>
      </article>
      <article className='user-info'>
       
        <img src={require('../assets/img/bitcoin.png')} alt='coin'/>
        <h5>
          BTC&nbsp;:
          <span>{(user.info.coins * rate).toFixed(6)} </span>
        </h5>
      </article>
      {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
    </section>
  );
}