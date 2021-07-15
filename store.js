const cart_items = document.querySelector('#cart');
const parentNode = document.getElementById('row');

window.addEventListener('load',()=>{
    console.log('loaded');
    axios.get('http://localhost:3000/products').then(products=>{
        console.log(products);
        products.data.forEach(product =>{
            const productHtml =
            `<div id="nav-${product.id}" class ="col-4 shop-item">
                <img class="shop-item-img" src="${product.imageUrl}">
                <span class="shop-item-title">${product.title}</span><br>
                <span class="shop-item-price">₹${product.price}</span><br>
                <button class="btnn shop-item-btn">Add to cart</button>     
            </div>`
            parentNode.innerHTML += productHtml;
        })
    })
    .catch(err=>{
        console.log("err");
    })
});


var addT0CartButton = document.getElementsByClassName('shop-item-btn');
var cartHolder = document.getElementsByClassName('cart-holder');
var cancel = document.getElementsByClassName('cancel');


document.addEventListener('click',(e)=>{
    if(addT0CartButton){
        const prodId = Number(e.target.parentNode.id.split('-')[1]);
        console.log(prodId);
        axios.post('http://localhost:3000/cart',{productId : prodId})
            .then(data=>{
                console.log(data);
                if(data.data.error){
                    throw new Error('Unable to add product');
                }
                // createNotification();
                showNotification(data.data.message, false);
            })
            .catch(err=>{
                console.log(err);
                showNotification(err, true);
            });
    }

    if(cartHolder){
        axios.get('http://localhost:3000/cart').then(cartProducts =>{
            console.log(cartProducts.data);
            showProductsInCart(cartProducts.data);
            document.querySelector('#cart').style = "display:block;"

        })
    }
    if(cancel){
         document.querySelector('#cart').style = "display:none;"
    }

});


function showNotification(message, iserror){
    const container = document.getElementById('container');
    const notification = document.createElement('div');
    notification.style.backgroundColor = iserror ? 'red' : 'green';
    notification.classList.add('notification');
    notification.innerHTML = `<h4>${message}<h4>`;
    container.appendChild(notification);
    setTimeout(()=>{
        notification.remove();
    },2500)
}

function showProductsInCart(listOfProducts){
    cart_items.innerHTML="";
    listOfProducts.forEach(product =>{
        const id =`nav-${product.id}`;
        const price=product.price;
        const cart_item = document.createElement('div');
        cart_item.classList.add('cart-row');
        cart_item.innerHTML=`
        <span class='cart-item cart-column'>
        </span>
        <span class='cart-price cart-column'>${price}</span>
        <form onsubmit='deleteCartItem(event, ${product.id})' class='cart-quantity cart-column'>
            <input type="text" value="1">
            <button>REMOVE</button>
        </form>`;
        cart_items.appendChild(cart_item);
    })

}

// document.addEventListener('click',(e)=>{
//     if(e.target.className == 'btnn' ||e.target.className == 'shop-item-btn'){
//         console.log("button clicked");
//         const prodId = Number(e.target.parentNode.id.split('-')[1]);
//         console.log(prodId);
//     }

// })

// if(document.readyState == 'loading'){
//     document.addEventListener('DOMContentLoaded', ready)
// }else{
//     ready();
// }
// function ready(){
//     var removecartItemButton = document.getElementsByClassName('btn-danger');
//     for(var i=0;i<removecartItemButton.length;i++){
//         var button = removecartItemButton[i];
//         button.addEventListener('click',removecartItem);
//     }
//     var quantityInputs = document.getElementsByClassName('cart-quantity-input');
//     for(var i=0;i<quantityInputs.length;i++){
//         var input = quantityInputs[i];
//         input.addEventListener('change',quantityChanged)
//     }
//     var addT0CartButtons = document.getElementsByClassName('shop-item-btn');
//     for(var i=0;i<addT0CartButtons.length;i++){
//         var button = addT0CartButtons[i];
//         button.addEventListener('click',addTocartClicked);
//         // button.addEventListener('click',createNotification);

//     }
//     document.getElementsByClassName('btn-purchase')[0].addEventListener('click',purchaseClicked);
// }
// function purchaseClicked(event){
//     alert('Thankyou For purchasing')
// }

// function removecartItem(event){
//     var buttonClicked =event.target;
//     buttonClicked.parentElement.parentElement.remove();
//     updateCartTotal();
// }
// function quantityChanged(event){
//     var input = event.target;
//     if(isNaN(input.value)|| input.value<=0){
//         input.value=1;
//     }
//     updateCartTotal();
// }
// function addTocartClicked(event){
//     event.preventDefault();
//     var button = event.target;
//     var shopItem = button.parentElement;
//     var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
//     var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
//     var imgSrc = shopItem.getElementsByClassName('shop-item-img')[0].src;
//     const btn = document.getElementsByClassName("shop-item-btn")[0];
//     console.log(title,price,imgSrc);
//     addItemToCart(title,price,imgSrc);
//     updateCartTotal();
//     createNotification();
// }
function createNotification() {
    const notif = document.createElement("div");
    
    notif.classList.add("toast");
    notif.innerText = "Product added Successfully!";
    console.log(notif.innerText);
    const container = document.getElementsByClassName("container")[0];
    container.appendChild(notif);
    setTimeout(() => {
        notif.remove();
    }, 3000);
}

// function addItemToCart(title,price,imgSrc){
//     var cartRow = document.createElement('div');
//     cartRow.classList.add('cart-row');
//     var cartItems = document.getElementsByClassName ('cart-items')[0];
//     var cartItemNames = cartItems.getElementsByClassName('cart-item-title');
//     for(var i=0;i<cartItemNames.length;i++){
//         if(cartItemNames[i].innerText==title){
//             alert('This Item is already added to cart');
//             return;
//         }
//     }
//     var cartRowContents=`
//     <div class="cart-item cart-column">
//         <img class="cart-item-image" src="${imgSrc}" alt="" width="100" height="100">
//         <span class="cart-item-title">${title}</span>
//     </div>
//     <span class="cart-price cart-column">${price}</span>

//     <div class="cart-quantity">
//         <input class="cart-quantity-input" type="number" value="1">
//         <button class="btn btn-danger" type="button">REMOVE</button>
//     </div>`
//     cartRow.innerHTML=cartRowContents    
//     cartItems.append(cartRow);
//     cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click',removecartItem);
//     cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change',quantityChanged);
    

// }

// function updateCartTotal(){
//     var cartItemContainer = document.getElementsByClassName('cart-items')[0];
//     var cartRows =cartItemContainer.getElementsByClassName('cart-row');
//     var total =0;
//     for(var i=0;i<cartRows.length;i++){
//         var cartRow = cartRows[i];
//         var priceElement = cartRow.getElementsByClassName('cart-price')[0];
//         var quantityElement =cartRow.getElementsByClassName('cart-quantity-input')[0];
//         var price = parseFloat(priceElement.innerText.replace('₹',''));
//         var quantity = quantityElement.value;
//         total = total+(price*quantity);
//     }
//     total = Math.round(total*100)/100;
//     document.getElementsByClassName('cart-total-price')[0].innerText = 'Rs '+ total;
// }


