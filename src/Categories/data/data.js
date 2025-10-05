
const products=[];
fetch("https://spring-server-0m1e.onrender.com/products/get")
.then(response=>response.json())
.then(data=>{
  products.push(...data)
  // console.log(data)
})
export default products;