<<<<<<< HEAD
const codeInputs =
    document.querySelectorAll(".code-input");

const timerElement =
    document.getElementById("timer");

const verifyButton =
    document.getElementById("verifyButton");

const resendButton =
    document.getElementById("resendButton");

const codeError =
    document.getElementById("codeError");


/* =========================
   KOD KIRITISH
========================= */

codeInputs.forEach(function (input, index) {

    input.addEventListener("input", function () {

        input.value =
            input.value.replace(/\D/g, "");

        if (
            input.value &&
            index < codeInputs.length - 1
        ) {

            codeInputs[index + 1].focus();
        }

    });


    input.addEventListener("keydown", function (event) {

        if (
            event.key === "Backspace" &&
            !input.value &&
            index > 0
        ) {

            codeInputs[index - 1].focus();
        }

    });

});


/* No SMS verification endpoint exists in the backend yet. */
timerElement.textContent = "—";
resendButton.disabled = true;


/* =========================
   KODNI TEKSHIRISH
========================= */

verifyButton.addEventListener(
    "click",
    function () {

        codeError.textContent = "";

        let code = "";

        codeInputs.forEach(function (input) {

            code += input.value;
        });


        if (code.length !== 6) {

            codeError.textContent =
                "6 xonali kodni to‘liq kiriting.";

            return;
        }


        codeError.textContent =
            "SMS orqali telefonni tasdiqlash backendda hozircha mavjud emas.";

    }
);


/* =========================
   QAYTA YUBORISH
========================= */

resendButton.addEventListener("click", function () {
    codeError.textContent =
        "SMS orqali telefonni tasdiqlash backendda hozircha mavjud emas.";
=======
const codeInputs =
    document.querySelectorAll(".code-input");

const timerElement =
    document.getElementById("timer");

const verifyButton =
    document.getElementById("verifyButton");

const resendButton =
    document.getElementById("resendButton");

const codeError =
    document.getElementById("codeError");


/* =========================
   KOD KIRITISH
========================= */

codeInputs.forEach(function (input, index) {

    input.addEventListener("input", function () {

        input.value =
            input.value.replace(/\D/g, "");

        if (
            input.value &&
            index < codeInputs.length - 1
        ) {

            codeInputs[index + 1].focus();
        }

    });


    input.addEventListener("keydown", function (event) {

        if (
            event.key === "Backspace" &&
            !input.value &&
            index > 0
        ) {

            codeInputs[index - 1].focus();
        }

    });

});


/* No SMS verification endpoint exists in the backend yet. */
timerElement.textContent = "—";
resendButton.disabled = true;


/* =========================
   KODNI TEKSHIRISH
========================= */

verifyButton.addEventListener(
    "click",
    function () {

        codeError.textContent = "";

        let code = "";

        codeInputs.forEach(function (input) {

            code += input.value;
        });


        if (code.length !== 6) {

            codeError.textContent =
                "6 xonali kodni to‘liq kiriting.";

            return;
        }


        codeError.textContent =
            "SMS orqali telefonni tasdiqlash backendda hozircha mavjud emas.";

    }
);


/* =========================
   QAYTA YUBORISH
========================= */

resendButton.addEventListener("click", function () {
    codeError.textContent =
        "SMS orqali telefonni tasdiqlash backendda hozircha mavjud emas.";
>>>>>>> e76fb39649d7a1e1c0f129abfdb571269e5e7a08
});