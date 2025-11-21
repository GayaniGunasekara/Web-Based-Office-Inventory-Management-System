import React from "react";
import "../assets/styles/Table.css";

export default function Table({ columns, data }) {
    return (
        <table className="custom-table">
            <thead>
                <tr>
                    {columns.map(col => <th key={col}>{col.charAt(0).toUpperCase() + col.slice(1)}</th>)}
                </tr>
            </thead>
            <tbody>
                {data.map((row, idx) => (
                    <tr key={idx}>
                        {columns.map(col => <td key={col}>{row[col]}</td>)}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
