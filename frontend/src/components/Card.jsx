import React from "react";
import "../assets/styles/Card.css";  // correct relative path

export default function Card({ title, value, color }) {
    return (
        <div className="card" style={{ backgroundColor: color || "#f0f0f0" }}>
            <h3>{title}</h3>
            <p>{value}</p>
        </div>
    );
}
