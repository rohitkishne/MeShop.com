setTimeout(() => {
    // All filter button functionality here
    const filterBtns = document.getElementById('filter-Btns')
    const allProduct = document.getElementById('all')
    const mensProduct = document.getElementById('mens')
    const womensProduct = document.getElementById('womens')
    const jewelleryProduct = document.getElementById('jewellery')
    const electronicProduct = document.getElementById('electronic')
    const filterByCategory = document.getElementById('products-by-name')


    let activeProductCategory = allProduct;

    filterBtns.addEventListener('click', (e) => {
        if(e.target.id === 'mens')
        {
            mensProduct.classList.add('active')
            activeProductCategory.classList.remove('active')
            activeProductCategory = mensProduct
            const category = "men's clothing"
            renderCategoryItem(category, data)
        }
        else if(e.target.id === 'womens')
        {
            womensProduct.classList.add('active')
            activeProductCategory.classList.remove('active')
            activeProductCategory = womensProduct;
            const category = "women's clothing"
            renderCategoryItem(category, data)
        }
        else if(e.target.id === 'jewellery')
        {
            jewelleryProduct.classList.add('active')
            activeProductCategory.classList.remove('active')
            activeProductCategory = jewelleryProduct;
            const category = "jewelery"
            renderCategoryItem(category, data)
        }
        else if(e.target.id === 'electronic')
        {
            electronicProduct.classList.add('active')
            activeProductCategory.classList.remove('active')
            activeProductCategory = electronicProduct;
            const category = "electronics"
            renderCategoryItem(category, data)
        }
        else
        {
            allProduct.classList.add('active')
            activeProductCategory.classList.remove('active')
            activeProductCategory = allProduct;
            const section = document.querySelectorAll('.product-items');
            section.forEach(eachSection => {
                eachSection.style.display = 'block'
            })
            const extraSection = document.querySelectorAll('.extra-section');
            extraSection.forEach(eachSection => {
                eachSection.style.display = 'none'
            })
            renderItems(data);
        }
    })


    function renderCategoryItem(productCategory, items) {
        const section = document.querySelectorAll('.product-items');
        section.forEach(eachSection => {
            eachSection.style.display = 'none'
        })
        const extraSection = document.querySelectorAll('.extra-section');
        extraSection.forEach(eachSection => {
            eachSection.style.display = 'none'
        })

        const productSection = document.createElement('section');
        productSection.classList.add('extra-section')
        
        const div = document.createElement('div')
        div.classList.add('items')

        items.map(item => {
            if(item.category === productCategory)
            {
                div.innerHTML += `<div id='${item.id}' class="item">
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

    })

    productSection.appendChild(div);
    filterByCategory.appendChild(productSection)
}

}, 1000);