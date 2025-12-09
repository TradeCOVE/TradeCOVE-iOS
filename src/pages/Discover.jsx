function Discover() {
  const categories = [
    { name: "Electronics", count: 124 },
    { name: "Vehicles", count: 89 },
    { name: "Furniture", count: 56 },
    { name: "Sports Equipment", count: 43 },
    { name: "Musical Instruments", count: 31 },
    { name: "Books & Media", count: 67 }
  ]

  return (
    <div className="page">
      <h1>Discover</h1>
      <p>Explore trade offers by category</p>

      <div className="trade-list">
        {categories.map((category, index) => (
          <div key={index} className="trade-card">
            <h3>{category.name}</h3>
            <div className="meta">
              <span>{category.count} active trades</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Discover
