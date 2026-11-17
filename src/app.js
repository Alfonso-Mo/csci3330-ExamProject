import express from 'express'
import session from "express-session";

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "src/views");
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: "trucking-project-local-secret",
    resave: false,
    saveUninitialized: false,
}));


export default app;