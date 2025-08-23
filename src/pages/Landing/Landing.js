import React from 'react';
import { Link } from 'react-router-dom';

export default function Landing(){
  return (
    <section className="py-6">
      <div className="container">
        <h1 style={{fontSize:'42px',lineHeight:1.1,margin:'0 0 10px'}}>Your Health <span style={{color:'var(--primary)'}}>Our Responsibility</span></h1>
        <p className="muted" style={{maxWidth:720}}>Take control of your health journey with our comprehensive platform. Connect with healthcare professionals, track your wellness, and access personalized care all in one place.</p>
        <div className="row mt-3">
          <Link className="btn btn-primary" to="/signup">Get Started</Link>
          <Link className="btn btn-outline" to="/login">Login</Link>
        </div>

        <div className="card mt-4">
          <h3>Your Trust, Our Priority</h3>
          <p>All reviews are verified and moderated to ensure authenticity. We’re committed to maintaining transparency and helping you make informed healthcare decisions.</p>
        </div>
      </div>
    </section>
  );
}
