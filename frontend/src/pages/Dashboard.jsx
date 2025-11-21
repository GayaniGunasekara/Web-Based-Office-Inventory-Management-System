/*import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInventory } from "../redux/slices/inventorySlice";

export default function Dashboard() {
    const dispatch = useDispatch();
    const items = useSelector((state) => state.inventory.items);

    useEffect(() => { dispatch(fetchInventory()); }, [dispatch]);

    const totalItems = items.length;
    const lowStock = items.filter(i => (i.initial + i.purchased - i.used) < 5).length;

    return (
        <div style={{ padding: 20 }}>
            <h1>Dashboard</h1>
            <p>Total Items: {totalItems}</p>
            <p>Low Stock Alerts: {lowStock}</p>
        </div>
    );
}
*/
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInventory } from "../redux/slices/inventorySlice";
import { Container, Typography, Grid, Card, CardContent } from "@mui/material";

export default function Dashboard() {
    const dispatch = useDispatch();
    const items = useSelector((state) => state.inventory.items);

    useEffect(() => {
        dispatch(fetchInventory());
    }, [dispatch]);

    const totalItems = items.length;
    const lowStock = items.filter((i) => i.initial + i.purchased - i.used < 5).length;

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Dashboard
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <Card sx={{ bgcolor: "#f0f0f0" }}>
                        <CardContent>
                            <Typography variant="h6">Total Items</Typography>
                            <Typography variant="h4">{totalItems}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Card sx={{ bgcolor: "#ffe0e0" }}>
                        <CardContent>
                            <Typography variant="h6">Low Stock Alerts</Typography>
                            <Typography variant="h4">{lowStock}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
}
