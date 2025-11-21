import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInventory } from "../redux/slices/inventorySlice";
import axios from "axios";

import InputField from "../components/InputField";
import Table from "../components/Table";
import "../assets/styles/inventory.css";

export default function Inventory() {
    const dispatch = useDispatch();
    const items = useSelector(state => state.inventory.items);
    const [form, setForm] = useState({ name: "", category: "", initial: 0 });

    useEffect(() => { dispatch(fetchInventory()); }, [dispatch]);

    const handleAdd = async () => {
        await axios.post("http://localhost:5000/inventory", form);
        dispatch(fetchInventory());
        setForm({ name: "", category: "", initial: 0 });
    };

    const columns = ["name", "category", "initial", "purchased", "used"];
    const data = items.map(i => ({ ...i, currentStock: i.initial + i.purchased - i.used }));

    return (
        <div className="container">
            <h1>Inventory</h1>
            <div className="form">
                <InputField label="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                <InputField label="Category" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} />
                <InputField label="Initial" type="number" value={form.initial} onChange={e => setForm({ ...form, initial: Number(e.target.value) })} />
                <button onClick={handleAdd}>Add</button>
            </div>

            <Table columns={[...columns, "currentStock"]} data={data} />
        </div>
    );
}
