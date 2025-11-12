const registerButton = document.getElementById('register');
const loginButton = document.getElementById('login');
const container = document.getElementById('container');

// ফ্লিপ অ্যানিমেশনের জন্য আপনার আগের কোড
registerButton.onclick = function () {
    container.className = 'active';
};

loginButton.onclick = function () {
    container.className = 'close';
};

// --- নতুন কোড শুরু ---

// ফর্ম এলিমেন্ট এবং মেসেজ স্প্যান সিলেক্ট করা
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const loginMessage = document.getElementById('login-message');
const registerMessage = document.getElementById('register-message');

// রেজিস্ট্রেশন ফর্ম সাবমিট হ্যান্ডলার
registerForm.addEventListener('submit', function (event) {
    event.preventDefault(); // ফর্মের ডিফল্ট সাবমিট বন্ধ করা

    // ইনপুট ভ্যালুগুলো নেওয়া
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    // সার্ভারে ডেটা পাঠানো (Fetch API)
    fetch('register.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            email: email,
            password: password,
        }),
    })
    .then(response => response.json())
    .then(data => {
        // সার্ভার থেকে আসা রেসপন্স দেখানো
        registerMessage.textContent = data.message;
        if (data.success) {
            registerMessage.style.color = 'green';
            // সফল হলে ফর্ম রিসেট করা
            registerForm.reset();
            // ২ সেকেন্ড পর লগইন প্যানেলে ফ্লিপ করানো
            setTimeout(() => {
                 container.className = 'close';
            }, 2000);
        } else {
            registerMessage.style.color = 'red';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        registerMessage.textContent = 'An error occurred. Please try again.';
        registerMessage.style.color = 'red';
    });
});

// লগইন ফর্ম সাবমিট হ্যান্ডলার
loginForm.addEventListener('submit', function (event) {
    event.preventDefault(); // ফর্মের ডিফল্ট সাবমিট বন্ধ করা

    // ইনপুট ভ্যালুগুলো নেওয়া
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    // সার্ভারে ডেটা পাঠানো (Fetch API)
    fetch('login.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password,
        }),
    })
    .then(response => response.json())
    .then(data => {
        // সার্ভার থেকে আসা রেসপন্স দেখানো
        loginMessage.textContent = data.message;
        if (data.success) {
            loginMessage.style.color = 'green';
            loginForm.reset();
            // এখানে আপনি ইউজারকে অন্য পেজে রিডাইরেক্ট করতে পারেন
            // যেমন: window.location.href = 'dashboard.php';
            alert(data.message); // আপাতত একটি অ্যালার্ট দেখানো হলো
        } else {
            loginMessage.style.color = 'red';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        loginMessage.textContent = 'An error occurred. Please try again.';
        loginMessage.style.color = 'red';
    });
});