import { Trophy, Plus } from 'lucide-react'

const Header = ({ onAddUser }) => {
  return (
    <header className="gradient-bg text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Trophy size={32} className="text-yellow-300" />
            <div>
              <h1 className="text-3xl font-bold">Points Leaderboard</h1>
              <p className="text-purple-100">Claim your daily points and climb the ranks!</p>
            </div>
          </div>
          
          <button
            onClick={onAddUser}
            className="flex items-center space-x-2 bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold hover:bg-purple-50 transition-colors duration-200 shadow-md"
          >
            <Plus size={20} />
            <span>Add User</span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header