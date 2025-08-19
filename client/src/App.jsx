import { useState, useEffect } from 'react'
import { io } from 'socket.io-client'
import Header from './components/Header'
import Leaderboard from './components/Leaderboard'
import AddUserModal from './components/AddUserModal'

const API_BASE = 'https://task-snowy-chi.vercel.app/api'

function App() {
  const [users, setUsers] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [socket, setSocket] = useState(null)
  const [claiming, setClaiming] = useState(null)

  // Initialize socket connection
  useEffect(() => {
    const socketInstance = io('https://task-snowy-chi.vercel.app')
    setSocket(socketInstance)

    socketInstance.on('connect', () => {
      console.log('Socket connected')
    })

    socketInstance.on('leaderboard:update', () => {
      fetchUsers()
    })

    return () => {
      socketInstance.disconnect()
    }
  }, [])

  // Fetch users with ranks
  const fetchUsers = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_BASE}/users/ranks`)
      if (!response.ok) throw new Error('Failed to fetch users')
      const data = await response.json()
      setUsers(data)
      setError(null)
    } catch (err) {
      setError('Failed to load leaderboard')
      console.error('Error fetching users:', err)
    } finally {
      setLoading(false)
    }
  }

  // Create new user
  const createUser = async (name) => {
    try {
      const response = await fetch(`${API_BASE}/users/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to create user')
      }
      
      await fetchUsers()
      setIsModalOpen(false)
      return true
    } catch (err) {
      console.error('Error creating user:', err)
      throw err
    }
  }

  // Claim points for a user
  const claimPoints = async (userId) => {
    try {
      setClaiming(userId)
      const response = await fetch(`${API_BASE}/claims/claim`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
      })
      
      if (!response.ok) throw new Error('Failed to claim points')
      
      const data = await response.json()
      
      // Show success notification or update UI as needed
      console.log(`${data.pointsAwarded} points awarded!`)
      
      // The leaderboard will update via socket event
    } catch (err) {
      console.error('Error claiming points:', err)
      setError('Failed to claim points')
    } finally {
      setClaiming(null)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <Header onAddUser={() => setIsModalOpen(true)} />
      
      <main className="container mx-auto px-4 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}
        
        <Leaderboard 
          users={users} 
          loading={loading} 
          onClaimPoints={claimPoints}
          claiming={claiming}
        />
      </main>

      <AddUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreateUser={createUser}
      />
    </div>
  )
}

export default App