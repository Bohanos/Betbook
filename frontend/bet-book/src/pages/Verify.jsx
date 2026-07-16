import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { API_URL } from '../api';

export default function Verify() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [statusMsg, setStatusMsg] = useState("Verifying your account...");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const verifyAccount = async () => {
      if (!token) {
        setStatusMsg("No verification token found.");
        return;
      }

      try {
        const response = await fetch(`${API_URL}/auth/verify?token=${token}`);
        const data = await response.json();

        if (response.ok) {
          setStatusMsg("Success! Your account has been verified.");
          setIsSuccess(true);
        } else {
          setStatusMsg(`Verification failed: ${data.detail}`);
        }
      } catch (error) {
        setStatusMsg("Network error. Could not reach the server.");
      }
    };

    verifyAccount();
  }, [token]);

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow mt-10 text-center">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Account Verification</h2>
      
      <div className={`p-4 rounded-lg font-medium mb-6 ${
        isSuccess ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
      }`}>
        {statusMsg}
      </div>

      {isSuccess && (
        <Link to="/auth" className="bg-yellow-500 hover:bg-yellow-600 px-6 py-2 rounded font-bold text-black shadow">
          Go to Login
        </Link>
      )}
    </div>
  );
}