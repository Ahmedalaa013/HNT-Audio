// ------------Hamburger Menu-------------
const mainMenu = document.querySelector(".mainMenu");
const closeMenu = document.querySelector(".closeMenu");
const openMenu = document.querySelector(".openMenu");
const card = document.querySelectorAll(".card");
const btn3 = document.querySelector(".btn3");
const icon = document.querySelector(".svg-icon");

card.forEach(item => {
  item.addEventListener("mouseenter", function () {
    item.classList.add("show");
  });
  item.addEventListener("mouseleave", function () {
    item.classList.remove("show");
  });
});

openMenu.addEventListener("click", show);
closeMenu.addEventListener("click", close);

function show() {
  mainMenu.style.display = "flex";
  mainMenu.style.top = "0";
}
function close() {
  mainMenu.style.top = "-110%";
}
// ---------------cart-------------
const localStorage = window.localStorage;
const product = document.querySelectorAll(".btn");
const number = document.querySelector(".cart-items");
const cart = document.getElementById("cartIcon");
const cartClose = document.getElementById("close-cart");
const titleTag = document.getElementById("productTitle");
const bef = document.getElementById("before");
const remove = document.getElementById("remove");
const tag = titleTag.getAttribute("title");
const title = document.title;
const price = document.getElementById("price").innerHTML;
const popContent = document.getElementById("pCon");
const check = document.getElementById("checked");
let counter = 0;
let proCounter = 1;

const cartItems = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

counter = cartItems.reduce((acc, item) => {
  return item.count + acc;
}, 0);
number.innerHTML = counter;

// -------------Total Price UI-----------------------
let totalPrice = document.createElement("div");
totalPrice.id = "total";
bef.insertAdjacentElement("beforebegin", totalPrice);
let text = document.createElement("p");
text.id = "totalPrice";
const sum = document.getElementById("total");
let sumNumber = document.createElement("span");
sumNumber.id = "sumNumber";
sum.insertAdjacentElement("afterbegin", sumNumber);
sum.insertAdjacentElement("afterbegin", text);

// ---------------------------------
product.forEach(item => {
  item.addEventListener("click", function () {
    const cartItems = localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [];

    const itemIndex = cartItems.findIndex(item => item.tag === tag);
    console.log(itemIndex);
    if (itemIndex === -1) {
      cartItems.push({
        tag: tag,
        title: title,
        price: price,
        count: 1,
      });
    } else {
      cartItems[itemIndex].count += 1;
    }
    counter = cartItems.reduce((acc, item) => {
      return item.count + acc;
    }, 0);
    number.innerHTML = counter;

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  });
});
cart.addEventListener("click", function () {
  let cartItems = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];
  console.log(cartItems);

  cartItems.forEach(item => {
    const element = document.getElementById(`in${item.tag}`);
    if (element) {
      element.getElementsByClassName("proCount")[0].innerHTML = `${item.count}`;
      return;
    }
    let div = document.createElement("div");
    div.classList.add("in");
    div.id = `in${item.tag}`;
    sum.insertAdjacentElement("beforebegin", div);

    const name = document.getElementById(`in${item.tag}`);
    let para = document.createElement("div");
    let i = document.createElement("span");
    let p = document.createElement("i"); //----plus sign
    let m = document.createElement("i"); // ---minus sign
    let count = document.createElement("span");

    name.insertAdjacentElement("afterbegin", p);
    name.insertAdjacentElement("afterbegin", count);
    name.insertAdjacentElement("afterbegin", m);
    name.insertAdjacentElement("afterbegin", para);
    name.insertAdjacentElement("afterbegin", i);

    para.classList.add("align");
    i.classList.add("pic");
    p.classList.add("fa");
    p.classList.add("fa-plus");
    p.id = `${item.tag}`;
    m.classList.add("fa");
    m.classList.add("fa-minus");
    m.id = `${item.tag}`;
    count.classList.add("proCount");

    // ------ Increasing number of items on clicking plus-----------
    p.addEventListener("click", function () {
      const cartItems = localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [];

      const itemIndex = cartItems.findIndex(item => item.tag == p.id);
      console.log(itemIndex);
      if (itemIndex === -1) {
        cartItems.push({
          tag: tag,
          title: title,
          price: price,
          count: 1,
        });
      } else {
        cartItems[itemIndex].count += 1;
      }
      counter = cartItems.reduce((acc, item) => {
        return item.count + acc;
      }, 0);
      number.innerHTML = counter;

      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      item.count++;
      count.innerHTML = `${item.count}`;
      function byCount(item) {
        let total = [];
        cartItems.forEach(item => total.push(item.count * item.price));
        const reducer = (accumulator, currentValue) =>
          accumulator + currentValue;
        sumNumber.textContent = `$${total.reduce(reducer)}`;
      }
      Object.entries(cartItems.filter(byCount));
    });

    // ------ Decreasing number of items on clicking minus---------
    m.addEventListener("click", function () {
      if (item.count >= 1) {
        let cartItems = localStorage.getItem("cartItems")
          ? JSON.parse(localStorage.getItem("cartItems"))
          : [];
        const itemIndex = cartItems.findIndex(item => item.tag == m.id);
        console.log(itemIndex);
        console.log(cartItems[itemIndex].tag);
        if (m.id == cartItems[itemIndex].tag) {
          cartItems[itemIndex].count -= 1;
          item.count -= 1;
          counter = cartItems.reduce((acc, item) => {
            return item.count + acc;
          }, 0);
          if (item.count < 1) {
            cartItems = cartItems.filter(x => {
              console.log(item.tag);
              console.log(x.tag);
              return item.tag != x.tag;
            });
            console.log(cartItems);
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
            name.parentNode.removeChild(name);
          }
          number.innerHTML = counter;
        } else {
          return;
        }
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
      } else {
        return;
      }
      count.innerHTML = `${item.count}`;
      function byCount(item) {
        let total = [];
        cartItems.forEach(item => total.push(item.count * item.price));
        const reducer = (accumulator, currentValue) =>
          accumulator + currentValue;
        sumNumber.textContent = `$${total.reduce(reducer)}`;
      }
      Object.entries(cartItems.filter(byCount));
    });

    // -------Cart UI Dynamic update------------
    i.innerHTML = `<img src="../styles/cart/${item.tag}.png" alt="pic" id="pic">`;
    para.innerHTML = `<p id= "proName"  <b>${item.title}</b></p>
      <p id= "proPrice"  <b>$${item.price}</b></p>`;
    count.innerHTML = `${item.count}`;
    text.textContent = "TOTAL";

    //------------ Remove all items-----------
    remove.addEventListener("click", function () {
      if (document.querySelector(".in")) {
        document.querySelector(".in").remove();
        localStorage.removeItem("cartItems");
        number.innerHTML = 0;
        counter = 0;
        sumNumber.textContent = `$0`;
      } else {
        return;
      }
    });
  });

  // ------- Total price Calculation--------------
  document.querySelector(".popup").style.display = "flex";
  function byCount(item) {
    let total = [];
    cartItems.forEach(item => total.push(item.count * item.price));
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    sumNumber.textContent = `$${total.reduce(reducer)}`;
  }
  Object.entries(cartItems.filter(byCount));
});

cartClose.addEventListener("click", function () {
  document.querySelector(".popup").style.display = "none";
});

// checkout Button
bef.addEventListener("click", function () {
  if (document.querySelector(".in") == null) {
    return;
  } else {
    popContent.style.display = "none";
    check.style.display = "flex";
    document.querySelector(".in").remove();
    localStorage.removeItem("cartItems");
    number.innerHTML = 0;
    counter = 0;
  }
});
