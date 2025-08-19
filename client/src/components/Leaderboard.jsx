import { Crown, Gift, Loader2, Trophy } from 'lucide-react'

const Leaderboard = ({ users, loading, onClaimPoints, claiming }) => {
  const getRankBadgeClass = (rank) => {
    switch (rank) {
      case 1: return 'rank-badge rank-1'
      case 2: return 'rank-badge rank-2'
      case 3: return 'rank-badge rank-3'
      default: return 'rank-badge rank-other'
    }
  }

  const getRankIcon = (rank) => {
    if (rank === 1) return <Crown size={16} className="text-yellow-300" />
    return null
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="animate-spin text-purple-600" size={32} />
        <span className="ml-3 text-gray-600">Loading leaderboard...</span>
      </div>
    )
  }

  if (!users.length) {
    return (
      <div className="text-center py-12">
        <Trophy size={48} className="mx-auto text-gray-400 mb-4" />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">No users yet</h3>
        <p className="text-gray-500">Add some users to get started!</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-4">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <Trophy className="mr-3" size={24} />
            Current Rankings
          </h2>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            {users.map((user, index) => (
              <div
                key={user._id}
                className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${
                  user.rank === 1 
                    ? 'bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200' 
                    : user.rank === 2
                    ? 'bg-gradient-to-r from-gray-50 to-slate-50 border-gray-200'
                    : user.rank === 3
                    ? 'bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200'
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className={getRankBadgeClass(user.rank)}>
                      {getRankIcon(user.rank) || user.rank}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">
                      {user.name}
                    </h3>
                    <p className="text-gray-600">
                      {user.totalPoints} {user.totalPoints === 1 ? 'point' : 'points'}
                    </p>
                  </div>
                </div>
                
                <button
                  onClick={() => onClaimPoints(user._id)}
                  disabled={claiming === user._id}
                  className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                >
                  {claiming === user._id ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Claiming...</span>
                    </>
                  ) : (
                    <>
                      <Gift size={16} />
                      <span>Claim Points</span>
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {users.length > 0 && (
        <div className="mt-6 text-center text-gray-500 text-sm">
          Total Users: {users.length} • Last updated: {new Date().toLocaleTimeString()}
        </div>
      )}
    </div>
  )
}

export default Leaderboard