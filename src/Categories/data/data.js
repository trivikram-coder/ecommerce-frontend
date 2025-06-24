
const products=[];
fetch("http://localhost:9000/products/get")
.then(response=>response.json())
.then(data=>{
  products.push(...data)
  console.log(data)
})
export default products;