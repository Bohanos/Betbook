import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Auth() {
  const { user, setUser } = useContext(AuthContext);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const navigate = useNavigate();

  // State to toggle between Login and Register
  const [isLogin, setIsLogin] = useState(true);
  const [feedback, setFeedback] = useState({ text: "", isError: false });

  const onSubmit = async (data) => {
    setFeedback({ text: "", isError: false }); // Clear previous messages
    
    // Determine which backend route to hit
    const endpoint = isLogin 
      ? 'http://localhost:8000/auth/login' 
      : 'http://localhost:8000/auth/register';

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email, password: data.password }),
      });

      const resData = await response.json();

      if (!response.ok) {
        setFeedback({ text: resData.detail || 'An error occurred.', isError: true });
        return;
      }

      if (isLogin) {
        // --- LOGIN SUCCESS ---
        setUser({ id: resData.user_id, email: data.email }); 
        setFeedback({ text: "Login successful! Redirecting...", isError: false });
        setTimeout(() => navigate('/games'), 1000); 
      } else {
        // --- REGISTER SUCCESS ---
        setFeedback({ text: resData.message || "User created. Please check your email.", isError: false });
        reset(); // Clear the form
      }

    } catch (error) {
      setFeedback({ text: "Cannot connect to the backend server.", isError: true });
    }
  };

  // If already logged in, show a friendly portal instead of the login form
  if (user) {
    return (
      <div className="text-center p-8 bg-white max-w-md mx-auto rounded-xl shadow mt-10">
        <h2 className="text-2xl font-bold text-green-600 mb-2">Welcome Back!</h2>
        <p className="text-gray-600 mb-4">Logged in as: <span className="font-semibold">{user.email}</span></p>
        <button 
          onClick={() => navigate('/games')}
          className="bg-yellow-500 hover:bg-yellow-600 transition-colors py-2 px-6 rounded-lg font-bold text-white shadow-md"
        >
          Go to Games Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        {isLogin ? 'Login to BetBook' : 'Create a BetBook Account'}
      </h2>

      {/* Dynamic Status/Notification Div */}
      {feedback.text && (
        <div className={`p-3 rounded-lg mb-4 text-sm font-semibold border ${
          feedback.isError 
            ? "bg-red-50 border-red-200 text-red-600" 
            : "bg-green-50 border-green-200 text-green-600"
        }`}>
          {feedback.text}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Email Input */}
        <div className="mb-4">
          <input 
            {...register("email", { required: "Email is required" })} 
            className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500" 
            placeholder="Email" 
            autoComplete="email"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <input 
            {...register("password", { 
              required: "Password is required", 
              minLength: { value: 6, message: "Password must be at least 6 characters" } 
            })} 
            type="password" 
            className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500" 
            placeholder="Password" 
            autoComplete={isLogin ? "current-password" : "new-password"}
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>
        
        <button className="w-full bg-yellow-500 hover:bg-yellow-600 transition-colors py-2 rounded-lg font-bold mt-2 text-white shadow-md">
          {isLogin ? 'Login' : 'Register'}
        </button>
      </form>

      {/* Toggle Link */}
      <div className="mt-6 text-center text-sm text-gray-600">
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <button 
          type="button"
          onClick={() => {
            setIsLogin(!isLogin);
            setFeedback({ text: "", isError: false });
            reset();
          }} 
          className="text-blue-600 font-semibold hover:underline"
        >
          {isLogin ? 'Sign up' : 'Log in'}
        </button>
      </div>
    </div>
  );
}