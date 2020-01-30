// Objects
function storeItem(id, name, price, qty, maxPerCustomer, category, shippingCost, reviews, description) 
{
    this.id = id;
    this.name = name;
    this.price = parseFloat(price);
    this.qty = parseInt(qty);
    this.maxPerCustomer = parseInt(maxPerCustomer);
    this.category = category;
    this.shippingCost = parseFloat(shippingCost);
    this.reviews = reviews;
    this.description = description;
}


function cartItem(id, price, qty, shipping, maxQty) 
{
    this.id = id;
    this.price = parseFloat(price);
    this.qty = parseInt(qty);
    this.shipping = shipping;
    this.maxQty = maxQty;
}

// global arrays
var storeItems = [];
var cartItems = [];

//global variables and constants
const status = document.getElementById("displayFilter");
const addItemBtn = document.getElementById("addItem");
const addItemId = document.getElementById("addItemId");
const addItemQty = document.getElementById("addItemQty");
const removeItemBtn = document.getElementById("removeItem");
const addReview = document.getElementById("addReview");
const viewItem = document.getElementById("viewItem");
var messagE = "";
var customerReviews = "";
// checkout variables
var shippingTotal = 0,
    subTotal = 0,
    tax = 0;
total = 0;


// parsefloat
shippingTotal = parseFloat(shippingTotal);
subTotal = parseFloat(subTotal);
tax = parseFloat(tax);
total = parseFloat(total);

// onload function with objects
window.addEventListener("load", function () 
{
    document.querySelector(".date").innerHTML = new Date();

    // Array objects
    storeItems.push(new storeItem("ID001", "Asus ROG Strix", 108.99, 10, 2, "Laptops", 9.99, ["Excellent value!", "Great Laptop", "Great Price!"], "Powerful gaming performance with GTX 1050 Ti 4GB graphics."));
    storeItems.push(new storeItem("ID002", "CyberPower Xtreme", 308.99, 25, 3, "Desktops", 15.99, ["Amazing", "Very Nice", "Smooth and Quick"], "Xtreme VR is optimized for gaming, and is also VR ready."));
    storeItems.push(new storeItem("ID003", "iBuyPower Pro", 452.99, 8, 1, "Desktops", 18.99, ["Nice PC", "Plug and play out of the box"], "Experience outstanding high Performance from this intel-powered iBuyPower."));
    storeItems.push(new storeItem("ID004", "Acer Nitro 5", 205.99, 5, 2, "Laptops", 8.99, ["Excellent", "Good Laptop"], "Thrust yourself into the gaming world with a form factor that takes you beyond that of mere mortal laptops."));
    storeItems.push(new storeItem("ID005", "HP OMEN", 449.88, 102, 6, "Desktops", 19.99, ["Magnificent!", "Worth every gig and dime."], "The OMEN Desktop is geared with a cutting-edge design, the industry's latest hardware."));
    storeItems.push(new storeItem("ID006", "Rainbow Keyboard", 18.99, 55, 6, "Accessories", 3.99, ["Excellent", "Bought as a Replacement", "well built keyboard"], "The Keycaps can be removed in case you need to clean the keyboard."));
    storeItems.push(new storeItem("ID007", "USB Wired Mouse", 8.99, 65, 9, "Accessories", 3.99, ["Excellent", "nice mouse"], "All the basic functions of a mouse in a comfortable, sleek design that works for left or right handed users."));
    storeItems.push(new storeItem("ID008", "Acer Aspire", 150.98, 25, 3, "Desktops", 33.25, ["Reasonably Priced", "Nice looking computer", "Bad internal connections"], "The Aspire gx gives lag-free computing for finer, more intricate moving images delivered faster."));
    storeItems.push(new storeItem("ID009", "Mini Condenser Microphone ", 54.37, 85, 3, "Accessories", 3.99, ["Excellent", "Usb cord failed", "good price"], "Easily record pure, high-quality audio with the AmazonBasics microphone."));
    storeItems.push(new storeItem("ID0010", "MSI GP72MVR", 258.99, 5, 1, "Laptops", 13.99, ["Fancy laptop.", "awesome"], "Fueled by the fastest performance, most advanced gaming technologies, and best gaming ecosystem."));
    storeItems.push(new storeItem("ID0011", "Redragon Wireless Mouse", 25.99, 45, 6, "Accessories", 3.99, ["Great buy !!!", "Good mouse"], "Discover the most responsive and comfortable Redragon Pro Wireless Gaming Mouse."));
    storeItems.push(new storeItem("ID0012", "CybertronPC Borg-Q", 350.06, 41, 3, "Desktops", 13.99, ["Expensive", "horrible graphic card"], "Your opponents may try to deny you victory, but their efforts will be in vain!"));
    storeItems.push(new storeItem("ID0013", "Razer Blade Stealth", 666.99, 8, 2, "Laptops", 23.99, ["Great concept, poor quality", "Beautiful"], "The Razer Blade Stealth was crafted to deliver incredible performance in an impossibly thin form factor."));
    storeItems.push(new storeItem("ID0014", "HP Chromebook", 319.19, 65, 2, "Laptops", 3.99, ["Amazing - BUY THIS"], "This entertaining Chromebook provides a seamless Chrome experience and easy access to Android apps via Google Play."));
    storeItems.push(new storeItem("ID0015", "Flight Stick", 84.96, 15, 2, "Accessories", 3.99, ["Excellent", "very Good", "broken"], "Fully ambidextrous joystick: 3 removable components allow the joystick to be perfectly tailored for left-handed or right-handed use."));

    displayStoreItems();
    dropDown();
    displayCartItems();
});

