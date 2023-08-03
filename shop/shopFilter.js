//filtering according to color, size, ratings and prices

setTimeout(() => {
    const itemColor = document.getElementById('item-color');
    const itemSize = document.getElementById('item-size');
    const priceRangeFilter = document.getElementById('price-range');
    const ratingFilter = document.getElementById('range');
    const applyFilter = document.getElementById('apply-to-filter');

    //color Filter ---------------------------------->
    let productColor = [];

    itemColor.addEventListener('change', (event) => {
        try {
            const colorPick = event.target.id;

            //if checked push the item id into productColor array
            //if unchecked remove the item id into productColor array
            if(event.target.checked)
            {
                productColor.push(colorPick)
            }
            else
            {
                let productPos = productColor.indexOf(colorPick);
                productColor.splice(productPos,1);
            }

        } catch (error) {
            console.log("Error : ", error);
        }
    })

    //Size Filter ------------------------------------->
    let productSize = [];

    itemSize.addEventListener('change', (event) => {
        try {
            const sizeId = event.target.id;

            if(event.target.checked)
            {
                productSize.push(sizeId);
            }
            else
            {
                let sizePos = productSize.indexOf(sizeId)
                productSize.splice(sizePos,1)
            }

        } catch (error) {
            console.log("Error : ", error)
        }
    })

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

    // ******************************************* Apply Filter ******************************************** 

    //whenever i click on the apply filter button, each and every filter will apply to shop and shows a result
    //if we dont apply a button, by default result will be display as usual

    applyFilter.addEventListener('click', (event) => {
        event.stopPropagation();
        event.preventDefault();

        if(priceofItems.length === 0 && rating ===0 && productColor.length === 0 && productSize.length === 0)
        {
            renderItems(data);
        }
        else if(priceofItems.length !==0 && rating === 0 && productColor.length === 0)
        {
            const filterProduct = searchPriceRange(findTwoValue(priceofItems),data);
            renderItems(filterProduct)  
        }
        else if(priceofItems.length === 0 && rating !== 0 && productColor.length === 0)
        {
            const filterProduct = searchProductByRating(rating, data);
            renderItems(filterProduct)
        }
        else if(priceofItems.length === 0 && rating ===0 && productColor.length !== 0)
        {
            const filterProduct = searchByColor(productColor, data);
            renderItems(filterProduct)
        }
        else if(priceofItems.length === 0 && rating ===0 && productColor.length === 0 && productSize.length !== 0)
        {
            const filterProduct = searchBySize(productSize, data);
            renderItems(filterProduct)
        }

        else if(priceofItems.length !== 0 && rating !==0 && productColor.length === 0 && productSize.length === 0){
            const filterProduct = searchByPriceAndRating(findTwoValue(priceofItems),rating, data);
            renderItems(filterProduct)
        }
        else if(priceofItems.length !== 0 && rating === 0 && productColor.length !== 0 && productSize.length === 0)
        {
            const filterProduct = searchByPriceAndColor(findTwoValue(priceofItems),productColor, data);
            renderItems(filterProduct)
        }
        else if(priceofItems.length !== 0 && rating === 0 && productColor.length === 0 && productSize.length !== 0)
        {
            const filterProduct = searchByPriceAndSize(findTwoValue(priceofItems),productSize, data);
            renderItems(filterProduct)
        }
        else if(priceofItems.length === 0 && rating !==0 && productColor.length !== 0 && productSize.length === 0)
        {
            const filterProduct = searchByColorAndRating(productColor,rating, data);
            renderItems(filterProduct)
        }
        else if(priceofItems.length === 0 && rating !==0 && productColor.length === 0 && productSize.length !== 0)
        {
            const filterProduct = searchByRatingAndSize(rating, productSize, data);
            renderItems(filterProduct)
        }
        else if(priceofItems.length === 0 && rating ===0 && productColor.length !== 0 && productSize.length !== 0)
        {
            const filterProduct = searchByColorAndSize(productColor, productSize, data);
            renderItems(filterProduct)
        }
        else if(priceofItems.length !== 0 && rating !==0 && productColor.length !== 0 && productSize.length === 0){
            const filterProduct = searchByPriceAndRatingAndColor(findTwoValue(priceofItems),productColor,rating, data);
            renderItems(filterProduct)
        }
        else if(priceofItems.length !== 0 && rating !==0 && productColor.length === 0 && productSize.length !== 0)
        {
            const filterProduct = searchByPriceAndRatingAndSize(findTwoValue(priceofItems),productSize,rating, data);
            renderItems(filterProduct)
        }   
        else if(priceofItems.length !== 0 && rating ===0 && productColor.length !== 0 && productSize.length !== 0)
        {
            const filterProduct = searchByPriceAndSizeAndColor(findTwoValue(priceofItems),productSize,productColor, data);
            renderItems(filterProduct)
        }
        else if(priceofItems.length === 0 && rating !==0 && productColor.length !== 0 && productSize.length !== 0)
        {
            const filterProduct = searchByRatingAndSizeAndColor(rating,productSize,productColor, data);
            renderItems(filterProduct)
        }
        else{
            // **********
            const filterProduct = search(findTwoValue(priceofItems), rating, productColor, productSize, data);
            renderItems(filterProduct)
        }
        
    })  

    // ******************************** Single filter ************************************
    //Search and filter the product based on porduct color only
    function searchByColor(colors, products) {
        return products.filter((product) => {
            return colors.includes(product.color[0]) || 
                   colors.includes(product.color[1]) ||
                   colors.includes(product.color[2]);
        })
    }

    //Search and filter the product based on porduct size only
    function searchBySize(size, products) {
        return products.filter((product) => {
            return size.includes(product.size[0].toLowerCase());
        })
    }

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

    // ************************************ Double Filter *********************************
    //Search and filter the product based on both price range and ratings
    function searchByPriceAndRating(range, rating, products) {
        return products.filter((product) => {
            return (product.price >=range[0] && product.price<=range[1]) && product.rating.rate >=rating;
        })
    }

    //Search and filter the product based on both price range and color
    function searchByPriceAndColor(range, colors, products) {
        return products.filter((product) => {
            return (product.price >=range[0] && product.price<=range[1]) && 
                    (
                        colors.includes(product.color[0]) || 
                        colors.includes(product.color[1]) ||
                        colors.includes(product.color[2])
                    );
        })
    }

    //Search and filter the product based on both color and ratings
    function searchByColorAndRating(colors, rating, products) {
        return products.filter((product) => {
            return (
                    colors.includes(product.color[0]) || 
                    colors.includes(product.color[1]) ||
                    colors.includes(product.color[2])
                ) && product.rating.rate >=rating;
        })
    }

    //Search and filter the product based on both price range and size
    function searchByPriceAndSize(range, size, products) {
        return products.filter((product) => {
            return (product.price >=range[0] && product.price<=range[1]) && size.includes(product.size[0].toLowerCase());
        })
    }

    //Search and filter the product based on both size and ratings
    function searchByRatingAndSize(rating, size, products) {
        return products.filter((product) => {
            return size.includes(product.size[0].toLowerCase()) && product.rating.rate >=rating;
        })
    }

    //Search and filter the product based on both color and size
    function searchByColorAndSize(colors, size, products) {
        return products.filter((product) => {
            return (
                    colors.includes(product.color[0]) || 
                    colors.includes(product.color[1]) ||
                    colors.includes(product.color[2])
                ) && size.includes(product.size[0].toLowerCase());
        })
    }

    // ********************************** Three Filter ****************************************
    //Search and filter the product based on all price range, rating, and color
    function searchByPriceAndRatingAndColor(range, colors,rating, products) {
        return products.filter((product) => {
            return (product.price >=range[0] && product.price<=range[1]) && 
                    (
                        colors.includes(product.color[0]) || 
                        colors.includes(product.color[1]) ||
                        colors.includes(product.color[2])
                    ) && product.rating.rate >=rating;
        })
    }

     //Search and filter the product based on all price range, rating, and size
     function searchByPriceAndRatingAndSize(range, size,rating, products) {
        return products.filter((product) => {
            return (product.price >=range[0] && product.price<=range[1]) && 
            size.includes(product.size[0].toLowerCase()) && product.rating.rate >=rating;
        })
    }

    //Search and filter the product based on all price range, color, and size
    function searchByPriceAndSizeAndColor(range, size,colors, products) {
        return products.filter((product) => {
            return (product.price >=range[0] && product.price<=range[1]) && 
            size.includes(product.size[0].toLowerCase()) && 
            (
                colors.includes(product.color[0]) || 
                colors.includes(product.color[1]) ||
                colors.includes(product.color[2])
            ) ;
        })
    }

    //Search and filter the product based on all rating, color, and size
    function searchByRatingAndSizeAndColor(rating, size,colors, products) {
        return products.filter((product) => {
            return product.rating.rate >=rating && 
            size.includes(product.size[0].toLowerCase()) && 
            (
                colors.includes(product.color[0]) || 
                colors.includes(product.color[1]) ||
                colors.includes(product.color[2])
            ) ;
        })
    }

    // ********************************** All Filter ****************************************
    //Search and filter the product based on all price, rating, color, and size
    function search(range, rating, colors, size, products) {
        return products.filter((product) => {
            return (product.price >=range[0] && product.price<=range[1]) &&
                product.rating.rate >=rating && 
                size.includes(product.size[0].toLowerCase()) && 
                (
                    colors.includes(product.color[0]) || 
                    colors.includes(product.color[1]) ||
                    colors.includes(product.color[2])
                ) ;
        })
    }

}, 1000);


