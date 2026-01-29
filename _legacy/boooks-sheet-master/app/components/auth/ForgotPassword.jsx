import { useState } from "react";

const ForgotPassword = ({ isOpen, onClose, onSwitchToLogin, onSwitchToSignUp }) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Password reset requested for:", email);
    setSubmitted(true);
    // In real app, send reset email here
  };

  const handleBackToLogin = () => {
    setSubmitted(false);
    setEmail("");
    onSwitchToLogin();
  };

  return (
    <>
      <div
        className="forgot-password fixed inset-0 flex items-center justify-center p-4 z-[1000] animate-fadeIn"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="forgot-password-title"
      >
        <dialog
          open
          className="bg-black/10 backdrop-blur rounded-2xl shadow-2xl w-[90%] max-w-md max-h-[90vh] overflow-y-auto m-[5%] animate-slideUp"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-8">
            {!submitted ? (
              <>
                <form className="forgot-password" onSubmit={handleSubmit}>
                  <fieldset className="space-y-4 border-0 p-0 m-0">
                    <legend className="sr-only">
                      Nulstil adgangskode formular
                    </legend>

                    <div className="mb-6">
                      <h2
                        id="forgot-password-title"
                        className="text-2xl font-semibold mb-2"
                      >
                        Glemt adgangskode?
                      </h2>
                      <p className="text-sm text-gray-200">
                        Indtast din email, og vi sender dig et link til at
                        nulstille din adgangskode.
                      </p>
                    </div>

                    <div>
                      <label
                        htmlFor="reset-email"
                        className="block text-sm font-medium mb-1"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="reset-email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d91b24] focus:border-transparent outline-none transition-all"
                        placeholder="din@email.dk"
                        required
                        autoComplete="email"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full border-2 border-[#d91b24] text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                    >
                      Send nulstillingslink
                    </button>
                  </fieldset>
                </form>

                <footer className="mt-6 text-center text-white text-sm flex gap-2 justify-center">
                  <button
                    onClick={onSwitchToLogin}
                    className="text-gray-100 font-medium hover:underline"
                  >
                    Log på
                  </button>
                  |
                  <button
                    onClick={onSwitchToSignUp}
                    className="text-gray-100 font-medium hover:underline"
                  >
                    Opret bruger
                  </button>
                </footer>
              </>
            ) : (
              <div className="forgot-password text-center">
                <div className="mb-6">
                  <svg
                    className="w-16 h-16 mx-auto mb-4 text-green-400"
                    width="24px"
                    height="24px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z"
                      stroke="#fff"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M8.5 12.5L10.5 14.5L15.5 9.5"
                      stroke="#fff"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <h2 className="text-2xl font-semibold mb-2">
                    Check din email
                  </h2>
                  <p className="text-sm text-gray-200">
                    Vi har sendt et link til at nulstille din adgangskode til{" "}
                    <strong>{email}</strong>
                  </p>
                </div>

                <button
                  onClick={handleBackToLogin}
                  className="w-full border-2 border-[#d91b24] text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                >
                  Tilbage til login
                </button>
              </div>
            )}
          </div>
        </dialog>
      </div>

      <style jsx>{`
        .forgot-password {
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

export default ForgotPassword;
