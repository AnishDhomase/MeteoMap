import { Button } from "@mui/material";
import { useState } from "react";
import "./Authorization.css";
import { useAppSettings } from "../context/SettingsContext";
import TooltipIcon from "../components/utils/tooltipIcon/TooltipIcon";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function Authorization() {
  const [page, setPage] = useState("login");
  const [successfullAuthorization, setSuccessfullAuthorization] =
    useState(false);
  const navigate = useNavigate();
  const {
    tempUnit,
    theme,
    setTempUnit,
    setTheme,
    isAuthorized,
    setIsAuthorized,
  } = useAppSettings();

  const [formDetails, setFormDetails] = useState({
    name: "",
    email: "",
    password: "",
  });
  function handleSubmit(ev) {
    ev.preventDefault();
    if (!formDetails.name || !formDetails.email || !formDetails.password) {
      toast.error("Make sure to fill all fields!");
      return;
    }
    const details = JSON.parse(localStorage.getItem("userDetails")); //array of accounts
    const AccDetails = details?.find(
      (account, ind) => account.name === formDetails.name
    );
    if (page === "login") {
      if (!AccDetails) {
        toast.error("No Such Account Found! Try Sign Up!");
        return;
      } else {
        if (AccDetails.email !== formDetails.email) {
          toast.error("Wrong Email ID!");
          return;
        }
        if (AccDetails.password !== formDetails.password) {
          toast.error("Wrong Password!");
          return;
        }
      }
    } else if (AccDetails) {
      toast.error("Found Account With Same Username! Try Login!");
      return;
    }

    // Success
    // Signup
    if (page === "signup") {
      const newAccArray = JSON.stringify([...details, formDetails]);
      localStorage.setItem("userDetails", newAccArray);
    }
    setFormDetails({
      name: "",
      email: "",
      password: "",
    });
    setIsAuthorized(formDetails);
    setSuccessfullAuthorization(true);
    setTimeout(function () {
      navigate("/");
    }, 2000);
  }
  return (
    <div className="AuthorizationformWrapper">
      <span className="AuthorizationMode">
        <div className="toogleBox">
          <div className="mode">
            <TooltipIcon
              title="Light Mode"
              onBtnClick={() => setTheme("light")}
              active={theme === "light"}
            >
              <LightModeIcon
                sx={theme === "light" ? { color: "#ffa952" } : {}}
              />
            </TooltipIcon>
            <TooltipIcon
              title="Dark Mode"
              onBtnClick={() => setTheme("dark")}
              active={theme === "dark"}
            >
              <DarkModeIcon sx={theme === "dark" ? { color: "#27296d" } : {}} />
            </TooltipIcon>
          </div>
        </div>
      </span>
      <span className="backBtn" onClick={() => navigate("/")}>
        <TooltipIcon title="Back To Main Page" active={true}>
          <ArrowBackIcon />
        </TooltipIcon>
      </span>
      <AnimatePresence mode="popLayout">
        {!successfullAuthorization && (
          <motion.form
            className="Authorizationform"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 1, ease: "backInOut" }}
          >
            <input
              type="text"
              placeholder="Name"
              value={formDetails.name}
              onChange={(ev) =>
                setFormDetails({ ...formDetails, name: ev.target.value })
              }
            />

            <input
              type="email"
              placeholder="Email"
              value={formDetails.email}
              onChange={(ev) =>
                setFormDetails({ ...formDetails, email: ev.target.value })
              }
            />
            <input
              type="password"
              placeholder="Password"
              minLength={8}
              required
              value={formDetails.password}
              onChange={(ev) =>
                setFormDetails({ ...formDetails, password: ev.target.value })
              }
            />
            <Button
              variant="contained"
              sx={{ mt: "25px" }}
              onClick={handleSubmit}
            >
              {page === "login" ? "Login" : "Sign up"}
            </Button>
            <footer>
              <span>
                {page === "login"
                  ? "Don't Have An Account?"
                  : "Already Have An Account?"}
              </span>
              <span
                className="loginSignupTxtBtn"
                onClick={() => setPage(page === "login" ? "signup" : "login")}
              >
                {page === "login" ? "Sign up" : "Login"}
              </span>
            </footer>
          </motion.form>
        )}
        {successfullAuthorization && (
          <motion.h1
            className="welcome"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 1, ease: "backInOut" }}
          >
            Welcome, {isAuthorized.name}!
          </motion.h1>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Authorization;
