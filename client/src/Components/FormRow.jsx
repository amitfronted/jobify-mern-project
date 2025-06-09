import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const FormRow = ({ type, name, labelText, defaultValue, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        type={isPassword && showPassword ? 'text' : type}
        id={name}
        name={name}
        className="form-input"
        defaultValue={defaultValue || ''}
        onChange={onChange}
        required
      />
      {isPassword && (
        <span
          onClick={() => setShowPassword(!showPassword)}
          style={{
            position: 'absolute',
            top: '75%',
            right: '1rem',
            transform: 'translateY(-50%)',
            cursor: 'pointer',
            color: '#555',
          }}
        >
          {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
        </span>
      )}
    </div>
  );
};

export default FormRow;
