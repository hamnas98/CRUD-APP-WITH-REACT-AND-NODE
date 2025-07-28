import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const isLoggedIn = Boolean(isAuthenticated && user);
  const userName = user?.name || 'User';
  const userEmail = user?.email || '';
  const userProfile = user?.profileImage? `${import.meta.env.VITE_SERVER_URL || 'http://localhost:5000'}${user.profileImage}`: null;


  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">CRUD APP</h1>
                <p className="text-xs text-gray-500 hidden sm:block"></p>
              </div>
            </div>

            {/* Auth Section */}
            <div className="flex items-center gap-4">
              {!isLoggedIn ? (
                <div className="flex items-center gap-3">
                  <Link to="/login" className="text-gray-700 hover:text-blue-600 font-medium transition-colors hidden sm:block">Sign In</Link>
                  <Link to="/signup" className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105">Get Started</Link>
                </div>
              ) : (
                <div className="relative group">
                  <button className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-100 transition-colors">
                    <img src={userProfile? userProfile : 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face&auto=format'} alt="User Avatar" className="w-8 h-8 rounded-full border-2 border-gray-200" />
                    <div className="hidden sm:block text-left">
                      <p className="text-sm font-medium text-gray-900">{userName}</p>
                      <p className="text-xs text-gray-500">{userEmail}</p>
                    </div>
                    <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Dropdown Menu */}
                  <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="p-4 border-b border-gray-100">
                      <div className="flex items-center gap-3">
                        <img src={userProfile? userProfile : 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face&auto=format'} alt="User Avatar" className="w-12 h-12 rounded-full border-2 border-gray-200" />
                        <div>
                          <p className="font-medium text-gray-900">{userName}</p>
                          <p className="text-sm text-gray-500">{userEmail}</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-2">
                      <Link to="/dashboard" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group/item">
                        <svg className="w-5 h-5 text-gray-400 group-hover/item:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span className="text-gray-700 group-hover/item:text-gray-900">Dashboard</span>
                      </Link>
                      <div className="border-t border-gray-100 mt-2 pt-2">
                        <button onClick={handleLogout} className="flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 transition-colors group/item w-full text-left">
                          <svg className="w-5 h-5 text-gray-400 group-hover/item:text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          <span className="text-gray-700 group-hover/item:text-red-600">Logout</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {/* Mobile Menu Icon */}
              <button className="md:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Welcome {isLoggedIn ? userName : 'Guest'}
            </h1>
          </div>
        </div>
        {/* Background Decoration */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 -right-32 w-80 h-80 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
          <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
