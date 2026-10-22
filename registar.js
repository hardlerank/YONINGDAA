const firstNameInput = document.getElementById("firstName");
const lastNameInput = document.getElementById("lastName");
const phoneInput = document.getElementById("phone");

const passwordInput = document.getElementById("password");
const confirmPasswordInput =
    document.getElementById("confirmPassword");

const rulesInput = document.getElementById("rules");

const firstNameError =
    document.getElementById("firstNameError");

const lastNameError =
    document.getElementById("lastNameError");

const phoneError =
    document.getElementById("phoneError");

const passwordError =
    document.getElementById("passwordError");

const confirmPasswordError =
    document.getElementById("confirmPasswordError");

const rulesError =
    document.getElementById("rulesError");

const passwordEye =
    document.getElementById("passwordEye");

const confirmEye =
    document.getElementById("confirmEye");

const continueButton =
    document.getElementById("continueButton");

const continueText =
    document.getElementById("continueText");



/* =========================
   PASSWORD KO'RISH
========================= */

passwordEye.addEventListener("click", function () {

    if (passwordInput.type === "password") {

        passwordInput.type = "text";

        passwordEye.textContent = "🙈";

    } else {

        passwordInput.type = "password";

        passwordEye.textContent = "👁";
    }

});


/* =========================
   TASDIQLASH PAROLI
========================= */

confirmEye.addEventListener("click", function () {

    if (confirmPasswordInput.type === "password") {

        confirmPasswordInput.type = "text";

        confirmEye.textContent = "🙈";

    } else {

        confirmPasswordInput.type = "password";

        confirmEye.textContent = "👁";
    }

});


/* =========================
   TELEFON
========================= */

phoneInput.addEventListener("input", function () {

    let value =
        phoneInput.value.replace(/\D/g, "");

    if (value.startsWith("998")) {

        value =
            value.substring(3);
    }

    value =
        value.substring(0, 9);

    phoneInput.value = value;
});


/* =========================
   ISM / FAMILIYA
========================= */

firstNameInput.addEventListener("input", function () {

    firstNameInput.value =
        firstNameInput.value.replace(
            /[^a-zA-ZА-Яа-яЁёʻʼ’\s-]/g,
            ""
        );
});


lastNameInput.addEventListener("input", function () {

    lastNameInput.value =
        lastNameInput.value.replace(
            /[^a-zA-ZА-Яа-яЁёʻʼ’\s-]/g,
            ""
        );
});


/* =========================
   RO'YXATDAN O'TISH
========================= */

continueButton.addEventListener(
    "click",
    async function () {

        firstNameError.textContent = "";
        lastNameError.textContent = "";
        phoneError.textContent = "";
        passwordError.textContent = "";
        confirmPasswordError.textContent = "";
        rulesError.textContent = "";


        const firstName =
            firstNameInput.value.trim();

        const lastName =
            lastNameInput.value.trim();

        const phone =
            phoneInput.value.trim();

        const password =
            passwordInput.value;

        const confirmPassword =
            confirmPasswordInput.value;


        /* ISM */

        if (firstName.length < 2) {

            firstNameError.textContent =
                "Ismingizni kiriting.";

            firstNameInput.focus();

            return;
        }


        /* FAMILIYA */

        if (lastName.length < 2) {

            lastNameError.textContent =
                "Familiyangizni kiriting.";

            lastNameInput.focus();

            return;
        }


        /* TELEFON */

        if (phone.length !== 9) {

            phoneError.textContent =
                "Telefon raqamni to‘liq kiriting.";

            phoneInput.focus();

            return;
        }


        /* PAROL */

        if (password.length < 12 || password.length > 128 || !password.trim()) {

            passwordError.textContent =
            "Parol 12–128 belgidan iborat bo‘lishi kerak.";

            passwordInput.focus();

            return;
        }

        const displayName = `${firstName} ${lastName}`;
        if (displayName.length > 80) {
            lastNameError.textContent = "Ism va familiya jami 80 belgidan oshmasin.";
            lastNameInput.focus();
            return;
        }


        /* PAROL TASDIQLASH */

        if (confirmPassword !== password) {

            confirmPasswordError.textContent =
                "Parollar bir xil emas.";

            confirmPasswordInput.focus();

            return;
        }


        /* QOIDALAR */

        if (!rulesInput.checked) {

            rulesError.textContent =
                "Davom etish uchun qoidalarni tasdiqlang.";

            return;
        }


        /* LOADING */

        continueButton.disabled = true;

        continueButton.style.opacity = "0.7";

        continueText.textContent =
            "YUBORILMOQDA...";

        const registrationStatus = document.getElementById("registrationStatus");
        registrationStatus.textContent = "";
        try {
            await window.YoningdaAuthApi.register({
                display_name: displayName,
                phone_number: `+998${phone}`,
                password
            });
            passwordInput.value = "";
            confirmPasswordInput.value = "";
            window.location.href = "login.html?registered=1";
        } catch (error) {
            const message = window.YoningdaAuthApi.messageFor(error, "register");
            if (error.code === "phone_number_already_registered") {
                phoneError.textContent = message;
            } else {
                registrationStatus.textContent = message;
                registrationStatus.style.color = "#d94b5b";
            }
            continueButton.disabled = false;
            continueButton.style.opacity = "1";
            continueText.textContent = "DAVOM ETISH";
        }

    }
);