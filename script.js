<<<<<<< HEAD
const categories = [
    "O‘qish",
    "Oila",
    "Maktab",
    "Do‘stlar",
    "Muloqot",
    "Internet",
    "Shaxsiy",
    "Sirlar",
    "Boshqa"
];

const problemData = {
    male: {
        "O‘qish": [
            "Darslarni tushunmaslik",
            "O‘qishga motivatsiya yetishmasligi",
            "Vaqtni boshqarish",
            "Imtihon bosimi",
            "O‘qituvchi bilan muammo",
            "Zo‘ravonlik",
            "Kiberzo‘ravonlik / kiberbulling"
        ],
        Oila: [
            "Ota-ona bilan kelishmovchilik",
            "Uyda tushunilmaslik",
            "Oiladagi bosim",
            "Oiladagi nizolar",
            "Bosim yoki majburlash",
            "Xavfsizlik bilan bog‘liq muammo"
        ],
        Maktab: [
            "Sinfdoshlar bilan muammo",
            "O‘qituvchi bilan kelishmovchilik",
            "Baholar sababli bosim",
            "Maktab muhitiga moslashish",
            "Kiberzo‘ravonlik / kiberbulling",
            "Bosim yoki majburlash"
        ],
        "Do‘stlar": [
            "Do‘stlar bilan kelishmovchilik",
            "Yolg‘izlik",
            "Guruhga moslasha olmaslik",
            "Ishonch muammolari",
            "Zo‘ravonlik",
            "Kiberzo‘ravonlik / kiberbulling"
        ],
        Muloqot: [
            "Fikrini aytishga qiynalish",
            "Odamlar bilan gaplashish qiyinligi",
            "O‘z fikrini tushuntira olmaslik",
            "Uyatchanlik",
            "Bosim yoki majburlash"
        ],
        Internet: [
            "Internetdagi bosim",
            "Kiberbulling",
            "Ijtimoiy tarmoqlardagi muammolar",
            "Onlayn xavfsizlik",
            "Zo‘ravonlik",
            "Xavfsizlik bilan bog‘liq muammo"
        ],
        Shaxsiy: [
            "O‘ziga ishonch",
            "Hissiyotlarni tushunish",
            "Stress",
            "Kayfiyat bilan bog‘liq qiyinchiliklar",
            "Ishonch muammosi"
        ],
        Sirlar: [
            "Ichida saqlab yurayotgan muammo",
            "Kim bilandir gaplashishga qo‘rqish",
            "Ishonch muammosi",
            "Yordam so‘rashga qiynalish",
            "Xavfsizlik bilan bog‘liq muammo"
        ],
        Boshqa: [
            "Muammoim ro‘yhatda yo‘q",
            "Boshqa masala",
            "Nima bezovta qilayotganini tushunmaslik",
            "Zo‘ravonlik",
            "Bosim yoki majburlash"
        ]
    },
    female: {
        "O‘qish": [
            "Darslarni tushunmaslik",
            "O‘qishga motivatsiya yetishmasligi",
            "Vaqtni boshqarish",
            "Imtihon bosimi",
            "O‘qituvchi bilan muammo",
            "Zo‘ravonlik",
            "Kiberzo‘ravonlik / kiberbulling"
        ],
        Oila: [
            "Ota-ona bilan kelishmovchilik",
            "Uyda tushunilmaslik",
            "Oiladagi bosim",
            "Oiladagi nizolar",
            "Bosim yoki majburlash",
            "Xavfsizlik bilan bog‘liq muammo"
        ],
        Maktab: [
            "Sinfdoshlar bilan muammo",
            "O‘qituvchi bilan kelishmovchilik",
            "Baholar sababli bosim",
            "Maktab muhitiga moslashish",
            "Kiberzo‘ravonlik / kiberbulling",
            "Bosim yoki majburlash"
        ],
        "Do‘stlar": [
            "Do‘stlar bilan kelishmovchilik",
            "Yolg‘izlik",
            "Guruhga moslasha olmaslik",
            "Ishonch muammolari",
            "Zo‘ravonlik",
            "Kiberzo‘ravonlik / kiberbulling"
        ],
        Muloqot: [
            "Fikrini aytishga qiynalish",
            "Odamlar bilan gaplashish qiyinligi",
            "O‘z fikrini tushuntira olmaslik",
            "Uyatchanlik",
            "Bosim yoki majburlash"
        ],
        Internet: [
            "Internetdagi bosim",
            "Kiberbulling",
            "Ijtimoiy tarmoqlardagi muammolar",
            "Onlayn xavfsizlik",
            "Zo‘ravonlik",
            "Xavfsizlik bilan bog‘liq muammo"
        ],
        Shaxsiy: [
            "O‘ziga ishonch",
            "Hissiyotlarni tushunish",
            "Stress",
            "Kayfiyat bilan bog‘liq qiyinchiliklar",
            "Ishonch muammosi"
        ],
        Sirlar: [
            "Ichida saqlab yurayotgan muammo",
            "Kim bilandir gaplashishga qo‘rqish",
            "Ishonch muammosi",
            "Yordam so‘rashga qiynalish",
            "Xavfsizlik bilan bog‘liq muammo"
        ],
        Boshqa: [
            "Muammoim ro‘yhatda yo‘q",
            "Boshqa masala",
            "Nima bezovta qilayotganini tushunmaslik",
            "Zo‘ravonlik",
            "Bosim yoki majburlash"
        ]
    }
};

const genderLabels = {
    male: 'ERKAK',
    female: 'AYOL'
};

const state = {
    activeScreen: 'landing-screen',
    user: null,
    selectedGender: localStorage.getItem('yoningda_gender') || '',
    selectedAge: localStorage.getItem('yoningda_age') || '',
    selectedCategory: '',
    selectedProblem: '',
    selectedSubcategory: '',
    questionIndex: 0,
    answers: {},
    customAnswers: {},
    authMode: 'login'
};

const subcategoryNames = {
    "O‘qish": ["Baholar va o'zlashtirish"],
    Oila: ["Oila va Uy"],
    Maktab: ["Baholar va o'zlashtirish"],
    "Do‘stlar": ["Do'stlar va Muloqot"],
    Muloqot: ["Do'stlar va Muloqot"],
    Internet: ["Internet va Xavfsizlik"],
    Shaxsiy: ["Shaxsiy va Emotsiyalar"],
    Sirlar: ["Internet va Xavfsizlik", "Shaxsiy va Emotsiyalar"],
    Boshqa: ['Noma’lum bezovtalik', 'Kundalik qiyinchilik', 'Xavfsizlik']
};