// display store items function
status.addEventListener('change', displayStoreItems);
function displayStoreItems() 
{
    var status = document.getElementById("displayFilter").value;
    document.getElementById("inventoryOutput").innerHTML = "";
    for (let index = 0; index < storeItems.length; index++) 
    {
        if (status === "All" || status === storeItems[index].category) 
        {
            inventoryDisplay(index);
        }
    }
}

viewItem.addEventListener('click' , review);

function review()
{
    var addItemId = document.getElementById("addItemId").value;
    customerReviews = "";
    var isValid = true;
    if (validateId() === false) 
    {
        isValid = false;
    }

    if (isValid === true)
    {
        document.getElementById("viewOutput").classList.remove("display");
        for (let x = 0; x < storeItems.length; x++) 
        {
            if (addItemId === storeItems[x].id)
            {
                var currentStore = storeItems[x].reviews;
                for (let y = 0; y < currentStore.length; y++) {
                    
                    customerReviews += "- " + currentStore[y] + "<br/>";
                    
                }
                reviewDisplay(x);
            }
            
        }
    }

}

// add item to cart Function
addItemBtn.addEventListener('click', addItemToCart)
function addItemToCart() {
    var cartOutput = document.getElementById("grid");
    var cartCheckout = document.getElementById("cartCheckout");
    var dispTime = document.getElementById("cartoutput");
    var addItemId = document.getElementById("addItemId").value;
    var addItemQty = document.getElementById("addItemQty").value;

    addItemQty = parseInt(addItemQty);
    var cartQty = parseInt(0);

    var isValid = true;

    if (validateId() === false) {
        isValid = false;
    }
    if (validateQt() === false) {
        isValid = false;
    }

    if (isValid === true) {
        var isFound = false;
        for (let index = 0; index < cartItems.length; index++) {
            if (addItemId === cartItems[index].id) {
                if (cartItems[index].qty >= cartItems[index].maxQty) 
                {
                    cartItems[index].qty = cartItems[index].maxQty;
                    messagE = "Maximum " + cartItems[index].maxQty + " items allowed per person";
                    message(messagE);
                }
                else {
                    cartItems[index].qty += addItemQty;
                    cartItems[index].shipping = cartItems[index].shipping * addItemQty;
                    cartMessage();
                }
                isFound = true;
            }
        } // cart items loop to find id
        if (isFound === false) 
        {
            for (let index = 0; index < storeItems.length; index++) {
                if (addItemId === storeItems[index].id) {
                    cartQty += addItemQty;
                    cartItems.push(new cartItem(storeItems[index].id, storeItems[index].price, cartQty, storeItems[index].shippingCost, storeItems[index].maxPerCustomer));
                    cartOutput.innerHTML = "";
                    shippingTotal += storeItems[index].shippingCost;
                }
            }
            cartMessage();
        }
        displayCartItems();
    }
}

