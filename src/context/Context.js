import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'

export const Context = createContext()

export const ContextBody = ({ children }) => {
    const [category, setCategory] = useState([])
    const [items, setItems] = useState([])
    const [render, setRender] = useState(false)
    const [alert, setAlert] = useState('none');

    const getCategory = () => {
        axios
        .get(`http://localhost:8000/api/category`)
        .then(res => {
          setCategory(res.data.response);
        })
        .catch(err => console.log(err));
    }

    const getItems = () => {
        axios
        .get(`http://localhost:8000/api/item`)
        .then(res => {
            console.log(res.data)
          setItems(res.data);
        })
        .catch(err => console.log(err));
    }

    useEffect(() => {
        getItems();
        getCategory();
    }, []);

    return (
        <Context.Provider
            value={{
                setCategory,
                setItems,
                setRender,
                setAlert,
                category,
                items,
                render,
                alert
            }}
        >
            {children}
        </Context.Provider>
    )
}