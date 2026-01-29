import { useState } from "react";
import LoginDialog from "./LoginDialog";
import SignUpForm from "./SignUpForm";
import ForgotPassword from "./ForgotPassword";

const AuthDialog = ({ initialView = "login", onClose }) => {
  const [currentView, setCurrentView] = useState(initialView);

  const handleClose = () => {
    onClose();
    // Reset to login after dialog is closed
    setTimeout(() => setCurrentView("login"), 200);
  };

  return (
    <>
      <LoginDialog
        isOpen={currentView === "login"}
        onClose={handleClose}
        onSwitchToSignUp={() => setCurrentView("signup")}
        onSwitchToForgot={() => setCurrentView("forgot")}
      />
      <SignUpForm
        isOpen={currentView === "signup"}
        onClose={handleClose}
        onSwitchToLogin={() => setCurrentView("login")}
        onSwitchToForgot={() => setCurrentView("forgot")}
      />
      <ForgotPassword
        isOpen={currentView === "forgot"}
        onClose={handleClose}
        onSwitchToSignUp={() => setCurrentView("signup")}
        onSwitchToLogin={() => setCurrentView("login")}
      />
    </>
  );
};

export default AuthDialog;