const questionnaireSets = {
    "Baholar va o'zlashtirish": [
        { text: "Darslarda past baho olganingizda o'zingizni qanday his qilasiz?", options: ["Juda xafa bo'laman va tushkunlikka tushaman", "G'azablanaman va adolatsizlik deb o'ylayman", "Xatoyimni tushunib, keyingi safar yaxshiroq tayyorlanishga harakat qilaman", "E'tibor bermayman, baho men uchun muhim emas"] },
        { text: "Ota-onangiz kutilganidan pastroq baho olganingizda qanday munosabat bildiradi?", options: ["Urushishadi yoki qattiq jazolashadi", "Tushunish ko'rsatib, yordam berishga harakat qilishadi", "Ko'nglimni cho'ktiradigan gaplar aytishadi", "Baholarim bilan umuman qiziqishmaydi"] },
        { text: "Mavzularni o'zlashtirishda eng ko'p qaysi omil sizga xalaqit beradi?", options: ["Darslarning murakkabligi va tushunarsiz tushuntirilishi", "Diqqatni jamlay olmaslik va chalg'ish", "Uy vazifalarining juda ko'pligi va vaqt yetishmasligi", "Darsga bo'lgan qiziqishning yo'qligi"] },
        { text: "Sinfdoshlaringizning yuqori baholari yoki yutuqlari sizga qanday ta'sir qiladi?", options: ["O'zimni ulardan ortda qolgandek his qilaman (ichki bosim)", "Bu menga kuch beradi, ularga yetib olishga harakat qilaman", "Hasad qilishimga yoki o'zimga bo'lgan ishonchim yo'qolishiga sabab bo'ladi", "Mening o'zlashtirishimga va kayfiyatimga ta'sir qilmaydi"] },
        { text: "Darsda tushunmay qolgan mavzuingiz bo'yicha ustozga murojaat qilishga nima to'sqinlik qiladi?", options: ["Ustozning urishishidan yoki jerkib berishidan qo'rqaman", "Sinfdoshlarim ustimdan kulishidan tortinaman", "Savol berishga umuman imkon berilmaydi", "Hech narsa to'sqinlik qilmaydi, bemalol so'ray olaman"] },
        { text: "Nazorat ishlari va imtihonlar oldidan o'zingizda qanday holatni sezasiz?", options: ["Kuchli hayajon, xavotir va hatto jismoniy noqulaylik (bosh/qorin og'rig'i)", "Yengil hayajon, lekin diqqatni jamlay olaman", "Mutlaqo xotirjamman, qo'rqmayman", "O'zimga ishonch yo'qligi sababli topshirishni ham xohlamayman"] },
        { text: "O'quv darsligidagi yoki beriladigan topshiriqlardagi qaysi jihat sizni darsdan sovitadi?", options: ["Nazariy ma'lumotlarning o'ta ko'pligi va qiziqarsizligi", "Amaliy va qiziqarli topshiriqlarning yo'qligi", "Manbalarning va o'quv qurollarining yetarsizligi", "Hammasi joyida, darslar qiziqarli"] },
        { text: "O'zlashtirishingizni yaxshilash uchun ilova yoki ustozlar tomonidan qanday yordam berilishini xohlardingiz?", options: ["Tushunarsiz mavzularni sodda tilda tushuntirib beruvchi qisqa vizual qo'llanmalar", "Ruhiy qo'llab-quvvatlash va vaqtni to'g'ri taqsimlash (taym-menedjment) bo'yicha maslahatlar", "Anonim tarzda savol berish va javob olish imkoniyati", { text: "Boshqa (o'z variantingizni yozing)", custom: true }] }
    ],
    "Oila va Uy": [
        { text: "Uydagilar bilan o'zaro munosabatlaringiz va tushunmovchiliklar sizga qanday ta'sir qiladi?", options: ["Qattiq siqilaman, dars qilishga va boshqa ishlarga xohishim yo'qoladi", "Jahlim chiqadi, xonamga kirib alohida o'tirishni afzal ko'raman", "Muammoni tinch yo'l bilan gaplashib hal qilishga harakat qilaman", "E'tibor bermaslikka harakat qilaman, mening kayfiyatimga ta'sir qilmaydi"] },
        { text: "Ota-onangiz bilan shaxsiy muammolaringiz yoki orzularingiz haqida ochiq gaplasha olasizmi?", options: ["Ha, ular meni har doim eshitishadi va qo'llab-quvvatlashadi", "Faqat ba'zi mavzularda gaplasha olaman, hammasini aytolmayman", "Yo'q, tushunishmaydi yoki urishib berishadi deb qo'rqaman", "Umuman gaplashmayman, sirimni ichimda saqlayman"] },
        { text: "Uydagi qaysi holat sizga eng ko'p ruhiy bosim yoki xavotir beradi?", options: ["Ota-onamning doimiy baland ovozda tortishishi yoki nizolari", "Mening erkinligim yo'qligi va har bir qadamimning nazorat qilinishi", "Boshqa tengdoshlarim yoki aka-ukalarim bilan solishtirishlari", "Uydagi moddiy va maishiy qiyinchiliklar"] },
        { text: "Aka-uka yoki opa-singillaringiz bilan munosabatingiz qanday?", options: ["Inoqman, bir-birimizga sirimizni aytamiz va yordam beramiz", "Tez-tez urishib turamiz, lekin baribir ahilman", "Doimiy kelishmovchilik va adolatsizlikni his qilaman (ularni ko'proq yaxshi ko'rishadi)", "Bitta xonadonda yashasak ham, deyarli muloqot qilmaymiz", "Oilada yolg'iz farzandman yoki ukalarim juda yosh"] },
        { text: "Oila a'zolaringiz tomonidan sizga nisbatan qanday harakatlar eng ko'p og'ir batadi?", options: ["Fikrim bilan hisoblashmaslik va mensimaslik", "Doimiy tanqid qilish va faqat kamchiliklarimni ko'rish", "Shaxsiy hududim va sirlarimga hurmat ko'rsatmaslik", "Haddan tashqari ko'p vazifa va mas'uliyat yuklash"] },
        { text: "Uyga qaytayotganingizda odatda qanday hissiyot bilan kelasiz?", options: ["Xotirjamlik va xavfsizlik hissi bilan (uy --- mening xavfsiz maskanim)", "Shunchaki odatiy holat, maxsus hissiyot yo'q", "Bezovtalik va stress bilan (yana shovqin yoki urush bo'larmikin degan xavotir)", "Ilojim bo'lsa, uyga kechroq borishni yoki ko'chada yurishni xohlayman"] },
        { text: "Oila a'zolaringiz sizning qiziqishlaringiz va kelajakdagi rejalaringizni qo'llab-quvvatlaydimi?", options: ["Ha, har doim mening tanlovimni hurmat qilishadi", "Qisman, lekin ko'p narsani o'zlari hal qilishga urinishadi", "Yo'q, mening qiziqishlarimni bekorchi narsa deb hisoblashadi", "Ular bilan kelajak haqida umuman gaplashmaganman"] },
        { text: "Uydagi muhitni yaxshilash va ota-onangiz bilan tushunishish uchun ushbu ilovadan qanday yordam kutasiz?", options: ["Ota-ona bilan to'g'ri muloqot qilish bo'yicha psixologik maslahatlar", "Urush-janjal va stress paytida o'zni bosiq tutish usullari (mashqlar)", "Psixolog bilan anonim tarzda dardlashish va maslahat olish", { text: "Boshqa (o'z fikringizni yozing)", custom: true }] }
    ],
    "Do'stlar va Muloqot": [
        { text: "Tengdoshlaringiz va do'stlaringiz davrasida o'zingizni qanday his qilasiz?", options: ["Erkin va xotirjam, ular meni borimcha qabul qilishadi", "Ba'zan tortinaman, ularga yoqish uchun o'zimni boshqacha tutishga majbur bo'laman", "Keraksiz va begona his qilaman, fikrimni inobatga olishmaydi", "Menda do'stlar davrasi yo'q, ko'pincha yolg'izman"] },
        { text: "Yangi odamlar bilan tanishish yoki muloqotni birinchi bo'lib boshlash siz uchun qanchalik oson?", options: ["Juda oson, tezda kirishib ketaman va til topishaman", "Biroz qiyin, lekin vaziyatga qarab muloqot qila olaman", "Juda qiyin, uyalaman, nima deyishni bilmay tortinib qolaman", "Umuman muloqot qilgim kelmaydi, yangi tanishuvlardan qochaman"] },
        { text: "Yaqin do'stingiz bilan o'rtangizda kelishmovchilik bo'lsa, odatda qanday yo'l tutasiz?", options: ["Darhol ochiq gaplashib, muammoni hal qilishga harakat qilaman", "Arazlab yuraman, birinchi bo'lib qadam tashlashini kutaman", "Ayb menda bo'lmasa ham, munosabat buzilmasligi uchun o'zim yon beraman", "Munosabatni birdaniga uzaman va gaplashmay qo'ya qolaman"] },
        { text: "Do'stlaringiz sizdan nojo'ya yoki xohlamagan narsangizni qilishni so'rashsa, qanday javob berasiz?", options: ["Ikki hisoblamay, qat'iyat bilan \"Yo'q\" deya olaman", "Rad etgim keladi, lekin ajralib qolishdan yoki xafa qilishdan qo'rqib rozi bo'laman", "Turli bahonalar o'ylab topib, vaziyatdan chiqib ketishga urinaman", "Ular nima desa, qarshiliksiz bajaraveraman"] },
        { text: "Ayni paytda muloqotda va do'stlashishda sizni eng ko'p nima qiynaydi?", options: ["Do'stlarim tomonidan xiyonat qilinishi yoki sirlarim tarqalishi", "Yolg'izlik --- sirdosh va sodiq do'stning yo'qligi", "Tengdoshlarimning ustimdan kulishi yoki kamsitishi (bulling)", "O'zimdagi tortinchoqlik va o'zimga bo'lgan ishonchsizlik"] },
        { text: "Ijtimoiy tarmoqlardagi yoki virtual do'stlaringiz bilan munosabatingiz qanday?", options: ["Hayotdagi do'stlarim bilan ko'proq muloqot qilaman, virtual do'stlarim kam", "Onlayn do'stlarimga hayotdagilarga qaraganda ko'proq ishonaman va sirlashaman", "Ijtimoiy tarmoqda faolman, lekin baribir o'zimni yolg'iz his qilaman", "Ijtimoiy tarmoqlarda deyarli muloqot qilmayman"] },
        { text: "Do'stlaringizning yutuqlari yoki mashhurligi sizda qanday hissiyot uyg'otadi?", options: ["Samimiy xursand bo'laman va ularni qo'llab-quvvatlayman", "O'zimni ularning soyasida qolib ketgandek his qilaman", "Biroz hasad yoki o'zimdan qoniqmaslik hissi paydo bo'ladi", "Bu narsalar mening kayfiyatimga va munosabatimga ta'sir qilmaydi"] },
        { text: "Do'stlik va muloqotni yaxshilash uchun ushbu ilovadan qanday yordam olishni xohlaysiz?", options: ["Odamlar bilan oson muloqotga kirishish va tortinchoqlikni yengish bo'yicha maslahatlar", "\"Yo'q\" deyishni o'rganish va o'z chegaralarini himoya qilish (psixologik mashqlar)", "Jamoadan ajralib qolgan paytda stressni yengish va psixolog yordami", { text: "Boshqa (o'z fikringizni yozing)", custom: true }] }
    ],
    "Internet va Xavfsizlik": [
        { text: "Internetda yoki ijtimoiy tarmoqlarda notanish odamlar bilan muloqot qilganda o'zingizni qanday tutasiz?", options: ["Ochiqman, tezda ishonaman va shaxsiy ma'lumotlarimni bemalol bo'lishaman", "Ehtiyotkorlik bilan muloqot qilaman, lekin ba'zan ortiqcha narsalarni aytib qo'yaman", "Juda ehtiyotkor bo'laman, shaxsiy rasmlarim yoki ma'lumotlarimni umuman bermayman", "Notanish odamlar bilan internetda umuman gaplashmayman"] },
        { text: "Ijtimoiy tarmoqlarda kimgadir yoqmaydigan izoh (komment) yoki shaxsiy haqoratga duch kelsangiz, qanday javob qaytarasiz?", options: ["Juda qattiq siqilaman, kayfiyatim buziladi va o'zimni aybdor his qilaman", "Tengma-teng urushib, uni ham haqorat qilishga harakat qilaman", "E'tibor bermayman, uni bloklayman (blok ro'yxatiga solaman) va shikoyat qilaman", "Do'stlarimga yoki uydagilarga aytib, yordam so'rayman"] },
        { text: "Kun davomida telefon va internetdan foydalanish vaqtingizni qanchalik nazorat qila olasiz?", options: ["Nazorat qilolmayman, reels/tik-tok ko'rib soatlab vaqtim ketib qoladi", "Ko'p vaqtim ketadi, lekin darslarimni va ishlarimni majburan bo'lsa ham qilaman", "Vaqtimni to'g'ri taqsimlayman, telefonsiz ham bemalol vaqt o'tkaza olaman", "Telefondan faqat kerakli vazifalar uchun foydalanaman"] },
        { text: "Internetda shaxsiy rasmlaringiz, sirlaringiz yoki yozishmalaringiz tarqalib ketishidan qo'rqasizmi?", options: ["Ha, bu haqda o'ylasam kuchli xavotir va vahimaga tushaman", "Ba'zida xavotirlanaman, lekin unchalik e'tibor bermayman", "Yo'q, chunki internetda nojo'ya yoki xavfli narsalar ulashmayman", "Boshimdan shunday holat o'tgan va nima qilishni bilmay qolganman"] },
        { text: "Ijtimoiy tarmoqlardagi boshqa tengdoshlaringizning \"chiroyli va mukammal\" hayotini ko'rganingizda qanday his-tuyg'ular paydo bo'ladi?", options: ["O'zimni ulardan kamdek, hayotim qiziqarsizdek his qilaman (haddan tashqari solishtirish)", "Biroz havas yoki xafagarchilik bo'ladi, lekin tezda o'tib ketadi", "Bu shunchaki ekran ortidagi ko'rinish ekanini tushunaman va ta'sirlanmayman", "Boshqalarning sahifalarini kuzatishga qiziqmayman"] },
        { text: "Internetda firibgarlik (murojaat, soxta yutuqlar, linklar) yoki tahdidga duch kelganingizda kimdan yordam so'raysiz?", options: ["Hech kimga aytmayman, qo'rqqanimdan ichimda saqlayman", "Ota-onamga yoki oilamga darhol aytaman", "Do'stlarim yoki sinfdoshlarim bilan maslahatlashaman", "Muammoni o'zim mustaqil hal qilishga urinaman"] },
        { text: "Kiberbulling (onlayn ta'qib va haqorat) sizning real hayotingizga va o'qishingizga ta'sir qilganmi?", options: ["Ha, maktabga borishga, odamlar orasida yurishga qo'rqib qolganman", "Boshida ta'sir qildi, lekin keyin o'zimni qo'lga oldim", "Yo'q, internetdagi gaplarni yuragimga yaqin olmayman", "Menda bunday holat umuman bo'lmagan"] },
        { text: "Internetda xavfsiz bo'lish va onlayn qaramlikdan qutulish uchun ushbu ilovadan qanday yordam kutasiz?", options: ["Kiberbulling va tahdidlarga uchraganda anonymous (sirli) psixologik va huquqiy maslahat", "Telefon qaramligidan xalos bo'lish va vaqtni to'g'ri boshqarish (screens-free) mashqlari", "Shaxsiy ma'lumotlarni va sahifalarni himoyalash bo'yicha amaliy qo'llanmalar", { text: "Boshqa (o'z fikringizni yozing)", custom: true }] }
    ],
    "Shaxsiy va Emotsiyalar": [
        { text: "Ayni damda ichki kayfiyatingiz va ruhiy holatingizni qanday ta'riflagan bo'lardingiz?", options: ["Xotirjam va quvnoqman, hammasi joyida", "Tushkunlikda (depressiyada)man, tez-tez sababsiz xafachilikni his qilaman", "Doimiy xavotir, qo'rquv va stressdaman", "Emotsiyalarim tez-tez o'zgarib turadi (kayfiyat beqarorligi)"] },
        { text: "Hech kimga aytolmaydigan ichki sirlaringiz yoki muammolaringiz sizga qanday ta'sir qilmoqda?", options: ["Yolg'iz o'zim ko'tarishga qiynalyapman, kimgadir yorilishga ehtiyojim bor", "Ba'zan qiynaydi, lekin ichimda saqlashga o'rganib ketganman", "Ishonchli insonim bo'lmagani uchun hech kimga aytgim kelmaydi", "Meni qiynaydigan darajada og'ir sirlarim yo'q"] },
        { text: "O'zingizga bo'lgan ishonch va o'z qadringizni his qilish darajangiz qanday?", options: ["O'zimga va kuchimga to'liq ishonaman", "O'zimni tez-tez boshqalar bilan solishtirib, kamchiliklarimdan siqilaman", "O'zimni keraksiz, omadsiz va hech kimga yoqmaydigandek his qilaman", "Tashqi ko'rinishim va fe'l-atvorimdan qoniqmayman"] },
        { text: "Kutilmagan stress yoki qiyin vaziyatga tushganingizda, bu jismoniy holatingizda qanday aks etadi?", options: ["Bosh/qorin og'rig'i, yurak tez urishi yoki nafas siqilishi paydo bo'ladi", "Uyqum buziladi (uyqusizlik yoki haddan tashqari ko'p uxlash)", "Ishtaham yo'qoladi yoki aksincha, ko'p ovqat yeb qo'yaman", "Jismoniy sezgilarimda hech qanday o'zgarish bo'lmaydi"] },
        { text: "Kelajagingiz (kasb tanlash, hayotda o'z o'rningizni topish) haqida o'ylaganingizda qanday hissiyot paydo bo'ladi?", options: ["Ishtiyoq va qiziqish --- rejalarm aniq va kelajakka ishonchim komil", "Kuchli qo'rquv va xavotir --- eplay olmasam-chi degan xavotirdaman", "Mavhumlik va noaniqlik --- nima qilishni va kim bo'lishni umuman bilmayman", "Kelajak haqida hali o'ylamaganim"] },
        { text: "Hayotda qiyin vaziyatga tushganingizda eng birinchi bo'lib kimdan ma'naviy/ruhiy suyanch qidirasiz?", options: ["Ota-onam yoki qarindoshlarimdan", "Do'stlarim va tengdoshlarimdan", "Ustozlarim yoki murabbiylarimdan", "Hech kimdan, hammasini ichimda yengishga harakat qilaman"] },
        { text: "G'azab, nafrat yoki kuchli alam hissi kelganida o'zingizni tutishingiz qanday bo'ladi?", options: ["Boshqalarga baqiraman, narsalarni sindiraman yoki jahl bilan javob qaytaraman", "Yig'lab olaman yoki xonamga berkinib olaman", "O'zimni bosiqlik bilan to'xtatishga harakat qilaman (o'zimni idora qila olaman)", "Alamimni o'zimdan olaman (o'zimni ayblayman)"] },
        { text: "O'zingizni ruhiy tomondan yengil his qilish va emotsional holatingizni yaxshilash uchun ushbu ilovadan qanday yordam kutasiz?", options: ["Professional psixolog bilan to'liq anonim (sirli) va xavfsiz suhbat", "Stress va vahimani (panikani) bosish uchun vizual/audiomashqlar va meditatsiyalar", "O'ziga bo'lgan ishonchni oshirish va ruhiy tushkunlikdan chiqish bo'yicha foydali maqola va tavsiyalar", { text: "Boshqa (o'z fikringizni yozing)", custom: true }] }
    ]
};

