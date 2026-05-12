import { Routes, Route } from 'react-router-dom'
import InventoryList from './pages/InventoryList'
import AddInventory from './pages/AddInventory'

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>💊 Pharmaceutical Management System</h1>
        <nav className="app-nav">
          <a href="/">Home</a>
          <a href="/inventory">📦 Inventory</a>
          <a href="/prescriptions">📋 Prescriptions</a>
          <a href="/reports">📊 Reports</a>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={
            <section className="hero-card">
              <h2>Inventory • Prescriptions • Users • Reporting</h2>
              <p>Use this system to manage pharmaceutical inventory, prescriptions, user authentication, and generate reports.</p>
              <div className="quick-links">
                <a href="/inventory" className="link-btn">→ Manage Inventory</a>
              </div>
            </section>
          } />
          <Route path="/inventory" element={<InventoryList />} />
          <Route path="/inventory/add" element={<AddInventory />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
