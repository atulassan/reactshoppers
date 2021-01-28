import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
 
const wcapi = new WooCommerceRestApi({
    url: "https://zshop.dev/",
   	consumerKey: "ck_3d130cd0b8d6f3046edd788ff006122cd3fc1fdd",
   	consumerSecret: "cs_299b25bf2380edc21c6a73fd379001eda41fd2c0",
	  version: "wc/v3",
    queryStringAuth: true,
    Agent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36", 
    axiosConfig: { headers: {} },
});

//async function getWCApiAsync(endpoint, data = {}) {
    export const getWCApiAsync = async (endpoint, data = {}) => {
        try {
          let items = await wcapi.get(endpoint, data);
          let results = await items;
          return results.data;
        } catch (error) {
          console.log(error.response.data);
          return error.response.data;
        }
    };        
      
//async function postWCApiAsync(endpoint, data = {}) {
    export const postWCApiAsync = async (endpoint, data = {}) => {
        try {
          let items = await wcapi.post(endpoint, data);
          let results = await items;
          return results.data;
        } catch (error) {
          //console.log(error.response.data);
          return error.response.data;
        }
    };    
      
//async function putWCApiAsync(endpoint, data = {}) {
    export const putWCApiAsync = async (endpoint, data = {}) => {
        try {
          let items = await wcapi.post(endpoint, data);
          let results = await items;
          return results.data;
        } catch (error) {
          //console.log(error.response.data);
          return error.response.data;
        }
    };
      
//async function deleteWCApiAsync(endpoint, data = {}) {
    export const deleteWCApiAsync = async (endpoint, data = {}) => {
          try {
            let items = await wcapi.delete(endpoint, data);
            let results = await items;
            return results.data;
          } catch (error) {
            return error.response.data;
          }
    };
