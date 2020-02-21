//if statement to check if html has loaded
if (document.readyState == 'loading') {
document.addEventListener('DOMContentLoaded', ready)
}
else {
    ready()
}
function ready() {
//function to add, change quantity and remove items from the cart
var removeCartItemButtons = document.getElementsByClassName('btn-danger')
for (var i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i]
    button.addEventListener('click', removeCartItem)
    }
var quantityInputs = document.getElementsByClassName('cart-quantity-input')
for (var i = 0; i < quantityInputs.length; i++) {
    var input =quantityInputs[i]
    input.addEventListener('change', quantityChanged)
    }
var addToCartButtons = document.getElementsByClassName('shop-item-button')
for (var i = 0; i < addToCartButtons.length; i++) {
    var button =addToCartButtons[i]
    button.addEventListener('click', addToCartClicked)
    }   
document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)

//function to confirm order and to clear cart
function purchaseClicked() {
    alert('Thank you for your order')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}
//function to allow items to be removed when remove button in cart is clicked
function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()

}
//function to prevent 0 or a negative number
function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}
//function to add details of title, price and image of item to be added to cart
function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}
//function to display items in cart and to advise if item is already in cart
function addItemToCart (title, price, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == title) {
        alert('You have already ordered this')
        return
    }
}
//html for function to include in each cart row
    var cartRowContents = `
    <div class="cart-item cart-column">
    <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
    <span class="cart-item-title">${title}</span>
</div>
<span class="cart-price cart-column">${price}</span>
<div class="cart-quantity cart-column">
    <input class="cart-quantity-input" type="number" value="1">
    <button class="btn btn-danger" type="button">Remove</button>
</div>`
cartRow.innerHTML =cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}
//function to update price, quantity and total in cart
function updateCartTotal() {
var cartItemContainer = document.getElementsByClassName('cart-items')[0]
var cartRows = cartItemContainer.getElementsByClassName('cart-row')
var total = 0
for (var i = 0; i <cartRows.length; i++) {
    var cartRow = cartRows[i]
    var priceElement = cartRow.getElementsByClassName('cart-price')[0]
    var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
    var price = parseFloat(priceElement.innerText.replace('£', ''))
    var quantity = quantityElement.value
total = total + (price * quantity)
}
//rounds to 2 decimal places
total = Math.round(total * 100) /100
document.getElementsByClassName('cart-total-price')[0].innerText = "£" + total
}
}
