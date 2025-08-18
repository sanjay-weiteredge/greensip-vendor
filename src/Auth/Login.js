import React, { useState } from "react";
import logo from "./logo.svg";
import { useNavigate } from "react-router-dom";
import { loginRestaurant, getRestaurantProfile } from "../services/authApi";
import { useUser } from "../components/store";

const Login = () => {
  const navigate = useNavigate();
  const { updateUser } = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e?.preventDefault?.();
    setError("");
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      setLoading(true);
      const data = await loginRestaurant(email, password);
      if (data?.success && data?.token) {
        localStorage.setItem("userToken", data.token);
        try {
          const profile = await getRestaurantProfile();
          if (profile?.success && profile?.restaurant) {
            updateUser(profile.restaurant);
          } else {
            updateUser(null);
          }
        } catch (_) {
          updateUser(null);
        }
        navigate("/", { replace: true });
      } else {
        setError(data?.message || "Invalid credentials");
      }
    } catch (err) {
      setError(String(err).replace(/^Error:\s*/, ""));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.login}>
        <img src={logo} alt="Logo" style={styles.logo}/>
        <form style={styles.input} onSubmit={handleLogin}>
          <h1 style={styles.label}>Enter Email Address</h1>
          <div style={styles.inputWrapper}>
            <span style={styles.inputIcon}>📧</span>
            <input
              type="email"
              placeholder="Enter Email Address"
              style={styles.inputField}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
              required
            />
          </div>
          <h1 style={styles.label}>Enter Password</h1>
          <div style={styles.inputWrapper}>
            <span style={styles.inputIcon}>🔒</span>
            <input
              type={showPassword ? "text" : "password"} // 👈 Toggle here
              placeholder="Enter Password"
              style={styles.inputField}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
            {/* 👁️ Icon to toggle password */}
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{ cursor: "pointer", fontSize: "1.1rem", color: "#64748b" }}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          {error ? <div style={styles.errorText}>{error}</div> : null}
          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  )
    
};

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative"
  },
  login: {
    width: "370px",
    margin: "auto",
    padding: "48px 32px 32px 32px",
    background: "#fff",
    borderRadius: "18px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    border: "1.5px solid #e5e7eb",
    zIndex: 1
  },
  logo: {
    width: "90px",
    marginBottom: "28px",
    borderRadius: "50%",
  },
  input: {
    width: "100%",
    marginBottom: "18px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  label: {
    fontSize: "1.08rem",
    margin: "10px 0 6px 0",
    color: "#22223b",
    fontWeight: 600,
    alignSelf: "flex-start"
  },
  inputWrapper: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    background: "#f3f4f6",
    borderRadius: "7px",
    border: "1px solid #e5e7eb",
    marginBottom: "14px",
    padding: "0 10px"
  },
  inputIcon: {
    fontSize: "1.1rem",
    color: "#64748b",
    marginRight: "8px"
  },
  inputField: {
    flex: 1,
    padding: "11px 8px",
    border: "none",
    borderRadius: "7px",
    fontSize: "1rem",
    outline: "none",
    background: "transparent",
    transition: "box-shadow 0.2s, border 0.2s"
  },
  button: {
    width: "100%",
    padding: "13px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "7px",
    fontSize: "1.13rem",
    fontWeight: 700,
    cursor: "pointer",
    marginTop: "8px",
    marginBottom: "8px",
    boxShadow: "0 2px 8px rgba(37,99,235,0.08)",
    transition: "background 0.2s, transform 0.2s"
  },
  errorText: {
    width: "100%",
    color: "#b91c1c",
    background: "#fee2e2",
    border: "1px solid #fecaca",
    borderRadius: "6px",
    padding: "8px 10px",
    fontSize: "0.95rem",
    marginTop: "6px",
    marginBottom: "6px",
  },

  
};

export default Login;

