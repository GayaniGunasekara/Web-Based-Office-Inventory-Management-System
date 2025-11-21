import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInventory } from "../redux/slices/inventorySlice";
import Card from "../components/Card";
import "../assets/styles/dashboard.css"; // page-specific CSS

export default function Dashboard() {
    const dispatch = useDispatch();
    const items = useSelector((state) => state.inventory.items);

    useEffect(() => {
        dispatch(fetchInventory());
    }, [dispatch]);

    const totalItems = items.length;
    const lowStock = items.filter((i) => i.initial + i.purchased - i.used < 5).length;

    return (
        <div className="container">
            <h1>Dashboard</h1>
            <div className="cards">
                <Card title="Total Items" value={totalItems} color="#e0f7fa" />
                <Card title="Low Stock Alerts" value={lowStock} color="#ffe0e0" />
            </div>
        </div>
    );
}
