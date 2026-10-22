const phoneInput = document.getElementById("phone");
const passwordInput = document.getElementById("password");

const phoneError = document.getElementById("phoneError");
const passwordError = document.getElementById("passwordError");

const eyeButton = document.getElementById("eyeButton");

const loginButton = document.getElementById("loginButton");
const loginText = document.getElementById("loginText");


// PAROLNI KO‘RSATISH / YASHIRISH

eyeButton.addEventListener("click", function () {

    if (passwordInput.type === "password") {

        passwordInput.type = "text";

        eyeButton.textContent = "🙈";

    } else {

        passwordInput.type = "password";

        eyeButton.textContent = "👁";

    }

});


// TELEFON RAQAM

phoneInput.addEventListener("input", function () {

    let value = phoneInput.value.replace(/\D/g, "");

    if (value.startsWith("998")) {
        value = value.substring(3);
    }

    value = value.substring(0, 9);

    phoneInput.value = value;

});


// KIRISH

loginButton.addEventListener("click", async function () {

    phoneError.textContent = "";
    passwordError.textContent = "";
    const statusMessage = document.getElementById("loginStatus");
    statusMessage.textContent = "";

    const phone = phoneInput.value.trim();
    const password = passwordInput.value;


    // Telefon tekshirish

    if (phone.length !== 9) {

        phoneError.textContent =
            "Telefon raqamni to‘liq kiriting.";

        phoneInput.focus();

        return;
    }


    // Parol tekshirish

    if (!password || password.length > 128) {

        passwordError.textContent =
            "Parolni to‘g‘ri kiriting.";

        passwordInput.focus();

        return;
    }


    // LOADING

    loginButton.disabled = true;
    loginButton.classList.add("loading");

    loginText.textContent = "KIRILMOQDA...";


    try {
        await window.YoningdaAuthApi.login({
            phone_number: `+998${phone}`,
            password
        });
        await window.YoningdaAuthApi.currentUser();
        passwordInput.value = "";
        window.location.replace("home.html");
    } catch (error) {
        loginButton.classList.remove("loading");
        loginButton.disabled = false;
        loginText.textContent = "KIRISH";
        statusMessage.textContent = window.YoningdaAuthApi.messageFor(error, "login");
        statusMessage.style.color = "#d94b5b";
    }

});

if (new URLSearchParams(window.location.search).get("registered") === "1") {
    const statusMessage = document.getElementById("loginStatus");
    statusMessage.textContent = "Hisob yaratildi. Telefon raqami SMS orqali tasdiqlanmagan; tizimga kiring.";
}

if (new URLSearchParams(window.location.search).get("authUnavailable") === "1") {
    const statusMessage = document.getElementById("loginStatus");
    statusMessage.textContent = "Sessiyani tekshirib bo‘lmadi. Server bilan aloqani tekshirib, qayta urinib ko‘ring.";
    statusMessage.style.color = "#d94b5b";
}
