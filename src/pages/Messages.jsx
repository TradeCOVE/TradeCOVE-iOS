function Messages() {
  const conversations = [
    {
      id: 1,
      user: "Alex",
      lastMessage: "Is the iPhone still available?",
      time: "2 hours ago",
      unread: true
    },
    {
      id: 2,
      user: "Sarah",
      lastMessage: "Thanks for the trade!",
      time: "1 day ago",
      unread: false
    },
    {
      id: 3,
      user: "Mike",
      lastMessage: "Can we meet at the coffee shop?",
      time: "3 days ago",
      unread: false
    }
  ]

  return (
    <div className="page">
      <h1>Messages</h1>
      <p>Your trade conversations</p>

      <div className="trade-list">
        {conversations.map(conv => (
          <div
            key={conv.id}
            className="trade-card"
            style={{
              borderLeft: conv.unread ? '4px solid #3498db' : '4px solid transparent'
            }}
          >
            <h3>{conv.user}</h3>
            <p className="description">{conv.lastMessage}</p>
            <div className="meta">
              <span>{conv.time}</span>
              {conv.unread && <span style={{ color: '#3498db', fontWeight: 'bold' }}>• New</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Messages