removeItemBtn.addEventListener('click', remove);
function remove() 
{
    var addItemId = document.getElementById("addItemId").value;
    var addItemQty = document.getElementById("addItemQty").value;
    var isValid = true;
    var cartQty = parseInt(0);

    if (validateId() === false) 
    {
        isValid = false;
    }
    if (validateQt() === false) 
    {
        isValid = false;
    }

    if (isValid === true) {
        for (let index = 0; index < cartItems.length; index++) 
        {
            if (addItemId === cartItems[index].id && cartItems[index].qty <= 1)
            {
                shippingTotal = shippingTotal - cartItems[index].shipping;
                cartItems.splice(index, 1);
                document.getElementById("addItemId").value = "";
                document.getElementById("addItemQty").value = "";
                cartMessage();
            }
            else if (addItemId === cartItems[index].id) 
            {
                cartItems[index].qty -= 1;
                cartMessage();
            }
        } // cart items loop to find id
    }
    displayCartItems();
}



// Add review functionq
addReview.addEventListener('click', function()
{
    var reviewId = document.getElementById("reviewId");
    var reviewDesc = document.getElementById("reviewDesc");
    var isValid = true;
    if (validateReviewId() === false) 
    {
        isValid = false;
    }
    if (validateReview() === false) 
    {
        isValid = false;
    }

    if (isValid === true)
    {
        for (let x = 0; x < storeItems.length; x++)
        {
            var currentStore = storeItems[x];
            if (reviewId.value === currentStore.id)
            {
                currentStore.reviews.push(reviewDesc.value);  
                messagE = "Review Added!! <br/> Thank you for your feedback";
                message(messagE);
            }
            
        }// outter for loop

        reviewDesc.value = "";
        reviewId.value = "";
    }
});



function displayCartItems() {
    var cartOutput = document.getElementById("grid");
    var addItemId = document.getElementById("addItemId").value;
    cartOutput.innerHTML = "";

    //calucation variables
    var itemsTotal = 0;

    if (cartItems.length === 0) {
        cartOutput.innerHTML = "No items in cart!"
    }
    // string to number
    itemsTotal = parseFloat(itemsTotal);
    for (let index = 0; index < cartItems.length; index++) {
        cartDisplay(index);
        itemsTotal += (cartItems[index].price * cartItems[index].qty);
    }
    calculate(itemsTotal);
}


function calculate(elm) {

    var cartCheckout = document.getElementById("cartCheckout");
    subTotal = elm + shippingTotal;
    tax = subTotal * 0.13;
    total = subTotal + tax;
    cartCheckout.innerHTML = "Items Subotal: " + elm.toFixed(2) + "<br/>" + "Shipping Cost: " + shippingTotal.toFixed(2) + "<br/>" + "<br/>" + "Subtotal: " + subTotal.toFixed(2) + "<br/>" + "Tax: " + tax.toFixed(2) + "<br/>" + "Total: " + total.toFixed(2);
}



