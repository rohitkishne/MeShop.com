//filtering according to color, size, ratings and prices

setTimeout(() => {
    const priceRangeFilter = document.getElementById('price-range');

    let priceofItems = [];

    priceRangeFilter.addEventListener('change', (event) => {
        try {
            const productId = event.target.id;
            const range = productId.split('-');
            mensItem.innerHTML = ``;
            womensItem.innerHTML = ``;  
            if(event.target.checked)
            { 
                priceofItems.push(parseInt(range[0]))
                priceofItems.push(parseInt(range[1]))
                const filterProductbyPrice = searchPriceRange(findTwoValue(priceofItems), data);
                renderItems(filterProductbyPrice)
            }
            else if(priceofItems.length !== 0){
                //take the index of first range price value and delete it from the priceofitem array
                let range1pos = priceofItems.indexOf(parseInt(range[0]))
                priceofItems.splice(range1pos,1)
                //take the index of second range price value and delete it from the priceofitem array
                let range2pos = priceofItems.indexOf(parseInt(range[1]))
                priceofItems.splice(range2pos,1)

                if(priceofItems.length === 0)
                {
                    renderItems(data);
                }
                else{
                    const filterProductbyPrice = searchPriceRange(findTwoValue(priceofItems), data);
                    renderItems(filterProductbyPrice)
                }
                
            }
            else{
                renderItems(data);
            }
    
        } catch (error) {
            console.log('Error', error)
        }
    })

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


    function searchPriceRange(range, products) {
        return products.filter((product) => {
            return product.price >=range[0] && product.price<=range[1];
        })
    }
}, 1000);


