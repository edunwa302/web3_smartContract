import { useState } from 'react';
import { Navbar, Welcome, Services, Transactions, Loader, Footer } from './components'

const App = () => {

  return (
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        {/* navbar */}
        <Navbar/>
        {/* welcome */}
        <Welcome/>
      </div>
      <div className="">
        {/* sevices */}
        <Services/>
        {/* transactions */}
        <Transactions/>
        {/* footer */}
        <Footer/>
      </div>
    </div>
  )
}

export default App
