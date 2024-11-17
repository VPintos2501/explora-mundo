import React, { useState } from 'react';
import '../css/PasswordToggle.css'; // Archivo CSS para estilos

const PasswordToggle = ({ placeholder = "Enter your password", onChange }) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  
    const togglePasswordVisibility = () => {
      setIsPasswordVisible((prevState) => !prevState);
    };
  
    return (
      <div className="password-toggle">
        <input
          type={isPasswordVisible ? "text" : "password"}
          placeholder={placeholder}
          className="password-input"
          onChange={onChange} // Pasar cambios al componente padre
        />
        <button
          type="button"
          className="toggle-button"
          onClick={togglePasswordVisibility}
        >
          {isPasswordVisible ? "👁️" : "🙈"}
        </button>
      </div>
    );
  };
  
  export default PasswordToggle;
