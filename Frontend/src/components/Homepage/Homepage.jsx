import './Homepage.css'
import E from './E'
import Navbar from './Navbar'
import Feature from './Feature'
import About from './About'

function Homepage() {

  return (
    <main className='background'>
      <Navbar />  
      <E />
      <div className='bg'>
      <Feature />
      <About />
      </div>
    </main>

  )
}

export default Homepage;