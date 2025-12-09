function Feed() {
  const trades = [
    {
      id: 1,
      title: "iPhone 14 for Samsung Galaxy S23",
      description: "Looking to trade my iPhone 14 Pro for a Samsung Galaxy S23 Ultra",
      user: "Alex",
      location: "New York"
    },
    {
      id: 2,
      title: "Gaming PC for Laptop + Cash",
      description: "High-end gaming PC, looking for MacBook Pro + $500",
      user: "Sarah",
      location: "Los Angeles"
    },
    {
      id: 3,
      title: "Guitar for Keyboard",
      description: "Fender Stratocaster for quality MIDI keyboard",
      user: "Mike",
      location: "Chicago"
    }
  ]

  return (
    <div className="page">
      <h1>Trade Feed</h1>
      <p>Discover the latest trade offers from your network</p>

      <div className="trade-list">
        {trades.map(trade => (
          <div key={trade.id} className="trade-card">
            <h3>{trade.title}</h3>
            <p className="description">{trade.description}</p>
            <div className="meta">
              <span>Posted by {trade.user}</span>
              <span>•</span>
              <span>{trade.location}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Feed
