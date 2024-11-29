// Creates Vue instance to control the app
new Vue({
  el: "#app",
  data: {
    //[------ Main data properties for the application ------ ]
    sitename: "N! Learning",
    showCart: false,
    cart: [],
    name: "",
    phone: "",
    searchQuery: "", 
    sortAttribute: "subject",
    sortOrder: "asc",
    lessons: [
      {
        id: 1,
        subject: "Math",
        location: "London",
        price: 10000,
        spaces: 5,
        image: "img/maths.png",
      },
      {
        id: 2,
        subject: "English",
        location: "London",
        price: 12000,
        spaces: 5,
        image: "img/english.png",
      },
      {
        id: 3,
        subject: "Science",
        location: "Oxford",
        price: 15000,
        spaces: 5,
        image: "img/science.png",
      },
      {
        id: 4,
        subject: "History",
        location: "Bristol",
        price: 9000,
        spaces: 5,
        image: "img/history.png",
      },
      {
        id: 5,
        subject: "Music",
        location: "Bristol",
        price: 8000,
        spaces: 5,
        image: "img/music.png",
      },
      {
        id: 6,
        subject: "Art",
        location: "York",
        price: 8500,
        spaces: 5,
        image: "img/art.png",
      },
      {
        id: 7,
        subject: "Geography",
        location: "London",
        price: 9500,
        spaces: 5,
        image: "img/geography.png",
      },
      {
        id: 8,
        subject: "PE",
        location: "Oxford",
        price: 11000,
        spaces: 5,
        image: "img/pe.png",
      },
      {
        id: 9,
        subject: "Math",
        location: "Oxford",
        price: 12000,
        spaces: 5,
        image: "img/maths.png",
      },
      {
        id: 10,
        subject: "English",
        location: "York",
        price: 10000,
        spaces: 5,
        image: "img/english.png",
      },
    ],
  },
  computed: {
        // Computed properties to calculate values
    //[------ Filters lessons based on the search query and sort them ------]
    filteredLessons() {
      const query = this.searchQuery.toLowerCase();
      return this.lessons
        .filter((lesson) => {
            //[------ Matchs lessons against subject, location, or price ------]
          return (
            lesson.subject.toLowerCase().includes(query) ||
            lesson.location.toLowerCase().includes(query) ||
            lesson.price.toString().includes(query)
          );
        })
        .sort((a, b) => {
          //[------ Sorts the lessons based on the selected attribute and order ------]
          let modifier = this.sortOrder === "asc" ? 1 : -1;
          if (this.sortAttribute === "subject") {
            return a.subject.localeCompare(b.subject) * modifier;
          } else if (this.sortAttribute === "location") {
            return a.location.localeCompare(b.location) * modifier;
          } else if (this.sortAttribute === "price") {
            return (a.price - b.price) * modifier;
          } else if (this.sortAttribute === "spaces") {
            return (a.spaces - b.spaces) * modifier;
          }
        });
    },
   //[------ Filters the lessons that have spaces------]
    availableLessons() {
      return this.filteredLessons.filter((lesson) => lesson.spaces > 0);
    },
   //[------ Filters the lessons don't have spaces------]
    unavailableLessons() {
      return this.filteredLessons.filter((lesson) => lesson.spaces === 0);
    },
   //[------ Calculates how many items in cart------]
    cartItemCount() {
      return this.cart.length;
    },
   //[------ Calculates total price ------]
    cartTotal() {
      return this.cart.reduce((total, lesson) => total + lesson.price, 0);
    },
   //[------ Verifies if user can checkout------]
    canCheckout() {
      return /^[A-Za-z\s]+$/.test(this.name) && /^[0-9]+$/.test(this.phone);
    },
  },
  methods: {
    // Methods to handle user actions
       
    //[------ Shows/hides cart page ------]
    toggleCart() {
      this.showCart = !this.showCart;
    },
    //[------ Adds lessons to cart------]
    addToCart(lesson) {
      if (lesson.spaces > 0) {
        this.cart.push(lesson);
        lesson.spaces--; 
      }
    },
    //[------ Removes lessons from cart------]
    removeFromCart(lesson) {
      const index = this.cart.indexOf(lesson);
      if (index !== -1) {
        this.cart.splice(index, 1); 
        lesson.spaces++; 
      }
    },
    placeOrder() {
   //[------ Verifies if user can checkout------]
   if (!this.canCheckout) {
        alert("Please provide valid information.");
        return;
      }
   //[------ Prepares the lessons to be sent in the request------]
      const lessons = this.cart.map((lesson) => ({
        lessonId: lesson.id,
        quantity: 1, 
      }));
   //[------ Logs the data to ensure it's correct------]
      console.log("Order data being sent:", {
        name: this.name,
        phone: this.phone,
        lessons: lessons,
      });
   //[------ Sends POST request to the '/' endpoint (in backend)------]
      fetch("http://localhost:5000", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: this.name,
          phone: this.phone,
          lessons: lessons, 
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to place order");
          }
          return response.json();
        })
        .then((data) => {
    //[------ Clears the cart and resets the form only after the order is successful------]
          console.log("Order created successfully:", data);
    //[------ Logs the response data------]
          this.cart = [];
          this.name = "";
          this.phone = "";

          alert("Order submitted successfully!");
        })
        .catch((error) => {
    //[------ Error handling ------]
          console.error("Error placing order:", error);
          alert("Failed to place the order. Please try again.");
        });
    },

    validateName() {},
    validatePhone() {},
  },

  filters: {
    formatPrice(price) {
      return `£${(price / 100).toFixed(2)}`;
    },
  },
});
    //[------ DOMContentLoaded allows the fetchLessons call to run when the page is loaded ------]
document.addEventListener("DOMContentLoaded", () => {
  fetchLessons();
});
