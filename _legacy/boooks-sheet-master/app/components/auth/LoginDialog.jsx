import { useState } from "react";

const LoginDialog = ({ 
  isOpen, 
  onClose, 
  onSwitchToSignUp = () => {}, 
  onSwitchToForgot = () => {} 
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login submitted:", { email, password });
    onClose();
  };

  return (
    <>
      <div
        className="login fixed inset-0 flex items-center justify-center p-4 z-[1000] animate-fadeIn"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
      >
        <dialog
          open
          className="bg-black/10 backdrop-blur rounded-2xl shadow-2xl w-[90%] max-w-md max-h-[90vh] overflow-y-auto m-[5%] animate-slideUp"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-8">
            <form className="login" onSubmit={handleSubmit}>
              <fieldset className="space-y-4 border-0 p-0 m-0">
                <legend className="sr-only">Login formular</legend>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d91b24] focus:border-transparent outline-none transition-all"
                    placeholder="din@email.dk"
                    required
                    autoComplete="email"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium mb-1"
                  >
                    Adgangskode
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d91b24] focus:border-transparent outline-none transition-all"
                      placeholder="••••••••"
                      required
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      aria-label={
                        showPassword ? "Skjul adgangskode" : "Vis adgangskode"
                      }
                    >
                      {showPassword ? (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
{/* 
                <div className="flex items-center justify-between text-sm">
                  
                    Will remember auto, can be unset in profile
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="remember"
                      className="w-4 h-4 text-gray-100 border-gray-300 rounded"
                    />
                    <span>Husk mig</span>
                  </label> 
                  
                </div>*/}

                <button
                  type="submit"
                  className="w-full border-2 border-[#d91b24] text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                >
                  Log på
                </button>
              </fieldset>
            </form>

            <footer className="mt-6 text-center text-white text-sm flex gap-2 justify-center">
              <button
                    type="button"
                    onClick={onSwitchToForgot}
                    className="text-gray-100 font-medium hover:underline"
                  >
                    Glemt adgangskode?
                  </button>
              |
              <button
                onClick={onSwitchToSignUp}
                className="text-gray-100 font-medium hover:underline"
              >
                Opret bruger
              </button>
            </footer>
          </div>
        </dialog>
      </div>

      <style jsx>{`
        .login {
          color: #fff;
        }

        input::placeholder {
          color: #fff;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default LoginDialog;