import React from 'react';
import Features from '@/components/UI/Features';

const Home = () => {
  return (

    <div className="hero">
      <section className="hero-content">
        <div className="text-content">
          <h2 className="sr-only">Promoted Content</h2>
          <p className="subtitle">No fees.</p>
          <p className="subtitle">No minimum deposit.</p>
          <p className="subtitle">High interest rates.</p>
          <p className="text">Open a savings account with Argent Bank today!</p>
        </div>
      </section>
      <Features />
    </div>

  );
};

export default Home;