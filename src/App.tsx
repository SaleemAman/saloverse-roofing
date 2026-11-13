import { useEffect, useState } from 'react';
import { loadWhop } from '@whop/elements';
import { WhopElements, Checkout, Payments, CheckoutElement, ExpressCheckoutElement, BrandingElement } from '@whop/elements-react';
import './App.css';

const whopPromise = loadWhop();

declare global {
  interface Window {
    whop?: {
      track: (eventName: string) => void;
    };
  }
}

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined' && window.whop) {
      window.whop.track('service_viewed');
    }
  }, []);

  const handleDepositClick = () => {
    if (typeof window !== 'undefined' && window.whop) {
      window.whop.track('deposit_started');
    }
  };

  const handleEstimateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Submitting...');
    
    if (typeof window !== 'undefined' && window.whop) {
      window.whop.track('estimate_requested');
    }

    // Simulate successful lead capture for a smooth UX
    setTimeout(() => {
      setStatus('Estimate requested successfully!');
      setName('');
      setEmail('');
    }, 400);
  };

  return (
    <div className="container">
      <header>
        <h1>Saloverse Roofing Services</h1>
        <p>Premium Roof Repair, Replacement, and Inspection</p>
      </header>

      {/* Two-column grid layout wrapper */}
      <div className="checkout-layout">
        
        {/* LEFT COLUMN: Info & Forms */}
        <div className="info-column">
          <section className="services">
            <h2>Our Services</h2>
            <ul>
              <li>Inspection Fee: $149</li>
              <li>Project Deposit: $500 (Starts the job)</li>
              <li>Flat-Rate Roof Repair: $1,500</li>
            </ul>
            <button onClick={handleDepositClick}>Start Project & Pay Deposit</button>
          </section>

          <section className="estimate">
            <h2>Request an Estimate</h2>
            <form onSubmit={handleEstimateSubmit}>
              <input 
                type="text" 
                placeholder="Name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required 
              />
              <input 
                type="email" 
                placeholder="Email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
              <button type="submit">Submit Lead</button>
            </form>
            {status && <p>{status}</p>}
          </section>
        </div>

        {/* RIGHT COLUMN: Whop Checkout */}
        <div className="checkout-column">
          <section className="checkout-demo">
            <WhopElements elements={whopPromise}>
              <Checkout plan="plan_xtojVeoUPo5ui">
                <ExpressCheckoutElement />
              </Checkout>
              
              {/* @ts-expect-error - Bypassing strict prop checking for Whop SDK */}
              <Checkout plan="plan_xtojVeoUPo5ui" setupIntent={true}>
                <CheckoutElement />
              </Checkout>
              
              <Payments>
                <BrandingElement />
              </Payments>
            </WhopElements>
          </section>
        </div>

      </div>
    </div>
  );
}

export default App;