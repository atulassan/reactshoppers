import React, { useState } from "react";
import { toast } from "react-toastify";
var serialize = require("form-serialize");

const slt = {
  display: "none",
};

const PTypeVariation = (props) => {
  const { product, variations } = props;
  let variation_name = product.attributes[0].name;
  let [count, setCount] = useState(1);
  const [items, setItems] = useState([]);
  //let [variation_id, setVariation_id] = useState('variation_id');

  var vdata = variations.map((variation, idx) => {
    return <Item key={variation.id} variation={variation} />;
  });

  var increment = () => {
    setCount(parseInt(count) + 1);
  };
  var decrement = () => {
    if (parseInt(count) !== 1) {
      setCount(parseInt(count) - 1);
    }
  };

  // submit function
  let handleSubmit = async (e) => {
    e.preventDefault();
    var tocartform = document.querySelector("#tocart");
    var dataobjects = serialize(tocartform, { hash: true });
    var isAvailId = false;
    if (!dataobjects.hasOwnProperty("variation_id")) {
      toast.error("please Select Your Gewicht Package size");
    } else {
      var cartData = localStorage.getItem("cartData");
      //console.log(typeof(cartData));
      //return false;
      if (cartData !== null && cartData !== "undefined" && cartData !== undefined && cartData.length > 0) {
        cartData = JSON.parse(cartData);
        cartData.forEach((cart, key) => {
          if (cart.variation_id === dataobjects.variation_id) {
            isAvailId = true;
            cartData[key].quantity = parseInt(cartData[key].quantity);
            cartData[key].quantity += parseInt(dataobjects.quantity);
            console.log(cartData[key]);
          }
        });
        if (isAvailId) {
          setItems(cartData);
          localStorage.setItem("cartData", JSON.stringify(cartData));
          toast.success("Cart Item Update Successfully 1");
        } else {
          setItems(cartData);
          cartData.push(dataobjects);
          localStorage.setItem("cartData", JSON.stringify(cartData));
          toast.success("Cart Item Update Successfully 2");
        }
      } else {
        items.push(dataobjects);
        setItems(items);
        localStorage.setItem("cartData", JSON.stringify(items));
        toast.success("Cart Item Update Successfully 3");
      }
    }
    return false;
  };

  return (
    <div className="row">
      <div className="col-lg-12">
        <form id="tocart" method="post" onSubmit={handleSubmit}>
          <h3>{variation_name}</h3>
          <ul>{vdata}</ul>
          <div className="addcart mb-5">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <button
                  onClick={decrement}
                  className="btn btn-outline-primary js-btn-minus"
                  type="button"
                >
                  −
                </button>
              </div>
              <input
                type="text"
                className="form-control text-center"
                defaultValue={count}
                name="quantity"
                placeholder=""
                aria-label="Example text with button addon"
                aria-describedby="button-addon1"
              />
              <div className="input-group-append">
                <button
                  onClick={increment}
                  className="btn btn-outline-primary js-btn-plus"
                  type="button"
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <p>
            <input type="hidden" name="product_id" defaultValue={product.id} />
            <input
              type="submit"
              value="Add To Cart"
              name="submit"
              className="buy-now btn btn-sm btn-primary"
            />
          </p>
        </form>
      </div>
    </div>
  );
};

const Item = ({ variation }) => {
  return (
    <li className="variationPrnt">
      <label
        htmlFor={variation.attributes[0].option.toString()}
        className="variation"
        onClick={showvariationInfo}
      >
        <span className="">{variation.attributes[0].option.toString()}</span>
        <input
          type="radio"
          id={variation.attributes[0].option.toString()}
          name="variation_id"
          defaultValue={variation.id}
        />
      </label>
      <div className="variationInfo" style={slt}>
        <p>
          <strong className="text-primary h4">
            CHF {parseFloat(variation.price)}
          </strong>
        </p>
      </div>
    </li>
  );
};

function showvariationInfo() {
  //e.preventDefault();
  console.log("testing");
  var prnt = document.querySelector(".variationPrnt");
  var chldel = prnt.querySelector(".variationInfo");
  chldel.style.display = "block";
}

export default PTypeVariation;
