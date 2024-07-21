const Conveniencefees = 99;
let bagItemObjects;
onload2();

function onload2(){
    loadBagItemObjects();
    displayBagItems();
    displayBagSummary();
}

function displayBagSummary(){
    let bagSummaryElement = document.querySelector('.bag-summary');
    let totalmrp = 0;
    let totaldiscount = 0;
    let totalitems = bagItemObjects.length;
    let finalpayment = 0;

    bagItemObjects.forEach(bagitems => {
        totalmrp += bagitems.original_price; 
        totaldiscount += bagitems.original_price - bagitems.current_price;
    });

    finalpayment= totalmrp - totaldiscount + Conveniencefees;
    
    bagSummaryElement.innerHTML = `
        <div class="bag-details-container">
                <div class="price-header">PRICE DETAILS (${totalitems} Items) </div>
                <div class="price-item">
                  <span class="price-item-tag">Total MRP</span>
                  <span class="price-item-value">₹${totalmrp}</span>
                </div>
                <div class="price-item">
                  <span class="price-item-tag">Discount on MRP</span>
                  <span class="price-item-value priceDetail-base-discount">-₹${totaldiscount}</span>
                </div>
                <div class="price-item">
                  <span class="price-item-tag">Convenience Fee</span>
                  <span class="price-item-value">₹99</span>
                </div>
                <hr>
                <div class="price-footer">
                  <span class="price-item-tag">Total Amount</span>
                  <span class="price-item-value">₹${finalpayment}</span>
                </div>
        </div>
    
        <button class="btn-place-order">
                <div class="css-xjhrni">PLACE ORDER</div>
        </button>`;
}


function loadBagItemObjects(){
    bagItemObjects = bagItems.map(itemid =>{
        for(let i=0;i<items.length;i++)
        {
            if(itemid == items[i].id){
                return items[i];
            }
        }
    });
}

function displayBagItems(){
    let conatinerElement = document.querySelector('.bag-items-container');
    let inner_HTML='';
    bagItemObjects.forEach(bagelement => {
        inner_HTML += generateItemHTML(bagelement);
    });
    conatinerElement.innerHTML = inner_HTML;
}    

function removeFromBag(itemid){
    bagItems = bagItems.filter(id => id != itemid);
    localStorage.setItem('bagitems',JSON.stringify(bagItems));
    loadBagItemObjects();
    displayBagIcon();
    displayBagItems();
    displayBagSummary();
}

function generateItemHTML(item){
    return `
        <div class="bag-item-container">
            <div class="item-left-part">
              <img class="bag-item-img" src="../${item.image}">
            </div>
        
            <div class="item-right-part">
              <div class="company_name">${item.company}</div>
              <div class="item_name">${item.item_name}</div>
              <div class="price-container">
                <span class="current_price">Rs ${item.current_price}</span>
                <span class="original_price">Rs ${item.original_price}</span>
                <span class="discount">(${item.discount_percentage}% OFF)</span>
              </div>
              <div class="return-period">
                <span class="return-period-days">${item.return_period} days</span> return available
              </div>
              <div class="delivery-details">
                Delivery by
                <span class="delivery-details-days">${item.delivery_date}</span>
              </div>
            </div>
        
            <div class="remove-from-cart" onclick="removeFromBag(${item.id})">X</div>
        </div>`;
}