const express = require("express");
const router = express.Router();
const gymMembers = require("../models/gymMembers");

router.get("/new", (req, res) => {
  res.render("articles/new", { member: new gymMembers() });
});

router.get("/:slug", async (req, res) => {
  const member = await gymMembers.findOne({ slug: req.params.slug });
  if (member === null) res.redirect("/");
  res.render("articles/show", { member: member });
});
router.get("/edit/:id", async (req, res) => {
  const member = await gymMembers.findById(req.params.id);
  console.log(member);
  if (member === null) res.redirect("/");
  res.render("articles/edit", { member: member });
});

router.post(
  "/",
  async (req, res, next) => {
    req.member = new gymMembers();
    next();
  },
  saveArticleAndRedirect("new")
);

router.put(
  "/:id",
  async (req, res, next) => {
    req.member = await gymMembers.findById(req.params.id);
    next();
  },
  saveArticleAndRedirect("edit")
);

router.delete("/:id", async (req, res) => {
  await gymMembers.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

function saveArticleAndRedirect(path) {
  return async (req, res) => {
    let member = req.member;
    member.name = req.body.name;
    member.lastName = req.body.lastName;
    member.contact = req.body.contact;

    try {
      member = await member.save();
      res.redirect(`/articles/${member.slug}`);
    } catch (err) {
      console.log(err);
      res.render(`articles/${path}`, { member: member });
    }
  };
}
module.exports = router;
