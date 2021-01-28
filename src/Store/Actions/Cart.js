import {
  LISTCART,
  ADDTOCART,
  REMOVECART,
  } from "./ActionTypes";
  
  const cartData = JSON.parse( localStorage.getItem("cartData") || "[]" );

  export const cart = () => (dispatch) => {
    
    console.log('iniial data', cartData);

    dispatch({
      type: LISTCART,
      payload: { cartData: cartData.length > 0 ? 123 : [] }
    });    
    
    return Promise.resolve();

  };
  
  export const addToCart = (product_id, quantity, status)  => (dispatch) => {
    
      console.log('cart info', product_id, quantity, status);

      if(cartData.length > 0) {
        let availId = cartData.filter(crtn => parseInt(crtn.product_id) === parseInt(product_id));
        console.log('Available ID', availId);
        if(availId.length > 0) {
          //Updated
          cartData.forEach((crt, key) => {
            if(availId[0].product_id === crt.product_id) {
              cartData[key].quantity = parseInt(cartData[key].quantity);
              if(status) {
                console.log("plus++++++++++++++++++++");
                cartData[key].quantity += parseInt(quantity);
              } else {
                console.log("minus++++++++++++++++++++");
                cartData[key].quantity -= parseInt(quantity);
              }
              console.log("Updated", cartData);
              localStorage.setItem("cartData", JSON.stringify(cartData));
            }
          });
        } else {
          //Inserted
          console.log("Inserted", cartData);
          cartData.push({product_id: product_id, quantity: quantity});
          localStorage.setItem("cartData", JSON.stringify(cartData));
        }
      } else {
        //Inserted
        console.log("Inserted", cartData);
        cartData.push({product_id: product_id, quantity: quantity});
        localStorage.setItem("cartData", JSON.stringify(cartData));
      }

      dispatch({
        type: ADDTOCART,
        payload: { cartData: cartData.length > 0 ? cartData : [] }
      });

    return Promise.resolve();

  };

  export const removeCart = (product_id) => (dispatch) => {
    console.log(product_id);
    let fltCart = [];
    if(cartData.length > 0) {
      fltCart = cartData.filter(cart => parseInt(cart.product_id) !== parseInt(product_id));
      localStorage.setItem("cartData", JSON.stringify(fltCart));
    }
    dispatch({
      type: REMOVECART,
      payload: { cartData: fltCart.length > 0 ? fltCart : [] }
    });
    
    return Promise.resolve();

  };
