function Profile() {
  return (
    <div className="page">
      <h1>My Profile</h1>

      <div style={{ marginTop: '2rem' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '2rem',
          marginBottom: '2rem',
          paddingBottom: '2rem',
          borderBottom: '1px solid #e0e0e0'
        }}>
          <div style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '2rem',
            fontWeight: 'bold'
          }}>
            JD
          </div>
          <div>
            <h2 style={{ color: '#2c3e50', marginBottom: '0.5rem' }}>John Doe</h2>
            <p style={{ color: '#666' }}>Member since 2024</p>
            <p style={{ color: '#666' }}>New York, NY</p>
          </div>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ color: '#2c3e50', marginBottom: '1rem' }}>Trade Stats</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
            <div className="trade-card">
              <h4 style={{ color: '#3498db', fontSize: '2rem', marginBottom: '0.5rem' }}>12</h4>
              <p style={{ color: '#666' }}>Active Trades</p>
            </div>
            <div className="trade-card">
              <h4 style={{ color: '#2ecc71', fontSize: '2rem', marginBottom: '0.5rem' }}>45</h4>
              <p style={{ color: '#666' }}>Completed Trades</p>
            </div>
            <div className="trade-card">
              <h4 style={{ color: '#f39c12', fontSize: '2rem', marginBottom: '0.5rem' }}>4.8</h4>
              <p style={{ color: '#666' }}>Rating</p>
            </div>
          </div>
        </div>

        <div>
          <h3 style={{ color: '#2c3e50', marginBottom: '1rem' }}>Interests</h3>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {['Electronics', 'Gaming', 'Music', 'Sports', 'Books'].map(interest => (
              <span key={interest} style={{
                padding: '0.5rem 1rem',
                background: '#ecf0f1',
                borderRadius: '20px',
                color: '#2c3e50',
                fontSize: '0.9rem'
              }}>
                {interest}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
