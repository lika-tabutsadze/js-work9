// regex patterns
const patterns = {
    name: /^[a-zA-Z]{2,30}$/, 
    email: /^[^@]+@[^@]+$/,
    phone: /^5\d{8}$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
};

const form = document.getElementById("registrationForm");
const successBanner = document.getElementById("successBanner");

const fields = {
    name: document.getElementById("name"),
    email: document.getElementById("email"),
    phone: document.getElementById("phone"),
    password: document.getElementById("pass")
};

const messages = {
    name: document.getElementById("nameMsg"),
    email: document.getElementById("emailMsg"),
    phone: document.getElementById("phoneMsg"),
    password: document.getElementById("passMsg")
};

const errorTexts = {
    name: 'სახელი უნდა შეიცავდეს მხოლოდ ლათინურ ასოებს (2-30 სიმბოლო)',
    email: 'შეყვანილი მეილი არასწორია, სცადეთ ხელახლა',
    phone: 'შეყვანილი ნომერი არასწორია, სცადეთ ხელახლა',
    password: 'პაროლი უნდა შეიცავდეს მინ. 8 სიმბოლოს, დიდ და პატარა ასოებს, ციფრს და სიმბოლოს'
};

function validateField(key) {
    const input = fields[key];
    const value = input.value.trim();
    const isValid = patterns[key].test(value);

    if (value === "") {
        input.classList.remove("error", "success");
        messages[key].textContent = "";
        messages[key].className = "msg";
        return false;
    }

    if (isValid) {
        input.classList.remove("error");
        input.classList.add("success");
        messages[key].textContent = "";
        messages[key].className = "msg success";
    } else {
        input.classList.remove("success");
        input.classList.add("error");
        messages[key].textContent = errorTexts[key]; 
        messages[key].className = "msg error";
    }
    return isValid;
}


Object.keys(fields).forEach((key) => {
    fields[key].addEventListener("input", () => validateField(key));
});

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const results = Object.keys(fields).map((key) => validateField(key));
    const allValid = results.every((r) => r === true);

    if (allValid) {
        successBanner.style.display = "block";
        form.reset();
        Object.values(fields).forEach((input) => input.classList.remove("success"));
        setTimeout(() => {
            successBanner.style.display = "none";
        }, 3000);
    } else {
        successBanner.style.display = "none";
    }
});