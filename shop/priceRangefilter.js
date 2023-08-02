//filtering according to color, size, ratings and prices

setTimeout(() => {
    const priceRangeFilter = document.getElementById('price-range');
    const ratingFilter = document.getElementById('range')
    const applyFilter = document.getElementById('apply-to-filter');

    //Price Range filter ----------------------------------->
    let priceofItems = [];
    
    priceRangeFilter.addEventListener('change', (event) => {
        try {
            const productId = event.target.id;
            const range = productId.split('-');

            if(event.target.checked)
            { 
                priceofItems.push(parseInt(range[0]))
                priceofItems.push(parseInt(range[1]))
            }
            else if(priceofItems.length !== 0)
            {
                //take the index of first range price value and delete it from the priceofitem array
                let range1pos = priceofItems.indexOf(parseInt(range[0]))
                priceofItems.splice(range1pos,1)
                //take the index of second range price value and delete it from the priceofitem array
                let range2pos = priceofItems.indexOf(parseInt(range[1]))
                priceofItems.splice(range2pos,1)   
            }
    
        } catch (error) {
            console.log('Error', error)
        }
    })

    //It is finding min price and max price from price range in price Range array
    function findTwoValue(priceArr) {
        let twoPrice = [];
        let lowPrice = 1000000000;
        let highPrice = 0;
        for(let i=0; i<priceArr.length; i++)
        {
            if(priceArr[i]<lowPrice)
            {
                lowPrice = priceArr[i];
            }
            if(priceArr[i] > highPrice)
            {
                highPrice = priceArr[i];
            }
        }

        twoPrice[0] = lowPrice;
        twoPrice[1] = highPrice;
        return twoPrice;
    }


    // Rating filter --------------------------------->
    let rating = 0;
    ratingFilter.addEventListener('change', (event) => {
        try {
            rating = parseInt(event.target.value);
        } catch (error) {
            console.log('Error: ', error)
        }
    })

    //whenever i click on the apply filter button, each and every filter will apply to shop and shows a result
    //if we dont apply a button, by default result will be display as usual

    applyFilter.addEventListener('click', (event) => {
        event.stopPropagation();
        event.preventDefault();

        mensItem.innerHTML = ``;
        womensItem.innerHTML = ``;

        if(priceofItems.length === 0 && rating ===0)
        {
            renderItems(data);
        }
        else if(priceofItems.length !==0 && rating === 0)
        {
            const filterProduct = searchPriceRange(findTwoValue(priceofItems),data);
            renderItems(filterProduct)
        }
        else if(priceofItems.length === 0 && rating !== 0)
        {
            const filterProduct = searchProductByRating(rating, data);
            renderItems(filterProduct)
        }
        else{
            const filterProduct = search(findTwoValue(priceofItems),rating, data);
            renderItems(filterProduct)
        }
        
    })  

    //Search and filter the product based on price range only
    function searchPriceRange(range, products) {
        return products.filter((product) => {
            return product.price >=range[0] && product.price<=range[1];
        })
    }

    //Search and filter the product based on ratings only
    function searchProductByRating(rating, products) {
        return products.filter((product) => {
            return product.rating.rate >= rating;
        })
    }

    //Search and filter the product based on both price range and ratings
    function search(range, rating, products) {
        return products.filter((product) => {
            return (product.price >=range[0] && product.price<=range[1]) && product.rating.rate >=rating;
        })
    }

}, 1000);


