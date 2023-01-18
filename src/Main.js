import React from 'react'
import { useRef, useEffect, useState } from 'react';
import axios from 'axios';
// import './Expense.css';
// import ExpenseTable from "./ExpenseTable";
const swapi = "https://swapi.dev/api/"

export default function StarWars() {
    axios.get(swapi)
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.log(error);
        });
}