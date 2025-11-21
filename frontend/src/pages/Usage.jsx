import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsage } from "../redux/slices/usageSlice";
import axios from "axios";

export default function Usage() {
    const dispatch = useDispatch();
    const items = useSelector((state) => state.usage.items);
    const [form, setForm] = useState({ date: "", item: "", category: "", quantityUsed: 0 });

    useEffect(() => {
        dispatch(fetchUsage());
    }, [dispatch]);

    const handleAdd = async () => {
        await axios.post("http://localhost:5000/usage", form);
        dispatch(fetchUsage());
        setForm({ date: "", item: "", category: "", quantityUsed: 0 });
    };

    return (
        <div style={{ padding: 20 }}>
            <h1>Usage Log</h1>
            <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
            <input placeholder="Item Name" value={form.item} onChange={e => setForm({ ...form, item: e.target.value })} />
            <input placeholder="Category" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} />
            <input type="number" placeholder="Quantity Used" value={form.quantityUsed} onChange={e => setForm({ ...form, quantityUsed: Number(e.target.value) })} />
            <button onClick={handleAdd}>Add Usage</button>

            <table border={1} style={{ marginTop: 20 }}>
                <thead>
                    <tr>
                        <th>Date</th><th>Item</th><th>Category</th><th>Quantity Used</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(i => (
                        <tr key={i.id}>
                            <td>{i.date}</td><td>{i.item}</td><td>{i.category}</td><td>{i.quantityUsed}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
