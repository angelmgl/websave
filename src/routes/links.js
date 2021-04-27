const express = require("express");
const router = express.Router();

const db = require("../database");

// get the form to create a new link
router.get("/add", (req, res) => {
    res.render("links/add");
});

// post the data to create a new link
router.post("/add", async (req, res) => {
    const { title, url, description } = req.body;
    const newLink = {
        title,
        url,
        description,
    };

    try {
        await db.query("INSER INTO links set ?", [newLink]);
        res.redirect("/links");
    } catch (error) {
        console.log(error);
    }
});

// get all links from the database
router.get("/", async (req, res) => {
    try {
        const links = await db.query("SELECT * FROM links");
        res.render("links/list", { links });
    } catch (error) {
        console.log(error);
    }
});

// delete a specific link from the database
router.get("/delete/:id", async (req, res) => {
    const { id } = req.params;

    try {
        await db.query("DELETE FROM links WHERE ID = ?", [id]);
        res.redirect("/links");
    } catch (error) {
        console.log(error);
    }
});

// render a form to modify data from a link
router.get("/edit/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const link = await db.query("SELECT * FROM links WHERE ID = ?", [id]);
        res.render("links/edit", { link: link[0] });
    } catch (error) {
        console.log(error);
    }
});

// save the changes on the link
router.post("/edit/:id", async (req, res) => {
    const { id } = req.params;
    const { title, description, url } = req.body;
    const newLink = {
        title,
        description,
        url,
    };

    try {
        await db.query("UPDATE links set ? WHERE id = ?", [newLink, id]);
        res.redirect("/links");
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
