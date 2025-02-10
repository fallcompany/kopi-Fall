document.addEventListener('alpine:init', () => {
    Alpine.data('products', () => ({
       items: [
        { id: 1, name: 'Coffee Beans', img: '1.jpg', price: 30000 },
        { id: 2, name: 'Gas 3 Kg', img: '2.jpg', price: 21000 },
        { id: 3, name: 'Bijih Timah', img: '3.jpg', price: 300000000000000 },
        { id: 4, name: 'Sosok?????', img: '4.jpg', price: 999000 },
        { id: 5, name: 'Biji Kopi Arabica', img: '5.jpg', price: 50000 },

       ],
    }));


    Alpine.store('cart', {
        items: [],
        total: 0,
        quantity: 0,
        add(newItem) {
            // cek udah sama belom di cart
            const cartItem = this.items.find((item) => item.id === newItem.id);

            // jika belum ada / cart kosong
            if(!cartItem) {
                this.items.push({ ...newItem, quantity: 1, total: newItem.price });
                this.quantity++;
                this.total += newItem.price;

            } else {
                //jika brg udh ada di cart, apa barang beda atau sama dengan yg ada di cart
                this.items = this.items.map((item) => {
                    //jika barang  beda 
                    if(item.id !== newItem.id) {
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
            if(cartItem.quantity > 1) {
                // telusuri 1 1
                this.items = this.items.map((item) => {
                    //jika buka brg yg diklik
                    if(item.id !== id) {
                        return item;
                    } else {
                        item.quantity--;
                        item.total = item.price * item.quantity;
                        this.quantity--;
                        this.total -= item.price;
                        return item;
                    }
                })
            } else if (cartItem.quantity === 1) {
                //jika brg sisa 1
                this.items = this.items.filter((item) => item.id !== id);
                this.quantity--;
                this.total -= cartItem.price;
            }
        }
    });
});


// Konversi ke Rupiah
const rupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,

    }).format(number);
};