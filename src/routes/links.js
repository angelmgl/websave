const express = require("express");
const router = express.Router();

const db = require("../database");
const { isLoggedIn } = require("../lib/auth");

// get the form to create a new link
router.get("/add", isLoggedIn, (req, res) => {
    res.render("links/add");
});

// post the data to create a new link
router.post("/add", isLoggedIn, async (req, res) => {
    const { title, url, description } = req.body;
    const newLink = {
        title,
        url,
        description,
    };

    try {
        await db.query("INSER INTO links set ?", [newLink]);
        req.flash("success", "Link guardado con éxito!");
        res.redirect("/links");
    } catch (error) {
        console.log(error);
    }
});

// get all links from the database
router.get("/", isLoggedIn, async (req, res) => {
    try {
        const links = await db.query("SELECT * FROM links");
        res.render("links/list", { links });
    } catch (error) {
        console.log(error);
    }
});

// delete a specific link from the database
router.get("/delete/:id", isLoggedIn, async (req, res) => {
    const { id } = req.params;

    try {
        await db.query("DELETE FROM links WHERE ID = ?", [id]);
        req.flash("success", "Link eliminado con éxito!");
        res.redirect("/links");
    } catch (error) {
        console.log(error);
    }
});

// render a form to modify data from a link
router.get("/edit/:id", isLoggedIn, async (req, res) => {
    const { id } = req.params;

    try {
        const link = await db.query("SELECT * FROM links WHERE ID = ?", [id]);
        res.render("links/edit", { link: link[0] });
    } catch (error) {
        console.log(error);
    }
});

// save the changes on the link
router.post("/edit/:id", isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const { title, description, url } = req.body;
    const newLink = {
        title,
        description,
        url,
    };

    try {
        await db.query("UPDATE links set ? WHERE id = ?", [newLink, id]);
        req.flash("success", "Link actualizado con éxito!");
        res.redirect("/links");
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
