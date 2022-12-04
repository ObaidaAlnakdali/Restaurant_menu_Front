import React, { useState, useContext, useEffect } from "react";
import { Context } from '../context/Context' ;
import Header from "../components/Header";
import './style.css';

function Home() {
    const { category, items } = useContext(Context)
    const [itemsActive, setItemsActive] = useState([])

    // active style selected category
    const btns = document.getElementsByClassName("btn")
    for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener('click', function(){
            const corrent = document.getElementsByClassName("active")
            corrent[0].className = corrent[0].className.replace(" active")
            this.className += " active"
        }) 
    }

    const selectedCaategory = (category, i) => {
        setItemsActive(category.items)
    }

    useEffect(() => {
        setItemsActive(items)
    }, [items]);

  return (
    <div className="Home_page">
        <Header text="Menu List" />
        <div className="categories">
              <ul id="category-menu">
                  <li>
                      <a className="btn active" onClick={() => setItemsActive(items)}>
                          <span>All</span>
                          <img src="http://localhost:8000/images/platte.png" />
                      </a>
                  </li>
                  {
                      category.map((category, i) => {
                          return (
                              <li key={i}>
                                  <a className="btn" onClick={() => selectedCaategory(category, i)}>
                                      <span>{category.title}</span>
                                      <img src={"http://localhost:8000/images/" + category.icon} />
                                  </a>
                              </li>
                          )
                    })
                }
            </ul>
        </div>
        <div className="items">
            {
                itemsActive.filter(i => i.active === true).map((item, i) => {
                    return(
                        <div className="card" key={i}>
                            <img src={"http://localhost:8000/images/" + item.image} />
                            <div className="content">
                                <div>
                                    <p className="title">{item.title}</p>
                                    <p className="price">${item.price}</p>
                                </div>
                                <p className="description">{item.description}</p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    </div>
  );
}

export default Home;