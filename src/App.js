import "./App.css";
import 'bootstrap/dist/css/bootstrap.css';

import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import bakeryData from "./assets/bakery-data.json";
import BakeryItem from "./components/BakeryItem.js";


/* ####### DO NOT TOUCH -- this makes the image URLs work ####### */
bakeryData.forEach((item) => {
  item.image = process.env.PUBLIC_URL + "/" + item.image;
});
/* ############################################################## */


function increOne(count, idx) {
  return count.map((c, i) => (i == idx ? c + 1 : c));
}

function decreOne(count, idx) {
  return count.map((c, i) => (i == idx ? Math.max(c-1, 0) : c));
}

function toggle(arr, idx) {
  console.log(arr, idx, arr.map((val, i) => (i == idx ? !val : val)));
  return arr.map((val, i) => (i == idx ? !val : val));
}

function filterAndSortItems(filters, sortBy) {
  const filtered = bakeryData.filter(
    (item, i) => {
      return (
        filters.filter(
          (fOn, fi) => fOn && (i % filters.length == fi)
        ).length > 0
      );
    }
  )
  return sortBy == 0 ? filtered 
                     : filtered.sort((x, y) => x.price - y.price);
}


function twoDecimal(x) {
  return (Math.round(x * 100) / 100).toFixed(2);
}


function App() {
  // TODO: use useState to create a state variable to hold the state of the cart
  /* add your cart state code here */
  const ZERO_COUNT = new Array(bakeryData.length).fill(0);
  const [count, setCount] = useState(ZERO_COUNT);
  
  const FILTER_LABELS = ["Delicious!", "Toothsome!", "Luscious!"];
  const [filterStates, setFilterStates] = useState(new Array(FILTER_LABELS.length).fill(true))

  const SORTBY_LABELS = ["Popular", "Price"];
  const [sortByOption, setSortByOption] = useState(0);
  
  const [displayItems, setDisplayItems] = useState(bakeryData);


  // useEffect: filter and sort
  useEffect(() => {
    setDisplayItems(filterAndSortItems(filterStates, sortByOption));
  }, [filterStates, sortByOption]);


  return (
    <div className="App">
      <h1>Jamie's Bakery</h1>
      <div className="container">
        <div className="menu">
          {
            displayItems.map(
              (item, index) => ( // TODO: map bakeryData to BakeryItem components
                  <div className="item-wrapper">
                    <BakeryItem item={item} count={count[index]}></BakeryItem>
                    <button className="item-button-dec" onClick={() => setCount(decreOne(count, index))} >
                      <div className="icon-dec"><img src="icons/remove.svg"></img></div>
                    </button>
                    <button className="item-button-inc" onClick={() => setCount(increOne(count, index))} >
                      <div className="icon-inc"><img src="icons/add.svg"></img></div>
                    </button>
                  </div>
              )
            )
          }
        </div>

        <div className="side">

          <div className="side-group" id="cart">
            <div className="cart-title">
              <h2>Cart</h2>
              <Button className="clear-button" variant="danger" onClick={() => setCount(ZERO_COUNT)}>Clear</Button>{' '}
            </div>

            <ul className="cart-list">
            {/* : render a list of items in the cart */
              bakeryData.map(
                (item, index) => {
                  if (count[index])
                    return <li className="cart-item">
                      <span className="cart-item-name">{item.name}</span>
                      <span className="cart-item-count">x{count[index]}</span>
                    </li>
                }
              )
            }
            </ul>

            <p className="total">
              Total: $
              {
                twoDecimal(
                  bakeryData.map(
                    (item, index) => item.price * count[index]
                  ).reduce((pSum, a) => pSum + a, 0)  
                )
              }
            </p>
          </div>


          <div className="side-group" id="sort">
            <h2>Sort By</h2>

            <div key="sortby-radio" className="mb-3">
            {
              SORTBY_LABELS.map(
                (label, index) => (
                  <Form.Check
                  type="radio"
                  name="sortby-option"
                  id={index}
                  label={label}
                  defaultChecked={index == 0}
                  onClick={ () => {setSortByOption(index);} }
                  />
                )
              )
            }
            </div>

          </div>


          <div className="side-group" id="filter">
            <h2>Tastes...</h2>

            <div key="filter-checkbox" className="mb-3"> 
            {
              FILTER_LABELS.map(
                (label, index) => (
                  <Form.Check
                  type="checkbox"
                  name="checkbox-option"
                  id={index}
                  label={label}
                  defaultChecked={true}
                  onClick={ () => {setFilterStates(toggle(filterStates, index));} }
                  />
                )
              )
            }
            </div>
          </div>

        </div>
      </div>




    </div>
  );
}

export default App;
