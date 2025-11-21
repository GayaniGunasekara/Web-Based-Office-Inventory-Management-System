import React from "react";
import "../assets/styles/InputField.css";

export default function InputField({ label, type = "text", value, onChange }) {
    return (
        <div className="input-group">
            {label && <label>{label}</label>}
            <input type={type} value={value} onChange={onChange} />
        </div>
    );
}