function getCurrentQuestions() {
    return questionnaireSets[state.selectedSubcategory] || [];
}

function showScreen(screenId) {
    const publicScreens = new Set(['landing-screen', 'auth-screen']);
    if (!publicScreens.has(screenId) && !state.user) {
        setAuthMode('login');
        screenId = 'auth-screen';
    }
    document.querySelectorAll('.screen').forEach((screen) => {
        screen.classList.toggle('active', screen.id === screenId);
    });
    state.activeScreen = screenId;
}

function setAuthMode(mode) {
    state.authMode = mode;
    const tabs = document.querySelectorAll('.auth-tab');
    const boxes = document.querySelectorAll('.auth-form-box');

    tabs.forEach((tab) => {
        tab.classList.toggle('active', tab.dataset.authTab === mode);
    });

    boxes.forEach((box) => {
        box.classList.toggle('active', box.id === `${mode}-form-box`);
    });
}

function clearError(id) {
    const el = document.getElementById(id);
    if (el) el.textContent = '';
}

function setError(id, message) {
    const el = document.getElementById(id);
    if (el) el.textContent = message;
}

function setStatus(id, message, kind = '') {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = message;
    el.className = `status-message${kind ? ` ${kind}` : ''}`;
}

function applyAuthenticatedUser(profile) {
    const storedUserId = localStorage.getItem('yoningda_profile_user_id');
    if (storedUserId !== String(profile.id)) {
        localStorage.removeItem('yoningda_gender');
        localStorage.removeItem('yoningda_age');
        localStorage.removeItem('yoningda_questionnaire');
    }
    localStorage.setItem('yoningda_profile_user_id', String(profile.id));
    if (profile.gender) localStorage.setItem('yoningda_gender', profile.gender);
    state.user = profile;
    state.selectedGender = profile.gender || localStorage.getItem('yoningda_gender') || '';
    state.selectedAge = localStorage.getItem('yoningda_age') || '';
    document.querySelectorAll('.gender-button').forEach((button) => {
        button.classList.toggle('selected', button.dataset.gender === state.selectedGender);
    });
    const ageSelect = document.getElementById('profile-age');
    if (ageSelect) ageSelect.value = state.selectedAge;
}

function apiErrorMessage(error, context) {
    return window.YoningdaAuthApi.messageFor(error, context);
}

function togglePassword(inputId, button) {
    const input = document.getElementById(inputId);
    if (!input) return;

    const isPassword = input.type === 'password';
    input.type = isPassword ? 'text' : 'password';
    button.textContent = isPassword ? '🙈' : '👁';
}

function initLandingFeatures() {
    document.querySelectorAll('.feature-item').forEach((item) => {
        const button = item.querySelector('.feature-button');
        button.addEventListener('click', function () {
            document.querySelectorAll('.feature-item').forEach((otherItem) => {
                if (otherItem !== item) otherItem.classList.remove('active');
            });
            item.classList.toggle('active');
        });
    });
}

function bindScreenButtons() {
    document.querySelectorAll('[data-target]').forEach((button) => {
        button.addEventListener('click', () => {
            const target = button.dataset.target;
            if (target) showScreen(target);
        });
    });

    document.querySelectorAll('[data-auth-tab]').forEach((button) => {
        button.addEventListener('click', () => setAuthMode(button.dataset.authTab));
    });

    document.querySelectorAll('[data-toggle-password]').forEach((button) => {
        button.addEventListener('click', () => togglePassword(button.dataset.togglePassword, button));
    });

    document.querySelectorAll('.register-btn, .login-btn').forEach((button) => {
        button.addEventListener('click', () => {
            const target = button.dataset.target || 'auth-screen';
            const mode = button.classList.contains('register-btn') ? 'register' : 'login';

            showScreen(target);
            if (target === 'auth-screen') {
                setAuthMode(mode);
            }
        });
    });
}

function bindLoginForm() {
    const loginPhone = document.getElementById('login-phone');
    const loginPassword = document.getElementById('login-password');
    const loginSubmit = document.getElementById('login-submit');

    loginPhone.addEventListener('input', function () {
        this.value = this.value.replace(/\D/g, '').slice(0, 9);
    });

    loginSubmit.addEventListener('click', async function () {
        clearError('login-phone-error');
        clearError('login-password-error');
        setStatus('login-status', '');

        const phone = loginPhone.value.trim();
        const password = loginPassword.value;

        if (phone.length !== 9) {
            setError('login-phone-error', 'Telefon raqamni to‘liq kiriting.');
            loginPhone.focus();
            return;
        }

        if (!password || password.length > 128) {
            setError('login-password-error', 'Parolni to‘g‘ri kiriting.');
            loginPassword.focus();
            return;
        }

        loginSubmit.disabled = true;
        loginSubmit.textContent = 'KIRILMOQDA...';

        try {
            await window.YoningdaAuthApi.login({
                phone_number: `+998${phone}`,
                password
            });
            const profile = await window.YoningdaAuthApi.currentUser();
            applyAuthenticatedUser(profile);
            loginPassword.value = '';
            window.location.replace('home.html');
        } catch (error) {
            setStatus('login-status', apiErrorMessage(error, 'login'), 'error');
        } finally {
            loginSubmit.disabled = false;
            loginSubmit.textContent = 'KIRISH';
        }
    });
}

function bindRegisterForm() {
    const firstName = document.getElementById('register-firstname');
    const lastName = document.getElementById('register-lastname');
    const phone = document.getElementById('register-phone');
    const password = document.getElementById('register-password');
    const confirmPassword = document.getElementById('register-confirm-password');
    const rules = document.getElementById('register-rules');
    const submit = document.getElementById('register-submit');
    const loginPhone = document.getElementById('login-phone');

    phone.addEventListener('input', function () {
        this.value = this.value.replace(/\D/g, '').slice(0, 9);
    });

    submit.addEventListener('click', async function () {
        clearError('register-firstname-error');
        clearError('register-lastname-error');
        clearError('register-phone-error');
        clearError('register-password-error');
        clearError('register-confirm-error');
        clearError('register-rules-error');
        setStatus('register-status', '');

        if (firstName.value.trim().length < 2) {
            setError('register-firstname-error', 'Ismingizni kiriting.');
            firstName.focus();
            return;
        }

        if (lastName.value.trim().length < 2) {
            setError('register-lastname-error', 'Familiyangizni kiriting.');
            lastName.focus();
            return;
        }

        if (phone.value.trim().length !== 9) {
            setError('register-phone-error', 'Telefon raqamni to‘liq kiriting.');
            phone.focus();
            return;
        }

        if (password.value.length < 12 || password.value.length > 128 || !password.value.trim()) {
            setError('register-password-error', 'Parol 12–128 belgidan iborat bo‘lishi kerak.');
            password.focus();
            return;
        }

        const displayName = `${firstName.value.trim()} ${lastName.value.trim()}`;
        if (displayName.length > 80) {
            setError('register-lastname-error', 'Ism va familiya jami 80 belgidan oshmasin.');
            lastName.focus();
            return;
        }

        if (password.value !== confirmPassword.value) {
            setError('register-confirm-error', 'Parollar bir xil emas.');
            confirmPassword.focus();
            return;
        }

        if (!rules.checked) {
            setError('register-rules-error', 'Davom etish uchun qoidalarni tasdiqlang.');
            return;
        }

        submit.disabled = true;
        submit.textContent = 'YUBORILMOQDA...';

        try {
            await window.YoningdaAuthApi.register({
                display_name: displayName,
                phone_number: `+998${phone.value.trim()}`,
                password: password.value
            });
            loginPhone.value = phone.value.trim();
            password.value = '';
            confirmPassword.value = '';
            setAuthMode('login');
            setStatus('login-status', 'Hisob yaratildi. Telefon raqami SMS orqali tasdiqlanmagan; davom etish uchun tizimga kiring.', 'success');
            showScreen('auth-screen');
        } catch (error) {
            const message = apiErrorMessage(error, 'register');
            if (error.code === 'phone_number_already_registered') {
                setError('register-phone-error', message);
            } else if (error.status === 422) {
                setError('register-password-error', message);
            } else {
                setStatus('register-status', message, 'error');
            }
        } finally {
            submit.disabled = false;
            submit.textContent = 'DAVOM ETISH';
        }
    });
}

function bindVerifyForm() {
    const verifyButton = document.getElementById('verify-submit');
    const resendBtn = document.getElementById('resend-code');
    const verifyError = document.getElementById('verify-error');
    const unavailable = 'SMS orqali telefonni tasdiqlash backendda hozircha mavjud emas.';
    verifyButton.addEventListener('click', () => { verifyError.textContent = unavailable; });
    resendBtn.disabled = true;
    resendBtn.addEventListener('click', () => { verifyError.textContent = unavailable; });
}

