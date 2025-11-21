import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsage } from "../redux/slices/usageSlice";
import axios from "axios";

import InputField from "../components/InputField";
import Table from "../components/Table";
import "../assets/styles/usage.css";

export default function Usage() {
    const dispatch = useDispatch();
    const items = useSelector(state => state.usage.items);
    const [form, setForm] = useState({ date: "", item: "", category: "", quantityUsed: 0 });

    useEffect(() => { dispatch(fetchUsage()); }, [dispatch]);

    const handleAdd = async () => {
        await axios.post("http://localhost:5000/usage", form);
        dispatch(fetchUsage());
        setForm({ date: "", item: "", category: "", quantityUsed: 0 });
    };

    return (
        <div className="container">
            <h1>Usage Log</h1>
            <div className="form">
                <InputField label="Date" type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
                <InputField label="Item Name" value={form.item} onChange={e => setForm({ ...form, item: e.target.value })} />
                <InputField label="Category" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} />
                <InputField label="Quantity Used" type="number" value={form.quantityUsed} onChange={e => setForm({ ...form, quantityUsed: Number(e.target.value) })} />
                <button onClick={handleAdd}>Add Usage</button>
            </div>

            <Table columns={["date", "item", "category", "quantityUsed"]} data={items} />
        </div>
    );
}
