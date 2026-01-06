import apiKey from "../../service/api";

const products=[];
fetch(`${apiKey}/products/get`)
.then(response=>response.json())
.then(data=>{
  products.push(...data)
  // console.log(data)
})
export default products;