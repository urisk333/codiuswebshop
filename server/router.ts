import express from "express";
import controller from "./controllers/controller";

const router = express.Router();

router.get("/users", controller.getUsers);
router.get("/items", controller.getItems);

// Post for a manually populating the database with the data by using Postman

router.post("/users", controller.addUser);
router.post("/items", controller.addItem);

export default router;
