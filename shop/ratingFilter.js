setTimeout(() => {
    const ratingFilter = document.getElementById('range')

    ratingFilter.addEventListener('change', (event) => {
        try {
            let rating = event.target.value;
            let filterRating = searchProductByRating(rating, data);
            mensItem.innerHTML = ``;
            womensItem.innerHTML = ``;
            renderItems(filterRating)
        } catch (error) {
            console.log('Error: ', error)
        }
    })


    function searchProductByRating(rating, products) {
        return products.filter((product) => {
            return product.rating.rate >= rating;
        })
    }

},1000);