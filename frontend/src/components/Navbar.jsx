import { AppBar, Toolbar, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <AppBar position="static">
            <Toolbar>
                <Button color="inherit" component={Link} to="/">Dashboard</Button>
                <Button color="inherit" component={Link} to="/inventory">Inventory</Button>
                <Button color="inherit" component={Link} to="/purchases">Purchases</Button>
                <Button color="inherit" component={Link} to="/usage">Usage</Button>
            </Toolbar>
        </AppBar>
    );
}
