let totalPrice = 0;
let amount = 0;
let click = 0;
let cart = [];

$(document).ready(function() {
// Get the element with id="defaultOpen" and click on it
    document.getElementById("defaultOpen").click();
});

$(".shop").on('click', function (e) {
    click++; //Counts the clicks on the buttons
    addProduct(this);
});

//SOURCE: https://www.w3schools.com/howto/howto_js_tabs.asp ------------------------
function openTab(evt, tabName) {
    // Declare all variables
    let i;
    let tabcontent;
    let tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}
//---------------------------------------------------------------------------------

function addProduct(that){
    //Get the values of the price and image of the clicked on product
    let parent = $("#"+that.id).parent();
    let price = $(parent).children('p').children('span').text();
    price = Number(price); //Turn it into a number
    let image = $(parent).children('img').attr('src');

    //Append the product at the end of the array
    cart.push(image);

    //Check if the product is more than once in de shopping cart array
    checkProduct(image);

    //Updates the total price (by adding the current price)
    totalPrice += price;
    updateTotal();

    //If the product isn't already in the shopping cart, a new div will be
    //created with the information of the clicked on product. If the product
    //already is in the cart, the amount will be updated (increased by 1).
    if(amount === 1) {
        let product = $(`<div class="divBox">
            <img src="${image}" width="150px" height="250px">
            <p>Anzahl: <span id="${'i'+price}">${amount}</span></p>
            <p>Einzelpreis: €${price},-</p>
        </div>`);
        $("#shoppingCart").append(product);
    }else{
        $("#i" + price).html(amount);
    }
}

//Checks if it's the first product which is added to the shopping cart. If so,
//a new div will be created with the information of the total price and a button
//to order the articles. If it's not the first product, only the total price will
//be updated.
function updateTotal(){
    if(click != 1){
        $("#total").html(`Gesamtpreis: €${totalPrice},-`);
    }else{
        let div = $(`<div id="end"></div>`)
        let text = $(`<span id="total">Gesamtpreis: €${totalPrice},-</span>`);
        let btn = $(`<input type="button" id="order" value="Bestellen">`);
        div.append(text);
        div.append(btn);
        $("#shoppingCart").append(div);
    }
}

//Runs through the array and checks how often the product exists in the
//array - the global variable amount counts the occurrences.
function checkProduct(image) {
    amount = 0;
    for (let product of cart.values()) {
        if (image === product) {
            amount++;
        }
    }
}