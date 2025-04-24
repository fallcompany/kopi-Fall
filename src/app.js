document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    items: [
      { id: 1, name: "Coffee Beans", img: "1.jpg", price: 30000 },
      { id: 2, name: "Biji kopi arabica", img: "5.jpg", price: 21000 },
      
    ],
  }));

  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      // cek udah sama belom di cart
      const cartItem = this.items.find((item) => item.id === newItem.id);

      // jika belum ada / cart kosong
      if (!cartItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        //jika brg udh ada di cart, apa barang beda atau sama dengan yg ada di cart
        this.items = this.items.map((item) => {
          //jika barang  beda
          if (item.id !== newItem.id) {
            return item;
          } else {
            //jika barang udh ada, tambah quantity dan totalnya
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++;
            this.total += item.price;
            return item;
          }
        });
      }
    },
    remove(id) {
      // ambil  item yg mau di remove berdasarkan id nya
      const cartItem = this.items.find((item) => item.id === id);

      // jika item lebih dari 1
      if (cartItem.quantity > 1) {
        // telusuri 1 1
        this.items = this.items.map((item) => {
          //jika buka brg yg diklik
          if (item.id !== id) {
            return item;
          } else {
            item.quantity--;
            item.total = item.price * item.quantity;
            this.quantity--;
            this.total -= item.price;
            return item;
          }
        });
      } else if (cartItem.quantity === 1) {
        //jika brg sisa 1
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= cartItem.price;
      }
    },
  });
});

//form validation
const checkoutButton = document.querySelector(".checkout-button");
checkoutButton.disabled = true;

const form = document.querySelector("#checkoutForm");

form.addEventListener("keyup", function () {
  for (let i = 0; i < form.elements.length; i++) {
    if (form.elements[i].value.length !== 0) {
      checkoutButton.classList.remove("disabled");
      checkoutButton.classList.add("disabled");
    } else {
      return false;
    }
  }
  checkoutButton.disabled = false;
  checkoutButton.classList.remove("disabled");
});

//kirim data pas tombol checkout di klik
checkoutButton.addEventListener("click", function (e) {
  e.preventDefault();
  const formData = new FormData(form);
  const data = new URLSearchParams(formData);
  const objData = Object.fromEntries(data);
  const message = formatMessage(objData);
  window.open(
    "https://wa.me/6281511004406?text=" + encodeURIComponent(message)
  );
});

// Format pesan wa
const formatMessage = (obj) => {
  let total = 0;

  console.log("Objek yang dikirim ke formatMessage:", obj);
  console.log("Total sebelum format:", obj.total);

  // Pastikan obj.items tidak undefined atau null
  if (!obj.items) {
    console.error("Error: obj.items tidak ada!");
    return "Data Pesanan tidak ditemukan.";
  }

  let items = obj.items;

  // Cek apakah items adalah string, jika iya coba parse
  if (typeof obj.items === "string") {
    try {
      items = JSON.parse(obj.items);
    } catch (error) {
      console.error("Error parsing obj.items:", error);
      return "Data Pesanan tidak valid.";
    }
  }

  // Jika items adalah angka, langsung jadikan total
  if (typeof items === "number") {
    total = items;
  }
  // Jika items adalah array, hitung totalnya
  else if (Array.isArray(items)) {
    total = items.reduce((acc, item) => acc + (Number(item.total) || 0), 0);
  } else {
    console.error("Error: Parsed items is not an array", items);
    return "Data Pesanan tidak valid.";
  }

  console.log("Total setelah dihitung dari items:", total);

  return `Data Customer
Nama: ${obj.name}
Email: ${obj.email}
No HP: ${obj.phone}

Data Pesanan:
 
${
  Array.isArray(items)
    ? items
        .map((item) => `${item.name} (${item.quantity} x Rp ${item.total})`)
        .join(", ")
    : "Tidak ada detail item"
}
    
TOTAL: Rp ${total.toLocaleString("id-ID")}
Terima Kasih.`;
};

// Konversi ke Rupiah
const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};
