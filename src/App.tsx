import './App.css'

function App() {
  return (
    <div className="app">
      <header className="header">
        <div className="logo">JLb</div>
        <h1 className="tagline">
          I build things. Sometimes they're digital, sometimes they're just ideas. Always trying to make them better.
        </h1>
      </header>

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
          Right now, I'm working on digital tools, exploring web3, and helping people turn ideas into reality.
        </p>
      </section>

      <section className="projects">
        <h2>Stuff I've Built</h2>
        <ul>
          <li>Built a platform for niche communities using blockchain.</li>
          <li>Designed systems for outdoor activities and transport systems.</li>
          <li>Prototyped experimental solutions for everyday problems.</li>
        </ul>
      </section>

      <section className="philosophy">
        <h2>Philosophy</h2>
        <p>
          If it doesn't work, fix it. If it's broken, make it better. If it's perfect, start over.
        </p>
      </section>

      <section className="collaboration">
        <h2>Collaboration</h2>
        <p>Got a wild idea? I'm into it. Let's build.</p>
      </section>

      <footer className="contact">
        <h2>Contact</h2>
        <div className="contact-links">
          <a href="mailto:john@jlbqi.com">john@jlbqi.com</a>
          <a href="https://warpcast.com/jlbqi" target="_blank" rel="noopener noreferrer">Farcaster</a>
        </div>
      </footer>
    </div>
  )
}

export default App
