import React from "react";

type InputFieldProps = {
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const InputField = ({
  name,
  type,
  placeholder,
  value,
  onChange,
}: InputFieldProps) => (
  <input
    name={name}
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="auth-input"
  />
);