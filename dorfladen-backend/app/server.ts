import * as express from "express";
import * as cors from "cors";
import * as path from "path";
import * as bodyParser from "body-parser";
import * as expressSession from "express-session";
import * as fs from "fs";
import {Checkout, Product} from "./types";

const app = express();
app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true,
}));
app.use(bodyParser.json());
app.use(expressSession({
    secret: "super-safe-secret", // used to create session IDs
    resave: false, // do not save already saved values during each request
    saveUninitialized: true, // forces an uninitialized session to be stored
    cookie: {
        httpOnly: false,
    },
}));

let products: Array<Product> = new Array<Product>();

function loadProducts() {
    products = JSON.parse(fs.readFileSync(path.join(__dirname, '/assets/products/products.json'), 'utf8'));
}

/* Product Api */
app.get("/api/products", (req, res) => {
    loadProducts();
    res.json(products);
});

app.get("/api/product/:id", (req, res) => {
    loadProducts();
    res.json(products.filter(p => p.id == req.params.id).pop());
});

/* Shopping Cart Api */
app.get("/api/shopping-cart", (req, res) => {
    if (req.session.cart == undefined) {
        req.session.cart = <Product[]>[];
    }

    res.json(req.session.cart);
});

app.post("/api/shopping-cart", (req, res) => {
    if (req.session.cart == undefined) {
        req.session.cart = <Product[]>[];
    }
    req.session.cart = <Product[]>[
        ...req.session.cart,
        <Product>req.body
    ];

    res.sendStatus(200);
});

app.put("/api/shopping-cart/delete", (req, res) => {
    if (req.session.cart == undefined) {
        req.session.cart = <Product[]>[];
    }
    req.session.cart.splice(req.session.cart.findIndex(p => p.id == <Product>req.body.id), 1);

    res.sendStatus(200);
});

app.put("/api/shopping-cart/checkout", (req, res) => {
    if (!(<Checkout>req.body).firstname.match(/^[a-zA-z]*$/)) {
        res.sendStatus(400);
        return;
    }
    if (!(<Checkout>req.body).lastname.match(/^[a-zA-z]*$/)) {
        res.sendStatus(400);
        return;
    }
    if (!(<Checkout>req.body).email.match(/[^@]+@[^\.]+\..+/)) {
        res.sendStatus(400);
        return;
    }

    req.session.cart = <Product[]>[];
    res.sendStatus(200);
});

/* libs & assets */
app.use("/assets", express.static(path.join(__dirname, "/assets")));

app.listen(8080, () => console.log("server is listening"));
