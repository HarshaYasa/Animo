// Product Data
const products = [
    {
        id: 1,
        name: "Premium Dog Food",
        price: 1499,
        image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        description: "High-quality dog food with essential nutrients"
    },
    {
        id: 2,
        name: "Cat Food Deluxe",
        price: 1299,
        image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        description: "Premium cat food for optimal health"
    },
    {
        id: 3,
        name: "Bird Food Mix",
        price: 899,
        image: "https://images.unsplash.com/photo-1444464666168-49d633b86797?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        description: "Nutritious blend for pet birds"
    }
];

// Shopping Cart
let cart = [];

// DOM Elements
const productsContainer = document.getElementById('products-container');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const userInput = document.getElementById('user-input');
const sendMessage = document.getElementById('send-message');
const chatMessages = document.getElementById('chat-messages');

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    setupEventListeners();
});

// Load products into the products section
function loadProducts() {
    productsContainer.innerHTML = products.map(product => `
        <div class="col-md-4">
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}" class="product-image w-100">
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="text-muted">${product.description}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="product-price">₹${product.price.toLocaleString('en-IN')}</span>
                        <button class="btn btn-primary" onclick="addToCart(${product.id})">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Setup event listeners
function setupEventListeners() {
    // Cart button click
    document.querySelector('a[href="#cart"]').addEventListener('click', (e) => {
        e.preventDefault();
        showCart();
    });

    // Send message button click
    sendMessage.addEventListener('click', handleUserMessage);

    // Enter key in chat input
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleUserMessage();
        }
    });

    // Consultation form submit
    document.getElementById('consultation-form').addEventListener('submit', handleConsultationSubmit);
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        updateCart();
        showNotification('Product added to cart!');
    }
}

// Update cart display
function updateCart() {
    cartItems.innerHTML = cart.map(item => `
        <div class="d-flex justify-content-between align-items-center mb-3">
            <div>
                <h6 class="mb-0">${item.name}</h6>
                <small class="text-muted">₹${item.price.toLocaleString('en-IN')}</small>
            </div>
            <button class="btn btn-sm btn-danger" onclick="removeFromCart(${item.id})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    cartTotal.textContent = `₹${total.toLocaleString('en-IN')}`;
}

// Remove product from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
    showNotification('Product removed from cart!');
}

// Show cart modal
function showCart() {
    const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
    cartModal.show();
}

// Handle consultation form submit
function handleConsultationSubmit(e) {
    e.preventDefault();
    showNotification('Consultation request submitted successfully!');
    e.target.reset();
}

// Handle user message in chatbot
function handleUserMessage() {
    const message = userInput.value.trim();
    if (message) {
        addMessage(message, 'user');
        userInput.value = '';
        
        // Simulate bot response
        setTimeout(() => {
            const response = getBotResponse(message);
            addMessage(response, 'bot');
        }, 1000);
    }
}

// Add message to chat
function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    messageDiv.textContent = text;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Get bot response
function getBotResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('food') || lowerMessage.includes('feed')) {
        return "We offer a variety of premium pet foods. Would you like to see our products?";
    }
    else if (lowerMessage.includes('sick') || lowerMessage.includes('ill')) {
        return "I'm sorry to hear that. Would you like to book a consultation with our veterinarians?";
    }
    else if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
        return "Our prices vary depending on the product. You can check our product section for detailed pricing.";
    }
    else if (lowerMessage.includes('delivery') || lowerMessage.includes('shipping')) {
        return "We offer free delivery on orders over ₹2000. Standard delivery takes 2-3 business days.";
    }
    else {
        return "I'm here to help! You can ask me about our products, services, or book a consultation.";
    }
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'alert alert-success position-fixed top-0 end-0 m-3';
    notification.style.zIndex = '1000';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
} 