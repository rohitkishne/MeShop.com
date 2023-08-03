// const produtc = {
//   id: 1,
//   title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
//   price: 109.95,
//   description:
//     "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
//   category: "men's clothing",
//   image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
//   rating: { rate: 3.9, count: 120 },
// };

const mensItem = document.getElementById('mens-items')
const womensItem = document.getElementById('womens-items')
const jwelleryItem = document.getElementById('jewellery-items');
const electronicsItem = document.getElementById('electronics-items');
const items = document.getElementById('items')

//Shopping cart API URL
const apiUrl = 'https://fakestoreapi.com/products';
let data;

// Randomly choose three color for each item
const itemsColor =['red', 'blue', 'green', 'black', 'white']

function addColorToItemData(items) {
  items.map(item => {
    let pickThreeRandomColor = [];
    for(let i=0; i<3; i++)
    {
      let randomIdx;
      do{
        randomIdx = Math.floor(Math.random() * itemsColor.length)
      }while(pickThreeRandomColor.includes(itemsColor[randomIdx]))
      pickThreeRandomColor[i] = itemsColor[randomIdx]
    }
    item.color = pickThreeRandomColor;
  })
}


// Randomly choose one size of each item
const itemsSize =['S', 'M', 'L', 'XL']

function addSizeToItemData(items) {
  items.map(item => {
    let pickThreeRandomSize = [];
    for(let i=0; i<1; i++)
    {
      let randomIdx = Math.floor(Math.random() * itemsSize.length)
      pickThreeRandomSize[i] = itemsSize[randomIdx]
    }
    item.size = pickThreeRandomSize;
  })
}
// Fetch the data from the API URL
async function fetchData() {
    try {
      const response = await fetch(apiUrl, {
        method : 'get'
      })
      data = await response.json();

      addColorToItemData(data);
      addSizeToItemData(data)

      renderItems(data);

    } catch (error) {
      console.log('Error', error)
    }
}

// set the color of item with color array inside the circles

function chooseColor(colorName) {
  if(colorName === 'red')
  {
    circleColor = 'background-color : red'
    return circleColor;
  }
  else if(colorName === 'blue')
  {
    circleColor = 'background-color : blue'
    return circleColor;
  }
  else if(colorName === 'green')
  {
    circleColor = 'background-color : green'
    return circleColor;
  }
  else if(colorName === 'black')
  {
    circleColor = 'background-color : black'
    return circleColor;
  }
  else{
    circleColor = 'background-color : white; border : 1px solid black'
    return circleColor;
  }
}



// Rendering the data on to the UI
function renderItems(items) {
        mensItem.innerHTML = ``;
        womensItem.innerHTML = ``;
        jwelleryItem.innerHTML = ``;
        electronicsItem.innerHTML = ``;
        items.map(item => {
          if(item.category === "men's clothing")
          {
            mensItem.innerHTML += `<div id='${item.id}' class="item">
                                    <img src="${item.image}" alt="Item" />
                                    <div class="info">
                                      <div class="row">
                                        <div class="price">$${item.price}</div>
                                        <div class="sized">${item.size[0]}</div>
                                      </div>
                                      <div class="colors">
                                        Colors:
                                        <div class="row">
                                          <div class="circle" style="${chooseColor(item.color[0])}"></div>
                                          <div class="circle" style="${chooseColor(item.color[1])}"></div>
                                          <div class="circle" style="${chooseColor(item.color[2])}"></div>
                                        </div>
                                      </div>
                                      <div class="row">Rating: ${item.rating.rate}</div>
                                    </div>
                                    <button id="cartaddBtn-${item.id}" onclick="addToCart(event)">Add to Cart</button>
                                  </div>`
          }
          else if(item.category === "women's clothing"){
            womensItem.innerHTML += `<div id='${item.id}' class="item">
                                        <img src="${item.image}" alt="Item" />
                                        <div class="info">
                                          <div class="row">
                                            <div class="price">$${item.price}</div>
                                            <div class="sized">${item.size[0]}</div>
                                          </div>
                                          <div class="colors">
                                            Colors:
                                            <div class="row">
                                              <div class="circle" style="${chooseColor(item.color[0])}"></div>
                                              <div class="circle" style="${chooseColor(item.color[1])}"></div>
                                              <div class="circle" style="${chooseColor(item.color[2])}"></div>
                                            </div>
                                          </div>
                                          <div class="row">Rating: ${item.rating.rate}</div>
                                        </div>
                                        <button id="cartaddBtn-${item.id}" onclick="addToCart(event)">Add to Cart</button>
                                      </div>`
          }
          else if(item.category === "jewelery")
          {
            jwelleryItem.innerHTML += `<div id='${item.id}' class="item">
                                        <img src="${item.image}" alt="Item" />
                                        <div class="info">
                                          <div class="row">
                                            <div class="price">$${item.price}</div>
                                          </div>
                                          <div class="colors">
                                            Colors:
                                            <div class="row">
                                              <div class="circle" style="${chooseColor(item.color[0])}"></div>
                                              <div class="circle" style="${chooseColor(item.color[1])}"></div>
                                              <div class="circle" style="${chooseColor(item.color[2])}"></div>
                                            </div>
                                          </div>
                                          <div class="row">Rating: ${item.rating.rate}</div>
                                        </div>
                                        <button id="cartaddBtn-${item.id}" onclick="addToCart(event)">Add to Cart</button>
                                      </div>`
          }
          else if(item.category === "electronics")
          {
            electronicsItem.innerHTML += `<div id='${item.id}' class="item">
                                        <img src="${item.image}" alt="Item" />
                                        <div class="info">
                                          <div class="row">
                                            <div class="price">$${item.price}</div>
                                          </div>
                                          <div class="colors">
                                            Colors:
                                            <div class="row">
                                              <div class="circle" style="${chooseColor(item.color[0])}"></div>
                                              <div class="circle" style="${chooseColor(item.color[1])}"></div>
                                              <div class="circle" style="${chooseColor(item.color[2])}"></div>
                                            </div>
                                          </div>
                                          <div class="row">Rating: ${item.rating.rate}</div>
                                        </div>
                                        <button id="cartaddBtn-${item.id}" onclick="addToCart(event)">Add to Cart</button>
                                      </div>`
          }
          
        })
}

 // Attach a eventlistener cartBtn to each item
 function addToCart(event) {
    if(!sessionStorage.getItem('accessToken'))
    {
      alert("You Should First Login to Your Account to Add to Cart. Thank You!")
      setTimeout(() => {
        window.location.href = '../login'
      }, 1000);
    }

    const itemId = event.target.id;
    const userAccessToken = JSON.parse(sessionStorage.getItem('accessToken'));
    const users = JSON.parse(localStorage.getItem('users'));
    const currentUser = users.find(user => {
      return user.userToken === userAccessToken;
    })

    // in this manner we add the item in mycart
    // console.log(document.getElementById(itemId.split('-')[1]))

    let myCart = currentUser.userCart;
    if(myCart === undefined)
    {
      myCart = [];
    }

    myCart.push(itemId.split('-')[1]);

    currentUser.userCart = myCart;

    localStorage.setItem('users', JSON.stringify(users))
    sessionStorage.setItem('loggedInUser', JSON.stringify(currentUser))
 }

    
fetchData();

