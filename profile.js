const genderButtons =
    document.querySelectorAll(".gender-button");

const ageSelect =
    document.getElementById("age");

const continueButton =
    document.getElementById("continueButton");

const errorMessage =
    document.getElementById("errorMessage");
const profileCard = document.getElementById("profile-card");
const logoutButton = document.getElementById("logoutButton");


let selectedGender = "";
continueButton.disabled = true;
logoutButton.disabled = true;

window.YoningdaAuthApi.currentUser().then(function (profile) {
    const storedUserId = localStorage.getItem("yoningda_profile_user_id");
    if (storedUserId !== String(profile.id)) {
        localStorage.removeItem("yoningda_gender");
        localStorage.removeItem("yoningda_age");
    }
    profileCard.hidden = false;
    localStorage.setItem("yoningda_profile_user_id", String(profile.id));
    selectedGender = profile.gender || "";
    if (selectedGender) {
        genderButtons.forEach(function (button) {
            button.classList.toggle("selected", button.dataset.gender === selectedGender);
        });
    }
    continueButton.disabled = false;
    logoutButton.disabled = false;
}).catch(function (error) {
    if (error.status === 401 || error.code === "authentication_required") {
        window.location.replace("login.html");
        return;
    }
    window.location.replace("login.html?authUnavailable=1");
});


/* =========================
   JINS TANLASH
========================= */

genderButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        genderButtons.forEach(function (otherButton) {

            otherButton.classList.remove("selected");

        });


        button.classList.add("selected");


        selectedGender =
            button.dataset.gender;


        errorMessage.textContent = "";

    });

});


/* =========================
   DAVOM ETISH
========================= */

continueButton.addEventListener(
    "click",
    function () {

        errorMessage.textContent = "";


        /* JINS TEKSHIRISH */

        if (!selectedGender) {

            errorMessage.textContent =
                "Avval jinsingizni tanlang.";

            return;
        }


        /* YOSH TEKSHIRISH */

        if (!ageSelect.value) {

            errorMessage.textContent =
                "Yoshingizni tanlang.";

            ageSelect.focus();

            return;
        }


        /* MA'LUMOTLARNI SAQLASH */

        localStorage.setItem(
            "yoningda_gender",
            selectedGender
        );


        localStorage.setItem(
            "yoningda_age",
            ageSelect.value
        );


        /* HOZIRCHA DEMO */

        continueButton.disabled = true;

        continueButton.textContent =
            "SAQLANMOQDA...";


        setTimeout(function () {

            continueButton.disabled = false;

            continueButton.textContent =
                "DAVOM ETISH";


            alert(
                "Ma'lumotlar saqlandi."
            );

        }, 800);

    }
);

document.getElementById("logoutButton").addEventListener("click", async function (event) {
    const button = event.currentTarget;
    button.disabled = true;
    button.textContent = "CHIQILMOQDA...";
    errorMessage.textContent = "";
    try {
        await window.YoningdaAuthApi.logout();
        localStorage.removeItem("yoningda_gender");
        localStorage.removeItem("yoningda_age");
        localStorage.removeItem("yoningda_profile_user_id");
        localStorage.removeItem("yoningda_questionnaire");
        window.location.replace("index.html");
    } catch (error) {
        errorMessage.textContent = window.YoningdaAuthApi.messageFor(error, "logout");
        button.disabled = false;
        button.textContent = "CHIQISH";
    }
});