function bindProfileScreen() {
    const genderButtons = document.querySelectorAll('.gender-button');
    const ageSelect = document.getElementById('profile-age');
    const submit = document.getElementById('profile-submit');

    const savedGender = localStorage.getItem('yoningda_gender');
    const savedAge = localStorage.getItem('yoningda_age');

    if (savedGender) {
        genderButtons.forEach((button) => {
            button.classList.toggle('selected', button.dataset.gender === savedGender);
        });
    }

    if (savedAge && ageSelect) {
        ageSelect.value = savedAge;
    }

    genderButtons.forEach((button) => {
        button.addEventListener('click', () => {
            genderButtons.forEach((btn) => btn.classList.remove('selected'));
            button.classList.add('selected');
            state.selectedGender = button.dataset.gender;
            clearError('profile-error');
        });
    });

    submit.addEventListener('click', () => {
        clearError('profile-error');

        if (!state.selectedGender) {
            setError('profile-error', 'Avval jinsingizni tanlang.');
            return;
        }

        if (!ageSelect.value) {
            setError('profile-error', 'Yoshingizni tanlang.');
            ageSelect.focus();
            return;
        }

        const gender = state.selectedGender;
        localStorage.setItem('yoningda_gender', gender);
        localStorage.setItem('yoningda_age', ageSelect.value);
        state.selectedGender = gender;
        state.selectedAge = ageSelect.value;

        submit.disabled = true;
        submit.textContent = 'SAQLANMOQDA...';

        setTimeout(() => {
            submit.disabled = false;
            submit.textContent = 'DAVOM ETISH';
            showScreen('main-screen');
            renderMainPage();
        }, 600);
    });
}

function renderMainPage() {
    const gender = localStorage.getItem('yoningda_gender') || 'male';
    const grid = document.getElementById('category-grid');
    grid.innerHTML = '';

    categories.forEach((category) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'category-button';
        button.textContent = category;
        button.addEventListener('click', () => {
            state.selectedCategory = category;
            renderSubcategoriesPage(category);
            showScreen('subcategories-screen');
        });
        grid.appendChild(button);
    });
}

function renderSubcategoriesPage(category) {
    const title = document.getElementById('subcategories-title');
    const list = document.getElementById('subcategory-list');
    title.textContent = `${category} bo‘yicha yo‘nalish`;
    list.innerHTML = '';

    (subcategoryNames[category] || ['Umumiy']).forEach((subcategory) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'problem-button';
        button.textContent = subcategory;
        button.addEventListener('click', () => {
            state.selectedSubcategory = subcategory;
            renderProblemsPage(localStorage.getItem('yoningda_gender') || 'male', category);
            showScreen('problems-screen');
        });
        list.appendChild(button);
    });
}

function renderProblemsPage(gender, category) {
    const list = document.getElementById('problem-list');
    const title = document.getElementById('problems-title');
    const selectedGenderKey = gender === 'female' ? 'female' : 'male';
    const issueList = problemData[selectedGenderKey][category] || ['Muammo yo‘q'];

    title.textContent = `${genderLabels[selectedGenderKey]} • ${category}`;
    list.innerHTML = '';

    issueList.forEach((issue) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'problem-button';
        button.textContent = issue;
        button.addEventListener('click', () => {
            state.selectedProblem = issue;
            renderProblemDetail(gender, category, issue);
            showScreen('selected-problem-screen');
        });
        list.appendChild(button);
    });
}

function renderProblemDetail(gender, category, issue) {
    const tag = document.getElementById('selected-problem-tag');
    const title = document.getElementById('selected-problem-title');
    const message = document.getElementById('selected-problem-message');
    const tips = document.getElementById('selected-problem-tips');

    const genderName = genderLabels[gender === 'female' ? 'female' : 'male'];
    tag.textContent = `${genderName} • ${category}`;
    title.textContent = issue;

    const generalTips = [
        'Buni birinchi navbatda uyqu, ovqat va stress darajasiga e\'tibor bering.',
        'O‘zingizga qulay va ishonchli kishiga yoki yordam xizmatiga murojaat qiling.',
        'Kichik qadamlar bilan bosqichma-bosqich yechimini topishga urinib ko‘ring.',
        'His-tuyg‘ularingizni aytishga qulay muhit toping.'
    ];

    message.textContent = `Siz tanlagan muammo: ${issue}. Bu holat hamisha yechimga ega va yordami bering.`;
    tips.innerHTML = generalTips.map((tip) => `<li>${tip}</li>`).join('');
}

function renderQuestion() {
    const questions = getCurrentQuestions();
    const question = questions[state.questionIndex];
    const options = document.getElementById('question-options');
    const progress = ((state.questionIndex + 1) / questions.length) * 100;
    const questionId = `${state.selectedSubcategory}-${state.questionIndex}`;
    const storedAnswer = state.answers[questionId];
    const storedOptions = Array.isArray(storedAnswer)
        ? storedAnswer
        : (storedAnswer && storedAnswer.options) || (storedAnswer ? [storedAnswer] : []);
    document.getElementById('questionnaire-tag').textContent = `${state.selectedCategory} • ${state.selectedSubcategory}`;
    document.getElementById('question-progress-label').textContent = `${state.questionIndex + 1} / ${questions.length}`;
    document.getElementById('question-progress-bar').style.width = `${progress}%`;
    document.getElementById('question-title').textContent = question.text;
    document.getElementById('question-error').textContent = '';
    options.innerHTML = '';

    question.options.forEach((option) => {
        const optionText = typeof option === 'string' ? option : option.text;
        const label = document.createElement('label');
        label.className = 'question-option';
        const input = document.createElement('input');
        input.type = question.type === 'multiple' ? 'checkbox' : 'radio';
        input.name = questionId;
        input.value = optionText;
        input.checked = storedOptions.includes(optionText);
        const letter = document.createElement('span');
        letter.className = 'option-letter';
        letter.textContent = `${String.fromCharCode(65 + question.options.indexOf(option))})`;
        label.append(input, letter, document.createTextNode(optionText));
        options.appendChild(label);

        if (typeof option === 'object' && option.custom) {
            const customInput = document.createElement('input');
            customInput.type = 'text';
            customInput.className = 'custom-answer';
            customInput.placeholder = 'O‘z variantingizni yozing';
            customInput.value = state.customAnswers[questionId] || '';
            customInput.hidden = !input.checked;
            input.addEventListener('change', () => {
                customInput.hidden = !input.checked;
            });
            options.appendChild(customInput);
        }
    });
}

function saveQuestionAnswer() {
    const questions = getCurrentQuestions();
    const question = questions[state.questionIndex];
    const questionId = `${state.selectedSubcategory}-${state.questionIndex}`;
    const selected = [...document.querySelectorAll(`#question-options input[name="${questionId}"]:checked`)].map((input) => input.value);
    if (!selected.length) {
        document.getElementById('question-error').textContent = 'Davom etish uchun javobni tanlang yoki “Javob bermayman”ni bosing.';
        return false;
    }
    const customInput = document.querySelector('#question-options .custom-answer');
    if (customInput && selected.includes('Boshqa (o\'z variantingizni yozing)')) {
        state.customAnswers[questionId] = customInput.value.trim();
    }
    state.answers[questionId] = question.type === 'multiple' ? selected : selected[0];
    localStorage.setItem('yoningda_questionnaire', JSON.stringify({
        category: state.selectedCategory,
        subcategory: state.selectedSubcategory,
        problem: state.selectedProblem,
        index: state.questionIndex,
        answers: state.answers,
        customAnswers: state.customAnswers
    }));
    return true;
}

function finishQuestionnaire() {
    document.getElementById('result-message').textContent = `“${state.selectedProblem}” bo‘yicha javoblaringiz qabul qilindi. Javoblaringiz bo‘yicha qo‘shimcha qo‘llab-quvvatlash foydali bo‘lishi mumkin.`;
    document.getElementById('result-tips').innerHTML = [
        'Ishonchli katta odam yoki o‘qituvchi bilan gaplashib ko‘ring.',
        'Bugun bajarish mumkin bo‘lgan bitta kichik qadamni tanlang.',
        'Yordam kerak bo‘lsa, platformadagi mas’ul xodim bilan bog‘lanish imkoniyatidan foydalaning.'
    ].map((tip) => `<li>${tip}</li>`).join('');
    localStorage.removeItem('yoningda_questionnaire');
    showScreen('result-screen');
}

function bindQuestionnaire() {
    document.getElementById('start-questionnaire').addEventListener('click', () => {
        state.questionIndex = 0;
        state.answers = {};
        state.customAnswers = {};
        renderQuestion();
        showScreen('questionnaire-screen');
    });

    document.getElementById('questionnaire-back').addEventListener('click', () => {
        showScreen('selected-problem-screen');
    });

    document.getElementById('skip-question').addEventListener('click', () => {
        const questions = getCurrentQuestions();
        state.answers[`${state.selectedSubcategory}-${state.questionIndex}`] = null;
        if (state.questionIndex === questions.length - 1) finishQuestionnaire();
        else { state.questionIndex += 1; renderQuestion(); }
    });

    document.getElementById('next-question').addEventListener('click', () => {
        if (!saveQuestionAnswer()) return;
        if (state.questionIndex === getCurrentQuestions().length - 1) finishQuestionnaire();
        else { state.questionIndex += 1; renderQuestion(); }
    });
}

async function endSession(button, errorId) {
    const originalText = button.textContent;
    button.disabled = true;
    button.textContent = 'CHIQILMOQDA...';
    try {
        await window.YoningdaAuthApi.logout();
        state.user = null;
        state.selectedGender = '';
        state.selectedAge = '';
        state.answers = {};
        state.customAnswers = {};
        localStorage.removeItem('yoningda_profile_user_id');
        localStorage.removeItem('yoningda_gender');
        localStorage.removeItem('yoningda_age');
        localStorage.removeItem('yoningda_questionnaire');
        setStatus('startup-status', '');
        showScreen('landing-screen');
    } catch (error) {
        const message = apiErrorMessage(error, 'logout');
        if (errorId) setError(errorId, message);
        else window.alert(message);
    } finally {
        button.disabled = false;
        button.textContent = originalText;
    }
}

function bindLogoutButtons() {
    const mainLogout = document.getElementById('logout-button');
    const profileLogout = document.getElementById('profile-logout');
    mainLogout.addEventListener('click', () => endSession(mainLogout));
    profileLogout.addEventListener('click', () => endSession(profileLogout, 'profile-error'));
}

async function restoreAuthSession() {
    try {
        const profile = await window.YoningdaAuthApi.currentUser();
        applyAuthenticatedUser(profile);
        setStatus('startup-status', '');
        const topicsEntry = new URLSearchParams(window.location.search).get('topics') === '1';
        if (topicsEntry) {
            renderMainPage();
            showScreen('main-screen');
        } else {
            window.location.replace('home.html');
        }
    } catch (error) {
        state.user = null;
        showScreen('landing-screen');
        if (error.code !== 'authentication_required' && error.status !== 401) {
            setStatus('startup-status', apiErrorMessage(error, 'session'), 'error');
        }
    }
}

function init() {
    setAuthMode('login');
    initLandingFeatures();
    bindScreenButtons();
    bindLoginForm();
    bindRegisterForm();
    bindVerifyForm();
    bindProfileScreen();
    bindQuestionnaire();
    bindLogoutButtons();

    const profileMini = document.getElementById('profile-mini-button');
    if (profileMini) {
        profileMini.addEventListener('click', () => showScreen('profile-screen'));
    }

    restoreAuthSession();
}