// Validations
// validate ID textbox
// addItemBtn.addEventListener('click', validateId);
function validateId() {
    var validate = true;
    var addItemId = document.getElementById("addItemId");

    if (addItemId.value.length === 0) {
        messagE = "Field Requiered";
        addItemId.style.border = "2px solid #F31431";
        validate = false;
    }
    else if (addItemId.value.indexOf(' ') !== -1) {
        messagE = "No spaces allowed";
        addItemId.style.border = "2px solid #F31431";
        validate = false;
    }
    else if (validateInput("addItemId") === false) {
        messagE = "Incorrect ID";
        addItemId.style.border = "2px solid #F31431";
        validate = false;
    }
    else {
        addItemId.style.border = "";
        validate = true;
    }

    if (validate === false)
    {
        message(messagE);
    }
    return validate;
}

// checks if the id is valid or not
function validateInput(elm) 
{
    var addItemId = document.getElementById(elm).value;
    for (let index = 0; index < storeItems.length; index++) 
    {
        if (addItemId === storeItems[index].id) 
        {
            return true;
        }
    }
    return false;
}

function validateReviewId() {
    var validate = true;
    var reviewId = document.getElementById("reviewId");
    var userOutput = document.getElementById("addQtyValidationMessage");
    if (reviewId.value.length === 0) 
    {
        messagE = "Field Requiered";
        reviewId.style.border = "2px solid #F31431";
        validate = false;
    }
    else if (reviewId.value.indexOf(' ') !== -1) 
    {
        messagE = "No spaces allowed";
        reviewId.style.border = "2px solid #F31431";
        validate = false;
    }
    else if (validateInput("reviewId") === false) 
    {
        messagE = "Incorrect ID";
        reviewId.style.border = "2px solid #F31431";
        reviewId.value = "";
        validate = false
    }
    else 
    {
        reviewId.style.border = "";
        validate = true;
    }

    if (validate === false)
    {
        message(messagE);
    }
    return validate;
}

// validates if the customer value is higher than maxper
function validateqty() 
{
    var addItemQty = document.getElementById("addItemQty").value;
    var addItemId = document.getElementById("addItemId").value;

    for (let index = 0; index < storeItems.length; index++) 
    {
        if (addItemId === storeItems[index].id && addItemQty > storeItems[index].maxPerCustomer) 
        {
            return true;
        }
        else if (addItemId === storeItems[index].id && addItemQty <= storeItems[index].maxPerCustomer) 
        {
            return false;
        }
    }
    return false;
}

// validate Quantity textbox
addItemBtn.addEventListener('click', validateQt);
function validateQt() 
{
    var validate = true;
    var addItemId = document.getElementById("addItemId").value;
    var addItemQty = document.getElementById("addItemQty");
    
    if (addItemQty.value.length === 0)
    {
        messagE = "Field Required";
        addItemQty.style.border = "2px solid rgb(79, 20, 243)";
        message(messagE);
        validate = false;
    }
    else if (addItemQty.value <= 0) {
        messagE = "Value must be greater than 0";
        addItemQty.style.border = "2px solid rgb(79, 20, 243)";
        message(messagE);
        validate = false;
    }
    else if (validateqty() === true) 
    {
        for (let index = 0; index < storeItems.length; index++) 
        {
            if (addItemId === storeItems[index].id) {
                messagE = "Allowed " + storeItems[index].maxPerCustomer + " items max per customer";
                message(messagE);
            }
        }
        validate = false;
    }
    else 
    {
        validate = true;
        addItemQty.style.border = "";
    }
    return validate;
}

function validateReview() {
    var validate = true;
    var reviewDesc = document.getElementById("reviewDesc");

    if (reviewDesc.value.length === 0) {
        messagE = "Field Requiered";
        message(messagE);
        reviewDesc.style.border = "2px solid rgb(79, 20, 243)";
        validate = false;
    }
    else {
        validate = true;
        reviewDesc.style.border = "";
    }
    return validate;
}

