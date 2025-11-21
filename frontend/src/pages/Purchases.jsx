import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPurchases } from "../redux/slices/purchaseSlice";
import axios from "axios";

import InputField from "../components/InputField";
import Table from "../components/Table";
import "../assets/styles/purchases.css";

export default function Purchases() {
    const dispatch = useDispatch();
    const items = useSelector(state => state.purchases.items);
    const [form, setForm] = useState({ date: "", item: "", category: "", quantity: 0 });

    useEffect(() => { dispatch(fetchPurchases()); }, [dispatch]);

    const handleAdd = async () => {
        await axios.post("http://localhost:5000/purchases", form);
        dispatch(fetchPurchases());
        setForm({ date: "", item: "", category: "", quantity: 0 });
    };

    return (
        <div className="container">
            <h1>Purchase Log</h1>
            <div className="form">
                <InputField label="Date" type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
                <InputField label="Item Name" value={form.item} onChange={e => setForm({ ...form, item: e.target.value })} />
                <InputField label="Category" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} />
                <InputField label="Quantity" type="number" value={form.quantity} onChange={e => setForm({ ...form, quantity: Number(e.target.value) })} />
                <button onClick={handleAdd}>Add Purchase</button>
            </div>

            <Table columns={["date", "item", "category", "quantity"]} data={items} />
        </div>
    );
}