=======
const categories = [
    "O‘qish",
    "Oila",
    "Maktab",
    "Do‘stlar",
    "Muloqot",
    "Internet",
    "Shaxsiy",
    "Sirlar",
    "Boshqa"
];

const problemData = {
    male: {
        "O‘qish": [
            "Darslarni tushunmaslik",
            "O‘qishga motivatsiya yetishmasligi",
            "Vaqtni boshqarish",
            "Imtihon bosimi",
            "O‘qituvchi bilan muammo",
            "Zo‘ravonlik",
            "Kiberzo‘ravonlik / kiberbulling"
        ],
        Oila: [
            "Ota-ona bilan kelishmovchilik",
            "Uyda tushunilmaslik",
            "Oiladagi bosim",
            "Oiladagi nizolar",
            "Bosim yoki majburlash",
            "Xavfsizlik bilan bog‘liq muammo"
        ],
        Maktab: [
            "Sinfdoshlar bilan muammo",
            "O‘qituvchi bilan kelishmovchilik",
            "Baholar sababli bosim",
            "Maktab muhitiga moslashish",
            "Kiberzo‘ravonlik / kiberbulling",
            "Bosim yoki majburlash"
        ],
        "Do‘stlar": [
            "Do‘stlar bilan kelishmovchilik",
            "Yolg‘izlik",
            "Guruhga moslasha olmaslik",
            "Ishonch muammolari",
            "Zo‘ravonlik",
            "Kiberzo‘ravonlik / kiberbulling"
        ],
        Muloqot: [
            "Fikrini aytishga qiynalish",
            "Odamlar bilan gaplashish qiyinligi",
            "O‘z fikrini tushuntira olmaslik",
            "Uyatchanlik",
            "Bosim yoki majburlash"
        ],
        Internet: [
            "Internetdagi bosim",
            "Kiberbulling",
            "Ijtimoiy tarmoqlardagi muammolar",
            "Onlayn xavfsizlik",
            "Zo‘ravonlik",
            "Xavfsizlik bilan bog‘liq muammo"
        ],
        Shaxsiy: [
            "O‘ziga ishonch",
            "Hissiyotlarni tushunish",
            "Stress",
            "Kayfiyat bilan bog‘liq qiyinchiliklar",
            "Ishonch muammosi"
        ],
        Sirlar: [
            "Ichida saqlab yurayotgan muammo",
            "Kim bilandir gaplashishga qo‘rqish",
            "Ishonch muammosi",
            "Yordam so‘rashga qiynalish",
            "Xavfsizlik bilan bog‘liq muammo"
        ],
        Boshqa: [
            "Muammoim ro‘yhatda yo‘q",
            "Boshqa masala",
            "Nima bezovta qilayotganini tushunmaslik",
            "Zo‘ravonlik",
            "Bosim yoki majburlash"
        ]
    },
    female: {
        "O‘qish": [
            "Darslarni tushunmaslik",
            "O‘qishga motivatsiya yetishmasligi",
            "Vaqtni boshqarish",
            "Imtihon bosimi",
            "O‘qituvchi bilan muammo",
            "Zo‘ravonlik",
            "Kiberzo‘ravonlik / kiberbulling"
        ],
        Oila: [
            "Ota-ona bilan kelishmovchilik",
            "Uyda tushunilmaslik",
            "Oiladagi bosim",
            "Oiladagi nizolar",
            "Bosim yoki majburlash",
            "Xavfsizlik bilan bog‘liq muammo"
        ],
        Maktab: [
            "Sinfdoshlar bilan muammo",
            "O‘qituvchi bilan kelishmovchilik",
            "Baholar sababli bosim",
            "Maktab muhitiga moslashish",
            "Kiberzo‘ravonlik / kiberbulling",
            "Bosim yoki majburlash"
        ],
        "Do‘stlar": [
            "Do‘stlar bilan kelishmovchilik",
            "Yolg‘izlik",
            "Guruhga moslasha olmaslik",
            "Ishonch muammolari",
            "Zo‘ravonlik",
            "Kiberzo‘ravonlik / kiberbulling"
        ],
        Muloqot: [
            "Fikrini aytishga qiynalish",
            "Odamlar bilan gaplashish qiyinligi",
            "O‘z fikrini tushuntira olmaslik",
            "Uyatchanlik",
            "Bosim yoki majburlash"
        ],
        Internet: [
            "Internetdagi bosim",
            "Kiberbulling",
            "Ijtimoiy tarmoqlardagi muammolar",
            "Onlayn xavfsizlik",
            "Zo‘ravonlik",
            "Xavfsizlik bilan bog‘liq muammo"
        ],
        Shaxsiy: [
            "O‘ziga ishonch",
            "Hissiyotlarni tushunish",
            "Stress",
            "Kayfiyat bilan bog‘liq qiyinchiliklar",
            "Ishonch muammosi"
        ],
        Sirlar: [
            "Ichida saqlab yurayotgan muammo",
            "Kim bilandir gaplashishga qo‘rqish",
            "Ishonch muammosi",
            "Yordam so‘rashga qiynalish",
            "Xavfsizlik bilan bog‘liq muammo"
        ],
        Boshqa: [
            "Muammoim ro‘yhatda yo‘q",
            "Boshqa masala",
            "Nima bezovta qilayotganini tushunmaslik",
            "Zo‘ravonlik",
            "Bosim yoki majburlash"
        ]
    }
};

const genderLabels = {
    male: 'ERKAK',
    female: 'AYOL'
};

const state = {
    activeScreen: 'landing-screen',
    user: null,
    selectedGender: localStorage.getItem('yoningda_gender') || '',
    selectedAge: localStorage.getItem('yoningda_age') || '',
    selectedCategory: '',
    selectedProblem: '',
    selectedSubcategory: '',
    questionIndex: 0,
    answers: {},
    customAnswers: {},
    authMode: 'login'
};

const subcategoryNames = {
    "O‘qish": ["Baholar va o'zlashtirish"],
    Oila: ["Oila va Uy"],
    Maktab: ["Baholar va o'zlashtirish"],
    "Do‘stlar": ["Do'stlar va Muloqot"],
    Muloqot: ["Do'stlar va Muloqot"],
    Internet: ["Internet va Xavfsizlik"],
    Shaxsiy: ["Shaxsiy va Emotsiyalar"],
    Sirlar: ["Internet va Xavfsizlik", "Shaxsiy va Emotsiyalar"],
    Boshqa: ['Noma’lum bezovtalik', 'Kundalik qiyinchilik', 'Xavfsizlik']
};

