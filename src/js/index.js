require("@babel/polyfill");
import axios from "axios";
import Search from "./model/Search";

let search = new Search("pasta");
search.doSearch()
        .then(r => console.log(r));