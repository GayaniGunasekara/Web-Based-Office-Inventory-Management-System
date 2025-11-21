import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInventory } from "../redux/slices/inventorySlice";
import axios from "axios";

import { Table, TableHead, TableBody, TableRow, TableCell, Paper, Container } from "@mui/material";
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

    return (
        <div style={{ padding: 20 }}>
            <h1>Inventory</h1>
            <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            <input placeholder="Category" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} />
            <input type="number" placeholder="Initial" value={form.initial} onChange={e => setForm({ ...form, initial: Number(e.target.value) })} />
            <button onClick={handleAdd}>Add</button>


            <Container sx={{ mt: 4 }}>
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Category</TableCell>
                                <TableCell>Initial</TableCell>
                                <TableCell>Purchased</TableCell>
                                <TableCell>Used</TableCell>
                                <TableCell>Current Stock</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map((i) => (
                                <TableRow key={i.id}>
                                    <TableCell>{i.name}</TableCell>
                                    <TableCell>{i.category}</TableCell>
                                    <TableCell>{i.initial}</TableCell>
                                    <TableCell>{i.purchased}</TableCell>
                                    <TableCell>{i.used}</TableCell>
                                    <TableCell>{i.initial + i.purchased - i.used}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </Container>

        </div>
    );
}
