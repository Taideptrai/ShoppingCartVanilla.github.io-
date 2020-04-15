window.onload = function() {
  var cart = document.getElementsByClassName("add-to-cart")
  var cartarr = [...cart]
  var dataset = [];
  var total;
  cartarr.map(item=>{addEventToButton(item)})
  function addEventToButton(item,callback){
      event.preventDefault();
      item.addEventListener("click", function(){
      var datasetName = item.dataset.name;
      var datasetPrice = item.dataset.price;
      console.log(datasetName,datasetPrice)
      dataset.push({name:datasetName,price: datasetPrice})    
      
      callback();
      function callback(){
      dataset = handleUpdateDataset()
      clearCart()
      AddItemToCart()
      
      }
    });
  }
  function AddItemToCart(){ //create product arr and add to cart
    
    printoutput(dataset)
    
    HandleMinusButton(dataset)
    
    HandlePlusButton(dataset)
    
    updataCartquantity(dataset)
    
    ButtonXtoClearItemInCart()
    
    UpdateTotal()
  }
  
  function printoutput(arr){
   
   var output = "";
   for(var i in arr) {
      output += "<tr>"
        + "<td>" + arr[i].name + "</td>" 
        + "<td>(" + arr[i].price + ")</td>"
        + "<td><div class='input-group'><button class='minus-item input-group-addon btn btn-primary' data-name=" + arr[i].name + ">-</button>"
        + "<input type='number' class='item-count form-control' data-name='" + arr[i].name + "' value='" + arr[i].count + "'>"
        + "<button class='plus-item btn btn-primary input-group-addon' data-name=" + arr[i].name + ">+</button></div></td>"
        + "<td><button class='delete-item btn btn-danger' data-name=" + arr[i].name + ">X</button></td>"
        +  "</tr>";
        
    }
    var cart = document.getElementsByClassName("show-cart")[0]
    
    cart.innerHTML = output //add to cart
     
   
  }
   
  function clearCart(){
      var clearCart = document.getElementsByClassName("clear-cart")[0]  //clear Card and add card again
       clearCart.addEventListener("click", function(){
       dataset.length = 0
       updataCartquantity([])
       printoutput([])
       UpdateTotal()
   })
  }
  
  
  
  function HandleMinusButton(product){ 
    
  var minus = document.getElementsByClassName("minus-item");
  var minusItem = [...minus]
  minusItem.map(item=>{addEventToMinusButton(item)})
  
  function addEventToMinusButton(item){
      item.addEventListener("click", function(callback){
      var name = item.dataset.name;
      product.map(itemProduct=>{
        if (itemProduct.name == name ){
          itemProduct.count--
          if (itemProduct.count == 0){
            product.splice(product.indexOf(itemProduct),1)
            
           }
        }
      })
       callback()
        function callback(){
          printoutput(product)
          HandlePlusButton(product)
          HandleMinusButton(product)
          dataset = product
          updataCartquantity(product)
          ButtonXtoClearItemInCart()
          UpdateTotal()
        }
          
       
    })
  }
    
  }
  
  function HandlePlusButton(product){ 
    
  var plus = document.getElementsByClassName("plus-item");
  var plusItem = [...plus]
  plusItem.map(item=>{addEventToPlusButton(item)})
  
  function addEventToPlusButton(item){
      item.addEventListener("click", function(callback){
      var name = item.dataset.name;
      product.map(itemProduct=>{
        if (itemProduct.name == name ){
          itemProduct.count++
        }
      })
       callback()
        function callback(){
          printoutput(product)
          HandlePlusButton(product)
          dataset = product
          updataCartquantity(product)
          ButtonXtoClearItemInCart()
          HandleMinusButton(product)
          UpdateTotal()
        }
          
       
    })
  }
    
  }
  function updataCartquantity(arr){
     var count = 0
     arr.map(item=>{count+=item.count})
     if (count>0){
     document.getElementsByClassName("total-count")[0].innerHTML = count
     }
     else 
     document.getElementsByClassName("total-count")[0].innerHTML = null
   }
  
  function handleUpdateDataset(){ 
  var ItemArr = [{name: "Orange", price: "0.5",count:0},
  {name: "Banana", price: "1.22",count:0},
  {name: "Lemon", price: "5",count:0}]
  dataset.map(item=>{
    ItemArr.map(itemArr=>{
      if (itemArr.name == item.name && (item.count)){
        itemArr.count += item.count
      }
      else if (itemArr.name == item.name &&(!item.count)){
        itemArr.count += 1
      }
    })
  })
    var ItemArr2 = []
    var length = ItemArr.length
    for (let i=0; i<length; i++){
      if (ItemArr[i].count != 0){
        ItemArr2.push(ItemArr[i])
      }
    }
  return ItemArr2
  }
  
  function ButtonXtoClearItemInCart(){
  var deleteItem = document.getElementsByClassName("delete-item");
  var deleteItemArr = [...deleteItem];
  deleteItemArr.map(item=>{addEventToDeleteButton(item)})
  
  function addEventToDeleteButton(item){
    item.addEventListener("click", function(callback){
        console.log("deleteworking")
        var name = item.dataset.name;
        var datasetCopy = dataset.map(a => ({...a}));
        datasetCopy.map(item=>{
          if (item.name == name){
            index = datasetCopy.indexOf(item) 
            dataset.splice(index,1)
          }
        })
      callback()
      function callback(){
          printoutput(dataset)
          HandleMinusButton(dataset)
          HandlePlusButton(dataset)
          updataCartquantity(dataset)
          ButtonXtoClearItemInCart()
          UpdateTotal()
        }
  })
  }
  }
  
  function UpdateTotal(){
    var total = 0
    dataset.map(item=>{
      total+= parseFloat(item.price) * parseFloat(item.count);
    })
    console.log(total)
    document.getElementsByClassName("total-cart")[0].innerHTML = total.toFixed(2)
  }
}