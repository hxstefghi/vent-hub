import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="grow">
        <Outlet />
      </main>
      <footer className="border-t py-8 mt-16" style={{ borderColor: '#F3F4F6', backgroundColor: '#FFFFFF' }}>
        <div className="container mx-auto text-center">
          <p className="text-sm text-black">
            Vent Hub - A safe space to share your thoughts anonymously
          </p>
          <p className="text-xs text-gray-500 ">
            Made by Christian Catuday
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Layout
