
const products=[];
fetch("https://spring-java-server.onrender.com/products/get")
.then(response=>response.json())
.then(data=>{
  products.push(...data)
  console.log(data)
})
export default products;