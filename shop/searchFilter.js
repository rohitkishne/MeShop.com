setTimeout(() => {

    console.log(data)

    const searchInput = document.getElementById('search-filter');

    searchInput.addEventListener('keyup', () => {
       const optimisedSearching = keyFilter(searchInputFun, 700);
       optimisedSearching();

    })

    // Taking input from the search bar and try to find the product as per the keyword
    const searchInputFun = () => {
       try {
            const keyword = searchInput.value;
            const filterProducts = searching(keyword,data);
            renderItems(filterProducts) 
       } catch (error) {
        console.log("Error : ", error)
       }
    }


    // Optimising the searching by taking input at some interval
    const keyFilter = (callback, delay) => {
        let timer;
        return function(...args) {
            if(timer) clearTimeout(timer);
            timer = setTimeout(() => {
                callback(...args);
            }, delay);
        }
    }

    //searching function return the products array as per the filter applied
    function searching(inputKeyword, products) {
        return products.filter((product) => {
            return product.category.toLowerCase().includes(inputKeyword.toLowerCase()) ||
             product.title.toLowerCase().includes(inputKeyword.toLowerCase()) ||
             product.description.toLowerCase().includes(inputKeyword.toLowerCase())
        })
    }

}, 1000);