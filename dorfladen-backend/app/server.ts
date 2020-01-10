import * as express from "express";
import * as cors from "cors";
import * as path from "path";
import * as bodyParser from "body-parser";
import * as expressSession from "express-session";
import * as fs from "fs";
import {Hero, Product} from "./types";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(expressSession({
    secret: "super-safe-secret", // used to create session IDs
    resave: false, // do not save already saved values during each request
    saveUninitialized: true // forces an uninitialized session to be stored
}));

let products: Array<Product> = new Array<Product>();

function loadProducts() {
    products = JSON.parse(fs.readFileSync(path.join(__dirname, '/assets/products/products.json'), 'utf8'));
}

app.get("/api/products", (req, res) => {
    loadProducts();
    res.json(products);
});

app.get("/api/product/:id", (req, res) => {
    loadProducts();
    res.json(products.filter(p => p.id == parseInt(req.params.id)).pop());
});

/* api */
app.get("/api/heroes", (req, res) => {
    if(req.session.heroes == undefined) {
        req.session.heroes = <Hero[]>[];
    }

    res.json(req.session.heroes);
});
app.post("/api/heroes", (req, res) => {
    req.session.heroes = <Hero[]>[
        ...req.session.heroes,
        <Hero>req.body
    ];

    res.sendStatus(200);
})

/* libs & assets */
app.use("/assets", express.static(path.join(__dirname, "/assets")));
app.use("/spectre", express.static(path.join(__dirname, "..", "/node_modules/spectre.css/dist")));

app.listen(8080, () => console.log("listening"));
