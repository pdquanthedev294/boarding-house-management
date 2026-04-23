import Footer from './partials/Footer'
import { Outlet } from 'react-router-dom'
import Sidebar from './partials/Sidebar'
import Header from './partials/Header'

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      
      <Header/>

      <div className="flex min-h-[calc(100vh-56px)]">
        <Sidebar/>

        <main className="flex-1 min-w-0 p-6 bg-background">
          <Outlet/>
        </main>
      </div>

      <Footer />
    </div>
  )
}

export default AdminLayout