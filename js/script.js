// Toogle class active untuk hamburger menu
const navbarNav = document.querySelector('.navbar-nav');
//ketika hamburger-menu di klik
document.querySelector('#hamburger-menu').onclick = () => {
    navbarNav.classList.toggle('active');
};

// Toogle class active untuk shopping cart button
const shoppingCart = document.querySelector('.shopping-cart');

document.querySelector('#shopping-cart-button').onclick = (e) => {
    shoppingCart.classList.toggle('active');
    e.preventDefault();

};


// Toogle class active untuk search form
const searchForm = document.querySelector('.search-form');
const searchBox = document.querySelector('#search-box');

document.querySelector('#search-button').onclick = (e) => {
    searchForm.classList.toggle('active');
    searchBox.focus();
    e.preventDefault();
};


// klik diluar elemen
const hm = document.querySelector('#hamburger-menu');
const sb = document.querySelector('#search-button');
const shc = document.querySelector('#shopping-cart-button');

document.addEventListener('click', function(e) {
    if(!hm.contains(e.target) && !navbarNav.contains(e.target)) {
        navbarNav.classList.remove('active');
    }
    if(!sb.contains(e.target) && !searchForm.contains(e.target)) {
        searchForm.classList.remove('active');
    }
    if(!shc.contains(e.target) && !shoppingCart.contains(e.target)) {
        shoppingCart.classList.remove('active');
    }
});




// modal box
const itemDetailModal = document.querySelector('#item-detail-modal');
const itemDetailButtons = document.querySelectorAll('.item-detail-button');

itemDetailButtons.forEach((btn) => {
    btn.onclick = (e) => {
        e.preventDefault();
        
        // Ambil data produk dari elemen terkait
        let productCard = btn.closest('.product-card'); // Ambil elemen induk produk
        let productImage = productCard.querySelector('.product-image img').src;
        let productTitle = productCard.querySelector('.product-content h3').innerText;
       
        let productPrice = productCard.querySelector('.product-price').innerHTML;
        let productStars = productCard.querySelector('.product-stars').innerHTML;
        // Masukkan data ke dalam modal
        document.querySelector('#item-detail-modal .modal-content img').src = productImage;
        document.querySelector('#item-detail-modal .product-content h3').innerText = productTitle;
        document.querySelector('#item-detail-modal .product-price').innerHTML = productPrice;
        document.querySelector('#item-detail-modal .product-stars').innerHTML = productStars;
        
        // Tampilkan modal
        itemDetailModal.style.display = 'flex';
    };
});



// Klik M0dal close
document.querySelectorAll('.modal .close-icon').forEach(close => {
    close.onclick = (e) => {
        itemDetailModal.style.display = 'none';
        e.preventDefault();
    };
});




//klik diluar modal

window.onclick = (e) => {
    if (e.target === itemDetailModal) {
        itemDetailModal.style.display = 'none';
    }
}