const questionnaireSets = {
    "Baholar va o'zlashtirish": [
        { text: "Darslarda past baho olganingizda o'zingizni qanday his qilasiz?", options: ["Juda xafa bo'laman va tushkunlikka tushaman", "G'azablanaman va adolatsizlik deb o'ylayman", "Xatoyimni tushunib, keyingi safar yaxshiroq tayyorlanishga harakat qilaman", "E'tibor bermayman, baho men uchun muhim emas"] },
        { text: "Ota-onangiz kutilganidan pastroq baho olganingizda qanday munosabat bildiradi?", options: ["Urushishadi yoki qattiq jazolashadi", "Tushunish ko'rsatib, yordam berishga harakat qilishadi", "Ko'nglimni cho'ktiradigan gaplar aytishadi", "Baholarim bilan umuman qiziqishmaydi"] },
        { text: "Mavzularni o'zlashtirishda eng ko'p qaysi omil sizga xalaqit beradi?", options: ["Darslarning murakkabligi va tushunarsiz tushuntirilishi", "Diqqatni jamlay olmaslik va chalg'ish", "Uy vazifalarining juda ko'pligi va vaqt yetishmasligi", "Darsga bo'lgan qiziqishning yo'qligi"] },
        { text: "Sinfdoshlaringizning yuqori baholari yoki yutuqlari sizga qanday ta'sir qiladi?", options: ["O'zimni ulardan ortda qolgandek his qilaman (ichki bosim)", "Bu menga kuch beradi, ularga yetib olishga harakat qilaman", "Hasad qilishimga yoki o'zimga bo'lgan ishonchim yo'qolishiga sabab bo'ladi", "Mening o'zlashtirishimga va kayfiyatimga ta'sir qilmaydi"] },
        { text: "Darsda tushunmay qolgan mavzuingiz bo'yicha ustozga murojaat qilishga nima to'sqinlik qiladi?", options: ["Ustozning urishishidan yoki jerkib berishidan qo'rqaman", "Sinfdoshlarim ustimdan kulishidan tortinaman", "Savol berishga umuman imkon berilmaydi", "Hech narsa to'sqinlik qilmaydi, bemalol so'ray olaman"] },
        { text: "Nazorat ishlari va imtihonlar oldidan o'zingizda qanday holatni sezasiz?", options: ["Kuchli hayajon, xavotir va hatto jismoniy noqulaylik (bosh/qorin og'rig'i)", "Yengil hayajon, lekin diqqatni jamlay olaman", "Mutlaqo xotirjamman, qo'rqmayman", "O'zimga ishonch yo'qligi sababli topshirishni ham xohlamayman"] },
        { text: "O'quv darsligidagi yoki beriladigan topshiriqlardagi qaysi jihat sizni darsdan sovitadi?", options: ["Nazariy ma'lumotlarning o'ta ko'pligi va qiziqarsizligi", "Amaliy va qiziqarli topshiriqlarning yo'qligi", "Manbalarning va o'quv qurollarining yetarsizligi", "Hammasi joyida, darslar qiziqarli"] },
        { text: "O'zlashtirishingizni yaxshilash uchun ilova yoki ustozlar tomonidan qanday yordam berilishini xohlardingiz?", options: ["Tushunarsiz mavzularni sodda tilda tushuntirib beruvchi qisqa vizual qo'llanmalar", "Ruhiy qo'llab-quvvatlash va vaqtni to'g'ri taqsimlash (taym-menedjment) bo'yicha maslahatlar", "Anonim tarzda savol berish va javob olish imkoniyati", { text: "Boshqa (o'z variantingizni yozing)", custom: true }] }
    ],
    "Oila va Uy": [
        { text: "Uydagilar bilan o'zaro munosabatlaringiz va tushunmovchiliklar sizga qanday ta'sir qiladi?", options: ["Qattiq siqilaman, dars qilishga va boshqa ishlarga xohishim yo'qoladi", "Jahlim chiqadi, xonamga kirib alohida o'tirishni afzal ko'raman", "Muammoni tinch yo'l bilan gaplashib hal qilishga harakat qilaman", "E'tibor bermaslikka harakat qilaman, mening kayfiyatimga ta'sir qilmaydi"] },
        { text: "Ota-onangiz bilan shaxsiy muammolaringiz yoki orzularingiz haqida ochiq gaplasha olasizmi?", options: ["Ha, ular meni har doim eshitishadi va qo'llab-quvvatlashadi", "Faqat ba'zi mavzularda gaplasha olaman, hammasini aytolmayman", "Yo'q, tushunishmaydi yoki urishib berishadi deb qo'rqaman", "Umuman gaplashmayman, sirimni ichimda saqlayman"] },
        { text: "Uydagi qaysi holat sizga eng ko'p ruhiy bosim yoki xavotir beradi?", options: ["Ota-onamning doimiy baland ovozda tortishishi yoki nizolari", "Mening erkinligim yo'qligi va har bir qadamimning nazorat qilinishi", "Boshqa tengdoshlarim yoki aka-ukalarim bilan solishtirishlari", "Uydagi moddiy va maishiy qiyinchiliklar"] },
        { text: "Aka-uka yoki opa-singillaringiz bilan munosabatingiz qanday?", options: ["Inoqman, bir-birimizga sirimizni aytamiz va yordam beramiz", "Tez-tez urishib turamiz, lekin baribir ahilman", "Doimiy kelishmovchilik va adolatsizlikni his qilaman (ularni ko'proq yaxshi ko'rishadi)", "Bitta xonadonda yashasak ham, deyarli muloqot qilmaymiz", "Oilada yolg'iz farzandman yoki ukalarim juda yosh"] },
        { text: "Oila a'zolaringiz tomonidan sizga nisbatan qanday harakatlar eng ko'p og'ir batadi?", options: ["Fikrim bilan hisoblashmaslik va mensimaslik", "Doimiy tanqid qilish va faqat kamchiliklarimni ko'rish", "Shaxsiy hududim va sirlarimga hurmat ko'rsatmaslik", "Haddan tashqari ko'p vazifa va mas'uliyat yuklash"] },
        { text: "Uyga qaytayotganingizda odatda qanday hissiyot bilan kelasiz?", options: ["Xotirjamlik va xavfsizlik hissi bilan (uy --- mening xavfsiz maskanim)", "Shunchaki odatiy holat, maxsus hissiyot yo'q", "Bezovtalik va stress bilan (yana shovqin yoki urush bo'larmikin degan xavotir)", "Ilojim bo'lsa, uyga kechroq borishni yoki ko'chada yurishni xohlayman"] },
        { text: "Oila a'zolaringiz sizning qiziqishlaringiz va kelajakdagi rejalaringizni qo'llab-quvvatlaydimi?", options: ["Ha, har doim mening tanlovimni hurmat qilishadi", "Qisman, lekin ko'p narsani o'zlari hal qilishga urinishadi", "Yo'q, mening qiziqishlarimni bekorchi narsa deb hisoblashadi", "Ular bilan kelajak haqida umuman gaplashmaganman"] },
        { text: "Uydagi muhitni yaxshilash va ota-onangiz bilan tushunishish uchun ushbu ilovadan qanday yordam kutasiz?", options: ["Ota-ona bilan to'g'ri muloqot qilish bo'yicha psixologik maslahatlar", "Urush-janjal va stress paytida o'zni bosiq tutish usullari (mashqlar)", "Psixolog bilan anonim tarzda dardlashish va maslahat olish", { text: "Boshqa (o'z fikringizni yozing)", custom: true }] }
    ],
    "Do'stlar va Muloqot": [
        { text: "Tengdoshlaringiz va do'stlaringiz davrasida o'zingizni qanday his qilasiz?", options: ["Erkin va xotirjam, ular meni borimcha qabul qilishadi", "Ba'zan tortinaman, ularga yoqish uchun o'zimni boshqacha tutishga majbur bo'laman", "Keraksiz va begona his qilaman, fikrimni inobatga olishmaydi", "Menda do'stlar davrasi yo'q, ko'pincha yolg'izman"] },
        { text: "Yangi odamlar bilan tanishish yoki muloqotni birinchi bo'lib boshlash siz uchun qanchalik oson?", options: ["Juda oson, tezda kirishib ketaman va til topishaman", "Biroz qiyin, lekin vaziyatga qarab muloqot qila olaman", "Juda qiyin, uyalaman, nima deyishni bilmay tortinib qolaman", "Umuman muloqot qilgim kelmaydi, yangi tanishuvlardan qochaman"] },
        { text: "Yaqin do'stingiz bilan o'rtangizda kelishmovchilik bo'lsa, odatda qanday yo'l tutasiz?", options: ["Darhol ochiq gaplashib, muammoni hal qilishga harakat qilaman", "Arazlab yuraman, birinchi bo'lib qadam tashlashini kutaman", "Ayb menda bo'lmasa ham, munosabat buzilmasligi uchun o'zim yon beraman", "Munosabatni birdaniga uzaman va gaplashmay qo'ya qolaman"] },
        { text: "Do'stlaringiz sizdan nojo'ya yoki xohlamagan narsangizni qilishni so'rashsa, qanday javob berasiz?", options: ["Ikki hisoblamay, qat'iyat bilan \"Yo'q\" deya olaman", "Rad etgim keladi, lekin ajralib qolishdan yoki xafa qilishdan qo'rqib rozi bo'laman", "Turli bahonalar o'ylab topib, vaziyatdan chiqib ketishga urinaman", "Ular nima desa, qarshiliksiz bajaraveraman"] },
        { text: "Ayni paytda muloqotda va do'stlashishda sizni eng ko'p nima qiynaydi?", options: ["Do'stlarim tomonidan xiyonat qilinishi yoki sirlarim tarqalishi", "Yolg'izlik --- sirdosh va sodiq do'stning yo'qligi", "Tengdoshlarimning ustimdan kulishi yoki kamsitishi (bulling)", "O'zimdagi tortinchoqlik va o'zimga bo'lgan ishonchsizlik"] },
        { text: "Ijtimoiy tarmoqlardagi yoki virtual do'stlaringiz bilan munosabatingiz qanday?", options: ["Hayotdagi do'stlarim bilan ko'proq muloqot qilaman, virtual do'stlarim kam", "Onlayn do'stlarimga hayotdagilarga qaraganda ko'proq ishonaman va sirlashaman", "Ijtimoiy tarmoqda faolman, lekin baribir o'zimni yolg'iz his qilaman", "Ijtimoiy tarmoqlarda deyarli muloqot qilmayman"] },
        { text: "Do'stlaringizning yutuqlari yoki mashhurligi sizda qanday hissiyot uyg'otadi?", options: ["Samimiy xursand bo'laman va ularni qo'llab-quvvatlayman", "O'zimni ularning soyasida qolib ketgandek his qilaman", "Biroz hasad yoki o'zimdan qoniqmaslik hissi paydo bo'ladi", "Bu narsalar mening kayfiyatimga va munosabatimga ta'sir qilmaydi"] },
        { text: "Do'stlik va muloqotni yaxshilash uchun ushbu ilovadan qanday yordam olishni xohlaysiz?", options: ["Odamlar bilan oson muloqotga kirishish va tortinchoqlikni yengish bo'yicha maslahatlar", "\"Yo'q\" deyishni o'rganish va o'z chegaralarini himoya qilish (psixologik mashqlar)", "Jamoadan ajralib qolgan paytda stressni yengish va psixolog yordami", { text: "Boshqa (o'z fikringizni yozing)", custom: true }] }
    ],
    "Internet va Xavfsizlik": [
        { text: "Internetda yoki ijtimoiy tarmoqlarda notanish odamlar bilan muloqot qilganda o'zingizni qanday tutasiz?", options: ["Ochiqman, tezda ishonaman va shaxsiy ma'lumotlarimni bemalol bo'lishaman", "Ehtiyotkorlik bilan muloqot qilaman, lekin ba'zan ortiqcha narsalarni aytib qo'yaman", "Juda ehtiyotkor bo'laman, shaxsiy rasmlarim yoki ma'lumotlarimni umuman bermayman", "Notanish odamlar bilan internetda umuman gaplashmayman"] },
        { text: "Ijtimoiy tarmoqlarda kimgadir yoqmaydigan izoh (komment) yoki shaxsiy haqoratga duch kelsangiz, qanday javob qaytarasiz?", options: ["Juda qattiq siqilaman, kayfiyatim buziladi va o'zimni aybdor his qilaman", "Tengma-teng urushib, uni ham haqorat qilishga harakat qilaman", "E'tibor bermayman, uni bloklayman (blok ro'yxatiga solaman) va shikoyat qilaman", "Do'stlarimga yoki uydagilarga aytib, yordam so'rayman"] },
        { text: "Kun davomida telefon va internetdan foydalanish vaqtingizni qanchalik nazorat qila olasiz?", options: ["Nazorat qilolmayman, reels/tik-tok ko'rib soatlab vaqtim ketib qoladi", "Ko'p vaqtim ketadi, lekin darslarimni va ishlarimni majburan bo'lsa ham qilaman", "Vaqtimni to'g'ri taqsimlayman, telefonsiz ham bemalol vaqt o'tkaza olaman", "Telefondan faqat kerakli vazifalar uchun foydalanaman"] },
        { text: "Internetda shaxsiy rasmlaringiz, sirlaringiz yoki yozishmalaringiz tarqalib ketishidan qo'rqasizmi?", options: ["Ha, bu haqda o'ylasam kuchli xavotir va vahimaga tushaman", "Ba'zida xavotirlanaman, lekin unchalik e'tibor bermayman", "Yo'q, chunki internetda nojo'ya yoki xavfli narsalar ulashmayman", "Boshimdan shunday holat o'tgan va nima qilishni bilmay qolganman"] },
        { text: "Ijtimoiy tarmoqlardagi boshqa tengdoshlaringizning \"chiroyli va mukammal\" hayotini ko'rganingizda qanday his-tuyg'ular paydo bo'ladi?", options: ["O'zimni ulardan kamdek, hayotim qiziqarsizdek his qilaman (haddan tashqari solishtirish)", "Biroz havas yoki xafagarchilik bo'ladi, lekin tezda o'tib ketadi", "Bu shunchaki ekran ortidagi ko'rinish ekanini tushunaman va ta'sirlanmayman", "Boshqalarning sahifalarini kuzatishga qiziqmayman"] },
        { text: "Internetda firibgarlik (murojaat, soxta yutuqlar, linklar) yoki tahdidga duch kelganingizda kimdan yordam so'raysiz?", options: ["Hech kimga aytmayman, qo'rqqanimdan ichimda saqlayman", "Ota-onamga yoki oilamga darhol aytaman", "Do'stlarim yoki sinfdoshlarim bilan maslahatlashaman", "Muammoni o'zim mustaqil hal qilishga urinaman"] },
        { text: "Kiberbulling (onlayn ta'qib va haqorat) sizning real hayotingizga va o'qishingizga ta'sir qilganmi?", options: ["Ha, maktabga borishga, odamlar orasida yurishga qo'rqib qolganman", "Boshida ta'sir qildi, lekin keyin o'zimni qo'lga oldim", "Yo'q, internetdagi gaplarni yuragimga yaqin olmayman", "Menda bunday holat umuman bo'lmagan"] },
        { text: "Internetda xavfsiz bo'lish va onlayn qaramlikdan qutulish uchun ushbu ilovadan qanday yordam kutasiz?", options: ["Kiberbulling va tahdidlarga uchraganda anonymous (sirli) psixologik va huquqiy maslahat", "Telefon qaramligidan xalos bo'lish va vaqtni to'g'ri boshqarish (screens-free) mashqlari", "Shaxsiy ma'lumotlarni va sahifalarni himoyalash bo'yicha amaliy qo'llanmalar", { text: "Boshqa (o'z fikringizni yozing)", custom: true }] }
    ],
    "Shaxsiy va Emotsiyalar": [
        { text: "Ayni damda ichki kayfiyatingiz va ruhiy holatingizni qanday ta'riflagan bo'lardingiz?", options: ["Xotirjam va quvnoqman, hammasi joyida", "Tushkunlikda (depressiyada)man, tez-tez sababsiz xafachilikni his qilaman", "Doimiy xavotir, qo'rquv va stressdaman", "Emotsiyalarim tez-tez o'zgarib turadi (kayfiyat beqarorligi)"] },
        { text: "Hech kimga aytolmaydigan ichki sirlaringiz yoki muammolaringiz sizga qanday ta'sir qilmoqda?", options: ["Yolg'iz o'zim ko'tarishga qiynalyapman, kimgadir yorilishga ehtiyojim bor", "Ba'zan qiynaydi, lekin ichimda saqlashga o'rganib ketganman", "Ishonchli insonim bo'lmagani uchun hech kimga aytgim kelmaydi", "Meni qiynaydigan darajada og'ir sirlarim yo'q"] },
        { text: "O'zingizga bo'lgan ishonch va o'z qadringizni his qilish darajangiz qanday?", options: ["O'zimga va kuchimga to'liq ishonaman", "O'zimni tez-tez boshqalar bilan solishtirib, kamchiliklarimdan siqilaman", "O'zimni keraksiz, omadsiz va hech kimga yoqmaydigandek his qilaman", "Tashqi ko'rinishim va fe'l-atvorimdan qoniqmayman"] },
        { text: "Kutilmagan stress yoki qiyin vaziyatga tushganingizda, bu jismoniy holatingizda qanday aks etadi?", options: ["Bosh/qorin og'rig'i, yurak tez urishi yoki nafas siqilishi paydo bo'ladi", "Uyqum buziladi (uyqusizlik yoki haddan tashqari ko'p uxlash)", "Ishtaham yo'qoladi yoki aksincha, ko'p ovqat yeb qo'yaman", "Jismoniy sezgilarimda hech qanday o'zgarish bo'lmaydi"] },
        { text: "Kelajagingiz (kasb tanlash, hayotda o'z o'rningizni topish) haqida o'ylaganingizda qanday hissiyot paydo bo'ladi?", options: ["Ishtiyoq va qiziqish --- rejalarm aniq va kelajakka ishonchim komil", "Kuchli qo'rquv va xavotir --- eplay olmasam-chi degan xavotirdaman", "Mavhumlik va noaniqlik --- nima qilishni va kim bo'lishni umuman bilmayman", "Kelajak haqida hali o'ylamaganim"] },
        { text: "Hayotda qiyin vaziyatga tushganingizda eng birinchi bo'lib kimdan ma'naviy/ruhiy suyanch qidirasiz?", options: ["Ota-onam yoki qarindoshlarimdan", "Do'stlarim va tengdoshlarimdan", "Ustozlarim yoki murabbiylarimdan", "Hech kimdan, hammasini ichimda yengishga harakat qilaman"] },
        { text: "G'azab, nafrat yoki kuchli alam hissi kelganida o'zingizni tutishingiz qanday bo'ladi?", options: ["Boshqalarga baqiraman, narsalarni sindiraman yoki jahl bilan javob qaytaraman", "Yig'lab olaman yoki xonamga berkinib olaman", "O'zimni bosiqlik bilan to'xtatishga harakat qilaman (o'zimni idora qila olaman)", "Alamimni o'zimdan olaman (o'zimni ayblayman)"] },
        { text: "O'zingizni ruhiy tomondan yengil his qilish va emotsional holatingizni yaxshilash uchun ushbu ilovadan qanday yordam kutasiz?", options: ["Professional psixolog bilan to'liq anonim (sirli) va xavfsiz suhbat", "Stress va vahimani (panikani) bosish uchun vizual/audiomashqlar va meditatsiyalar", "O'ziga bo'lgan ishonchni oshirish va ruhiy tushkunlikdan chiqish bo'yicha foydali maqola va tavsiyalar", { text: "Boshqa (o'z fikringizni yozing)", custom: true }] }
    ]
};