// Display functions
function inventoryDisplay(output) 
{
    document.getElementById("inventoryOutput").innerHTML += 
        "<div class='box'><strong>" + storeItems[output].id +
        "</strong><div class='image'><img src='images/" + storeItems[output].id + 
        ".jpg'></div><strong>" + storeItems[output].name + "</strong><ul><li>" + 
        storeItems[output].qty + " in Stock</li><li> &nbsp|&nbsp </li ><li>" + 
        storeItems[output].maxPerCustomer + " per person</li></ul><p> Category: " + 
        storeItems[output].category + "</p><br/><strong> $"
        + storeItems[output].price + "</strong></div>" ;
}

function cartDisplay(output)
{
    var cartOutput = document.getElementById("grid");
    cartOutput.innerHTML += "<div id='cartOutput'><section class='image'><img src='images/"+
        cartItems[output].id + ".jpg'></section><section class='cartId'>ID:" + cartItems[output].id + "</section><section class='cartPrice'> Price: $" + cartItems[output].price
        + "</section><section class='cartQty'> Qty: " + cartItems[output].qty + "</section><section class='cartSub'> Subtotal: " + (cartItems[output].price * cartItems[output].qty).toFixed(2)
        + "</section></div>";
}

function reviewDisplay(output)
{

    document.getElementById("reviewStyle").innerHTML = 
    "<h3 class='title'>" + storeItems[output].name + "</h3><div class='description'>" + storeItems[output].description +
    "</div><div class='content'><div class='info'>Product ID: " + storeItems[output].id + "<br/>Price: $" + storeItems[output].price +
    "<br/>Qty Available: " + storeItems[output].qty + "<br/>Max Per Customer: " + storeItems[output].maxPerCustomer + "<br/>Shipping Cost: " 
    + storeItems[output].shippingCost + "</div><div class='reviews'>Customer Reviews:<hr><br/>" + customerReviews + "</div></div>";    
}

// Event listeners cart
var cartIcon = document.querySelector(".cart");
cartIcon.addEventListener('click' , function()
{
    var element = document.getElementById("cartoutput");
    element.classList.remove("display");
});

var closeIcon = document.querySelector(".relv");
closeIcon.addEventListener('click', function () {
    var element = document.getElementById("cartoutput");
    element.classList.add("display");
});


// Dropdown function
function dropDown() 
{
    var dropDown = document.getElementById("displayFilter");

    for (var x = 0; x < storeItems.length; x++) 
    {
        var storeItm = storeItems[x];
        var matchFound = false;

        for (var y = 0; y < dropDown.childNodes.length; y++) 
        {
            var col = dropDown.childNodes[y].value;

            if (col === storeItm.category) 
            {
                matchFound = true;
                break;
            }
        } // inner for loop

        if (matchFound === false) 
        {
            var newElement = document.createElement("option");
            newElement.innerHTML = storeItm.category;
            dropDown.appendChild(newElement);
        }
    } // outter for loop
}


// Timers
function cartMessage()
{
    var element = document.getElementById("cartoutput");
    element.classList.remove("display");
    carTMessages();
}

function carTMessages() {
    setTimeout(function () 
    {
        var element = document.getElementById("cartoutput");
        element.classList.add("display");
    }, 1000);
}

function message(elm)
{
    var element = document.getElementById("display");
    var userOutput = document.getElementById("addIDValidationMessage");
    userOutput.innerHTML = elm;
    element.classList.remove("display");
    errorMessages();
}

function errorMessages()
{
    setTimeout(function() {
        var element = document.getElementById("display");
        element.classList.add("display");

    }, 2000);
}


var block = document.querySelector(".block");
block.addEventListener('click', function () {
    var element = document.getElementById("viewOutput");
    element.classList.add("display");
});


// sticky adder function
var element = document.getElementById("left");
window.onscroll = function sticky() 
{
    var y = window.scrollY;
    if (y === 0) 
    {
        element.classList.remove("sticky");
    }
    else {
        element.classList.add("sticky");
    }
}