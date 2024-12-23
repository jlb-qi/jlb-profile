import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Shop } from './pages/Shop'
import './App.css'

function App() {
  const appEnv = import.meta.env.VITE_APP_ENV || 'prod'
  const isDevMode = appEnv === 'dev'

  return (
    <Router>
      <div className="app">
        <header className="header">
          <div className="content-container">
            <div className="logo">JLb</div>
            {isDevMode &&<nav className="main-nav">
              <Link to="/" className="nav-link">Home</Link>
               <Link to="/shop" className="nav-link">Shop</Link>
            </nav>
            }
            <h1 className="tagline">
              I build things. I'm inspired by beautiful and radical things. I'm excited by the unknown.
            </h1>
          </div>
        </header>

        <Routes>
          {isDevMode && <Route path="/shop" element={<Shop />} />}
          <Route path="/" element={
            <div className="content-container">
              <div className="profile-pic-container">
                <img src="/anon_prof_pic.jpg" alt="Profile" className="profile-pic" />
              </div>

              <section className="about">
                <h2>About Me</h2>
                <p className="who-i-am">
                  I'm a builder. I like making things that matter, breaking things that don't, and experimenting in between. 
                  I'm into rugby, jazz, and art—stuff that feels alive.
                </p>
                <p className="what-i-do">
                  Right now, I'm working on ways to some personal web3 projects, and helping people turn ideas into reality.
                </p>
              </section>

              <section className="projects">
                <h2>Stuff I've Built</h2>
                <ul>
                  <li>Built a platform for niche communities using blockchain.</li>
                  <li>Launched a digital art collection.</li>
                  <li>Designed systems for outdoor activities and transport systems.</li>
                  <li>Prototyped experimental solutions for everyday problems.</li>
                </ul>
              </section>

              <section className="philosophy">
                <h2>Philosophy</h2>
                <p>
                If it's not working, change it. If you believe in it, see it through.
                </p>
              </section>

              <section className="books">
                <h2>Book Recommendations</h2>
                <ul>
                  <li>In Praise of Shadows by Jun'ichirō Tanizaki — On finding beauty in the subtle and understated</li>
                  <li>Anti-Fragile by Nassim Nicholas Taleb — Why some things benefit from disorder</li>
                  <li>The Courage to be Disliked by Ichiro Kishimi & Fumitake Koga — Exploring freedom through Adlerian psychology</li>
                </ul>
              </section>

              <section className="collaboration">
                <h2>Collaboration</h2>
                <p>Got a wild idea? I'm into it. Let's build.</p>
              </section>
            </div>
          } />
        </Routes>

        <footer className="contact">
          <h2>Contact</h2>
          <div className="contact-links">
            <a href="mailto:john@jlbqi.com">john@jlbqi.com</a>
            <a href="https://warpcast.com/jlbqi" target="_blank" rel="noopener noreferrer">Farcaster</a>
          </div>
        </footer>
      </div>
    </Router>
  )
}

export default App