function getCurrentQuestions() {
    return questionnaireSets[state.selectedSubcategory] || [];
}

function showScreen(screenId) {
    const publicScreens = new Set(['landing-screen', 'auth-screen']);
    if (!publicScreens.has(screenId) && !state.user) {
        setAuthMode('login');
        screenId = 'auth-screen';
    }
    document.querySelectorAll('.screen').forEach((screen) => {
        screen.classList.toggle('active', screen.id === screenId);
    });
    state.activeScreen = screenId;
}

function setAuthMode(mode) {
    state.authMode = mode;
    const tabs = document.querySelectorAll('.auth-tab');
    const boxes = document.querySelectorAll('.auth-form-box');

    tabs.forEach((tab) => {
        tab.classList.toggle('active', tab.dataset.authTab === mode);
    });

    boxes.forEach((box) => {
        box.classList.toggle('active', box.id === `${mode}-form-box`);
    });
}

function clearError(id) {
    const el = document.getElementById(id);
    if (el) el.textContent = '';
}

function setError(id, message) {
    const el = document.getElementById(id);
    if (el) el.textContent = message;
}

function setStatus(id, message, kind = '') {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = message;
    el.className = `status-message${kind ? ` ${kind}` : ''}`;
}

function applyAuthenticatedUser(profile) {
    const storedUserId = localStorage.getItem('yoningda_profile_user_id');
    if (storedUserId !== String(profile.id)) {
        localStorage.removeItem('yoningda_gender');
        localStorage.removeItem('yoningda_age');
        localStorage.removeItem('yoningda_questionnaire');
    }
    localStorage.setItem('yoningda_profile_user_id', String(profile.id));
    if (profile.gender) localStorage.setItem('yoningda_gender', profile.gender);
    state.user = profile;
    state.selectedGender = profile.gender || localStorage.getItem('yoningda_gender') || '';
    state.selectedAge = localStorage.getItem('yoningda_age') || '';
    document.querySelectorAll('.gender-button').forEach((button) => {
        button.classList.toggle('selected', button.dataset.gender === state.selectedGender);
    });
    const ageSelect = document.getElementById('profile-age');
    if (ageSelect) ageSelect.value = state.selectedAge;
}

function apiErrorMessage(error, context) {
    return window.YoningdaAuthApi.messageFor(error, context);
}

function togglePassword(inputId, button) {
    const input = document.getElementById(inputId);
    if (!input) return;

    const isPassword = input.type === 'password';
    input.type = isPassword ? 'text' : 'password';
    button.textContent = isPassword ? '🙈' : '👁';
}

function initLandingFeatures() {
    document.querySelectorAll('.feature-item').forEach((item) => {
        const button = item.querySelector('.feature-button');
        button.addEventListener('click', function () {
            document.querySelectorAll('.feature-item').forEach((otherItem) => {
                if (otherItem !== item) otherItem.classList.remove('active');
            });
            item.classList.toggle('active');
        });
    });
}

function bindScreenButtons() {
    document.querySelectorAll('[data-target]').forEach((button) => {
        button.addEventListener('click', () => {
            const target = button.dataset.target;
            if (target) showScreen(target);
        });
    });

    document.querySelectorAll('[data-auth-tab]').forEach((button) => {
        button.addEventListener('click', () => setAuthMode(button.dataset.authTab));
    });

    document.querySelectorAll('[data-toggle-password]').forEach((button) => {
        button.addEventListener('click', () => togglePassword(button.dataset.togglePassword, button));
    });

    document.querySelectorAll('.register-btn, .login-btn').forEach((button) => {
        button.addEventListener('click', () => {
            const target = button.dataset.target || 'auth-screen';
            const mode = button.classList.contains('register-btn') ? 'register' : 'login';

            showScreen(target);
            if (target === 'auth-screen') {
                setAuthMode(mode);
            }
        });
    });
}

function bindLoginForm() {
    const loginPhone = document.getElementById('login-phone');
    const loginPassword = document.getElementById('login-password');
    const loginSubmit = document.getElementById('login-submit');

    loginPhone.addEventListener('input', function () {
        this.value = this.value.replace(/\D/g, '').slice(0, 9);
    });

    loginSubmit.addEventListener('click', async function () {
        clearError('login-phone-error');
        clearError('login-password-error');
        setStatus('login-status', '');

        const phone = loginPhone.value.trim();
        const password = loginPassword.value;

        if (phone.length !== 9) {
            setError('login-phone-error', 'Telefon raqamni to‘liq kiriting.');
            loginPhone.focus();
            return;
        }

        if (!password || password.length > 128) {
            setError('login-password-error', 'Parolni to‘g‘ri kiriting.');
            loginPassword.focus();
            return;
        }

        loginSubmit.disabled = true;
        loginSubmit.textContent = 'KIRILMOQDA...';

        try {
            await window.YoningdaAuthApi.login({
                phone_number: `+998${phone}`,
                password
            });
            const profile = await window.YoningdaAuthApi.currentUser();
            applyAuthenticatedUser(profile);
            loginPassword.value = '';
            window.location.replace('home.html');
        } catch (error) {
            setStatus('login-status', apiErrorMessage(error, 'login'), 'error');
        } finally {
            loginSubmit.disabled = false;
            loginSubmit.textContent = 'KIRISH';
        }
    });
}

function bindRegisterForm() {
    const firstName = document.getElementById('register-firstname');
    const lastName = document.getElementById('register-lastname');
    const phone = document.getElementById('register-phone');
    const password = document.getElementById('register-password');
    const confirmPassword = document.getElementById('register-confirm-password');
    const rules = document.getElementById('register-rules');
    const submit = document.getElementById('register-submit');
    const loginPhone = document.getElementById('login-phone');

    phone.addEventListener('input', function () {
        this.value = this.value.replace(/\D/g, '').slice(0, 9);
    });

    submit.addEventListener('click', async function () {
        clearError('register-firstname-error');
        clearError('register-lastname-error');
        clearError('register-phone-error');
        clearError('register-password-error');
        clearError('register-confirm-error');
        clearError('register-rules-error');
        setStatus('register-status', '');

        if (firstName.value.trim().length < 2) {
            setError('register-firstname-error', 'Ismingizni kiriting.');
            firstName.focus();
            return;
        }

        if (lastName.value.trim().length < 2) {
            setError('register-lastname-error', 'Familiyangizni kiriting.');
            lastName.focus();
            return;
        }

        if (phone.value.trim().length !== 9) {
            setError('register-phone-error', 'Telefon raqamni to‘liq kiriting.');
            phone.focus();
            return;
        }

        if (password.value.length < 12 || password.value.length > 128 || !password.value.trim()) {
            setError('register-password-error', 'Parol 12–128 belgidan iborat bo‘lishi kerak.');
            password.focus();
            return;
        }

        const displayName = `${firstName.value.trim()} ${lastName.value.trim()}`;
        if (displayName.length > 80) {
            setError('register-lastname-error', 'Ism va familiya jami 80 belgidan oshmasin.');
            lastName.focus();
            return;
        }

        if (password.value !== confirmPassword.value) {
            setError('register-confirm-error', 'Parollar bir xil emas.');
            confirmPassword.focus();
            return;
        }

        if (!rules.checked) {
            setError('register-rules-error', 'Davom etish uchun qoidalarni tasdiqlang.');
            return;
        }

        submit.disabled = true;
        submit.textContent = 'YUBORILMOQDA...';

        try {
            await window.YoningdaAuthApi.register({
                display_name: displayName,
                phone_number: `+998${phone.value.trim()}`,
                password: password.value
            });
            loginPhone.value = phone.value.trim();
            password.value = '';
            confirmPassword.value = '';
            setAuthMode('login');
            setStatus('login-status', 'Hisob yaratildi. Telefon raqami SMS orqali tasdiqlanmagan; davom etish uchun tizimga kiring.', 'success');
            showScreen('auth-screen');
        } catch (error) {
            const message = apiErrorMessage(error, 'register');
            if (error.code === 'phone_number_already_registered') {
                setError('register-phone-error', message);
            } else if (error.status === 422) {
                setError('register-password-error', message);
            } else {
                setStatus('register-status', message, 'error');
            }
        } finally {
            submit.disabled = false;
            submit.textContent = 'DAVOM ETISH';
        }
    });
}

function bindVerifyForm() {
    const verifyButton = document.getElementById('verify-submit');
    const resendBtn = document.getElementById('resend-code');
    const verifyError = document.getElementById('verify-error');
    const unavailable = 'SMS orqali telefonni tasdiqlash backendda hozircha mavjud emas.';
    verifyButton.addEventListener('click', () => { verifyError.textContent = unavailable; });
    resendBtn.disabled = true;
    resendBtn.addEventListener('click', () => { verifyError.textContent = unavailable; });
}

