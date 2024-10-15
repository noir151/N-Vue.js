new Vue({
    el: '#app',
    data: {
      sitename: "N! Learning",
      showCart: false,
      cart: [],
      name: '',
      phone: '',
      sortAttribute: 'subject',
      sortOrder: 'asc',
      lessons: [
        { id: 1, subject: "Math", location: "London", price: 10000, spaces: 5, icon: "fas fa-calculator" },
        { id: 2, subject: "English", location: "London", price: 12000, spaces: 5, icon: "fas fa-book" },
        { id: 3, subject: "Science", location: "Oxford", price: 15000, spaces: 5, icon: "fas fa-flask" },
        { id: 4, subject: "History", location: "Bristol", price: 9000, spaces: 5, icon: "fas fa-landmark" },
        { id: 5, subject: "Music", location: "Bristol", price: 8000, spaces: 5, icon: "fas fa-music" },
        { id: 6, subject: "Art", location: "York", price: 8500, spaces: 5, icon: "fas fa-paint-brush" },
        { id: 7, subject: "Geography", location: "London", price: 9500, spaces: 5, icon: "fas fa-globe" },
        { id: 8, subject: "PE", location: "Oxford", price: 11000, spaces: 5, icon: "fas fa-dumbbell" },
        { id: 9, subject: "Math", location: "Oxford", price: 12000, spaces: 5, icon: "fas fa-calculator" },
        { id: 10, subject: "English", location: "York", price: 10000, spaces: 5, icon: "fas fa-book" }
      ]
    },
    computed: {
      sortedLessons() {
        return this.lessons.sort((a, b) => {
          let modifier = this.sortOrder === 'asc' ? 1 : -1;
          if (this.sortAttribute === 'subject') {
            return a.subject.localeCompare(b.subject) * modifier;
          } else if (this.sortAttribute === 'location') {
            return a.location.localeCompare(b.location) * modifier;
          } else if (this.sortAttribute === 'price') {
            return (a.price - b.price) * modifier;
          } else if (this.sortAttribute === 'spaces') {
            return (a.spaces - b.spaces) * modifier;
          }
        });
      },
      cartItemCount() {
        return this.cart.length;
      },
      cartTotal() {
        return this.cart.reduce((total, lesson) => total + lesson.price, 0);
      },
      canCheckout() {
        return /^[A-Za-z\s]+$/.test(this.name) && /^[0-9]+$/.test(this.phone);
      }
    },
    methods: {
      toggleCart() {
        this.showCart = !this.showCart;
      },
      addToCart(lesson) {
        if (lesson.spaces > 0) {
          this.cart.push(lesson);
          lesson.spaces--;
        }
      },
      removeFromCart(lesson) {
        const index = this.cart.indexOf(lesson);
        if (index !== -1) {
          this.cart.splice(index, 1);
          lesson.spaces++;
        }
      },
      checkout() {
        alert('Order Submitted!');
        this.cart = [];
        this.name = '';
        this.phone = '';
      },
      validateName() {
        // Name validation logic
      },
      validatePhone() {
        // Phone validation logic
      }
    },
    filters: {
      formatPrice(price) {
        return `£${(price / 100).toFixed(2)}`;
      }
    }
  });
  