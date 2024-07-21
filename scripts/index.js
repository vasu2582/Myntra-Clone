let bagItems;
onLoad();

function onLoad(){
    let bagItems_string = localStorage.getItem('bagitems');
    bagItems = bagItems_string ? JSON.parse(bagItems_string) : [];
    displayItemsOnHomePage();
    displayBagIcon();
}


function addToBag(itemId){
    bagItems.push(itemId);
    localStorage.setItem('bagitems',JSON.stringify(bagItems));
    displayBagIcon();
}

function displayBagIcon(){
    let bagitemcountElement = document.querySelector('.bag_item_count');
    if(bagItems.length > 0){
        bagitemcountElement.style.visibility = 'visible';
        bagitemcountElement.innerText = bagItems.length;
    }
    else{
        bagitemcountElement.style.visibility = 'hidden';
    }
    
}

function displayItemsOnHomePage(){

    let itemsContainerElement = document.querySelector('.items_container');

    if(!itemsContainerElement)
    {
        return;
    }
    /*let item = {
        item_image: 'images/1.jpg',
        rating: {
            stars: 4.5,
            reviews: 1400,
        },
        company_name: 'Carlton London',
        item_name: 'Rhodium-Plated CZ Floral Studs',
        current_price: 606,
        original_price: 1045,
        discount: 42,
    };*/
    
    let innerHTML='';
    items.forEach(item => {
        innerHTML += `
            <div class="item_container">
                <img class="item_image" src="${item.image}" alt="item image">
                <div class="rating">
                    ${item.rating.stars} ⭐ | ${item.rating.count}
                </div>
                <div class="company_name">${item.company}</div>
                <div class="item_name">${item.item_name}</div>
                <div class="price">
                    <span class="current_price">Rs ${item.current_price}</span>
                    <span class="original_price">Rs ${item.original_price}</span>
                    <span class="discount">(${item.discount_percentage}% OFF)</span>
                </div>
                <button class="btn_add_bag" onclick="addToBag(${item.id})">Add to Bag</button>
            </div>
        `;
    });

    itemsContainerElement.innerHTML = innerHTML;
}