function bindProfileScreen() {
    const genderButtons = document.querySelectorAll('.gender-button');
    const ageSelect = document.getElementById('profile-age');
    const submit = document.getElementById('profile-submit');

    const savedGender = localStorage.getItem('yoningda_gender');
    const savedAge = localStorage.getItem('yoningda_age');

    if (savedGender) {
        genderButtons.forEach((button) => {
            button.classList.toggle('selected', button.dataset.gender === savedGender);
        });
    }

    if (savedAge && ageSelect) {
        ageSelect.value = savedAge;
    }

    genderButtons.forEach((button) => {
        button.addEventListener('click', () => {
            genderButtons.forEach((btn) => btn.classList.remove('selected'));
            button.classList.add('selected');
            state.selectedGender = button.dataset.gender;
            clearError('profile-error');
        });
    });

    submit.addEventListener('click', () => {
        clearError('profile-error');

        if (!state.selectedGender) {
            setError('profile-error', 'Avval jinsingizni tanlang.');
            return;
        }

        if (!ageSelect.value) {
            setError('profile-error', 'Yoshingizni tanlang.');
            ageSelect.focus();
            return;
        }

        const gender = state.selectedGender;
        localStorage.setItem('yoningda_gender', gender);
        localStorage.setItem('yoningda_age', ageSelect.value);
        state.selectedGender = gender;
        state.selectedAge = ageSelect.value;

        submit.disabled = true;
        submit.textContent = 'SAQLANMOQDA...';

        setTimeout(() => {
            submit.disabled = false;
            submit.textContent = 'DAVOM ETISH';
            showScreen('main-screen');
            renderMainPage();
        }, 600);
    });
}

function renderMainPage() {
    const gender = localStorage.getItem('yoningda_gender') || 'male';
    const grid = document.getElementById('category-grid');
    grid.innerHTML = '';

    categories.forEach((category) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'category-button';
        button.textContent = category;
        button.addEventListener('click', () => {
            state.selectedCategory = category;
            renderSubcategoriesPage(category);
            showScreen('subcategories-screen');
        });
        grid.appendChild(button);
    });
}

function renderSubcategoriesPage(category) {
    const title = document.getElementById('subcategories-title');
    const list = document.getElementById('subcategory-list');
    title.textContent = `${category} bo‘yicha yo‘nalish`;
    list.innerHTML = '';

    (subcategoryNames[category] || ['Umumiy']).forEach((subcategory) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'problem-button';
        button.textContent = subcategory;
        button.addEventListener('click', () => {
            state.selectedSubcategory = subcategory;
            renderProblemsPage(localStorage.getItem('yoningda_gender') || 'male', category);
            showScreen('problems-screen');
        });
        list.appendChild(button);
    });
}

function renderProblemsPage(gender, category) {
    const list = document.getElementById('problem-list');
    const title = document.getElementById('problems-title');
    const selectedGenderKey = gender === 'female' ? 'female' : 'male';
    const issueList = problemData[selectedGenderKey][category] || ['Muammo yo‘q'];

    title.textContent = `${genderLabels[selectedGenderKey]} • ${category}`;
    list.innerHTML = '';

    issueList.forEach((issue) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'problem-button';
        button.textContent = issue;
        button.addEventListener('click', () => {
            state.selectedProblem = issue;
            renderProblemDetail(gender, category, issue);
            showScreen('selected-problem-screen');
        });
        list.appendChild(button);
    });
}

function renderProblemDetail(gender, category, issue) {
    const tag = document.getElementById('selected-problem-tag');
    const title = document.getElementById('selected-problem-title');
    const message = document.getElementById('selected-problem-message');
    const tips = document.getElementById('selected-problem-tips');

    const genderName = genderLabels[gender === 'female' ? 'female' : 'male'];
    tag.textContent = `${genderName} • ${category}`;
    title.textContent = issue;

    const generalTips = [
        'Buni birinchi navbatda uyqu, ovqat va stress darajasiga e\'tibor bering.',
        'O‘zingizga qulay va ishonchli kishiga yoki yordam xizmatiga murojaat qiling.',
        'Kichik qadamlar bilan bosqichma-bosqich yechimini topishga urinib ko‘ring.',
        'His-tuyg‘ularingizni aytishga qulay muhit toping.'
    ];

    message.textContent = `Siz tanlagan muammo: ${issue}. Bu holat hamisha yechimga ega va yordami bering.`;
    tips.innerHTML = generalTips.map((tip) => `<li>${tip}</li>`).join('');
}

function renderQuestion() {
    const questions = getCurrentQuestions();
    const question = questions[state.questionIndex];
    const options = document.getElementById('question-options');
    const progress = ((state.questionIndex + 1) / questions.length) * 100;
    const questionId = `${state.selectedSubcategory}-${state.questionIndex}`;
    const storedAnswer = state.answers[questionId];
    const storedOptions = Array.isArray(storedAnswer)
        ? storedAnswer
        : (storedAnswer && storedAnswer.options) || (storedAnswer ? [storedAnswer] : []);
    document.getElementById('questionnaire-tag').textContent = `${state.selectedCategory} • ${state.selectedSubcategory}`;
    document.getElementById('question-progress-label').textContent = `${state.questionIndex + 1} / ${questions.length}`;
    document.getElementById('question-progress-bar').style.width = `${progress}%`;
    document.getElementById('question-title').textContent = question.text;
    document.getElementById('question-error').textContent = '';
    options.innerHTML = '';

    question.options.forEach((option) => {
        const optionText = typeof option === 'string' ? option : option.text;
        const label = document.createElement('label');
        label.className = 'question-option';
        const input = document.createElement('input');
        input.type = question.type === 'multiple' ? 'checkbox' : 'radio';
        input.name = questionId;
        input.value = optionText;
        input.checked = storedOptions.includes(optionText);
        const letter = document.createElement('span');
        letter.className = 'option-letter';
        letter.textContent = `${String.fromCharCode(65 + question.options.indexOf(option))})`;
        label.append(input, letter, document.createTextNode(optionText));
        options.appendChild(label);

        if (typeof option === 'object' && option.custom) {
            const customInput = document.createElement('input');
            customInput.type = 'text';
            customInput.className = 'custom-answer';
            customInput.placeholder = 'O‘z variantingizni yozing';
            customInput.value = state.customAnswers[questionId] || '';
            customInput.hidden = !input.checked;
            input.addEventListener('change', () => {
                customInput.hidden = !input.checked;
            });
            options.appendChild(customInput);
        }
    });
}

function saveQuestionAnswer() {
    const questions = getCurrentQuestions();
    const question = questions[state.questionIndex];
    const questionId = `${state.selectedSubcategory}-${state.questionIndex}`;
    const selected = [...document.querySelectorAll(`#question-options input[name="${questionId}"]:checked`)].map((input) => input.value);
    if (!selected.length) {
        document.getElementById('question-error').textContent = 'Davom etish uchun javobni tanlang yoki “Javob bermayman”ni bosing.';
        return false;
    }
    const customInput = document.querySelector('#question-options .custom-answer');
    if (customInput && selected.includes('Boshqa (o\'z variantingizni yozing)')) {
        state.customAnswers[questionId] = customInput.value.trim();
    }
    state.answers[questionId] = question.type === 'multiple' ? selected : selected[0];
    localStorage.setItem('yoningda_questionnaire', JSON.stringify({
        category: state.selectedCategory,
        subcategory: state.selectedSubcategory,
        problem: state.selectedProblem,
        index: state.questionIndex,
        answers: state.answers,
        customAnswers: state.customAnswers
    }));
    return true;
}

function finishQuestionnaire() {
    document.getElementById('result-message').textContent = `“${state.selectedProblem}” bo‘yicha javoblaringiz qabul qilindi. Javoblaringiz bo‘yicha qo‘shimcha qo‘llab-quvvatlash foydali bo‘lishi mumkin.`;
    document.getElementById('result-tips').innerHTML = [
        'Ishonchli katta odam yoki o‘qituvchi bilan gaplashib ko‘ring.',
        'Bugun bajarish mumkin bo‘lgan bitta kichik qadamni tanlang.',
        'Yordam kerak bo‘lsa, platformadagi mas’ul xodim bilan bog‘lanish imkoniyatidan foydalaning.'
    ].map((tip) => `<li>${tip}</li>`).join('');
    localStorage.removeItem('yoningda_questionnaire');
    showScreen('result-screen');
}

function bindQuestionnaire() {
    document.getElementById('start-questionnaire').addEventListener('click', () => {
        state.questionIndex = 0;
        state.answers = {};
        state.customAnswers = {};
        renderQuestion();
        showScreen('questionnaire-screen');
    });

    document.getElementById('questionnaire-back').addEventListener('click', () => {
        showScreen('selected-problem-screen');
    });

    document.getElementById('skip-question').addEventListener('click', () => {
        const questions = getCurrentQuestions();
        state.answers[`${state.selectedSubcategory}-${state.questionIndex}`] = null;
        if (state.questionIndex === questions.length - 1) finishQuestionnaire();
        else { state.questionIndex += 1; renderQuestion(); }
    });

    document.getElementById('next-question').addEventListener('click', () => {
        if (!saveQuestionAnswer()) return;
        if (state.questionIndex === getCurrentQuestions().length - 1) finishQuestionnaire();
        else { state.questionIndex += 1; renderQuestion(); }
    });
}

async function endSession(button, errorId) {
    const originalText = button.textContent;
    button.disabled = true;
    button.textContent = 'CHIQILMOQDA...';
    try {
        await window.YoningdaAuthApi.logout();
        state.user = null;
        state.selectedGender = '';
        state.selectedAge = '';
        state.answers = {};
        state.customAnswers = {};
        localStorage.removeItem('yoningda_profile_user_id');
        localStorage.removeItem('yoningda_gender');
        localStorage.removeItem('yoningda_age');
        localStorage.removeItem('yoningda_questionnaire');
        setStatus('startup-status', '');
        showScreen('landing-screen');
    } catch (error) {
        const message = apiErrorMessage(error, 'logout');
        if (errorId) setError(errorId, message);
        else window.alert(message);
    } finally {
        button.disabled = false;
        button.textContent = originalText;
    }
}

function bindLogoutButtons() {
    const mainLogout = document.getElementById('logout-button');
    const profileLogout = document.getElementById('profile-logout');
    mainLogout.addEventListener('click', () => endSession(mainLogout));
    profileLogout.addEventListener('click', () => endSession(profileLogout, 'profile-error'));
}

async function restoreAuthSession() {
    try {
        const profile = await window.YoningdaAuthApi.currentUser();
        applyAuthenticatedUser(profile);
        setStatus('startup-status', '');
        const topicsEntry = new URLSearchParams(window.location.search).get('topics') === '1';
        if (topicsEntry) {
            renderMainPage();
            showScreen('main-screen');
        } else {
            window.location.replace('home.html');
        }
    } catch (error) {
        state.user = null;
        showScreen('landing-screen');
        if (error.code !== 'authentication_required' && error.status !== 401) {
            setStatus('startup-status', apiErrorMessage(error, 'session'), 'error');
        }
    }
}

function init() {
    setAuthMode('login');
    initLandingFeatures();
    bindScreenButtons();
    bindLoginForm();
    bindRegisterForm();
    bindVerifyForm();
    bindProfileScreen();
    bindQuestionnaire();
    bindLogoutButtons();

    const profileMini = document.getElementById('profile-mini-button');
    if (profileMini) {
        profileMini.addEventListener('click', () => showScreen('profile-screen'));
    }

    restoreAuthSession();
}

>>>>>>> e76fb39649d7a1e1c0f129abfdb571269e5e7a08
init();