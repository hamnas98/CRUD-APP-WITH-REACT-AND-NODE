import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserProfile, uploadProfileImage } from '../features/user/userThunk'

const UserDashboard = () => {
  const dispatch = useDispatch()
  const fileInputRef = useRef(null)
  const [previewImage, setPreviewImage] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)

  const { profile, loading } = useSelector((state) => state.user)

  // Fetch profile on component mount
  useEffect(() => {
    dispatch(fetchUserProfile())
  }, [dispatch])

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size should be less than 5MB')
      return
    }

    setSelectedFile(file)

    // Create preview URL
    const reader = new FileReader()
    reader.onload = (e) => {
      setPreviewImage(e.target.result)
    }
    reader.readAsDataURL(file)
  }

  const handleUpload = () => {
    if (!selectedFile) return

    const formData = new FormData()
    formData.append('image', selectedFile)

    dispatch(uploadProfileImage(formData)).then(() => {
      // Clear preview after successful upload
      setPreviewImage(null)
      setSelectedFile(null)
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    })
  }

  const handleCancel = () => {
    setPreviewImage(null)
    setSelectedFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  // Fixed image URL construction
  const getProfileImageUrl = (profileImage) => {
    if (!profileImage) return null
    const baseUrl = import.meta.env.VITE_SERVER_URL || 'http://localhost:5000'
    // Check if profileImage already contains full URL or just path
    return profileImage.startsWith('http') ? profileImage : `${baseUrl}${profileImage}`
  }

  // Get the image to display (preview or current profile image)
  const userProfileImage = getProfileImageUrl(profile?.profileImage)
  const displayImage = previewImage || userProfileImage || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face&auto=format'
  const hasImage = profile?.profileImage || previewImage

  console.log('Profile Image URL:', userProfileImage)
  console.log('Display Image:', displayImage)

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
                    src={displayImage}
                    alt="Profile" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face&auto=format'
                    }}
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h4l2-3h6l2 3h4a2 2 0 012 2v9a2 2 0 01-2-2V9a2 2 0 012-2zm9 3a4 4 0 100 8 4 4 0 000-8z" />
                    </svg>
                  </div>
                </div>
                
                {/* Preview indicator */}
                {previewImage && (
                  <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                    Preview
                  </div>
                )}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />

              {/* Show different buttons based on state */}
              {previewImage ? (
                <div className="space-y-2">
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={handleUpload}
                      disabled={loading}
                      className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Uploading...' : 'Upload Image'}
                    </button>
                    <button
                      onClick={handleCancel}
                      disabled={loading}
                      className="bg-gray-500 text-white px-4 py-2 rounded-xl hover:bg-gray-600 disabled:opacity-50"
                    >
                      Cancel
                    </button>
                  </div>
                  {selectedFile && (
                    <p className="text-sm text-gray-600">
                      {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                    </p>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => fileInputRef.current.click()}
                  disabled={loading}
                  className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {hasImage ? 'Update Photo' : 'Upload Photo'}
                </button>
              )}
            </div>
          </div>

          {/* Personal Info */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-lg border space-y-6">
            <div className="flex items-center gap-4 mb-6">
              {/* Profile image in personal info section */}
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-200 flex-shrink-0">
                <img 
                  src={displayImage}
                  alt="Profile" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face&auto=format'
                  }}
                />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Personal Information</h2>
                <p className="text-gray-600 text-sm">View your account details</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-500">Full Name</label>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <p className="text-lg text-gray-900 font-medium">{profile?.name || 'N/A'}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-500">Email Address</label>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                  <p className="text-lg text-gray-900 font-medium">{profile?.email || 'N/A'}</p>
                </div>
              </div>

              {/* Additional profile fields if available */}
              {profile?.phone && (
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-500">Phone Number</label>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <p className="text-lg text-gray-900 font-medium">{profile.phone}</p>
                  </div>
                </div>
              )}

              {profile?.createdAt && (
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-500">Member Since</label>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-lg text-gray-900 font-medium">
                      {new Date(profile.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDashboard