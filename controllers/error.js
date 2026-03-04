const get404Page = (req, res, next) => {
    res.status(404).render("404", {
      doc_title: "Page Not Found",
    });
}
export default get404Page;