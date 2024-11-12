new Vue({
  el: '#app',
  data: {
    sitename: "N! Learning",
    showCart: false,
    cart: [],
    name: '',
    phone: '',
    searchQuery: '',  // New data property for search input
    sortAttribute: 'subject',
    sortOrder: 'asc',
    lessons: [
      { id: 1, subject: "Math", location: "London", price: 10000, spaces: 5, image: "img/maths.png" },
      { id: 2, subject: "English", location: "London", price: 12000, spaces: 5, image: "img/english.png" },
      { id: 3, subject: "Science", location: "Oxford", price: 15000, spaces: 5, image: "img/science.png" },
      { id: 4, subject: "History", location: "Bristol", price: 9000, spaces: 5, image: "img/history.png" },
      { id: 5, subject: "Music", location: "Bristol", price: 8000, spaces: 5, image: "img/music.png" },
      { id: 6, subject: "Art", location: "York", price: 8500, spaces: 5, image: "img/art.png" },
      { id: 7, subject: "Geography", location: "London", price: 9500, spaces: 5, image: "img/geography.png" },
      { id: 8, subject: "PE", location: "Oxford", price: 11000, spaces: 5, image: "img/pe.png" },
      { id: 9, subject: "Math", location: "Oxford", price: 12000, spaces: 5, image: "img/maths.png" },
      { id: 10, subject: "English", location: "York", price: 10000, spaces: 5, image: "img/english.png" }
    ]
  },
  computed: {
    filteredLessons() {
      const query = this.searchQuery.toLowerCase();
      return this.lessons.filter(lesson => {
        return (
          lesson.subject.toLowerCase().includes(query) ||
          lesson.location.toLowerCase().includes(query) ||
          lesson.price.toString().includes(query)
        );
      }).sort((a, b) => {
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
    availableLessons() {
      return this.filteredLessons.filter(lesson => lesson.spaces > 0);
    },
    unavailableLessons() {
      return this.filteredLessons.filter(lesson => lesson.spaces === 0);
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
    validateName() {},
    validatePhone() {}
  },
  filters: {
    formatPrice(price) {
      return `£${(price / 100).toFixed(2)}`;
    }
  }
});
