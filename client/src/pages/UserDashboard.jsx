import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserProfile, uploadProfileImage } from '../features/user/userThunk'

const UserDashboard = () => {
  const dispatch = useDispatch()
  const fileInputRef = useRef(null)

  const { profile, loading } = useSelector((state) => state.user)

  // Fetch profile on component mount
  useEffect(() => {
    dispatch(fetchUserProfile())
  }, [dispatch])

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const formData = new FormData()
    formData.append('image', file)

    dispatch(uploadProfileImage(formData))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ... header ... */}

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Profile Picture Section */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border">
            <h2 className="text-lg font-semibold mb-6">Profile Picture</h2>

            <div className="text-center">
              <div className="relative group mx-auto w-32 h-32 mb-4">
                <div className="w-full h-full rounded-2xl overflow-hidden border-4 border-white shadow-lg">
                  <img
                    src={profile?.profileImage || 'https://via.placeholder.com/128'}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2..." />
                    </svg>
                  </div>
                </div>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />

              <button
                onClick={() => fileInputRef.current.click()}
                className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
              >
                {loading ? 'Uploading...' : 'Update Photo'}
              </button>
            </div>
          </div>

          {/* Personal Info */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-lg border space-y-4">
            <h2 className="text-xl font-semibold">Personal Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-500 mb-1">Name</label>
                <p className="text-lg text-gray-900 font-medium">{profile?.name || 'N/A'}</p>
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">Email</label>
                <p className="text-lg text-gray-900 font-medium">{profile?.email || 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDashboard
