const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();
app.use(cors());
app.use(express.json());

const DATA_FILE = "./data.json";

const readData = () => JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
const writeData = (data) => fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

const getEntity = (entity) => (req, res) => {
    const data = readData();
    res.json(data[entity]);
};

const addEntity = (entity) => (req, res) => {
    const data = readData();
    data[entity].push({ id: Date.now().toString(), ...req.body });
    writeData(data);
    res.json({ message: "Added successfully" });
};

const updateEntity = (entity) => (req, res) => {
    const data = readData();
    const index = data[entity].findIndex((i) => i.id === req.params.id);
    if (index !== -1) {
        data[entity][index] = { id: req.params.id, ...req.body };
        writeData(data);
        res.json({ message: "Updated successfully" });
    } else res.status(404).json({ message: "Not found" });
};

const deleteEntity = (entity) => (req, res) => {
    const data = readData();
    data[entity] = data[entity].filter((i) => i.id !== req.params.id);
    writeData(data);
    res.json({ message: "Deleted successfully" });
};

// Inventory Routes
app.get("/inventory", getEntity("inventory"));
app.post("/inventory", addEntity("inventory"));
app.put("/inventory/:id", updateEntity("inventory"));
app.delete("/inventory/:id", deleteEntity("inventory"));

// Purchase Routes
app.get("/purchases", getEntity("purchases"));
app.post("/purchases", addEntity("purchases"));

// Usage Routes
app.get("/usage", getEntity("usage"));
app.post("/usage", addEntity("usage"));

app.listen(5000, () => console.log("Backend running on port 5000"));
