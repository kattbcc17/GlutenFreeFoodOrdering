import express from "express";
import cors from "cors";
import { sample_foods, sample_tags } from "./data";

const app = express();
app.use(cors({
    credentials: true,
    origin: ["http://localhost:4200"]  // Allowing requests from Angular frontend
}));


app.get("/api/foods", (req, res) => {
    res.send(sample_foods);
});

//get food search filter
app.get("/api/foods/search/:searchTerm",(req, res) =>{
    const searchTerm = req.params.searchTerm; 
    const foods = sample_foods.filter(food => food.name.toLowerCase().includes
    (searchTerm.toLowerCase()));
    res.send(foods);
})

// get food by tags
app.get("/api/foods/tags/", (req, res) => {
    res.send(sample_tags)
})

// get food by special tags
app.get("/api/foods/tag/:tagName", (req, res) => {
    const tagName = req.params.tagName;
    const foods = sample_foods.filter(food => food.tags?.includes(tagName));
    res.send(foods)
})

// get food by ID
app.get("/api/foods/:foodId", (req, res) => {
    const foodId = req.params.foodId;
    const food = sample_foods.find(food => food.id == foodId)
    res.send(food)
})

const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost: ${port}`);
});