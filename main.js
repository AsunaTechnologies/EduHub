// Asyl DataHub - Main JavaScript File
// Handles all interactive functionality, user profiles, and data management

class AssylDataHub {
    constructor() {
        this.currentLanguage = 'en';
        this.currentUser = null;
        this.selectedUniversities = [];
        this.userData = {};
        this.universities = this.initializeUniversities();
        this.translations = this.initializeTranslations();
        this.init();
    }

    init() {
        this.loadUserData();
        this.setupEventListeners();
        this.initializeAnimations();
        this.setupLanguageSwitcher();
        this.updateUI();
    }

    // University Data Initialization
    initializeUniversities() {
        return {
            kaznu: {
                name: {
                    en: "Al-Farabi Kazakh National University",
                    ru: "Казахский Национальный Университет имени аль-Фараби",
                    kz: "Әл-Фараби атындағы Қазақ Ұлттық Университеті"
                },
                location: "Almaty, Kazakhstan",
                founded: 1934,
                students: 20000,
                internationalStudents: 3000,
                ranking: { world: 166, asia: 38, centralAsia: 1 },
                image: "https://eduhubimagesost.s3.eu-north-1.amazonaws.com/kaznu.png",
                about: {
                    mission: {
                        en: "To be a leading research university that contributes to the sustainable development of Kazakhstan and global society through innovation, education, and research excellence.",
                        ru: "Быть ведущим исследовательским университетом, способствующим устойчивому развитию Казахстана и мирового сообщества через инновации, образование и исследовательское превосходство.",
                        kz: "Қазақстанның және жаһандық қоғамның тұрақты дамуына инновациялар, білім және зерттеу жетістіктері арқылы үлес қосатын жетекші зерттеу университеті болу."
                    },
                    history: {
                        en: "Founded in 1934, KazNU is the oldest and largest university in Kazakhstan. It has trained over 100,000 professionals and is recognized as the flagship institution of higher education in Central Asia.",
                        ru: "Основанный в 1934 году, КазНУ является старейшим и крупнейшим университетом в Казахстане. Он подготовил более 100 000 специалистов и признан флагманом высшего образования в Центральной Азии.",
                        kz: "1934 жылы құрылған ҚазҰУ - Қазақстандағы ең ескі және ірі университет. Ол 100 000-нан астам маман дайындап, Орталық Азиядағы жоғары білімнің флагманы ретінде танылған."
                    }
                },
                programs: [
                    { name: { en: "Computer Science", ru: "Информатика", kz: "Компьютерлік ғылым" }, degree: "Bachelor", duration: "4 years", language: "English/Russian" },
                    { name: { en: "Medicine", ru: "Медицина", kz: "Медицина" }, degree: "MD", duration: "6 years", language: "English/Russian" },
                    { name: { en: "Engineering", ru: "Инженерия", kz: "Инженерия" }, degree: "Master", duration: "2 years", language: "English" },
                    { name: { en: "Business Administration", ru: "Бизнес-администрирование", kz: "Бизнес әкімшілігі" }, degree: "MBA", duration: "2 years", language: "English" }
                ],
                admission: {
                    requirements: {
                        en: "High school diploma, entrance exam, language proficiency",
                        ru: "Аттестат о среднем образовании, вступительный экзамен, владение языком",
                        kz: "Орта білім туралы аттестат, емтихан, тіл білімі"
                    },
                    deadline: "August 15, 2025",
                    fees: { tuition: 4500, accommodation: 800, total: 5300 }
                }
            },
            nazarbayev: {
                name: {
                    en: "Nazarbayev University",
                    ru: "Назарбаев Университет",
                    kz: "Назарбаев Университеті"
                },
                location: "Astana, Kazakhstan",
                founded: 2010,
                students: 9000,
                internationalStudents: 1200,
                ranking: { world: 400, asia: 100, centralAsia: 2 },
                image: "https://eduhubimagesost.s3.eu-north-1.amazonaws.com/nazarbayev.jpg",
                about: {
                    mission: {
                        en: "To develop as a world-class research university that contributes to the sustainable development of Kazakhstan through innovation, research, and education.",
                        ru: "Развиваться как исследовательский университет мирового класса, способствующий устойчивому развитию Казахстана через инновации, исследования и образование.",
                        kz: "Қазақстанның тұрақты дамуына инновациялар, зерттеулер және білім арқылы үлес қосатын әлемдік деңгейдегі зерттеу университеті ретінде даму."
                    }
                },
                programs: [
                    { name: { en: "Engineering", ru: "Инженерия", kz: "Инженерия" }, degree: "Bachelor", duration: "4 years", language: "English" },
                    { name: { en: "Public Policy", ru: "Государственная политика", kz: "Мемлекеттік саясат" }, degree: "Master", duration: "2 years", language: "English" }
                ],
                admission: {
                    fees: { tuition: 8000, accommodation: 1200, total: 9200 }
                }
            },
            kaznmu: {
                name: {
                    en: "Asfendiyarov Kazakh National Medical University",
                    ru: "Казахский Национальный Медицинский Университет имени Асфендиярова",
                    kz: "С.Д. Асфендияров атындағы Қазақ Ұлттық Медицина Университеті"
                },
                location: "Almaty, Kazakhstan",
                founded: 1930,
                students: 10378,
                internationalStudents: 1773,
                ranking: { world: 1000, asia: 200, centralAsia: 3 },
                image: "https://eduhubimagesost.s3.eu-north-1.amazonaws.com/kaznmu.png",
                about: {
                    mission: {
                        en: "To train competitive healthcare professionals based on the integration of advanced educational and scientific medical technologies.",
                        ru: "Подготовка конкурентоспособных специалистов здравоохранения на основе интеграции передовых образовательных и научных медицинских технологий.",
                        kz: "Білікті денсаулық сақтау мамандарын оқытудың алдыңғы қатарлы білім беру және ғылыми медициналық технологияларды интеграциялау негізінде дайындау."
                    }
                },
                programs: [
                    { name: { en: "General Medicine", ru: "Общая медицина", kz: "Жалпы медицина" }, degree: "MD", duration: "6 years", language: "English/Russian" },
                    { name: { en: "Dentistry", ru: "Стоматология", kz: "Тіс емі" }, degree: "Bachelor", duration: "5 years", language: "English/Russian" }
                ],
                admission: {
                    fees: { tuition: 5700, accommodation: 800, total: 6500 }
                }
            },
            kbtu: {
                name: {
                    en: "Kazakh-British Technical University",
                    ru: "Казахстанско-Британский Технический Университет",
                    kz: "Қазақстан-Британ Техникалық Университеті"
                },
                location: "Almaty, Kazakhstan",
                founded: 2000,
                students: 4800,
                internationalStudents: 450,
                ranking: { world: 561, asia: 120, centralAsia: 4 },
                image: "https://via.placeholder.com/400x300?text=KBTU",
                about: {
                    mission: {
                        en: "To provide world-class technical education and research in engineering, IT, and business, preparing graduates for global careers.",
                        ru: "Предоставление технического образования и исследований мирового класса в области инженерии, IT и бизнеса, подготовка выпускников для международной карьеры.",
                        kz: "Инженерия, IT және бизнес саласында әлемдік деңгейдегі техникалық білім беру және зерттеулер жүргізу, түлектерді халықаралық мансапқа дайындау."
                    }
                },
                programs: [
                    { name: { en: "Petroleum Engineering", ru: "Нефтегазовая инженерия", kz: "Мұнай-газ инженериясы" }, degree: "Bachelor", duration: "4 years", language: "English" },
                    { name: { en: "Information Technology", ru: "Информационные технологии", kz: "Ақпараттық технологиялар" }, degree: "Bachelor", duration: "4 years", language: "English" },
                    { name: { en: "Business Administration", ru: "Бизнес-администрирование", kz: "Бизнес әкімшілігі" }, degree: "MBA", duration: "2 years", language: "English" }
                ],
                admission: {
                    fees: { tuition: 4500, accommodation: 900, total: 5400 }
                }
            },
            sdu: {
                name: {
                    en: "Suleyman Demirel University",
                    ru: "Университет имени Сулеймана Демиреля",
                    kz: "Сүлейман Демирел атындағы Университет"
                },
                location: "Almaty, Kazakhstan",
                founded: 1996,
                students: 8500,
                internationalStudents: 1200,
                ranking: { world: 801, asia: 180, centralAsia: 5 },
                image: "https://via.placeholder.com/400x300?text=SDU",
                about: {
                    mission: {
                        en: "To provide quality education in engineering, business, and humanities, fostering innovation and international collaboration.",
                        ru: "Предоставление качественного образования в области инженерии, бизнеса и гуманитарных наук, способствуя инновациям и международному сотрудничеству.",
                        kz: "Инженерия, бизнес және гуманитарлық ғылымдар саласында сапалы білім беру, инновациялар мен халықаралық ынтымақтастықты дамыту."
                    }
                },
                programs: [
                    { name: { en: "Computer Engineering", ru: "Компьютерная инженерия", kz: "Компьютерлік инженерия" }, degree: "Bachelor", duration: "4 years", language: "English" },
                    { name: { en: "International Relations", ru: "Международные отношения", kz: "Халықаралық қатынастар" }, degree: "Bachelor", duration: "4 years", language: "English" },
                    { name: { en: "Business Administration", ru: "Бизнес-администрирование", kz: "Бизнес әкімшілігі" }, degree: "BBA", duration: "4 years", language: "English" }
                ],
                admission: {
                    fees: { tuition: 3500, accommodation: 800, total: 4300 }
                }
            },
            kimep: {
                name: {
                    en: "KIMEP University",
                    ru: "Университет КИМЭП",
                    kz: "КИМЭП Университеті"
                },
                location: "Almaty, Kazakhstan",
                founded: 1992,
                students: 3200,
                internationalStudents: 500,
                ranking: { world: 601, asia: 140, centralAsia: 6 },
                image: "https://via.placeholder.com/400x300?text=KIMEP",
                about: {
                    mission: {
                        en: "To be Central Asia's leading English-language university, providing world-class education in business, economics, and public policy.",
                        ru: "Быть ведущим англоязычным университетом Центральной Азии, предоставляя образование мирового класса в области бизнеса, экономики и государственной политики.",
                        kz: "Орталық Азиядағы жетекші ағылшын тілді университет болу, бизнес, экономика және мемлекеттік саясат саласында әлемдік деңгейдегі білім беру."
                    }
                },
                programs: [
                    { name: { en: "Business Administration", ru: "Бизнес-администрирование", kz: "Бизнес әкімшілігі" }, degree: "BBA/MBA", duration: "4/2 years", language: "English" },
                    { name: { en: "Economics", ru: "Экономика", kz: "Экономика" }, degree: "Bachelor", duration: "4 years", language: "English" },
                    { name: { en: "Public Administration", ru: "Государственное управление", kz: "Мемлекеттік басқару" }, degree: "Master", duration: "2 years", language: "English" }
                ],
                admission: {
                    fees: { tuition: 8000, accommodation: 1000, total: 9000 }
                }
            },
            satbayev: {
                name: {
                    en: "Satbayev University",
                    ru: "Университет имени Сатпаева",
                    kz: "Сәтбаев атындағы Университет"
                },
                location: "Almaty, Kazakhstan",
                founded: 1934,
                students: 15000,
                internationalStudents: 800,
                ranking: { world: 480, asia: 110, centralAsia: 7 },
                image: "https://via.placeholder.com/400x300?text=Satbayev",
                about: {
                    mission: {
                        en: "To train highly qualified engineers and scientists in mining, metallurgy, and technical sciences for Kazakhstan's industrial development.",
                        ru: "Подготовка высококвалифицированных инженеров и ученых в области горного дела, металлургии и технических наук для промышленного развития Казахстана.",
                        kz: "Қазақстанның өнеркәсіптік дамуы үшін тау-кен, металлургия және техникалық ғылымдар саласында жоғары білікті инженерлер мен ғалымдар дайындау."
                    }
                },
                programs: [
                    { name: { en: "Mining Engineering", ru: "Горное дело", kz: "Тау-кен инженериясы" }, degree: "Bachelor", duration: "4 years", language: "English/Russian" },
                    { name: { en: "Metallurgical Engineering", ru: "Металлургия", kz: "Металлургия" }, degree: "Bachelor", duration: "4 years", language: "English/Russian" },
                    { name: { en: "Mechanical Engineering", ru: "Машиностроение", kz: "Машина жасау" }, degree: "Bachelor", duration: "4 years", language: "English/Russian" }
                ],
                admission: {
                    fees: { tuition: 1800, accommodation: 700, total: 2500 }
                }
            },
            enu: {
                name: {
                    en: "L.N. Gumilyov Eurasian National University",
                    ru: "Евразийский Национальный Университет имени Л.Н. Гумилева",
                    kz: "Л.Н. Гумилев атындағы Еуразия Ұлттық Университеті"
                },
                location: "Astana, Kazakhstan",
                founded: 1996,
                students: 18000,
                internationalStudents: 2000,
                ranking: { world: 450, asia: 100, centralAsia: 8 },
                image: "https://via.placeholder.com/400x300?text=ENU",
                about: {
                    mission: {
                        en: "To be a leading research university in Central Asia, providing quality education in humanities, natural sciences, and engineering.",
                        ru: "Быть ведущим исследовательским университетом в Центральной Азии, предоставляя качественное образование в области гуманитарных, естественных наук и инженерии.",
                        kz: "Орталық Азиядағы жетекші зерттеу университеті болу, гуманитарлық, жаратылыстану және инженерия саласында сапалы білім беру."
                    }
                },
                programs: [
                    { name: { en: "International Relations", ru: "Международные отношения", kz: "Халықаралық қатынастар" }, degree: "Bachelor", duration: "4 years", language: "Kazakh/Russian/English" },
                    { name: { en: "Journalism", ru: "Журналистика", kz: "Журналистика" }, degree: "Bachelor", duration: "4 years", language: "Kazakh/Russian" },
                    { name: { en: "Mathematics", ru: "Математика", kz: "Математика" }, degree: "Bachelor", duration: "4 years", language: "Kazakh/Russian" }
                ],
                admission: {
                    fees: { tuition: 2000, accommodation: 600, total: 2600 }
                }
            },
            aitu: {
                name: {
                    en: "Astana IT University",
                    ru: "Астана IT Университет",
                    kz: "Астана IT Университеті"
                },
                location: "Astana, Kazakhstan",
                founded: 2019,
                students: 4500,
                internationalStudents: 300,
                ranking: { world: 999, asia: 250, centralAsia: 9 },
                image: "https://via.placeholder.com/400x300?text=AITU",
                about: {
                    mission: {
                        en: "To train IT specialists and innovators for Kazakhstan's digital economy, focusing on cutting-edge technologies and entrepreneurship.",
                        ru: "Подготовка IT-специалистов и новаторов для цифровой экономики Казахстана, с акцентом на передовые технологии и предпринимательство.",
                        kz: "Қазақстанның цифрлық экономикасы үшін IT мамандары мен инноваторлар дайындау, заманауи технологиялар мен кәсіпкерлікке назар аудару."
                    }
                },
                programs: [
                    { name: { en: "Computer Science", ru: "Информатика", kz: "Компьютерлік ғылым" }, degree: "Bachelor", duration: "4 years", language: "English" },
                    { name: { en: "Software Engineering", ru: "Программная инженерия", kz: "Бағдарламалық инженерия" }, degree: "Bachelor", duration: "4 years", language: "English" },
                    { name: { en: "Data Science", ru: "Наука о данных", kz: "Деректер ғылымы" }, degree: "Master", duration: "2 years", language: "English" }
                ],
                admission: {
                    fees: { tuition: 2000, accommodation: 800, total: 2800 }
                }
            },
            abay: {
                name: {
                    en: "Abay Kazakh National Pedagogical University",
                    ru: "Казахский Национальный Педагогический Университет имени Абая",
                    kz: "Абай атындағы Қазақ Ұлттық Педагогикалық Университеті"
                },
                location: "Almaty, Kazakhstan",
                founded: 1928,
                students: 12000,
                internationalStudents: 600,
                ranking: { world: 800, asia: 170, centralAsia: 10 },
                image: "https://via.placeholder.com/400x300?text=Abay+University",
                about: {
                    mission: {
                        en: "To train highly qualified teachers and educators, contributing to the development of Kazakhstan's education system.",
                        ru: "Подготовка высококвалифицированных учителей и педагогов, способствуя развитию системы образования Казахстана.",
                        kz: "Жоғары білікті мұғалімдер мен педагогтар дайындау, Қазақстанның білім беру жүйесінің дамуына үлес қосу."
                    }
                },
                programs: [
                    { name: { en: "Pedagogy", ru: "Педагогика", kz: "Педагогика" }, degree: "Bachelor", duration: "4 years", language: "Kazakh/Russian" },
                    { name: { en: "Philology", ru: "Филология", kz: "Филология" }, degree: "Bachelor", duration: "4 years", language: "Kazakh/Russian" },
                    { name: { en: "Mathematics Education", ru: "Математическое образование", kz: "Математика білім беру" }, degree: "Bachelor", duration: "4 years", language: "Kazakh/Russian" }
                ],
                admission: {
                    fees: { tuition: 1500, accommodation: 600, total: 2100 }
                }
            }
        };
    }

    // Translation System
    initializeTranslations() {
        return {
            // Page-specific translations
            pages: {
                // Common elements across all pages
                common: {
                    en: {
                        // Navigation
                        home: 'Home',
                        studyKz: 'Study in Kazakhstan',
                        dualDiploma: 'Double Degree',
                        compare: 'Compare',
                        eduHelper: 'Edu Helper',
                        pricing: 'Pricing',
                        contact: 'Contact',
                        profile: 'Profile',
                        login: 'Login',
                        logout: 'Logout',
                        // Footer
                        footerAbout: 'Empowering students and families to make informed decisions about higher education since 2025.',
                        footerDescription: 'Empowering students and families to make informed decisions about higher education since 2025.',
                        quickLinks: 'Quick Links',
                        resources: 'Resources',
                        tools: 'Tools & Resources',
                        contactUs: 'Contact',
                        appGuide: 'Application Guide',
                        applicationGuide: 'Application Guide',
                        scholarshipDb: 'Scholarship Database',
                        scholarships: 'Scholarship Database',
                        studentBlog: 'Student Blog',
                        blog: 'Student Blog',
                        faq: 'FAQ',
                        copyright: '© 2025 Asyl DataHub. All rights reserved. Empowering educational choices through technology.',
                        location: 'Almaty, Kazakhstan',
                        // Buttons
                        viewDetails: 'View Details',
                        compare: 'Compare',
                        learnMore: 'Learn More',
                        getStarted: 'Get Started',
                        bookConsultation: 'Book Consultation',
                        sendMessage: 'Send Message',
                        // Stats
                        students: 'Students',
                        universities: 'Universities',
                        countries: 'Countries',
                        studentsHelped: 'Students Helped',
                        worldRank: 'World Rank',
                        international: 'International',
                        founded: 'Founded'
                    },
                    ru: {
                        home: 'Главная',
                        studyKz: 'Учеба в Казахстане',
                        dualDiploma: 'Двойной диплом',
                        compare: 'Сравнить',
                        eduHelper: 'Edu Helper',
                        pricing: 'Цены',
                        contact: 'Контакты',
                        profile: 'Профиль',
                        login: 'Войти',
                        logout: 'Выйти',
                        footerAbout: 'Помогаем студентам и семьям принимать обоснованные решения о высшем образовании с 2025 года.',
                        footerDescription: 'Помогаем студентам и семьям принимать обоснованные решения о высшем образовании с 2025 года.',
                        quickLinks: 'Быстрые ссылки',
                        resources: 'Ресурсы',
                        tools: 'Инструменты и ресурсы',
                        contactUs: 'Контакты',
                        appGuide: 'Руководство по поступлению',
                        applicationGuide: 'Руководство по поступлению',
                        scholarshipDb: 'База стипендий',
                        scholarships: 'База стипендий',
                        studentBlog: 'Блог студентов',
                        blog: 'Блог студентов',
                        faq: 'Вопросы и ответы',
                        copyright: '© 2025 Asyl DataHub. Все права защищены. Развиваем образовательный выбор через технологии.',
                        location: 'Алматы, Казахстан',
                        viewDetails: 'Подробнее',
                        compare: 'Сравнить',
                        learnMore: 'Узнать больше',
                        getStarted: 'Начать',
                        bookConsultation: 'Записаться на консультацию',
                        sendMessage: 'Отправить сообщение',
                        students: 'Студенты',
                        universities: 'Университеты',
                        countries: 'Страны',
                        studentsHelped: 'Помогли студентам',
                        worldRank: 'Мировой рейтинг',
                        international: 'Иностранные',
                        founded: 'Основан'
                    },
                    kz: {
                        home: 'Басты бет',
                        studyKz: 'Қазақстанда оқу',
                        dualDiploma: 'Қос диплом',
                        compare: 'Салыстыру',
                        eduHelper: 'Edu Helper',
                        pricing: 'Бағалар',
                        contact: 'Байланыс',
                        profile: 'Профиль',
                        login: 'Кіру',
                        logout: 'Шығу',
                        footerAbout: '2025 жылдан бері студенттер мен отбасыларға жоғары білім туралы негізделген шешім қабылдауға көмектесеміз.',
                        footerDescription: '2025 жылдан бері студенттер мен отбасыларға жоғары білім туралы негізделген шешім қабылдауға көмектесеміз.',
                        quickLinks: 'Жылдам сілтемелер',
                        resources: 'Ресурстар',
                        tools: 'Құралдар мен ресурстар',
                        contactUs: 'Байланыс',
                        appGuide: 'Түсу нұсқаулығы',
                        applicationGuide: 'Түсу нұсқаулығы',
                        scholarshipDb: 'Стипендия базасы',
                        scholarships: 'Стипендия базасы',
                        studentBlog: 'Студенттер блогы',
                        blog: 'Студенттер блогы',
                        faq: 'Сұрақ-жауап',
                        copyright: '© 2025 Asyl DataHub. Барлық құқықтар қорғалған. Технология арқылы білім таңдауын дамытамыз.',
                        location: 'Алматы, Қазақстан',
                        viewDetails: 'Толығырақ',
                        compare: 'Салыстыру',
                        learnMore: 'Көбірек білу',
                        getStarted: 'Бастау',
                        bookConsultation: 'Кеңесге жазылу',
                        sendMessage: 'Хабарлама жіберу',
                        students: 'Студенттер',
                        universities: 'Университеттер',
                        countries: 'Елдер',
                        studentsHelped: 'Студенттерге көмектестік',
                        worldRank: 'Әлемдік рейтинг',
                        international: 'Халықаралық',
                        founded: 'Құрылған'
                    }
                },
                // Index page
                index: {
                    en: {
                        badge: 'Your Future Starts Here',
                        heroTitle1: 'Find Your Perfect',
                        heroTitle2: 'University',
                        heroTitle3: 'Path',
                        heroDesc: 'We help students and families navigate the journey to higher education. Compare universities, explore programs, and make informed decisions about your academic future in Kazakhstan and abroad.',
                        exploreBtn: 'Explore Universities',
                        consultBtn: 'Get Free Consultation',
                        stat1: 'Universities',
                        stat2: 'Countries',
                        stat3: 'Students Helped',
                        trustedGuidance: 'Trusted Guidance',
                        expertCounselors: 'Expert counselors',
                        successRate: '98% Success Rate',
                        admissionResults: 'Admission results',
                        whyChoose: 'Why Choose Asyl DataHub?',
                        whyChooseDesc: 'We make the university search and application process simple, transparent, and stress-free for students and families.',
                        feature1Title: 'Comprehensive Database',
                        feature1Desc: 'Access detailed information about universities in Kazakhstan and 25+ countries worldwide, all in one place.',
                        feature2Title: 'Easy Comparison',
                        feature2Desc: 'Compare tuition fees, rankings, programs, and student life across multiple universities side by side.',
                        feature3Title: 'Expert Guidance',
                        feature3Desc: 'Get personalized advice from experienced counselors who understand the admission process.',
                        feature4Title: 'Application Support',
                        feature4Desc: 'Step-by-step assistance with documents, essays, and everything you need for a successful application.',
                        feature5Title: 'Multilingual Support',
                        feature5Desc: 'Available in English, Russian, and Kazakh to serve our diverse community of students and parents.',
                        feature6Title: 'Scholarship Information',
                        feature6Desc: 'Discover scholarship opportunities and financial aid options to make education more affordable.',
                        featuredUni: 'Featured Universities',
                        featuredUniDesc: 'Explore top-rated institutions that have helped thousands of students achieve their dreams.',
                        viewAll: 'View All Universities',
                        testimonials: 'What Families Say',
                        testimonialsDesc: 'Hear from students and parents who found their perfect university match with our help.',
                        testimonial1: 'Asyl DataHub made the overwhelming process of choosing a university so much easier. The comparison tools helped us understand exactly what each school offered.',
                        testimonial1Author: 'Aigerim Kenzhebekova',
                        testimonial1Role: 'Parent • Almaty',
                        testimonial2: 'The counselors understood my goals and helped me find universities I never would have discovered on my own. I\'m now studying at my dream school in Germany!',
                        testimonial2Author: 'Daniyar Mukhtarov',
                        testimonial2Role: 'Student • Currently in Munich',
                        testimonial3: 'As a parent, I appreciated the transparent information about costs, scholarships, and living expenses. It helped us plan properly for our daughter\'s education abroad.',
                        testimonial3Author: 'Serik Nurpeisov',
                        testimonial3Role: 'Parent • Astana',
                        ctaTitle: 'Ready to Start Your Journey?',
                        ctaDesc: 'Get personalized university recommendations and expert guidance. Book a free consultation with our education counselors today.',
                        ctaBtn1: 'Book Free Consultation',
                        ctaBtn2: 'View Our Services',
                        // Edu Helper Section
                        eduHelperTitle: 'Meet <span>Edu Helper</span> – Your AI Education Advisor',
                        eduHelperDesc: 'Not sure which university fits you? Our AI-powered advisor analyzes your test scores (ENT, IELTS, SAT), interests, and career goals to recommend the perfect universities and programs for your future.',
                        aiFeature1: 'Personalized recommendations',
                        aiFeature2: 'Based on your scores',
                        aiFeature3: 'Career path guidance',
                        aiFeature4: 'Instant answers 24/7',
                        tryEduHelper: 'Try Edu Helper Now'
                    },
                    ru: {
                        badge: 'Ваше будущее начинается здесь',
                        heroTitle1: 'Найдите идеальный',
                        heroTitle2: 'университет',
                        heroTitle3: 'для вас',
                        heroDesc: 'Мы помогаем студентам и семьям ориентироваться на пути к высшему образованию. Сравнивайте университеты, изучайте программы и принимайте обоснованные решения о вашем академическом будущем в Казахстане и за рубежом.',
                        exploreBtn: 'Исследовать университеты',
                        consultBtn: 'Бесплатная консультация',
                        stat1: 'Университетов',
                        stat2: 'Стран',
                        stat3: 'Помогли студентам',
                        trustedGuidance: 'Надежное руководство',
                        expertCounselors: 'Опытные консультанты',
                        successRate: '98% Успешность',
                        admissionResults: 'Результаты поступления',
                        whyChoose: 'Почему выбирают Asyl DataHub?',
                        whyChooseDesc: 'Мы делаем процесс поиска и поступления в университет простым, прозрачным и без стресса для студентов и семей.',
                        feature1Title: 'Полная база данных',
                        feature1Desc: 'Доступ к подробной информации об университетах Казахстана и 25+ стран мира в одном месте.',
                        feature2Title: 'Удобное сравнение',
                        feature2Desc: 'Сравнивайте стоимость обучения, рейтинги, программы и студенческую жизнь разных университетов.',
                        feature3Title: 'Экспертное руководство',
                        feature3Desc: 'Получите персональные советы от опытных консультантов, понимающих процесс поступления.',
                        feature4Title: 'Поддержка при поступлении',
                        feature4Desc: 'Пошаговая помощь с документами, эссе и всем необходимым для успешного поступления.',
                        feature5Title: 'Многоязычная поддержка',
                        feature5Desc: 'Доступно на английском, русском и казахском для нашего разнообразного сообщества.',
                        feature6Title: 'Информация о стипендиях',
                        feature6Desc: 'Откройте для себя стипендии и финансовую помощь для доступного образования.',
                        featuredUni: 'Рекомендуемые университеты',
                        featuredUniDesc: 'Изучите лучшие учебные заведения, которые помогли тысячам студентов осуществить свои мечты.',
                        viewAll: 'Все университеты',
                        testimonials: 'Отзывы семей',
                        testimonialsDesc: 'Узнайте от студентов и родителей, которые нашли идеальный университет с нашей помощью.',
                        testimonial1: 'Asyl DataHub сделал сложный процесс выбора университета намного проще. Инструменты сравнения помогли нам понять, что предлагает каждый вуз.',
                        testimonial1Author: 'Айгерим Кенжебекова',
                        testimonial1Role: 'Родитель • Алматы',
                        testimonial2: 'Консультанты поняли мои цели и помогли найти университеты, которые я бы никогда не нашел сам. Теперь я учусь в своем университете мечты в Германии!',
                        testimonial2Author: 'Данияр Мухтаров',
                        testimonial2Role: 'Студент • Сейчас в Мюнхене',
                        testimonial3: 'Как родитель, я оценил прозрачную информацию о стоимости, стипендиях и расходах на проживание. Это помогло нам правильно спланировать образование дочери за рубежом.',
                        testimonial3Author: 'Серик Нурпеисов',
                        testimonial3Role: 'Родитель • Астана',
                        ctaTitle: 'Готовы начать свой путь?',
                        ctaDesc: 'Получите персональные рекомендации по университетам и экспертное руководство. Запишитесь на бесплатную консультацию сегодня.',
                        ctaBtn1: 'Записаться на консультацию',
                        ctaBtn2: 'Наши услуги',
                        // Edu Helper Section
                        eduHelperTitle: 'Познакомьтесь с <span>Edu Helper</span> – вашим AI-консультантом',
                        eduHelperDesc: 'Не знаете, какой университет вам подходит? Наш AI-помощник анализирует ваши баллы (ЕНТ, IELTS, SAT), интересы и карьерные цели, чтобы подобрать идеальные университеты и программы.',
                        aiFeature1: 'Персональные рекомендации',
                        aiFeature2: 'На основе ваших баллов',
                        aiFeature3: 'Карьерное руководство',
                        aiFeature4: 'Мгновенные ответы 24/7',
                        tryEduHelper: 'Попробовать Edu Helper'
                    },
                    kz: {
                        badge: 'Сіздің болашағыңыз осы жерден басталады',
                        heroTitle1: 'Өзіңізге тамаша',
                        heroTitle2: 'университет',
                        heroTitle3: 'табыңыз',
                        heroDesc: 'Біз студенттер мен отбасыларға жоғары білімге бару жолында көмектесеміз. Университеттерді салыстырыңыз, бағдарламаларды зерттеңіз және Қазақстанда және шетелде академиялық болашағыңыз туралы шешім қабылдаңыз.',
                        exploreBtn: 'Университеттерді қарау',
                        consultBtn: 'Тегін кеңес алу',
                        stat1: 'Университеттер',
                        stat2: 'Елдер',
                        stat3: 'Студенттерге көмектестік',
                        trustedGuidance: 'Сенімді нұсқаулық',
                        expertCounselors: 'Тәжірибелі кеңесшілер',
                        successRate: '98% Сәттілік',
                        admissionResults: 'Түсу нәтижелері',
                        whyChoose: 'Неге Asyl DataHub таңдайсыз?',
                        whyChooseDesc: 'Біз университетті іздеу және түсу процесін студенттер мен отбасылар үшін қарапайым, ашық және стресссіз етеміз.',
                        feature1Title: 'Толық деректер базасы',
                        feature1Desc: 'Қазақстан мен 25+ елдің университеттері туралы толық ақпаратты бір жерден алыңыз.',
                        feature2Title: 'Оңай салыстыру',
                        feature2Desc: 'Оқу ақысын, рейтингтерді, бағдарламаларды және студенттік өмірді салыстырыңыз.',
                        feature3Title: 'Сарапшы нұсқаулығы',
                        feature3Desc: 'Түсу процесін түсінетін тәжірибелі кеңесшілерден жеке кеңес алыңыз.',
                        feature4Title: 'Түсуге көмек',
                        feature4Desc: 'Құжаттар, эссе және сәтті түсу үшін қажет барлық нәрсеге қадамдық көмек.',
                        feature5Title: 'Көптілді қолдау',
                        feature5Desc: 'Ағылшын, орыс және қазақ тілдерінде қолжетімді.',
                        feature6Title: 'Стипендия ақпараты',
                        feature6Desc: 'Білімді қолжетімді ету үшін стипендиялар мен қаржылық көмекті табыңыз.',
                        featuredUni: 'Ұсынылған университеттер',
                        featuredUniDesc: 'Мыңдаған студенттердің армандарын жүзеге асыруға көмектескен үздік оқу орындарын зерттеңіз.',
                        viewAll: 'Барлық университеттер',
                        testimonials: 'Отбасылар не дейді',
                        testimonialsDesc: 'Біздің көмегімізбен тамаша университет тапқан студенттер мен ата-аналардан естіңіз.',
                        testimonial1: 'Asyl DataHub университетті таңдаудың күрделі процесін әлдеқайда жеңілдетті. Салыстыру құралдары әр мектептің не ұсынатынын түсінуге көмектесті.',
                        testimonial1Author: 'Айгерім Кенжебекова',
                        testimonial1Role: 'Ата-ана • Алматы',
                        testimonial2: 'Кеңесшілер менің мақсаттарымды түсініп, өзім ешқашан таппайтын университеттерді табуға көмектесті. Қазір мен Германиядағы арманымдағы мектепте оқып жатырмын!',
                        testimonial2Author: 'Данияр Мұхтаров',
                        testimonial2Role: 'Студент • Қазір Мюнхенде',
                        testimonial3: 'Ата-ана ретінде мен шығындар, стипендиялар және тұру шығындары туралы ашық ақпаратты бағаладым. Бұл қызымыздың шетелдегі білімін дұрыс жоспарлауға көмектесті.',
                        testimonial3Author: 'Серік Нұрпейісов',
                        testimonial3Role: 'Ата-ана • Астана',
                        ctaTitle: 'Сапарыңызды бастауға дайынсыз ба?',
                        ctaDesc: 'Жеке университет ұсыныстары мен сарапшылық нұсқаулықтарын алыңыз. Бүгін тегін кеңесті брондаңыз.',
                        ctaBtn1: 'Тегін кеңес алу',
                        ctaBtn2: 'Біздің қызметтер',
                        // Edu Helper Section
                        eduHelperTitle: '<span>Edu Helper</span> – сіздің AI білім кеңесшіңізбен танысыңыз',
                        eduHelperDesc: 'Қай университет сізге сәйкес екенін білмейсіз бе? Біздің AI көмекшісі сіздің балдарыңызды (ҰБТ, IELTS, SAT), қызығушылықтарыңыз бен мансаптық мақсаттарыңызды талдап, керемет университеттер мен бағдарламаларды ұсынады.',
                        aiFeature1: 'Жеке ұсыныстар',
                        aiFeature2: 'Балдарыңыз негізінде',
                        aiFeature3: 'Мансаптық нұсқаулық',
                        aiFeature4: '24/7 жедел жауаптар',
                        tryEduHelper: 'Edu Helper-ді қолданып көріңіз'
                    }
                },
                // Contact page
                contact: {
                    en: {
                        pageTitle: 'Contact <span class="page-title-accent">Us</span>',
                        pageSubtitle: 'Have questions about your educational journey? Our team is here to help you find the right path to your dream university.',
                        getInTouch: 'Get in Touch',
                        emailUs: 'Email Us',
                        emailUsDesc: 'For general inquiries and support',
                        callUs: 'Call Us',
                        callUsDesc: 'For urgent matters and consultations',
                        liveChat: 'Live Chat',
                        liveChatDesc: 'Instant support during business hours',
                        startConversation: 'Start a conversation',
                        officeHours: 'Office Hours',
                        mondayFriday: 'Monday - Friday',
                        saturday: 'Saturday',
                        sunday: 'Sunday',
                        closed: 'Closed',
                        sendUsMessage: 'Send Us a Message',
                        firstName: 'First Name',
                        lastName: 'Last Name',
                        emailAddress: 'Email Address',
                        phoneNumber: 'Phone Number',
                        subject: 'Subject',
                        selectSubject: 'Select a subject',
                        generalInquiry: 'General Inquiry',
                        requestConsultation: 'Request Consultation',
                        universityInfo: 'University Information',
                        applicationHelp: 'Application Help',
                        partnership: 'Partnership Opportunity',
                        other: 'Other',
                        message: 'Message',
                        messagePlaceholder: 'How can we help you?',
                        sendMessage: 'Send Message',
                        howCanWeHelp: 'How Can We Help?',
                        howCanWeHelpDesc: 'Choose the support option that works best for you',
                        helpCenter: 'Help Center',
                        helpCenterDesc: 'Find answers to common questions, tutorials, and step-by-step guides.',
                        browseArticles: 'Browse Articles',
                        videoGuides: 'Video Guides',
                        videoGuidesDesc: 'Watch detailed tutorials on how to use our platform and services.',
                        watchVideos: 'Watch Videos',
                        community: 'Community',
                        communityDesc: 'Connect with other students and families to share experiences.',
                        joinCommunity: 'Join Community',
                        bookConsultation: 'Book Consultation',
                        bookConsultationDesc: 'Schedule a free consultation with our education counselors.',
                        scheduleNow: 'Schedule Now',
                        ctaTitle: 'Ready to Start Your Journey?',
                        ctaDesc: 'Book a free consultation with our education experts and get personalized guidance for your university search.',
                        ctaBtn: 'Book Free Consultation'
                    },
                    ru: {
                        pageTitle: 'Свяжитесь <span class="page-title-accent">с нами</span>',
                        pageSubtitle: 'Есть вопросы о вашем образовательном пути? Наша команда поможет вам найти путь к университету вашей мечты.',
                        getInTouch: 'Связаться',
                        emailUs: 'Напишите нам',
                        emailUsDesc: 'Для общих вопросов и поддержки',
                        callUs: 'Позвоните нам',
                        callUsDesc: 'Для срочных вопросов и консультаций',
                        liveChat: 'Онлайн чат',
                        liveChatDesc: 'Мгновенная поддержка в рабочее время',
                        startConversation: 'Начать разговор',
                        officeHours: 'Часы работы',
                        mondayFriday: 'Понедельник - Пятница',
                        saturday: 'Суббота',
                        sunday: 'Воскресенье',
                        closed: 'Закрыто',
                        sendUsMessage: 'Отправьте нам сообщение',
                        firstName: 'Имя',
                        lastName: 'Фамилия',
                        emailAddress: 'Электронная почта',
                        phoneNumber: 'Номер телефона',
                        subject: 'Тема',
                        selectSubject: 'Выберите тему',
                        generalInquiry: 'Общий вопрос',
                        requestConsultation: 'Запрос консультации',
                        universityInfo: 'Информация об университете',
                        applicationHelp: 'Помощь с заявкой',
                        partnership: 'Возможность партнерства',
                        other: 'Другое',
                        message: 'Сообщение',
                        messagePlaceholder: 'Как мы можем вам помочь?',
                        sendMessage: 'Отправить сообщение',
                        howCanWeHelp: 'Как мы можем помочь?',
                        howCanWeHelpDesc: 'Выберите удобный способ поддержки',
                        helpCenter: 'Справочный центр',
                        helpCenterDesc: 'Найдите ответы на частые вопросы, руководства и пошаговые инструкции.',
                        browseArticles: 'Смотреть статьи',
                        videoGuides: 'Видео-руководства',
                        videoGuidesDesc: 'Смотрите подробные уроки по использованию нашей платформы.',
                        watchVideos: 'Смотреть видео',
                        community: 'Сообщество',
                        communityDesc: 'Общайтесь с другими студентами и семьями, делитесь опытом.',
                        joinCommunity: 'Присоединиться',
                        bookConsultation: 'Записаться на консультацию',
                        bookConsultationDesc: 'Запланируйте бесплатную консультацию с нашими консультантами.',
                        scheduleNow: 'Записаться',
                        ctaTitle: 'Готовы начать свой путь?',
                        ctaDesc: 'Запишитесь на бесплатную консультацию с нашими экспертами и получите персональное руководство для поиска университета.',
                        ctaBtn: 'Записаться на консультацию'
                    },
                    kz: {
                        pageTitle: 'Бізбен <span class="page-title-accent">байланысыңыз</span>',
                        pageSubtitle: 'Білім жолыңыз туралы сұрақтарыңыз бар ма? Біздің команда арман университетіңізге жол табуға көмектеседі.',
                        getInTouch: 'Байланысу',
                        emailUs: 'Бізге жазыңыз',
                        emailUsDesc: 'Жалпы сұрақтар мен қолдау үшін',
                        callUs: 'Бізге қоңырау шалыңыз',
                        callUsDesc: 'Шұғыл мәселелер мен кеңестер үшін',
                        liveChat: 'Онлайн чат',
                        liveChatDesc: 'Жұмыс уақытында жедел қолдау',
                        startConversation: 'Сөйлесуді бастау',
                        officeHours: 'Жұмыс сағаттары',
                        mondayFriday: 'Дүйсенбі - Жұма',
                        saturday: 'Сенбі',
                        sunday: 'Жексенбі',
                        closed: 'Жабық',
                        sendUsMessage: 'Бізге хабарлама жіберіңіз',
                        firstName: 'Аты',
                        lastName: 'Тегі',
                        emailAddress: 'Электрондық пошта',
                        phoneNumber: 'Телефон нөмірі',
                        subject: 'Тақырып',
                        selectSubject: 'Тақырыпты таңдаңыз',
                        generalInquiry: 'Жалпы сұрақ',
                        requestConsultation: 'Кеңес сұрау',
                        universityInfo: 'Университет туралы ақпарат',
                        applicationHelp: 'Өтінішке көмек',
                        partnership: 'Серіктестік мүмкіндігі',
                        other: 'Басқа',
                        message: 'Хабарлама',
                        messagePlaceholder: 'Қалай көмектесе аламыз?',
                        sendMessage: 'Хабарлама жіберу',
                        howCanWeHelp: 'Қалай көмектесе аламыз?',
                        howCanWeHelpDesc: 'Сізге ыңғайлы қолдау әдісін таңдаңыз',
                        helpCenter: 'Анықтама орталығы',
                        helpCenterDesc: 'Жиі қойылатын сұрақтарға жауаптарды, нұсқаулықтарды табыңыз.',
                        browseArticles: 'Мақалаларды қарау',
                        videoGuides: 'Бейне нұсқаулықтар',
                        videoGuidesDesc: 'Платформаны пайдалану бойынша толық сабақтарды көріңіз.',
                        watchVideos: 'Бейнелерді көру',
                        community: 'Қауымдастық',
                        communityDesc: 'Басқа студенттермен және отбасылармен тәжірибе бөлісіңіз.',
                        joinCommunity: 'Қосылу',
                        bookConsultation: 'Кеңесге жазылу',
                        bookConsultationDesc: 'Біздің кеңесшілермен тегін кеңесті жоспарлаңыз.',
                        scheduleNow: 'Жазылу',
                        ctaTitle: 'Сапарыңызды бастауға дайынсыз ба?',
                        ctaDesc: 'Біздің сарапшылармен тегін кеңесге жазылыңыз және университет іздеу үшін жеке нұсқаулық алыңыз.',
                        ctaBtn: 'Тегін кеңес алу'
                    }
                },
                // Pricing page
                pricing: {
                    en: {
                        pageTitle: 'Our <span class="page-title-accent">Services</span>',
                        pageSubtitle: 'Choose the plan that fits your needs. Get access to university information, expert guidance, and personalized support for your educational journey.',
                        forStudents: 'For Students & Families',
                        forConsultants: 'For Consultants',
                        forBusiness: 'For Business',
                        // Student plans
                        freeName: 'Free',
                        freeDesc: 'Perfect for exploring your options',
                        forever: 'forever',
                        perMonth: 'per month',
                        pricingLabel: 'pricing',
                        custom: 'Custom',
                        getStarted: 'Get Started Free',
                        startTrial: 'Start 14-Day Free Trial',
                        contactUs: 'Contact Us',
                        premiumName: 'Premium',
                        premiumDesc: 'Everything you need for a successful application',
                        mostPopular: 'Most Popular',
                        completeName: 'Complete',
                        completeDesc: 'Full support from experts every step of the way',
                        // Business plans
                        starterName: 'Starter',
                        starterDesc: 'For independent education consultants',
                        professionalName: 'Professional',
                        professionalDesc: 'For growing education agencies',
                        bestValue: 'Best Value',
                        enterpriseName: 'Enterprise',
                        enterpriseDesc: 'For large organizations',
                        startTrialBtn: 'Start Free Trial',
                        contactSales: 'Contact Sales',
                        // Student features
                        feat1: 'Basic university database access',
                        feat2: 'Compare up to 2 universities',
                        feat3: 'Basic search and filters',
                        feat4: 'Community forum access',
                        feat5: 'Personalized recommendations',
                        feat6: 'Application tracking',
                        feat7: 'Expert consultation',
                        feat8: 'Full university database access',
                        feat9: 'Compare up to 10 universities',
                        feat10: 'Application tracking dashboard',
                        feat11: 'Document checklist tools',
                        feat12: 'Email support (24h response)',
                        feat13: '1-on-1 expert consultation',
                        feat14: 'Everything in Premium',
                        feat15: 'Unlimited university comparisons',
                        feat16: '2 hours of expert consultation/mo',
                        feat17: 'Essay review service',
                        feat18: 'Scholarship matching',
                        feat19: 'Interview preparation',
                        feat20: 'Priority phone support',
                        // Business features
                        bfeat1: 'Client management (up to 20)',
                        bfeat2: 'Basic reporting tools',
                        bfeat3: 'Email support',
                        bfeat4: 'Custom branding',
                        bfeat5: 'API access',
                        bfeat6: 'Dedicated account manager',
                        bfeat7: 'Everything in Starter',
                        bfeat8: 'Unlimited clients',
                        bfeat9: 'Advanced analytics',
                        bfeat10: 'Priority support',
                        bfeat11: 'Everything in Professional',
                        bfeat12: 'Custom integrations',
                        bfeat13: 'SLA guarantee',
                        bfeat14: 'On-site training',
                        bfeat15: '24/7 phone support',
                        bfeat16: 'Custom development',
                        compareTitle: 'Compare Plans',
                        feature: 'Feature',
                        faqTitle: 'Frequently Asked Questions',
                        faqSubtitle: 'Everything you need to know about our plans',
                        guaranteeTitle: '30-Day Money-Back Guarantee',
                        guaranteeDesc: "We're confident you'll love our service. If you're not completely satisfied within the first 30 days, we'll give you a full refund—no questions asked.",
                        faq1q: 'Can I change my plan anytime?',
                        faq1a: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any billing differences.",
                        faq2q: 'Is there a free trial?',
                        faq2a: 'Yes! We offer a 14-day free trial for our Premium plan. No credit card required to start your trial.',
                        faq3q: 'What payment methods do you accept?',
                        faq3a: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for annual plans.',
                        faq4q: 'Can I cancel my subscription?',
                        faq4a: "Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your current billing period.",
                        faq5q: 'Do you offer student discounts?',
                        faq5a: 'Yes! Students with a valid student ID can get 20% off any paid plan. Contact our support team to claim your discount.'
                    },
                    ru: {
                        pageTitle: 'Наши <span class="page-title-accent">Услуги</span>',
                        pageSubtitle: 'Выберите план, который вам подходит. Получите доступ к информации об университетах, экспертным рекомендациям и персонализированной поддержке.',
                        forStudents: 'Для студентов и семей',
                        forConsultants: 'Для консультантов',
                        forBusiness: 'Для бизнеса',
                        // Student plans
                        freeName: 'Бесплатно',
                        freeDesc: 'Идеально для изучения возможностей',
                        forever: 'навсегда',
                        perMonth: 'в месяц',
                        pricingLabel: 'цена',
                        custom: 'По запросу',
                        getStarted: 'Начать бесплатно',
                        startTrial: 'Начать 14-дневный триал',
                        contactUs: 'Связаться с нами',
                        premiumName: 'Премиум',
                        premiumDesc: 'Всё для успешного поступления',
                        mostPopular: 'Самый популярный',
                        completeName: 'Полный',
                        completeDesc: 'Полная поддержка экспертов на каждом шагу',
                        // Business plans
                        starterName: 'Стартовый',
                        starterDesc: 'Для независимых консультантов',
                        professionalName: 'Профессионал',
                        professionalDesc: 'Для растущих агентств',
                        bestValue: 'Лучшая цена',
                        enterpriseName: 'Корпоративный',
                        enterpriseDesc: 'Для крупных организаций',
                        startTrialBtn: 'Начать триал',
                        contactSales: 'Связаться с отделом продаж',
                        // Student features
                        feat1: 'Базовый доступ к базе университетов',
                        feat2: 'Сравнение до 2 университетов',
                        feat3: 'Базовый поиск и фильтры',
                        feat4: 'Доступ к форуму сообщества',
                        feat5: 'Персональные рекомендации',
                        feat6: 'Отслеживание заявок',
                        feat7: 'Консультация эксперта',
                        feat8: 'Полный доступ к базе университетов',
                        feat9: 'Сравнение до 10 университетов',
                        feat10: 'Панель отслеживания заявок',
                        feat11: 'Чек-лист документов',
                        feat12: 'Поддержка по email (24ч)',
                        feat13: 'Личная консультация эксперта',
                        feat14: 'Всё из Premium',
                        feat15: 'Безлимитное сравнение университетов',
                        feat16: '2 часа консультаций/месяц',
                        feat17: 'Проверка эссе',
                        feat18: 'Подбор стипендий',
                        feat19: 'Подготовка к интервью',
                        feat20: 'Приоритетная поддержка',
                        // Business features
                        bfeat1: 'Управление клиентами (до 20)',
                        bfeat2: 'Базовые отчёты',
                        bfeat3: 'Поддержка по email',
                        bfeat4: 'Свой брендинг',
                        bfeat5: 'Доступ к API',
                        bfeat6: 'Персональный менеджер',
                        bfeat7: 'Всё из Стартового',
                        bfeat8: 'Безлимит клиентов',
                        bfeat9: 'Продвинутая аналитика',
                        bfeat10: 'Приоритетная поддержка',
                        bfeat11: 'Всё из Профессионала',
                        bfeat12: 'Кастомные интеграции',
                        bfeat13: 'Гарантия SLA',
                        bfeat14: 'Обучение на месте',
                        bfeat15: 'Поддержка 24/7',
                        bfeat16: 'Кастомная разработка',
                        compareTitle: 'Сравнение планов',
                        feature: 'Функция',
                        faqTitle: 'Часто задаваемые вопросы',
                        faqSubtitle: 'Всё, что вам нужно знать о наших планах',
                        guaranteeTitle: '30-дневная гарантия возврата',
                        guaranteeDesc: 'Мы уверены, что вам понравится наш сервис. Если вы не полностью довольны в течение первых 30 дней, мы вернём вам деньги — без лишних вопросов.',
                        faq1q: 'Могу ли я изменить свой план в любое время?',
                        faq1a: 'Да, вы можете повысить или понизить свой план в любое время. Изменения вступают в силу немедленно, и мы пропорционально пересчитаем разницу в оплате.',
                        faq2q: 'Есть ли бесплатный пробный период?',
                        faq2a: 'Да! Мы предлагаем 14-дневный бесплатный пробный период для плана Premium. Кредитная карта не требуется.',
                        faq3q: 'Какие способы оплаты вы принимаете?',
                        faq3a: 'Мы принимаем все основные кредитные карты (Visa, MasterCard, American Express), PayPal и банковские переводы для годовых планов.',
                        faq4q: 'Могу ли я отменить подписку?',
                        faq4a: 'Да, вы можете отменить подписку в любое время. Доступ сохранится до конца текущего расчётного периода.',
                        faq5q: 'Есть ли скидки для студентов?',
                        faq5a: 'Да! Студенты с действующим студенческим билетом могут получить скидку 20% на любой платный план. Свяжитесь с нашей службой поддержки.'
                    },
                    kz: {
                        pageTitle: 'Біздің <span class="page-title-accent">Қызметтер</span>',
                        pageSubtitle: 'Сізге сәйкес жоспарды таңдаңыз. Университеттер туралы ақпаратқа, сарапшы кеңестеріне және жеке қолдауға қол жеткізіңіз.',
                        forStudents: 'Студенттер мен отбасыларға',
                        forConsultants: 'Кеңесшілерге',
                        forBusiness: 'Бизнеске',
                        // Student plans
                        freeName: 'Тегін',
                        freeDesc: 'Мүмкіндіктерді зерттеуге тамаша',
                        forever: 'мәңгілік',
                        perMonth: 'айына',
                        pricingLabel: 'баға',
                        custom: 'Сұраныс бойынша',
                        getStarted: 'Тегін бастау',
                        startTrial: '14 күндік сынақты бастау',
                        contactUs: 'Байланысу',
                        premiumName: 'Премиум',
                        premiumDesc: 'Сәтті түсуге қажет барлығы',
                        mostPopular: 'Ең танымал',
                        completeName: 'Толық',
                        completeDesc: 'Әр қадамда сарапшылардың толық қолдауы',
                        // Business plans
                        starterName: 'Бастапқы',
                        starterDesc: 'Тәуелсіз кеңесшілерге',
                        professionalName: 'Кәсіби',
                        professionalDesc: 'Өсіп келе жатқан агенттіктерге',
                        bestValue: 'Ең тиімді',
                        enterpriseName: 'Корпоративтік',
                        enterpriseDesc: 'Ірі ұйымдарға',
                        startTrialBtn: 'Сынақты бастау',
                        contactSales: 'Сату бөлімімен байланысу',
                        // Student features
                        feat1: 'Университеттер базасына негізгі қол жетімділік',
                        feat2: '2 университетке дейін салыстыру',
                        feat3: 'Негізгі іздеу және сүзгілер',
                        feat4: 'Қауымдастық форумына қол жетімділік',
                        feat5: 'Жеке ұсыныстар',
                        feat6: 'Өтініштерді бақылау',
                        feat7: 'Сарапшы кеңесі',
                        feat8: 'Университеттер базасына толық қол жетімділік',
                        feat9: '10 университетке дейін салыстыру',
                        feat10: 'Өтініштерді бақылау панелі',
                        feat11: 'Құжаттар тізімі',
                        feat12: 'Email қолдауы (24 сағат)',
                        feat13: 'Жеке сарапшы кеңесі',
                        feat14: 'Premium-дағы барлығы',
                        feat15: 'Шексіз университет салыстыру',
                        feat16: 'Айына 2 сағат кеңес',
                        feat17: 'Эссе тексеру',
                        feat18: 'Стипендия іріктеу',
                        feat19: 'Сұхбатқа дайындық',
                        feat20: 'Басымдықты телефон қолдауы',
                        // Business features
                        bfeat1: 'Клиенттерді басқару (20-ға дейін)',
                        bfeat2: 'Негізгі есептер',
                        bfeat3: 'Email қолдауы',
                        bfeat4: 'Өз брендингі',
                        bfeat5: 'API қол жетімділігі',
                        bfeat6: 'Жеке менеджер',
                        bfeat7: 'Бастапқыдағы барлығы',
                        bfeat8: 'Шексіз клиенттер',
                        bfeat9: 'Кеңейтілген аналитика',
                        bfeat10: 'Басымдықты қолдау',
                        bfeat11: 'Кәсібидегі барлығы',
                        bfeat12: 'Арнайы интеграциялар',
                        bfeat13: 'SLA кепілдігі',
                        bfeat14: 'Орнында оқыту',
                        bfeat15: '24/7 қолдау',
                        bfeat16: 'Арнайы әзірлеу',
                        compareTitle: 'Жоспарларды салыстыру',
                        feature: 'Мүмкіндік',
                        faqTitle: 'Жиі қойылатын сұрақтар',
                        faqSubtitle: 'Жоспарларымыз туралы білуіңіз керек барлығы',
                        guaranteeTitle: '30 күндік ақшаны қайтару кепілдігі',
                        guaranteeDesc: 'Біз сізге қызметіміз ұнайтынына сенімдіміз. Алғашқы 30 күн ішінде толық қанағаттанбасаңыз, ақшаңызды сұрақсыз қайтарамыз.',
                        faq1q: 'Жоспарымды кез келген уақытта өзгерте аламын ба?',
                        faq1a: 'Иә, жоспарыңызды кез келген уақытта жоғарылатуға немесе төмендетуге болады. Өзгерістер бірден күшіне енеді.',
                        faq2q: 'Тегін сынақ кезеңі бар ма?',
                        faq2a: 'Иә! Premium жоспарына 14 күндік тегін сынақ ұсынамыз. Кредит картасы қажет емес.',
                        faq3q: 'Қандай төлем әдістерін қабылдайсыздар?',
                        faq3a: 'Біз барлық негізгі кредит карталарын (Visa, MasterCard, American Express), PayPal және жылдық жоспарлар үшін банк аударымдарын қабылдаймыз.',
                        faq4q: 'Жазылымымды тоқтата аламын ба?',
                        faq4a: 'Иә, жазылымыңызды кез келген уақытта тоқтатуға болады. Ағымдағы есеп айырысу кезеңінің соңына дейін қол жетімділік сақталады.',
                        faq5q: 'Студенттерге жеңілдіктер бар ма?',
                        faq5a: 'Иә! Жарамды студенттік билеті бар студенттер кез келген ақылы жоспарға 20% жеңілдік ала алады. Қолдау тобымызбен байланысыңыз.'
                    }
                },
                // Study in Kazakhstan page
                studyKz: {
                    en: {
                        pageTitle: 'Study in Kazakhstan',
                        pageSubtitle: 'Discover world-class education in the heart of Central Asia',
                        selectUniversity: 'Select a University',
                        aboutTab: 'About',
                        programsTab: 'Programs',
                        admissionTab: 'Admission',
                        tourTab: '3D Tour',
                        mission: 'Mission',
                        missionVision: 'Mission & Vision',
                        history: 'History',
                        historyAchievements: 'History & Achievements',
                        campusLife: 'Campus Life',
                        campusFacilities: 'Campus Facilities',
                        studentLife: 'Student Life',
                        internationalExchange: 'International Exchange',
                        availablePrograms: 'Available Programs',
                        degree: 'Degree',
                        duration: 'Duration',
                        language: 'Language',
                        tuitionFees: 'Tuition & Fees',
                        tuition: 'Tuition',
                        accommodation: 'Accommodation',
                        totalAnnual: 'Total Annual Cost',
                        requirements: 'Requirements',
                        deadline: 'Application Deadline',
                        virtualTour: 'Virtual Campus Tour',
                        tourPlaceholder: 'Interactive 3D tour coming soon',
                        tourDesc: 'Explore the campus through our interactive 360° virtual tour.',
                        mainBuilding: 'Main Building',
                        mainBuildingDesc: 'Historic main campus building with administrative offices',
                        scienceLabs: 'Science Labs',
                        scienceLabsDesc: 'Modern laboratories for research and experiments',
                        dormitories: 'Dormitories',
                        dormitoriesDesc: 'Comfortable student housing on campus',
                        compareSection: 'Quick Comparison',
                        students: 'Students',
                        intlStudents: 'Int\'l Students',
                        worldRanking: 'World Ranking',
                        annualCost: 'Annual Cost'
                    },
                    ru: {
                        pageTitle: 'Учеба в Казахстане',
                        pageSubtitle: 'Откройте для себя образование мирового уровня в сердце Центральной Азии',
                        selectUniversity: 'Выберите университет',
                        aboutTab: 'О вузе',
                        programsTab: 'Программы',
                        admissionTab: 'Поступление',
                        tourTab: '3D тур',
                        mission: 'Миссия',
                        missionVision: 'Миссия и Видение',
                        missionText: 'Быть ведущим исследовательским университетом, способствующим устойчивому развитию Казахстана и мирового сообщества через инновации, образование и исследовательское превосходство. КазНУ стремится войти в топ-100 университетов мира к 2030 году.',
                        history: 'История',
                        historyAchievements: 'История и Достижения',
                        historyText1: 'Основанный в 1934 году, Казахский Национальный Университет имени аль-Фараби является старейшим и крупнейшим университетом в Казахстане. Он подготовил более 100 000 специалистов, внесших значительный вклад в развитие Казахстана и других стран. Университет первым в Казахстане получил Президентскую премию за качество.',
                        historyText2: 'Ключевые достижения включают звание лучшего университета в Центральной Азии, членство в международных ассоциациях университетов и партнерство с более чем 300 университетами по всему миру.',
                        campusLife: 'Кампус',
                        campusFacilities: 'Инфраструктура кампуса',
                        campusText1: 'КазНУ предлагает современную инфраструктуру, включая передовые лаборатории, библиотеки, спортивные комплексы и студенческие общежития. Кампус расположен в красивом городе Алматы, окруженном горами и предлагающем яркую студенческую жизнь.',
                        studentLife: 'Студенческая жизнь',
                        studentLifeText: 'Студенты могут участвовать в более чем 50 клубах и организациях, включая спортивные команды, культурные группы и академические общества. Университет регулярно проводит мероприятия, конференции и культурные фестивали, объединяющие студентов со всего мира.',
                        internationalExchange: 'Международный обмен',
                        exchangeText: 'КазНУ имеет партнерство с более чем 300 университетами по всему миру, предлагая программы обмена, включая Erasmus+, DAAD и Fulbright. Студенты могут получить двойные степени через партнерство с международными учреждениями.',
                        availablePrograms: 'Доступные программы',
                        degree: 'Степень',
                        duration: 'Длительность',
                        language: 'Язык',
                        tuitionFees: 'Стоимость обучения',
                        tuition: 'Обучение',
                        accommodation: 'Проживание',
                        totalAnnual: 'Общая годовая стоимость',
                        requirements: 'Требования',
                        deadline: 'Крайний срок подачи',
                        virtualTour: 'Виртуальный тур по кампусу',
                        tourPlaceholder: 'Интерактивный 3D-тур скоро появится',
                        tourDesc: 'Исследуйте кампус через наш интерактивный 360° виртуальный тур.',
                        mainBuilding: 'Главное здание',
                        mainBuildingDesc: 'Историческое главное здание кампуса с административными офисами',
                        scienceLabs: 'Научные лаборатории',
                        scienceLabsDesc: 'Современные лаборатории для исследований и экспериментов',
                        dormitories: 'Общежития',
                        dormitoriesDesc: 'Комфортное студенческое жилье на территории кампуса',
                        compareSection: 'Быстрое сравнение',
                        students: 'Студенты',
                        intlStudents: 'Иностр. студенты',
                        worldRanking: 'Мировой рейтинг',
                        annualCost: 'Годовая стоимость'
                    },
                    kz: {
                        pageTitle: 'Қазақстанда оқу',
                        pageSubtitle: 'Орталық Азияның жүрегінде әлемдік деңгейдегі білімді ашыңыз',
                        selectUniversity: 'Университетті таңдаңыз',
                        aboutTab: 'Туралы',
                        programsTab: 'Бағдарламалар',
                        admissionTab: 'Түсу',
                        tourTab: '3D тур',
                        mission: 'Миссия',
                        missionVision: 'Миссия және Көзқарас',
                        missionText: 'Қазақстан мен жаһандық қоғамның тұрақты дамуына инновациялар, білім және зерттеу жетістіктері арқылы үлес қосатын жетекші зерттеу университеті болу. ҚазҰУ 2030 жылға дейін әлемдегі топ-100 университеттер қатарына кіруге ұмтылады.',
                        history: 'Тарих',
                        historyAchievements: 'Тарих және Жетістіктер',
                        historyText1: '1934 жылы құрылған Әл-Фараби атындағы Қазақ Ұлттық Университеті Қазақстандағы ең ескі және ірі университет. Ол Қазақстан мен басқа елдердің дамуына елеулі үлес қосқан 100 000-нан астам маман дайындады. Университет Қазақстанда сапа үшін Президент сыйлығын алған алғашқы болды.',
                        historyText2: 'Негізгі жетістіктерге Орталық Азиядағы ең жақсы университет ретінде рейтингтелу, халықаралық университет ассоциацияларына мүшелік және әлем бойынша 300-ден астам университеттермен серіктестік кіреді.',
                        campusLife: 'Кампус',
                        campusFacilities: 'Кампус инфрақұрылымы',
                        campusText1: 'ҚазҰУ заманауи зертханалар, кітапханалар, спорт кешендері және студенттер жатақханаларын қоса алғанда заманауи инфрақұрылым ұсынады. Кампус таулармен қоршалған әдемі Алматы қаласында орналасқан және жанды студенттік өмір ұсынады.',
                        studentLife: 'Студенттік өмір',
                        studentLifeText: 'Студенттер спорт командалары, мәдени топтар және академиялық қоғамдарды қоса алғанда 50-ден астам клуб пен ұйымдарға қатыса алады. Университет әлемнің түкпір-түкпірінен келген студенттерді біріктіретін тұрақты іс-шаралар, конференциялар және мәдени фестивальдар өткізеді.',
                        internationalExchange: 'Халықаралық алмасу',
                        exchangeText: 'ҚазҰУ әлем бойынша 300-ден астам университеттермен серіктестікке ие, Erasmus+, DAAD және Fulbright қоса алғанда алмасу бағдарламаларын ұсынады. Студенттер халықаралық мекемелермен серіктестік арқылы қос диплом ала алады.',
                        availablePrograms: 'Қолжетімді бағдарламалар',
                        degree: 'Дәреже',
                        duration: 'Ұзақтығы',
                        language: 'Тіл',
                        tuitionFees: 'Оқу ақысы',
                        tuition: 'Оқу',
                        accommodation: 'Тұру',
                        totalAnnual: 'Жалпы жылдық құны',
                        requirements: 'Талаптар',
                        deadline: 'Өтініш мерзімі',
                        virtualTour: 'Кампустың виртуалды туры',
                        tourPlaceholder: 'Интерактивті 3D-тур жақында',
                        tourDesc: 'Біздің интерактивті 360° виртуалды тур арқылы кампусты зерттеңіз.',
                        mainBuilding: 'Бас ғимарат',
                        mainBuildingDesc: 'Әкімшілік кеңселері бар тарихи бас ғимарат',
                        scienceLabs: 'Ғылыми зертханалар',
                        scienceLabsDesc: 'Зерттеулер мен тәжірибелерге арналған заманауи зертханалар',
                        dormitories: 'Жатақханалар',
                        dormitoriesDesc: 'Кампус аумағындағы жайлы студенттік тұрғын үй',
                        compareSection: 'Жылдам салыстыру',
                        students: 'Студенттер',
                        intlStudents: 'Халықар. студенттер',
                        worldRanking: 'Әлемдік рейтинг',
                        annualCost: 'Жылдық құны'
                    }
                },
                // Study Abroad page
                studyAbroad: {
                    en: {
                        pageTitle: 'Study Abroad',
                        pageSubtitle: 'Explore educational opportunities in 25+ countries worldwide',
                        searchPlaceholder: 'Search countries...',
                        region: 'Region',
                        allRegions: 'All Regions',
                        europe: 'Europe',
                        asia: 'Asia',
                        northAmerica: 'North America',
                        programType: 'Program Type',
                        allPrograms: 'All Programs',
                        undergraduate: 'Undergraduate',
                        graduate: 'Graduate',
                        budget: 'Budget',
                        allBudgets: 'All Budgets',
                        affordable: 'Affordable',
                        moderate: 'Moderate',
                        premium: 'Premium',
                        results: 'countries',
                        topUniversities: 'Top Universities',
                        avgTuition: 'Avg Tuition',
                        intlStudents: 'Int\'l Students',
                        popularDestinations: 'Popular Destinations',
                        applicationGuide: 'Application Guide',
                        step1: 'Research',
                        step1Desc: 'Explore countries, universities, and programs that match your goals.',
                        step2: 'Prepare',
                        step2Desc: 'Gather required documents, take language tests, prepare finances.',
                        step3: 'Apply',
                        step3Desc: 'Submit applications to your chosen universities before deadlines.',
                        step4: 'Enroll',
                        step4Desc: 'Accept offer, obtain visa, and prepare for your journey abroad.'
                    },
                    ru: {
                        pageTitle: 'Учеба за рубежом',
                        pageSubtitle: 'Исследуйте образовательные возможности в 25+ странах мира',
                        searchPlaceholder: 'Поиск стран...',
                        region: 'Регион',
                        allRegions: 'Все регионы',
                        europe: 'Европа',
                        asia: 'Азия',
                        northAmerica: 'Северная Америка',
                        programType: 'Тип программы',
                        allPrograms: 'Все программы',
                        undergraduate: 'Бакалавриат',
                        graduate: 'Магистратура',
                        budget: 'Бюджет',
                        allBudgets: 'Все бюджеты',
                        affordable: 'Доступный',
                        moderate: 'Умеренный',
                        premium: 'Премиум',
                        results: 'стран',
                        topUniversities: 'Лучшие университеты',
                        avgTuition: 'Средняя стоимость',
                        intlStudents: 'Иностр. студенты',
                        popularDestinations: 'Популярные направления',
                        applicationGuide: 'Руководство по поступлению',
                        step1: 'Исследуйте',
                        step1Desc: 'Изучите страны, университеты и программы, соответствующие вашим целям.',
                        step2: 'Подготовьтесь',
                        step2Desc: 'Соберите документы, сдайте языковые тесты, подготовьте финансы.',
                        step3: 'Подайте заявку',
                        step3Desc: 'Отправьте заявки в выбранные университеты до крайних сроков.',
                        step4: 'Зачислитесь',
                        step4Desc: 'Примите предложение, получите визу и подготовьтесь к поездке.'
                    },
                    kz: {
                        pageTitle: 'Шетелде оқу',
                        pageSubtitle: 'Әлемнің 25+ елінде білім алу мүмкіндіктерін зерттеңіз',
                        searchPlaceholder: 'Елдерді іздеу...',
                        region: 'Аймақ',
                        allRegions: 'Барлық аймақтар',
                        europe: 'Еуропа',
                        asia: 'Азия',
                        northAmerica: 'Солтүстік Америка',
                        programType: 'Бағдарлама түрі',
                        allPrograms: 'Барлық бағдарламалар',
                        undergraduate: 'Бакалавриат',
                        graduate: 'Магистратура',
                        budget: 'Бюджет',
                        allBudgets: 'Барлық бюджеттер',
                        affordable: 'Қолжетімді',
                        moderate: 'Орташа',
                        premium: 'Премиум',
                        results: 'ел',
                        topUniversities: 'Үздік университеттер',
                        avgTuition: 'Орташа құны',
                        intlStudents: 'Халықар. студенттер',
                        popularDestinations: 'Танымал бағыттар',
                        applicationGuide: 'Түсу нұсқаулығы',
                        step1: 'Зерттеу',
                        step1Desc: 'Мақсаттарыңызға сәйкес елдерді, университеттерді және бағдарламаларды зерттеңіз.',
                        step2: 'Дайындық',
                        step2Desc: 'Құжаттарды жинаңыз, тіл тесттерін тапсырыңыз, қаржыны дайындаңыз.',
                        step3: 'Өтініш беру',
                        step3Desc: 'Таңдалған университеттерге мерзімге дейін өтініш беріңіз.',
                        step4: 'Тіркелу',
                        step4Desc: 'Ұсынысты қабылдаңыз, виза алыңыз және сапарға дайындалыңыз.'
                    }
                },
                // Profile page
                profile: {
                    en: {
                        pageTitle: 'Your Profile',
                        pageSubtitle: 'Manage your account, saved universities, and preferences',
                        loginRequired: 'Login Required',
                        loginRequiredDesc: 'Access your personalized dashboard, saved universities, and comparison tools by logging into your account.',
                        loginBtn: 'Log In to Your Account',
                        dashboard: 'Dashboard',
                        savedUnis: 'Saved Universities',
                        comparisons: 'Comparisons',
                        applications: 'Applications',
                        settings: 'Settings',
                        savedCount: 'Saved',
                        comparisonsCount: 'Comparisons',
                        applicationsCount: 'Applications',
                        noSavedUnis: 'No saved universities yet',
                        noSavedUnisDesc: 'Start exploring universities and save the ones you\'re interested in.',
                        exploreUnis: 'Explore Universities',
                        notifications: 'Notifications',
                        emailNotifications: 'Email Notifications',
                        emailNotificationsDesc: 'Receive updates about your applications',
                        newsletter: 'Newsletter',
                        newsletterDesc: 'Get tips and scholarship information',
                        language: 'Language',
                        languageDesc: 'Choose your preferred language',
                        dangerZone: 'Danger Zone',
                        deleteAccount: 'Delete Account',
                        deleteAccountDesc: 'Permanently delete your account and all data'
                    },
                    ru: {
                        pageTitle: 'Ваш профиль',
                        pageSubtitle: 'Управляйте аккаунтом, сохраненными университетами и настройками',
                        loginRequired: 'Требуется вход',
                        loginRequiredDesc: 'Получите доступ к персональной панели, сохраненным университетам и инструментам сравнения, войдя в аккаунт.',
                        loginBtn: 'Войти в аккаунт',
                        dashboard: 'Панель',
                        savedUnis: 'Сохраненные',
                        comparisons: 'Сравнения',
                        applications: 'Заявки',
                        settings: 'Настройки',
                        savedCount: 'Сохранено',
                        comparisonsCount: 'Сравнений',
                        applicationsCount: 'Заявок',
                        noSavedUnis: 'Нет сохраненных университетов',
                        noSavedUnisDesc: 'Начните изучать университеты и сохраняйте интересные.',
                        exploreUnis: 'Исследовать университеты',
                        notifications: 'Уведомления',
                        emailNotifications: 'Email уведомления',
                        emailNotificationsDesc: 'Получать обновления о заявках',
                        newsletter: 'Рассылка',
                        newsletterDesc: 'Получать советы и информацию о стипендиях',
                        language: 'Язык',
                        languageDesc: 'Выберите предпочитаемый язык',
                        dangerZone: 'Опасная зона',
                        deleteAccount: 'Удалить аккаунт',
                        deleteAccountDesc: 'Навсегда удалить аккаунт и все данные'
                    },
                    kz: {
                        pageTitle: 'Сіздің профиліңіз',
                        pageSubtitle: 'Тіркелгіні, сақталған университеттерді және параметрлерді басқарыңыз',
                        loginRequired: 'Кіру қажет',
                        loginRequiredDesc: 'Тіркелгіңізге кіру арқылы жеке панельге, сақталған университеттерге және салыстыру құралдарына қол жеткізіңіз.',
                        loginBtn: 'Тіркелгіге кіру',
                        dashboard: 'Панель',
                        savedUnis: 'Сақталған',
                        comparisons: 'Салыстырулар',
                        applications: 'Өтініштер',
                        settings: 'Параметрлер',
                        savedCount: 'Сақталған',
                        comparisonsCount: 'Салыстырулар',
                        applicationsCount: 'Өтініштер',
                        noSavedUnis: 'Сақталған университеттер жоқ',
                        noSavedUnisDesc: 'Университеттерді зерттеп, қызықтыларын сақтаңыз.',
                        exploreUnis: 'Университеттерді зерттеу',
                        notifications: 'Хабарландырулар',
                        emailNotifications: 'Email хабарландырулар',
                        emailNotificationsDesc: 'Өтініштер туралы жаңартуларды алу',
                        newsletter: 'Жаңалықтар',
                        newsletterDesc: 'Кеңестер мен стипендия ақпаратын алу',
                        language: 'Тіл',
                        languageDesc: 'Қалаған тілді таңдаңыз',
                        dangerZone: 'Қауіпті аймақ',
                        deleteAccount: 'Тіркелгіні жою',
                        deleteAccountDesc: 'Тіркелгі мен барлық деректерді біржола жою'
                    }
                },
                // Edu Helper page
                eduHelper: {
                    en: {
                        pageTitle: 'Edu Helper',
                        pageSubtitle: 'Your AI-powered education advisor. Share your test scores, interests, and goals to get personalized university and career recommendations.',
                        yourProfile: 'Your Profile',
                        profileSubtitle: 'Fill in your details for better recommendations',
                        testScores: 'Test Scores',
                        interests: 'Interests',
                        studyPreferences: 'Study Preferences',
                        preferredLocation: 'Preferred Location',
                        kazakhstan: 'Kazakhstan',
                        abroad: 'Abroad',
                        dualDiploma: '2+2 Dual Diploma',
                        noPreference: 'No Preference',
                        budgetRange: 'Budget Range (per year)',
                        generateBtn: 'Generate Recommendations',
                        aiTitle: 'Edu Helper AI',
                        aiSubtitle: 'Your personal education advisor',
                        online: 'Online',
                        quickQuestions: 'Quick questions:',
                        inputPlaceholder: 'Ask me anything about universities, programs, or career paths...',
                        howItWorks: 'How Edu Helper Works',
                        howItWorksSubtitle: 'Get personalized guidance powered by AI technology',
                        step1: 'Share Your Profile',
                        step1Desc: 'Enter your test scores (ENT, IELTS, SAT), interests, and career goals',
                        step2: 'AI Analysis',
                        step2Desc: 'Our AI analyzes your profile against 150+ universities and programs',
                        step3: 'University Match',
                        step3Desc: 'Get matched with universities that fit your scores and preferences',
                        step4: 'Career Pathway',
                        step4Desc: 'Discover career paths and programs aligned with your interests'
                    },
                    ru: {
                        pageTitle: 'Edu Helper',
                        pageSubtitle: 'Ваш AI-советник по образованию. Расскажите о своих баллах, интересах и целях для персональных рекомендаций.',
                        yourProfile: 'Ваш профиль',
                        profileSubtitle: 'Заполните данные для лучших рекомендаций',
                        testScores: 'Баллы тестов',
                        interests: 'Интересы',
                        studyPreferences: 'Предпочтения обучения',
                        preferredLocation: 'Предпочитаемое место',
                        kazakhstan: 'Казахстан',
                        abroad: 'За рубежом',
                        dualDiploma: '2+2 Двойной диплом',
                        noPreference: 'Без предпочтений',
                        budgetRange: 'Бюджет (в год)',
                        generateBtn: 'Получить рекомендации',
                        aiTitle: 'Edu Helper AI',
                        aiSubtitle: 'Ваш персональный советник',
                        online: 'Онлайн',
                        quickQuestions: 'Быстрые вопросы:',
                        inputPlaceholder: 'Спросите меня о университетах, программах или карьере...',
                        howItWorks: 'Как работает Edu Helper',
                        howItWorksSubtitle: 'Персональное руководство на основе AI',
                        step1: 'Заполните профиль',
                        step1Desc: 'Введите баллы тестов (ЕНТ, IELTS, SAT), интересы и цели',
                        step2: 'AI анализ',
                        step2Desc: 'AI анализирует ваш профиль среди 150+ университетов',
                        step3: 'Подбор университета',
                        step3Desc: 'Получите список университетов под ваши баллы',
                        step4: 'Карьерный путь',
                        step4Desc: 'Откройте карьерные пути и программы по интересам'
                    },
                    kz: {
                        pageTitle: 'Edu Helper',
                        pageSubtitle: 'AI-мен жұмыс істейтін білім кеңесшіңіз. Тест нәтижелерін, қызығушылықтарды және мақсаттарды бөлісіңіз.',
                        yourProfile: 'Сіздің профиліңіз',
                        profileSubtitle: 'Жақсы ұсыныстар үшін деректерді толтырыңыз',
                        testScores: 'Тест балдары',
                        interests: 'Қызығушылықтар',
                        studyPreferences: 'Оқу қалаулары',
                        preferredLocation: 'Қалаған орын',
                        kazakhstan: 'Қазақстан',
                        abroad: 'Шетелде',
                        dualDiploma: '2+2 Қос диплом',
                        noPreference: 'Қалаусыз',
                        budgetRange: 'Бюджет (жылына)',
                        generateBtn: 'Ұсыныстар алу',
                        aiTitle: 'Edu Helper AI',
                        aiSubtitle: 'Жеке білім кеңесшіңіз',
                        online: 'Онлайн',
                        quickQuestions: 'Жылдам сұрақтар:',
                        inputPlaceholder: 'Университеттер, бағдарламалар немесе мансап туралы сұраңыз...',
                        howItWorks: 'Edu Helper қалай жұмыс істейді',
                        howItWorksSubtitle: 'AI технологиясымен жеке нұсқаулық',
                        step1: 'Профильді толтырыңыз',
                        step1Desc: 'Тест балдарын (ҰБТ, IELTS, SAT), қызығушылықтарды енгізіңіз',
                        step2: 'AI талдау',
                        step2Desc: 'AI профиліңізді 150+ университетпен талдайды',
                        step3: 'Университет таңдау',
                        step3Desc: 'Балдарыңызға сәйкес университеттер тізімін алыңыз',
                        step4: 'Мансап жолы',
                        step4Desc: 'Қызығушылықтарға сай мансап жолдарын табыңыз'
                    }
                },
                // 2+2 Dual Diploma page
                dualDiploma: {
                    en: {
                        pageTitle: '1+1 Dual Diploma Programs',
                        pageSubtitle: 'Get two Master\'s degrees from Kazakhstan and international partner universities. Study 1 year locally, then 1 year abroad.',
                        heroTitle: '1+1 Dual Diploma Programs',
                        heroSubtitle: 'Get two Master\'s degrees from Kazakhstan and international partner universities. Study 1 year locally, then 1 year abroad — graduate with diplomas from both institutions.',
                        heroDesc: 'Get two Master\'s degrees from Kazakhstan and international partner universities. Study 1 year locally, then 1 year abroad — graduate with diplomas from both institutions.',
                        badge1: 'Two Diplomas',
                        badge2: 'Global Recognition',
                        badge3: 'Cost Effective',
                        year: 'Year',
                        inKz: 'In Kazakhstan',
                        abroad: 'Abroad',
                        diplomas: 'Diplomas',
                        graduate: 'Graduate',
                        howTitle: 'How 1+1 Programs Work',
                        howSubtitle: 'A streamlined pathway to international education and career success',
                        step1Title: 'Apply',
                        step1Desc: 'Submit application to Kazakh partner university',
                        step2Title: 'Year 1',
                        step2Desc: 'Study at university in Kazakhstan',
                        step3Title: 'Year 2',
                        step3Desc: 'Transfer to partner university abroad',
                        step4Title: 'Graduate',
                        step4Desc: 'Receive two recognized Master\'s degrees',
                        programsTitle: 'Featured 1+1 Programs',
                        programsSubtitle: 'Select partnerships between Kazakhstan and world-class international universities',
                        popular: 'Popular',
                        premium: 'Premium',
                        tech: 'Tech',
                        engineering: 'Engineering',
                        industry: 'Industry',
                        research: 'Research',
                        years: 'Years',
                        perYear: 'Per Year',
                        feat1: 'AACSB accredited business school',
                        feat2: 'English-taught program',
                        feat3: 'EU recognized degree',
                        feat4: 'Top 30 UK university',
                        feat5: 'CFA partnership',
                        feat6: 'Post-study work visa',
                        feat7: '#1 Technical university in Italy',
                        feat8: 'Strong industry connections',
                        feat9: 'Low tuition fees',
                        feat10: 'Top 50 global university',
                        feat11: 'Free public education',
                        feat12: '18-month post-study visa',
                        feat13: 'Historic technical university',
                        feat14: 'Affordable living costs',
                        feat15: 'EU work permit eligible',
                        feat16: 'World-class research facilities',
                        feat17: 'Strong scholarship support',
                        feat18: 'Innovation hub environment',
                        apply: 'Apply Now',
                        details: 'Details',
                        partnersTitle: 'Partner Countries',
                        partnersSubtitle: 'Our 1+1 programs connect you with top universities worldwide',
                        uk: 'United Kingdom',
                        germany: 'Germany',
                        poland: 'Poland',
                        italy: 'Italy',
                        korea: 'South Korea',
                        ctaTitle: 'Ready to Start Your International Journey?',
                        ctaSubtitle: 'Get personalized guidance on choosing the right 1+1 program for your career goals',
                        ctaBtn1: 'Book Free Consultation',
                        ctaBtn2: 'Ask AI Advisor',
                        prog1Name: 'SDU → University of Warsaw',
                        prog1Sub: 'Business Administration MBA',
                        prog2Name: 'KIMEP → University of Manchester',
                        prog2Sub: 'MSc Finance & Economics',
                        prog3Name: 'KazNU → Politecnico di Milano',
                        prog3Sub: 'MSc Computer Engineering',
                        prog4Name: 'AITU → TU Munich',
                        prog4Sub: 'MSc Data Science',
                        prog5Name: 'Satbayev → Czech Technical University',
                        prog5Sub: 'MSc Mechanical Engineering',
                        prog6Name: 'NU → KAIST',
                        prog6Sub: 'MSc Biotechnology',
                        countryPoland: 'Poland',
                        countryUK: 'UK',
                        countryItaly: 'Italy',
                        countryGermany: 'Germany',
                        countryCzech: 'Czech Republic',
                        countryKorea: 'South Korea',
                        dualDegree: 'Dual Degree',
                        costEffective: 'Cost Effective',
                        globalRecognition: 'Global Recognition',
                        explorePrograms: 'Explore Programs',
                        askAI: 'Ask AI Advisor',
                        howItWorks: 'How 2+2 Programs Work',
                        howItWorksSubtitle: 'A seamless pathway to an international degree',
                        step1: 'Apply',
                        step1Desc: 'Apply to a participating Kazakh university with 2+2 agreements',
                        step2: 'Study Years 1-2',
                        step2Desc: 'Complete your first two years in Kazakhstan, building strong foundations',
                        step3: 'Transfer',
                        step3Desc: 'Transfer to your partner university abroad with guaranteed acceptance',
                        step4: 'Graduate',
                        step4Desc: 'Complete years 3-4 abroad and receive diplomas from both universities',
                        featuredPrograms: 'Featured 2+2 Programs',
                        featuredProgramsSubtitle: 'Explore our partnership programs with leading international universities',
                        whyChoose: 'Why Choose a 2+2 Program?',
                        whyChooseSubtitle: 'The smart way to get an international education',
                        benefit1: 'Save 40-60% on Costs',
                        benefit1Desc: 'Study your first two years at affordable Kazakh universities',
                        benefit2: 'Two Recognized Diplomas',
                        benefit2Desc: 'Graduate with degrees from both universities',
                        benefit3: 'Smooth Transition',
                        benefit3Desc: 'Adjust to university life in familiar surroundings first',
                        benefit4: 'Global Network',
                        benefit4Desc: 'Build connections in two countries',
                        benefit5: 'Better Career Prospects',
                        benefit5Desc: 'Access job markets in multiple countries',
                        benefit6: 'Guaranteed Transfer',
                        benefit6Desc: 'Pre-approved pathways to partner universities',
                        partnerUnis: 'Our Partner Universities',
                        partnerUnisSubtitle: 'Study at world-class institutions through our 2+2 programs'
                    },
                    ru: {
                        pageTitle: 'Программы 1+1 Двойной диплом',
                        pageSubtitle: 'Получите два диплома магистра от университетов Казахстана и международных партнеров. Учитесь 1 год в Казахстане, затем 1 год за рубежом.',
                        heroTitle: 'Программы 1+1 Двойной диплом',
                        heroSubtitle: 'Получите два диплома магистра от университетов Казахстана и международных партнеров. Учитесь 1 год в Казахстане, затем 1 год за рубежом — выпуститесь с дипломами обоих вузов.',
                        heroDesc: 'Получите два диплома магистра от университетов Казахстана и международных партнеров. Учитесь 1 год в Казахстане, затем 1 год за рубежом — выпуститесь с дипломами обоих вузов.',
                        badge1: 'Два диплома',
                        badge2: 'Мировое признание',
                        badge3: 'Экономично',
                        year: 'Год',
                        inKz: 'В Казахстане',
                        abroad: 'За рубежом',
                        diplomas: 'Дипломы',
                        graduate: 'Выпуск',
                        howTitle: 'Как работают программы 1+1',
                        howSubtitle: 'Эффективный путь к международному образованию и карьерному успеху',
                        step1Title: 'Подать заявку',
                        step1Desc: 'Подайте заявку в казахстанский партнерский университет',
                        step2Title: 'Год 1',
                        step2Desc: 'Учитесь в университете Казахстана',
                        step3Title: 'Год 2',
                        step3Desc: 'Переведитесь в партнерский университет за рубежом',
                        step4Title: 'Выпуститесь',
                        step4Desc: 'Получите два признанных диплома магистра',
                        programsTitle: 'Рекомендуемые программы 1+1',
                        programsSubtitle: 'Отборные партнерства между Казахстаном и ведущими международными университетами',
                        popular: 'Популярно',
                        premium: 'Премиум',
                        tech: 'Технологии',
                        engineering: 'Инженерия',
                        industry: 'Промышленность',
                        research: 'Исследования',
                        years: 'Лет',
                        perYear: 'В год',
                        feat1: 'AACSB аккредитованная бизнес-школа',
                        feat2: 'Программа на английском',
                        feat3: 'Диплом, признанный в ЕС',
                        feat4: 'Топ-30 университет Великобритании',
                        feat5: 'Партнерство CFA',
                        feat6: 'Рабочая виза после учебы',
                        feat7: '#1 Технический университет Италии',
                        feat8: 'Сильные связи с индустрией',
                        feat9: 'Низкая стоимость обучения',
                        feat10: 'Топ-50 университет мира',
                        feat11: 'Бесплатное государственное образование',
                        feat12: 'Рабочая виза на 18 месяцев',
                        feat13: 'Исторический технический университет',
                        feat14: 'Доступная стоимость жизни',
                        feat15: 'Право на рабочую визу ЕС',
                        feat16: 'Исследовательские центры мирового класса',
                        feat17: 'Сильная поддержка стипендий',
                        feat18: 'Среда инновационного хаба',
                        apply: 'Подать заявку',
                        details: 'Подробнее',
                        partnersTitle: 'Партнерские страны',
                        partnersSubtitle: 'Наши программы 1+1 связывают вас с ведущими университетами мира',
                        uk: 'Великобритания',
                        germany: 'Германия',
                        poland: 'Польша',
                        italy: 'Италия',
                        korea: 'Южная Корея',
                        ctaTitle: 'Готовы начать международное путешествие?',
                        ctaSubtitle: 'Получите персональные рекомендации по выбору подходящей программы 1+1 для ваших карьерных целей',
                        ctaBtn1: 'Записаться на консультацию',
                        ctaBtn2: 'Спросить AI-советника',
                        prog1Name: 'SDU → Варшавский Университет',
                        prog1Sub: 'MBA Бизнес-администрирование',
                        prog2Name: 'КИМЭП → Манчестерский Университет',
                        prog2Sub: 'MSc Финансы и Экономика',
                        prog3Name: 'КазНУ → Политехнический Университет Милана',
                        prog3Sub: 'MSc Компьютерная инженерия',
                        prog4Name: 'АИТУ → Мюнхенский Технический Университет',
                        prog4Sub: 'MSc Наука о данных',
                        prog5Name: 'Сатбаев → Чешский Технический Университет',
                        prog5Sub: 'MSc Машиностроение',
                        prog6Name: 'НУ → KAIST',
                        prog6Sub: 'MSc Биотехнология',
                        countryPoland: 'Польша',
                        countryUK: 'Великобритания',
                        countryItaly: 'Италия',
                        countryGermany: 'Германия',
                        countryCzech: 'Чехия',
                        countryKorea: 'Южная Корея',
                        dualDegree: 'Двойной диплом',
                        costEffective: 'Экономично',
                        globalRecognition: 'Мировое признание',
                        explorePrograms: 'Программы',
                        askAI: 'Спросить AI',
                        howItWorks: 'Как работают программы 2+2',
                        howItWorksSubtitle: 'Плавный путь к международному образованию',
                        step1: 'Подайте заявку',
                        step1Desc: 'Подайте заявку в университет Казахстана с соглашением 2+2',
                        step2: 'Учитесь 1-2 курс',
                        step2Desc: 'Пройдите первые два года в Казахстане',
                        step3: 'Переведитесь',
                        step3Desc: 'Переведитесь в партнерский университет с гарантированным зачислением',
                        step4: 'Выпуститесь',
                        step4Desc: 'Завершите 3-4 курс за рубежом и получите оба диплома',
                        featuredPrograms: 'Программы 2+2',
                        featuredProgramsSubtitle: 'Изучите партнерские программы с ведущими университетами',
                        whyChoose: 'Почему выбирают 2+2?',
                        whyChooseSubtitle: 'Умный способ получить международное образование',
                        benefit1: 'Экономия 40-60%',
                        benefit1Desc: 'Первые два года в доступных университетах Казахстана',
                        benefit2: 'Два признанных диплома',
                        benefit2Desc: 'Получите дипломы обоих университетов',
                        benefit3: 'Плавная адаптация',
                        benefit3Desc: 'Сначала адаптируйтесь в знакомой среде',
                        benefit4: 'Глобальная сеть',
                        benefit4Desc: 'Создайте связи в двух странах',
                        benefit5: 'Лучшие карьерные перспективы',
                        benefit5Desc: 'Доступ к рынкам труда нескольких стран',
                        benefit6: 'Гарантированный перевод',
                        benefit6Desc: 'Заранее одобренные пути в партнерские вузы',
                        partnerUnis: 'Наши партнеры',
                        partnerUnisSubtitle: 'Учитесь в мировых университетах через программы 2+2'
                    },
                    kz: {
                        pageTitle: '1+1 Қос диплом бағдарламалары',
                        pageSubtitle: 'Қазақстан және халықаралық серіктес университеттерден екі магистр дипломы алыңыз. 1 жыл Қазақстанда, содан кейін 1 жыл шетелде оқыңыз.',
                        heroTitle: '1+1 Қос диплом бағдарламалары',
                        heroSubtitle: 'Қазақстан және халықаралық серіктес университеттерден екі магистр дипломы алыңыз. 1 жыл Қазақстанда, содан кейін 1 жыл шетелде оқыңыз — екі мекеменің де дипломдарымен бітіресіз.',
                        heroDesc: 'Қазақстан және халықаралық серіктес университеттерден екі магистр дипломы алыңыз. 1 жыл Қазақстанда, содан кейін 1 жыл шетелде оқыңыз — екі мекеменің де дипломдарымен бітіресіз.',
                        badge1: 'Екі диплом',
                        badge2: 'Әлемдік мойындау',
                        badge3: 'Үнемді',
                        year: 'Жыл',
                        inKz: 'Қазақстанда',
                        abroad: 'Шетелде',
                        diplomas: 'Дипломдар',
                        graduate: 'Бітіру',
                        howTitle: '1+1 бағдарламалары қалай жұмыс істейді',
                        howSubtitle: 'Халықаралық білім және мансап табысына жол',
                        step1Title: 'Өтініш беру',
                        step1Desc: 'Қазақстан серіктес университетіне өтініш беріңіз',
                        step2Title: '1 жыл',
                        step2Desc: 'Қазақстандағы университетте оқыңыз',
                        step3Title: '2 жыл',
                        step3Desc: 'Шетелдегі серіктес университетке ауысыңыз',
                        step4Title: 'Бітіру',
                        step4Desc: 'Екі мойындалған магистр дипломын алыңыз',
                        programsTitle: 'Рекомендацияланған 1+1 бағдарламалары',
                        programsSubtitle: 'Қазақстан мен әлемдік деңгейдегі халықаралық университеттер арасындағы таңдаулы серіктестіктер',
                        popular: 'Танымал',
                        premium: 'Премиум',
                        tech: 'Технология',
                        engineering: 'Инженерия',
                        industry: 'Өнеркәсіп',
                        research: 'Зерттеу',
                        years: 'Жыл',
                        perYear: 'Жылына',
                        feat1: 'AACSB аккредиттелген бизнес-мектебі',
                        feat2: 'Ағылшын тіліндегі бағдарлама',
                        feat3: 'ЕО мойындаған диплом',
                        feat4: 'Топ-30 Ұлыбритания университеті',
                        feat5: 'CFA серіктестігі',
                        feat6: 'Оқудан кейінгі жұмыс визасы',
                        feat7: '#1 Италиядағы техникалық университет',
                        feat8: 'Өнеркәсіппен күшті байланыстар',
                        feat9: 'Төмен оқу ақысы',
                        feat10: 'Топ-50 әлемдік университет',
                        feat11: 'Тегін мемлекеттік білім',
                        feat12: '18 айлық оқудан кейінгі виза',
                        feat13: 'Тарихи техникалық университет',
                        feat14: 'Қолжетімді тұрмыс құны',
                        feat15: 'ЕО жұмыс рұқсатына құқығы',
                        feat16: 'Әлемдік деңгейдегі зерттеу орындары',
                        feat17: 'Күшті стипендиялық қолдау',
                        feat18: 'Инновациялық хаб ортасы',
                        apply: 'Қазір өтініш беру',
                        details: 'Толығырақ',
                        partnersTitle: 'Серіктес елдер',
                        partnersSubtitle: 'Біздің 1+1 бағдарламалары сізді әлемдегі жетекші университеттермен байланыстырады',
                        uk: 'Ұлыбритания',
                        germany: 'Германия',
                        poland: 'Польша',
                        italy: 'Италия',
                        korea: 'Оңтүстік Корея',
                        ctaTitle: 'Халықаралық саяхатыңызды бастауға дайынсыз ба?',
                        ctaSubtitle: 'Мансап мақсаттарыңызға сәйкес дұрыс 1+1 бағдарламасын таңдау бойынша жеке кеңес алыңыз',
                        ctaBtn1: 'Тегін кеңесқа жазылу',
                        ctaBtn2: 'AI-кеңесшіден сұрау',
                        prog1Name: 'SDU → Варшава Университеті',
                        prog1Sub: 'MBA Бизнес әкімшілігі',
                        prog2Name: 'КИМЭП → Манчестер Университеті',
                        prog2Sub: 'MSc Қаржы және Экономика',
                        prog3Name: 'ҚазҰУ → Милан Политехникалық Университеті',
                        prog3Sub: 'MSc Компьютерлік инженерия',
                        prog4Name: 'АИТУ → Мюнхен Техникалық Университеті',
                        prog4Sub: 'MSc Деректер ғылымы',
                        prog5Name: 'Сәтбаев → Чехия Техникалық Университеті',
                        prog5Sub: 'MSc Механикалық инженерия',
                        prog6Name: 'НУ → KAIST',
                        prog6Sub: 'MSc Биотехнология',
                        countryPoland: 'Польша',
                        countryUK: 'Ұлыбритания',
                        countryItaly: 'Италия',
                        countryGermany: 'Германия',
                        countryCzech: 'Чехия',
                        countryKorea: 'Оңтүстік Корея',
                        dualDegree: 'Қос диплом',
                        costEffective: 'Үнемді',
                        globalRecognition: 'Әлемдік мойындау',
                        explorePrograms: 'Бағдарламалар',
                        askAI: 'AI сұрау',
                        howItWorks: '2+2 бағдарламалары қалай жұмыс істейді',
                        howItWorksSubtitle: 'Халықаралық білімге жол',
                        step1: 'Өтініш беріңіз',
                        step1Desc: '2+2 келісімі бар Қазақстан университетіне өтініш беріңіз',
                        step2: '1-2 курс оқыңыз',
                        step2Desc: 'Алғашқы екі жылды Қазақстанда аяқтаңыз',
                        step3: 'Ауысыңыз',
                        step3Desc: 'Серіктес университетке кепілдікпен ауысыңыз',
                        step4: 'Бітіріңіз',
                        step4Desc: '3-4 курсты шетелде аяқтап, екі диплом алыңыз',
                        featuredPrograms: '2+2 бағдарламалары',
                        featuredProgramsSubtitle: 'Жетекші университеттермен серіктестік бағдарламаларды зерттеңіз',
                        whyChoose: 'Неге 2+2 таңдайсыз?',
                        whyChooseSubtitle: 'Халықаралық білім алудың ақылды жолы',
                        benefit1: '40-60% үнемдеу',
                        benefit1Desc: 'Алғашқы екі жылды қолжетімді университеттерде оқыңыз',
                        benefit2: 'Екі мойындалған диплом',
                        benefit2Desc: 'Екі университеттің де дипломын алыңыз',
                        benefit3: 'Тегіс бейімделу',
                        benefit3Desc: 'Алдымен таныс ортада бейімделіңіз',
                        benefit4: 'Жаһандық желі',
                        benefit4Desc: 'Екі елде байланыстар орнатыңыз',
                        benefit5: 'Жақсы мансап перспективалары',
                        benefit5Desc: 'Бірнеше елдің еңбек нарықтарына қол жеткізіңіз',
                        benefit6: 'Кепілдікті ауысу',
                        benefit6Desc: 'Серіктес университеттерге алдын ала мақұлданған жолдар',
                        partnerUnis: 'Біздің серіктестер',
                        partnerUnisSubtitle: '2+2 бағдарламалары арқылы әлемдік университеттерде оқыңыз'
                    }
                },
                // Compare page
                compare: {
                    en: {
                        title: 'Compare Universities',
                        subtitle: 'Select universities to compare their rankings, tuition, programs, and more side by side',
                        city: 'City:',
                        allCities: 'All Cities',
                        type: 'Type:',
                        allTypes: 'All Types',
                        public: 'Public',
                        private: 'Private',
                        sortBy: 'Sort by:',
                        ranking: 'Ranking',
                        tuition: 'Tuition (Low to High)',
                        students: 'Students',
                        clear: 'Clear',
                        compareBtn: 'Compare',
                        viewDetails: 'Details',
                        select: 'Select',
                        modalTitle: 'University Comparison',
                        tuitionLabel: 'Tuition/Year',
                        studentsLabel: 'Students',
                        employment: 'Employment',
                        qsWorld: 'QS World Ranking',
                        compareValue: 'Compare Value'
                    },
                    ru: {
                        title: 'Сравнить университеты',
                        subtitle: 'Выберите университеты для сравнения их рейтингов, стоимости обучения, программ и многого другого',
                        city: 'Город:',
                        allCities: 'Все города',
                        type: 'Тип:',
                        allTypes: 'Все типы',
                        public: 'Государственный',
                        private: 'Частный',
                        sortBy: 'Сортировать:',
                        ranking: 'Рейтинг',
                        tuition: 'Стоимость (от низкой)',
                        students: 'Студенты',
                        clear: 'Очистить',
                        compareBtn: 'Сравнить',
                        viewDetails: 'Подробнее',
                        select: 'Выбрать',
                        modalTitle: 'Сравнение университетов',
                        tuitionLabel: 'Стоимость/Год',
                        studentsLabel: 'Студенты',
                        employment: 'Трудоустройство',
                        qsWorld: 'QS Мировой рейтинг',
                        compareValue: 'Сравнить значение'
                    },
                    kz: {
                        title: 'Университеттерді салыстыру',
                        subtitle: 'Рейтингтерін, оқу ақысын, бағдарламаларды және басқаларын салыстыру үшін университеттерді таңдаңыз',
                        city: 'Қала:',
                        allCities: 'Барлық қалалар',
                        type: 'Түрі:',
                        allTypes: 'Барлық түрлер',
                        public: 'Мемлекеттік',
                        private: 'Жеке',
                        sortBy: 'Сұрыптау:',
                        ranking: 'Рейтинг',
                        tuition: 'Оқу ақысы (төменнен)',
                        students: 'Студенттер',
                        clear: 'Тазалау',
                        compareBtn: 'Салыстыру',
                        viewDetails: 'Толығырақ',
                        select: 'Таңдау',
                        modalTitle: 'Университеттерді салыстыру',
                        tuitionLabel: 'Оқу ақысы/Жыл',
                        studentsLabel: 'Студенттер',
                        employment: 'Жұмысқа орналасу',
                        qsWorld: 'QS Әлемдік рейтинг',
                        compareValue: 'Мәнді салыстыру'
                    }
                },
                // Login modal
                loginModal: {
                    en: {
                        title: 'Welcome Back',
                        subtitle: 'Sign in to access your account',
                        emailLabel: 'Email or Phone',
                        emailPlaceholder: 'Enter your email or phone',
                        passwordLabel: 'Password',
                        passwordPlaceholder: 'Enter your password',
                        loginBtn: 'Login',
                        noAccount: "Don't have an account?",
                        signUp: 'Sign up'
                    },
                    ru: {
                        title: 'С возвращением',
                        subtitle: 'Войдите в свой аккаунт',
                        emailLabel: 'Email или телефон',
                        emailPlaceholder: 'Введите email или телефон',
                        passwordLabel: 'Пароль',
                        passwordPlaceholder: 'Введите пароль',
                        loginBtn: 'Войти',
                        noAccount: 'Нет аккаунта?',
                        signUp: 'Регистрация'
                    },
                    kz: {
                        title: 'Қайта оралуыңызбен',
                        subtitle: 'Тіркелгіңізге кіріңіз',
                        emailLabel: 'Email немесе телефон',
                        emailPlaceholder: 'Email немесе телефонды енгізіңіз',
                        passwordLabel: 'Құпия сөз',
                        passwordPlaceholder: 'Құпия сөзді енгізіңіз',
                        loginBtn: 'Кіру',
                        noAccount: 'Тіркелгіңіз жоқ па?',
                        signUp: 'Тіркелу'
                    }
                }
            }
        };
    }

    // Language Management
    setupLanguageSwitcher() {
        const langButtons = document.querySelectorAll('.lang-btn[data-lang]');
        langButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const lang = btn.dataset.lang;
                
                // Update active state on all language buttons
                document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                this.switchLanguage(lang);
            });
        });
        
        // Load saved language preference on page load
        const savedLang = localStorage.getItem('assylLanguage');
        if (savedLang && ['en', 'ru', 'kz'].includes(savedLang)) {
            this.currentLanguage = savedLang;
            // Update HTML lang attribute
            document.documentElement.lang = savedLang;
            // Update active button state
            document.querySelectorAll('.lang-btn').forEach(b => {
                b.classList.toggle('active', b.dataset.lang === savedLang);
            });
            // Delay UI update to ensure DOM is ready
            setTimeout(() => this.updateUI(), 100);
        }
    }

    switchLanguage(lang) {
        if (!['en', 'ru', 'kz'].includes(lang)) return;
        
        this.currentLanguage = lang;
        localStorage.setItem('assylLanguage', lang);
        
        // Update HTML lang attribute for proper text sizing
        document.documentElement.lang = lang;
        
        // Add transition effect
        document.body.style.opacity = '0.95';
        
        // Update all translations
        this.updateUI();
        
        // Restore opacity
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 150);
        
        this.saveUserPreference('language', lang);
        
        // Show notification
        const langNames = { en: 'English', ru: 'Русский', kz: 'Қазақша' };
        this.showLanguageNotification(langNames[lang]);
    }
    
    showLanguageNotification(langName) {
        // Remove existing notification if any
        const existing = document.querySelector('.lang-notification');
        if (existing) existing.remove();
        
        const notification = document.createElement('div');
        notification.className = 'lang-notification';
        notification.innerHTML = `<i class="fas fa-globe"></i> ${langName}`;
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: var(--primary-navy, #1e3a5f);
            color: white;
            padding: 0.75rem 1.25rem;
            border-radius: 8px;
            font-size: 0.9rem;
            font-weight: 500;
            box-shadow: 0 4px 16px rgba(0,0,0,0.15);
            z-index: 9999;
            animation: slideInRight 0.3s ease;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        `;
        document.body.appendChild(notification);
        
        // Remove after 2 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }

    t(key) {
        return this.translations[this.currentLanguage][key] || key;
    }

    // User Profile System
    loadUserData() {
        const userData = localStorage.getItem('assylUserData');
        if (userData) {
            this.userData = JSON.parse(userData);
            this.currentUser = this.userData.currentUser || null;
        }
    }

    saveUserData() {
        localStorage.setItem('assylUserData', JSON.stringify(this.userData));
    }

    login(emailOrPhone, password) {
        // Simulate login process
        const userId = this.generateUserId(emailOrPhone);
        this.currentUser = {
            id: userId,
            email: emailOrPhone.includes('@') ? emailOrPhone : null,
            phone: !emailOrPhone.includes('@') ? emailOrPhone : null,
            preferences: {
                language: this.currentLanguage,
                savedUniversities: [],
                comparisons: []
            }
        };
        
        this.userData[userId] = this.currentUser;
        this.userData.currentUser = this.currentUser;
        this.saveUserData();
        this.updateProfileUI();
        
        // Hide login modal after successful login
        hideLoginModal();
        showNotification('Welcome! You are now logged in.', 'success');
        
        return true;
    }

    logout() {
        this.currentUser = null;
        this.userData.currentUser = null;
        this.saveUserData();
        this.updateProfileUI();
    }

    generateUserId(emailOrPhone) {
        return 'user_' + btoa(emailOrPhone).replace(/[^a-zA-Z0-9]/g, '').substring(0, 10);
    }

    saveUserPreference(key, value) {
        if (this.currentUser) {
            this.currentUser.preferences[key] = value;
            this.userData[this.currentUser.id] = this.currentUser;
            this.userData.currentUser = this.currentUser;
            this.saveUserData();
        }
    }

    // University Comparison System
    toggleUniversitySelection(universityId) {
        const index = this.selectedUniversities.indexOf(universityId);
        if (index > -1) {
            this.selectedUniversities.splice(index, 1);
        } else {
            if (this.selectedUniversities.length < 3) {
                this.selectedUniversities.push(universityId);
            } else {
                alert(this.t('maxCompare'));
            }
        }
        this.updateComparisonUI();
    }

    updateComparisonUI() {
        const compareBtn = document.getElementById('compareBtn');
        const selectedCount = document.getElementById('selectedCount');
        
        if (compareBtn && selectedCount) {
            selectedCount.textContent = this.selectedUniversities.length;
            compareBtn.style.display = this.selectedUniversities.length > 0 ? 'block' : 'none';
        }
    }

    showComparison() {
        if (this.selectedUniversities.length === 0) return;
        
        const modal = document.getElementById('comparisonModal');
        const content = document.getElementById('comparisonContent');
        
        if (modal && content) {
            content.innerHTML = this.generateComparisonTable();
            modal.style.display = 'block';
        }
    }

    generateComparisonTable() {
        let html = '<div class="comparison-table">';
        
        // Headers
        html += '<div class="comparison-row header">';
        html += '<div class="comparison-cell">Criteria</div>';
        this.selectedUniversities.forEach(id => {
            const uni = this.universities[id];
            html += `<div class="comparison-cell">${uni.name[this.currentLanguage]}</div>`;
        });
        html += '</div>';
        
        // Comparison rows
        const criteria = [
            { key: 'location', label: 'Location' },
            { key: 'founded', label: 'Founded' },
            { key: 'students', label: 'Total Students' },
            { key: 'international', label: 'International Students' },
            { key: 'ranking', label: 'World Ranking', subkey: 'world' },
            { key: 'fees', label: 'Annual Fees', subkey: 'total' }
        ];
        
        criteria.forEach(criterion => {
            html += '<div class="comparison-row">';
            html += `<div class="comparison-cell">${criterion.label}</div>`;
            this.selectedUniversities.forEach(id => {
                const uni = this.universities[id];
                let value = '';
                
                if (criterion.key === 'ranking') {
                    value = `#${uni.ranking[criterion.subkey]}`;
                } else if (criterion.key === 'fees') {
                    value = `$${uni.admission.fees[criterion.subkey].toLocaleString()}`;
                } else {
                    value = uni[criterion.key];
                }
                
                html += `<div class="comparison-cell">${value}</div>`;
            });
            html += '</div>';
        });
        
        html += '</div>';
        return html;
    }

    // 3D Tour System
    init3DTour(universityId) {
        const container = document.getElementById('tourContainer');
        if (!container) return;

        // Initialize Three.js scene
        this.setup3DScene(container, universityId);
    }

    setup3DScene(container, universityId) {
        // Basic Three.js setup for 3D tour
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setClearColor(0x0a0a0a);
        container.appendChild(renderer.domElement);

        // Add basic 3D elements (simplified for demo)
        const geometry = new THREE.BoxGeometry(2, 2, 2);
        const material = new THREE.MeshBasicMaterial({ color: 0x00d4ff });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        camera.position.z = 5;

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            renderer.render(scene, camera);
        };
        animate();

        // Handle window resize
        window.addEventListener('resize', () => {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        });
    }

    // UI Updates
    updateUI() {
        const t = this.translations.pages;
        const lang = this.currentLanguage;
        const common = t.common[lang];

        // Update navigation links
        if (common) {
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                const href = link.getAttribute('href') || '';
                if (href.includes('index.html') || href === 'index.html') link.textContent = common.home;
                else if (href.includes('study-in-kazakhstan')) link.textContent = common.studyKz;
                // Removed study-abroad link
                else if (href.includes('dual-diploma')) link.textContent = 'Double Degree';
                else if (href.includes('edu-helper')) link.textContent = 'Edu Helper';
                else if (href.includes('pricing')) link.textContent = common.pricing;
                else if (href.includes('contact')) link.textContent = common.contact;
                else if (link.id === 'profileBtn') link.textContent = common.profile;
                else if (link.id === 'loginBtn') link.textContent = common.login;
                else if (link.id === 'logoutBtn') link.textContent = common.logout;
            });
        }

        // Translate footer
        this.translateFooter();

        // Translate login modal
        this.translateLoginModal();

        // Detect current page and translate accordingly
        const path = window.location.pathname;
        if (path.includes('index.html') || path.endsWith('/') || path === '') {
            this.translateIndexPage();
        } else if (path.includes('contact')) {
            this.translateContactPage();
        } else if (path.includes('pricing')) {
            this.translatePricingPage();
        } else if (path.includes('study-in-kazakhstan')) {
            this.translateStudyKzPage();
        } else if (path.includes('dual-diploma')) {
            this.translateDualDiplomaPage();
        } else if (path.includes('compare')) {
            this.translateComparePage();
        } else if (path.includes('profile')) {
            this.translateProfilePage();
        } else if (path.includes('edu-helper')) {
            this.translateEduHelperPage();
        }

        this.updateProfileUI();
    }

    // Footer translation
    translateFooter() {
        const t = this.translations.pages.common[this.currentLanguage];
        if (!t) return;

        const footerSections = document.querySelectorAll('.footer-section');
        footerSections.forEach((section, index) => {
            const h4 = section.querySelector('h4');
            if (index === 0 && h4) {
                // About section - keep brand name
                const p = section.querySelector('p');
                if (p) p.textContent = t.footerAbout;
            } else if (index === 1 && h4) {
                h4.textContent = t.quickLinks;
            } else if (index === 2 && h4) {
                h4.textContent = t.resources;
                const links = section.querySelectorAll('a');
                if (links[0]) links[0].textContent = t.appGuide;
                if (links[1]) links[1].textContent = t.scholarshipDb;
                if (links[2]) links[2].textContent = t.studentBlog;
                if (links[3]) links[3].textContent = t.faq;
            } else if (index === 3 && h4) {
                h4.textContent = t.contactUs;
            }
        });

        const copyright = document.querySelector('.footer-bottom p');
        if (copyright) copyright.textContent = t.copyright;
    }

    // Login modal translation
    translateLoginModal() {
        const t = this.translations.pages.loginModal[this.currentLanguage];
        if (!t) return;

        const modal = document.getElementById('loginModal');
        if (!modal) return;

        const title = modal.querySelector('.modal-header h2');
        const subtitle = modal.querySelector('.modal-header p');
        const labels = modal.querySelectorAll('.form-label');
        const inputs = modal.querySelectorAll('.form-input');
        const loginBtn = modal.querySelector('.btn-primary');
        const footer = modal.querySelector('.modal-footer');

        if (title) title.textContent = t.title;
        if (subtitle) subtitle.textContent = t.subtitle;
        if (labels[0]) labels[0].textContent = t.emailLabel;
        if (labels[1]) labels[1].textContent = t.passwordLabel;
        if (inputs[0]) inputs[0].placeholder = t.emailPlaceholder;
        if (inputs[1]) inputs[1].placeholder = t.passwordPlaceholder;
        if (loginBtn) loginBtn.textContent = t.loginBtn;
        if (footer) footer.innerHTML = t.noAccount + ' <a href="#">' + t.signUp + '</a>';
    }

    // Index page translation
    translateIndexPage() {
        const t = this.translations.pages.index[this.currentLanguage];
        if (!t) return;

        // Hero section
        const badge = document.querySelector('.hero-badge');
        if (badge) badge.innerHTML = '<i class="fas fa-graduation-cap"></i> &nbsp;' + t.badge;

        const title = document.querySelector('.hero-title');
        if (title) title.innerHTML = t.heroTitle1 + ' <span class="highlight">' + t.heroTitle2 + '</span> ' + t.heroTitle3;

        const desc = document.querySelector('.hero-description');
        if (desc) desc.textContent = t.heroDesc;

        const heroButtons = document.querySelectorAll('.hero-buttons .btn');
        if (heroButtons.length >= 2) {
            heroButtons[0].innerHTML = '<i class="fas fa-search"></i> ' + t.exploreBtn;
            heroButtons[1].innerHTML = '<i class="fas fa-comments"></i> ' + t.consultBtn;
        }

        const statLabels = document.querySelectorAll('.hero-stat-label');
        if (statLabels.length >= 3) {
            statLabels[0].textContent = t.stat1;
            statLabels[1].textContent = t.stat2;
            statLabels[2].textContent = t.stat3;
        }

        // Floating cards
        const cardStrongs = document.querySelectorAll('.hero-card-text strong');
        const cardSpans = document.querySelectorAll('.hero-card-text span');
        if (cardStrongs[0]) cardStrongs[0].textContent = t.trustedGuidance;
        if (cardSpans[0]) cardSpans[0].textContent = t.expertCounselors;
        if (cardStrongs[1]) cardStrongs[1].textContent = t.successRate;
        if (cardSpans[1]) cardSpans[1].textContent = t.admissionResults;

        // Section titles
        const sectionTitles = document.querySelectorAll('.section-title');
        sectionTitles.forEach((section, index) => {
            const h2 = section.querySelector('h2');
            const p = section.querySelector('p');
            if (index === 0) {
                if (h2) h2.textContent = t.whyChoose;
                if (p) p.textContent = t.whyChooseDesc;
            } else if (index === 1) {
                if (h2) h2.textContent = t.featuredUni;
                if (p) p.textContent = t.featuredUniDesc;
            } else if (index === 2) {
                if (h2) h2.textContent = t.testimonials;
                if (p) p.textContent = t.testimonialsDesc;
            }
        });

        // Feature cards
        const featureCards = document.querySelectorAll('.feature-card');
        const featureKeys = ['feature1', 'feature2', 'feature3', 'feature4', 'feature5', 'feature6'];
        featureCards.forEach((card, index) => {
            const h3 = card.querySelector('h3');
            const p = card.querySelector('p');
            if (h3 && t[featureKeys[index] + 'Title']) h3.textContent = t[featureKeys[index] + 'Title'];
            if (p && t[featureKeys[index] + 'Desc']) p.textContent = t[featureKeys[index] + 'Desc'];
        });

        // University card buttons
        document.querySelectorAll('.university-actions .btn-primary').forEach(btn => {
            btn.textContent = this.translations.pages.common[this.currentLanguage].viewDetails;
        });
        document.querySelectorAll('.university-actions .btn-secondary').forEach(btn => {
            btn.innerHTML = '<i class="fas fa-plus"></i> ' + this.translations.pages.common[this.currentLanguage].compare;
        });

        // University stat labels
        document.querySelectorAll('.uni-stat-label').forEach(label => {
            const text = label.textContent.trim().toLowerCase();
            if (text.includes('student')) label.textContent = this.translations.pages.common[this.currentLanguage].students;
            else if (text.includes('rank')) label.textContent = this.translations.pages.common[this.currentLanguage].worldRank;
            else if (text.includes('international')) label.textContent = this.translations.pages.common[this.currentLanguage].international;
            else if (text.includes('founded')) label.textContent = this.translations.pages.common[this.currentLanguage].founded;
        });

        // View All button
        const viewAllBtn = document.querySelector('.universities-section .text-center .btn');
        if (viewAllBtn) viewAllBtn.innerHTML = t.viewAll + ' <i class="fas fa-arrow-right"></i>';

        // Testimonials
        const testimonialTexts = document.querySelectorAll('.testimonial-text');
        const testimonialAuthors = document.querySelectorAll('.testimonial-author-info strong');
        const testimonialRoles = document.querySelectorAll('.testimonial-author-info span');
        if (testimonialTexts[0]) testimonialTexts[0].textContent = t.testimonial1;
        if (testimonialTexts[1]) testimonialTexts[1].textContent = t.testimonial2;
        if (testimonialTexts[2]) testimonialTexts[2].textContent = t.testimonial3;
        if (testimonialAuthors[0]) testimonialAuthors[0].textContent = t.testimonial1Author;
        if (testimonialAuthors[1]) testimonialAuthors[1].textContent = t.testimonial2Author;
        if (testimonialAuthors[2]) testimonialAuthors[2].textContent = t.testimonial3Author;
        if (testimonialRoles[0]) testimonialRoles[0].textContent = t.testimonial1Role;
        if (testimonialRoles[1]) testimonialRoles[1].textContent = t.testimonial2Role;
        if (testimonialRoles[2]) testimonialRoles[2].textContent = t.testimonial3Role;

        // CTA section
        const ctaSection = document.querySelector('.cta-section');
        if (ctaSection) {
            const h2 = ctaSection.querySelector('h2');
            const p = ctaSection.querySelector('p');
            if (h2) h2.textContent = t.ctaTitle;
            if (p) p.textContent = t.ctaDesc;
            const buttons = ctaSection.querySelectorAll('.btn');
            if (buttons.length >= 2) {
                buttons[0].innerHTML = '<i class="fas fa-calendar-alt"></i> ' + t.ctaBtn1;
                buttons[1].textContent = t.ctaBtn2;
            }
        }

        // Edu Helper AI CTA Section
        const aiCtaSection = document.querySelector('.ai-cta-section');
        if (aiCtaSection && t.eduHelperTitle) {
            const aiTitle = aiCtaSection.querySelector('h2[data-i18n="index.eduHelperTitle"]');
            const aiDesc = aiCtaSection.querySelector('p[data-i18n="index.eduHelperDesc"]');
            const aiFeatures = aiCtaSection.querySelectorAll('.ai-feature span');
            const aiBtn = aiCtaSection.querySelector('.btn[data-i18n="index.tryEduHelper"]');

            if (aiTitle) aiTitle.innerHTML = t.eduHelperTitle;
            if (aiDesc) aiDesc.textContent = t.eduHelperDesc;
            if (aiFeatures[0]) aiFeatures[0].textContent = t.aiFeature1;
            if (aiFeatures[1]) aiFeatures[1].textContent = t.aiFeature2;
            if (aiFeatures[2]) aiFeatures[2].textContent = t.aiFeature3;
            if (aiFeatures[3]) aiFeatures[3].textContent = t.aiFeature4;
            if (aiBtn) aiBtn.innerHTML = '<i class="fas fa-robot"></i> ' + t.tryEduHelper;
        }

        // Footer translations
        this.translateFooter();
    }

    // Footer translation (shared across pages)
    translateFooter() {
        const c = this.translations.pages.common[this.currentLanguage];
        if (!c) return;

        document.querySelectorAll('[data-i18n^="footer."]').forEach(el => {
            const key = el.getAttribute('data-i18n').replace('footer.', '');
            if (c[key]) {
                el.textContent = c[key];
            }
        });
    }

    // Contact page translation
    translateContactPage() {
        const t = this.translations.pages.contact[this.currentLanguage];
        if (!t) return;

        // Translate all elements with data-i18n starting with "contact."
        document.querySelectorAll('[data-i18n^="contact."]').forEach(el => {
            const key = el.getAttribute('data-i18n').replace('contact.', '');
            if (t[key]) {
                if (el.classList.contains('page-title')) {
                    el.innerHTML = t[key];
                } else if (el.tagName === 'OPTION') {
                    el.textContent = t[key];
                } else {
                    el.textContent = t[key];
                }
            }
        });

        // Fallback for page elements without data-i18n
        const pageTitle = document.querySelector('.page-title:not([data-i18n])');
        const pageSubtitle = document.querySelector('.page-subtitle:not([data-i18n])');
        if (pageTitle) pageTitle.innerHTML = t.pageTitle;
        if (pageSubtitle) pageSubtitle.textContent = t.pageSubtitle;

        // Form placeholders
        const messageTextarea = document.getElementById('message');
        if (messageTextarea && t.messagePlaceholder) {
            messageTextarea.placeholder = t.messagePlaceholder;
        }

        // CTA Section
        const ctaTitle = document.querySelector('.cta-section h2[data-i18n="contact.ctaTitle"]');
        const ctaDesc = document.querySelector('.cta-section p[data-i18n="contact.ctaDesc"]');
        const ctaBtn = document.querySelector('.cta-section a[data-i18n="contact.ctaBtn"]');
        if (ctaTitle && t.ctaTitle) ctaTitle.textContent = t.ctaTitle;
        if (ctaDesc && t.ctaDesc) ctaDesc.textContent = t.ctaDesc;
        if (ctaBtn && t.ctaBtn) ctaBtn.innerHTML = '<i class="fas fa-calendar-alt"></i> ' + t.ctaBtn;

        // Footer translations
        this.translateFooter();
    }

    // Pricing page translation
    translatePricingPage() {
        const t = this.translations.pages.pricing[this.currentLanguage];
        if (!t) return;

        // Translate all elements with data-i18n starting with "pricing."
        document.querySelectorAll('[data-i18n^="pricing."]').forEach(el => {
            const key = el.getAttribute('data-i18n').replace('pricing.', '');
            if (t[key]) {
                if (el.classList.contains('page-title')) {
                    el.innerHTML = t[key];
                } else {
                    el.textContent = t[key];
                }
            }
        });

        // Fallback for elements without data-i18n
        const pageTitle = document.querySelector('.page-title:not([data-i18n])');
        const pageSubtitle = document.querySelector('.page-subtitle:not([data-i18n])');
        if (pageTitle) pageTitle.innerHTML = t.pageTitle;
        if (pageSubtitle) pageSubtitle.textContent = t.pageSubtitle;

        const toggleBtns = document.querySelectorAll('.toggle-btn:not([data-i18n])');
        if (toggleBtns[0]) toggleBtns[0].textContent = t.forStudents;
        if (toggleBtns[1]) toggleBtns[1].textContent = t.forConsultants || t.forBusiness;

        // Pricing cards - translate plan names and descriptions
        const pricingCards = {
            en: [
                { 
                    name: 'Free', 
                    desc: 'Get started with basic features', 
                    btn: 'Get Started Free',
                    features: [
                        'Basic university database access',
                        'Compare up to 2 universities',
                        'Basic search and filters',
                        'Community forum access'
                    ],
                    unavailable: [
                        'Personalized recommendations',
                        'Application tracking',
                        'Expert consultation'
                    ]
                },
                { 
                    name: 'Premium', 
                    desc: 'Everything you need for a successful application', 
                    btn: 'Start 14-Day Free Trial',
                    badge: 'Most Popular',
                    features: [
                        'Full university database access',
                        'Compare up to 10 universities',
                        'Personalized recommendations',
                        'Application tracking dashboard',
                        'Document checklist tools',
                        'Email support (24h response)'
                    ],
                    unavailable: [
                        '1-on-1 expert consultation'
                    ]
                },
                { 
                    name: 'Complete', 
                    desc: 'Full support from experts every step of the way', 
                    btn: 'Contact Us',
                    features: [
                        'Everything in Premium',
                        'Unlimited university comparisons',
                        '2 hours of expert consultation/mo',
                        'Essay review service',
                        'Scholarship matching',
                        'Interview preparation',
                        'Priority phone support'
                    ],
                    unavailable: []
                }
            ],
            ru: [
                { 
                    name: 'Бесплатно', 
                    desc: 'Начните с базовых функций', 
                    btn: 'Начать бесплатно',
                    features: [
                        'Базовый доступ к базе университетов',
                        'Сравнение до 2 университетов',
                        'Базовый поиск и фильтры',
                        'Доступ к форуму сообщества'
                    ],
                    unavailable: [
                        'Персонализированные рекомендации',
                        'Отслеживание заявок',
                        'Консультация экспертов'
                    ]
                },
                { 
                    name: 'Премиум', 
                    desc: 'Все необходимое для успешной заявки', 
                    btn: 'Начать 14-дневный пробный период',
                    badge: 'Самый популярный',
                    features: [
                        'Полный доступ к базе университетов',
                        'Сравнение до 10 университетов',
                        'Персонализированные рекомендации',
                        'Панель отслеживания заявок',
                        'Инструменты чек-листа документов',
                        'Поддержка по email (ответ в течение 24ч)'
                    ],
                    unavailable: [
                        'Индивидуальная консультация эксперта'
                    ]
                },
                { 
                    name: 'Полный', 
                    desc: 'Полная поддержка экспертов на каждом этапе', 
                    btn: 'Связаться с нами',
                    features: [
                        'Все из Премиум',
                        'Неограниченное сравнение университетов',
                        '2 часа консультации эксперта/мес',
                        'Редактирование эссе',
                        'Подбор стипендий',
                        'Подготовка к собеседованию',
                        'Приоритетная телефонная поддержка'
                    ],
                    unavailable: []
                }
            ],
            kz: [
                { 
                    name: 'Тегін', 
                    desc: 'Негізгі мүмкіндіктерден бастаңыз', 
                    btn: 'Тегін бастау',
                    features: [
                        'Университеттер базасына негізгі қолжетімділік',
                        '2 университетке дейін салыстыру',
                        'Негізгі іздеу және сүзгілер',
                        'Қауымдастық форумына қолжетімділік'
                    ],
                    unavailable: [
                        'Жекеленген ұсыныстар',
                        'Өтініштерді бақылау',
                        'Эксперт кеңесі'
                    ]
                },
                { 
                    name: 'Премиум', 
                    desc: 'Сәтті өтініш үшін қажет барлығы', 
                    btn: '14 күндік тегін сынақты бастау',
                    badge: 'Ең танымал',
                    features: [
                        'Университеттер базасына толық қолжетімділік',
                        '10 университетке дейін салыстыру',
                        'Жекеленген ұсыныстар',
                        'Өтініштерді бақылау панелі',
                        'Құжаттар чек-листінің құралдары',
                        'Email қолдау (24 сағат ішінде жауап)'
                    ],
                    unavailable: [
                        'Эксперттің жеке кеңесі'
                    ]
                },
                { 
                    name: 'Толық', 
                    desc: 'Әр қадамда эксперттердің толық қолдауы', 
                    btn: 'Бізбен байланысу',
                    features: [
                        'Премиумдағы барлығы',
                        'Шексіз университеттерді салыстыру',
                        '2 сағат эксперт кеңесі/ай',
                        'Эссе қарау қызметі',
                        'Стипендияларды сәйкестендіру',
                        'Сұхбатқа дайындық',
                        'Басымдық телефондық қолдау'
                    ],
                    unavailable: []
                }
            ]
        };

        const cards = document.querySelectorAll('.pricing-card');
        const cardData = pricingCards[this.currentLanguage] || pricingCards.en;
        cards.forEach((card, index) => {
            if (cardData[index]) {
                const name = card.querySelector('.plan-name');
                const desc = card.querySelector('.plan-description');
                const btn = card.querySelector('.cta-button');
                const badge = card.querySelector('.popular-badge');
                
                if (name) name.textContent = cardData[index].name;
                if (desc) desc.textContent = cardData[index].desc;
                if (btn) btn.textContent = cardData[index].btn;
                if (badge && cardData[index].badge) badge.textContent = cardData[index].badge;
                
                // Translate features list
                const featureList = card.querySelectorAll('.plan-features li');
                if (featureList.length > 0 && cardData[index].features) {
                    let availableIndex = 0;
                    let unavailableIndex = 0;
                    
                    featureList.forEach((li) => {
                        if (li.classList.contains('unavailable')) {
                            // Unavailable feature
                            if (unavailableIndex < cardData[index].unavailable.length) {
                                const icon = li.querySelector('i');
                                li.innerHTML = (icon ? icon.outerHTML + ' ' : '<i class="fas fa-times"></i> ') + cardData[index].unavailable[unavailableIndex];
                                unavailableIndex++;
                            }
                        } else {
                            // Available feature
                            if (availableIndex < cardData[index].features.length) {
                                const icon = li.querySelector('i');
                                li.innerHTML = (icon ? icon.outerHTML + ' ' : '<i class="fas fa-check"></i> ') + cardData[index].features[availableIndex];
                                availableIndex++;
                            }
                        }
                    });
                }
            }
        });

        // Popular badge
        const popularBadge = document.querySelector('.popular-badge');
        if (popularBadge) popularBadge.textContent = t.popular;

        // Price period
        document.querySelectorAll('.price-period').forEach(el => {
            el.textContent = t.perMonth;
        });

        // Feature list translations
        const featureTranslations = {
            en: {
                'University database access': 'University database access',
                'Basic comparison tools': 'Basic comparison tools',
                'Save up to 5 universities': 'Save up to 5 universities',
                'Email support': 'Email support',
                'Unlimited university saves': 'Unlimited university saves',
                'Advanced comparison': 'Advanced comparison',
                'Application tracking': 'Application tracking',
                'Priority support': 'Priority support',
                'Personalized recommendations': 'Personalized recommendations',
                'Document review': 'Document review',
                'Custom integrations': 'Custom integrations',
                'Dedicated account manager': 'Dedicated account manager',
                'Bulk student management': 'Bulk student management',
                'Analytics dashboard': 'Analytics dashboard',
                'API access': 'API access',
                'Custom training': 'Custom training'
            },
            ru: {
                'University database access': 'Доступ к базе университетов',
                'Basic comparison tools': 'Базовые инструменты сравнения',
                'Save up to 5 universities': 'Сохранение до 5 университетов',
                'Email support': 'Поддержка по email',
                'Unlimited university saves': 'Безлимитное сохранение',
                'Advanced comparison': 'Расширенное сравнение',
                'Application tracking': 'Отслеживание заявок',
                'Priority support': 'Приоритетная поддержка',
                'Personalized recommendations': 'Персональные рекомендации',
                'Document review': 'Проверка документов',
                'Custom integrations': 'Индивидуальные интеграции',
                'Dedicated account manager': 'Персональный менеджер',
                'Bulk student management': 'Управление студентами',
                'Analytics dashboard': 'Панель аналитики',
                'API access': 'Доступ к API',
                'Custom training': 'Индивидуальное обучение'
            },
            kz: {
                'University database access': 'Университеттер базасына қол жетімділік',
                'Basic comparison tools': 'Негізгі салыстыру құралдары',
                'Save up to 5 universities': '5 университетке дейін сақтау',
                'Email support': 'Email арқылы қолдау',
                'Unlimited university saves': 'Шексіз сақтау',
                'Advanced comparison': 'Кеңейтілген салыстыру',
                'Application tracking': 'Өтінімдерді қадағалау',
                'Priority support': 'Басым қолдау',
                'Personalized recommendations': 'Жеке ұсыныстар',
                'Document review': 'Құжаттарды тексеру',
                'Custom integrations': 'Жеке интеграциялар',
                'Dedicated account manager': 'Жеке менеджер',
                'Bulk student management': 'Студенттерді басқару',
                'Analytics dashboard': 'Аналитика панелі',
                'API access': 'API қол жетімділігі',
                'Custom training': 'Жеке оқыту'
            }
        };

        const features = featureTranslations[this.currentLanguage] || featureTranslations.en;
        document.querySelectorAll('.plan-features li').forEach(li => {
            const text = li.textContent.trim();
            if (features[text]) {
                li.textContent = features[text];
            }
        });

        const compTitle = document.querySelector('.comparison-title');
        if (compTitle) compTitle.textContent = t.compareTitle;

        const faqTitle = document.querySelector('.faq-title');
        if (faqTitle) faqTitle.textContent = t.faqTitle;

        // Footer translations
        this.translateFooter();
    }

    // Study in Kazakhstan page translation
    translateStudyKzPage() {
        const t = this.translations.pages.studyKz[this.currentLanguage];
        const common = this.translations.pages.common[this.currentLanguage];
        if (!t) return;

        const pageTitle = document.querySelector('.page-title');
        const pageSubtitle = document.querySelector('.page-subtitle');
        if (pageTitle) pageTitle.textContent = t.pageTitle;
        if (pageSubtitle) pageSubtitle.textContent = t.pageSubtitle;

        // Main tab buttons (university names)
        const uniNames = this.universities;
        document.querySelectorAll('.tab-btn').forEach(btn => {
            const tabId = btn.dataset.tab;
            if (tabId && uniNames[tabId]) {
                btn.textContent = uniNames[tabId].name[this.currentLanguage];
            }
        });

        // University headers - names
        document.querySelectorAll('.university-header h2').forEach((h2, index) => {
            const keys = ['kaznu', 'nazarbayev', 'kaznmu'];
            if (keys[index] && uniNames[keys[index]]) {
                h2.textContent = uniNames[keys[index]].name[this.currentLanguage];
            }
        });

        // Sub tab buttons
        document.querySelectorAll('.sub-tab-btn').forEach(btn => {
            const subtab = btn.dataset.subtab || '';
            if (subtab.includes('about')) btn.textContent = t.aboutTab;
            else if (subtab.includes('programs')) btn.textContent = t.programsTab;
            else if (subtab.includes('admission')) btn.textContent = t.admissionTab;
            else if (subtab.includes('tour')) btn.textContent = t.tourTab;
        });

        // Stat labels in university cards
        document.querySelectorAll('.stat-label').forEach(label => {
            const text = label.textContent.toLowerCase();
            if (text.includes('student')) label.textContent = common.students;
            else if (text.includes('rank')) label.textContent = common.worldRank;
            else if (text.includes('international')) label.textContent = common.international;
            else if (text.includes('founded')) label.textContent = common.founded;
        });

        // Section headers inside tabs - use data-i18n if available
        document.querySelectorAll('.sub-tab-content h3[data-i18n]').forEach(h3 => {
            const key = h3.getAttribute('data-i18n');
            if (key && t[key]) h3.textContent = t[key];
        });
        
        // Translate paragraphs with data-i18n
        document.querySelectorAll('.sub-tab-content p[data-i18n]').forEach(p => {
            const key = p.getAttribute('data-i18n');
            if (key && t[key]) p.textContent = t[key];
        });
        
        // Fallback for headers without data-i18n
        document.querySelectorAll('.sub-tab-content h3:not([data-i18n])').forEach(h3 => {
            const text = h3.textContent.toLowerCase();
            if (text.includes('mission')) h3.textContent = t.missionVision || t.mission;
            else if (text.includes('history')) h3.textContent = t.historyAchievements || t.history;
            else if (text.includes('campus facilities')) h3.textContent = t.campusFacilities;
            else if (text.includes('student life')) h3.textContent = t.studentLife;
            else if (text.includes('international exchange')) h3.textContent = t.internationalExchange;
            else if (text.includes('available') || text.includes('program')) h3.textContent = t.availablePrograms;
            else if (text.includes('tuition') || text.includes('fees')) h3.textContent = t.tuitionFees;
            else if (text.includes('requirement')) h3.textContent = t.requirements;
        });

        // Program card labels
        document.querySelectorAll('.detail-label').forEach(label => {
            const text = label.textContent.toLowerCase();
            if (text.includes('degree')) label.textContent = t.degree;
            else if (text.includes('duration')) label.textContent = t.duration;
            else if (text.includes('language')) label.textContent = t.language;
        });

        // Fee labels
        const feeLabels = {
            en: { tuition: 'Tuition', accommodation: 'Accommodation', total: 'Total Annual Cost' },
            ru: { tuition: 'Обучение', accommodation: 'Проживание', total: 'Общая годовая стоимость' },
            kz: { tuition: 'Оқу ақысы', accommodation: 'Тұру', total: 'Жалпы жылдық құны' }
        };
        const fees = feeLabels[this.currentLanguage];
        document.querySelectorAll('.fee-item .fee-label, .fee-row .fee-label').forEach(label => {
            const text = label.textContent.toLowerCase();
            if (text.includes('tuition') || text.includes('обучение') || text.includes('оқу')) label.textContent = fees.tuition;
            else if (text.includes('accommodation') || text.includes('проживание') || text.includes('тұру')) label.textContent = fees.accommodation;
            else if (text.includes('total') || text.includes('общая') || text.includes('жалпы')) label.textContent = fees.total;
        });

        // Application deadline
        const deadlineLabels = { en: 'Application Deadline', ru: 'Крайний срок подачи', kz: 'Өтініш мерзімі' };
        document.querySelectorAll('.deadline-label, h4').forEach(el => {
            if (el.textContent.toLowerCase().includes('deadline') || el.textContent.includes('срок') || el.textContent.includes('мерзім')) {
                el.textContent = deadlineLabels[this.currentLanguage];
            }
        });

        // Virtual tour placeholder
        const tourPlaceholder = document.querySelector('.tour-placeholder p');
        if (tourPlaceholder) tourPlaceholder.textContent = t.tourPlaceholder;

        // Comparison section
        const compTitle = document.querySelector('.comparison-title');
        if (compTitle) compTitle.textContent = t.compareSection;

        // Comparison card labels
        document.querySelectorAll('.comparison-card h4').forEach(h4 => {
            const text = h4.textContent.toLowerCase();
            if (text.includes('student')) h4.textContent = t.students;
            else if (text.includes('int') && text.includes('student')) h4.textContent = t.intlStudents;
            else if (text.includes('rank')) h4.textContent = t.worldRanking;
            else if (text.includes('cost') || text.includes('annual')) h4.textContent = t.annualCost;
        });
    }

    // Study Abroad page translation
    translateStudyAbroadPage() {
        const t = this.translations.pages.studyAbroad[this.currentLanguage];
        if (!t) return;

        const pageTitle = document.querySelector('.page-title');
        const pageSubtitle = document.querySelector('.page-subtitle');
        if (pageTitle) pageTitle.textContent = t.pageTitle;
        if (pageSubtitle) pageSubtitle.textContent = t.pageSubtitle;

        // Search
        const searchInput = document.getElementById('searchInput');
        if (searchInput) searchInput.placeholder = t.searchPlaceholder;

        // Filter labels
        const filterLabels = document.querySelectorAll('.filter-label');
        filterLabels.forEach(label => {
            const text = label.textContent.toLowerCase();
            if (text.includes('region') || text.includes('регион') || text.includes('аймақ')) label.textContent = t.region;
            else if (text.includes('program') || text.includes('программ') || text.includes('бағдарлама')) label.textContent = t.programType;
            else if (text.includes('budget') || text.includes('бюджет')) label.textContent = t.budget;
        });

        // Filter select options
        const regionFilter = document.getElementById('regionFilter');
        if (regionFilter) {
            const options = regionFilter.querySelectorAll('option');
            if (options[0]) options[0].textContent = t.allRegions;
            options.forEach(opt => {
                const val = opt.value.toLowerCase();
                if (val === 'europe') opt.textContent = t.europe;
                else if (val === 'asia') opt.textContent = t.asia;
                else if (val === 'north-america') opt.textContent = t.northAmerica;
            });
        }

        const programFilter = document.getElementById('programFilter');
        if (programFilter) {
            const options = programFilter.querySelectorAll('option');
            if (options[0]) options[0].textContent = t.allPrograms;
            options.forEach(opt => {
                const val = opt.value.toLowerCase();
                if (val === 'undergraduate') opt.textContent = t.undergraduate;
                else if (val === 'graduate') opt.textContent = t.graduate;
            });
        }

        const budgetFilter = document.getElementById('budgetFilter');
        if (budgetFilter) {
            const options = budgetFilter.querySelectorAll('option');
            if (options[0]) options[0].textContent = t.allBudgets;
            options.forEach(opt => {
                const val = opt.value.toLowerCase();
                if (val === 'affordable') opt.textContent = t.affordable;
                else if (val === 'moderate') opt.textContent = t.moderate;
                else if (val === 'premium') opt.textContent = t.premium;
            });
        }

        // Results count
        const resultsCount = document.querySelector('.results-count');
        if (resultsCount) {
            const strong = resultsCount.querySelector('strong');
            if (strong) {
                const count = strong.textContent.match(/\d+/);
                if (count) strong.textContent = count[0] + ' ' + t.results;
            }
        }

        // Country card stat labels
        document.querySelectorAll('.stat-label').forEach(label => {
            const text = label.textContent.toLowerCase();
            if (text.includes('universities') || text.includes('университет')) label.textContent = t.topUniversities;
            else if (text.includes('tuition') || text.includes('стоимость') || text.includes('құны')) label.textContent = t.avgTuition;
            else if (text.includes('int') || text.includes('студент')) label.textContent = t.intlStudents;
        });

        // Country features translations
        const featureTranslations = {
            en: {
                'Free tuition': 'Free tuition',
                'English programs': 'English programs',
                'Work permits': 'Work permits',
                'Scholarships available': 'Scholarships available',
                'Top research': 'Top research',
                'Student visa': 'Student visa',
                'Post-study work': 'Post-study work',
                'Quality education': 'Quality education',
                'Affordable living': 'Affordable living',
                'EU degree': 'EU degree',
                'Cultural experience': 'Cultural experience',
                'Safe country': 'Safe country'
            },
            ru: {
                'Free tuition': 'Бесплатное обучение',
                'English programs': 'Программы на английском',
                'Work permits': 'Разрешение на работу',
                'Scholarships available': 'Доступны стипендии',
                'Top research': 'Ведущие исследования',
                'Student visa': 'Студенческая виза',
                'Post-study work': 'Работа после учебы',
                'Quality education': 'Качественное образование',
                'Affordable living': 'Доступное проживание',
                'EU degree': 'Диплом ЕС',
                'Cultural experience': 'Культурный опыт',
                'Safe country': 'Безопасная страна'
            },
            kz: {
                'Free tuition': 'Тегін оқу',
                'English programs': 'Ағылшын бағдарламалары',
                'Work permits': 'Жұмыс рұқсаты',
                'Scholarships available': 'Стипендиялар бар',
                'Top research': 'Үздік зерттеулер',
                'Student visa': 'Студенттік виза',
                'Post-study work': 'Оқудан кейін жұмыс',
                'Quality education': 'Сапалы білім',
                'Affordable living': 'Қолжетімді тұру',
                'EU degree': 'ЕО дипломы',
                'Cultural experience': 'Мәдени тәжірибе',
                'Safe country': 'Қауіпсіз ел'
            }
        };

        const features = featureTranslations[this.currentLanguage];
        document.querySelectorAll('.country-features li').forEach(li => {
            const text = li.textContent.trim();
            if (features[text]) li.textContent = features[text];
        });

        // Popular destinations section
        const popularTitle = document.querySelector('.popular-section .section-title h2');
        if (popularTitle) popularTitle.textContent = t.popularDestinations;

        // Popular card titles and descriptions
        const popularCardData = {
            en: [
                { title: 'Scholarship Finder', desc: 'Discover funding opportunities for your studies abroad' },
                { title: 'Visa Guide', desc: 'Step-by-step visa application assistance' },
                { title: 'Cost Calculator', desc: 'Estimate your total study abroad expenses' },
                { title: 'Student Reviews', desc: 'Read experiences from current students' }
            ],
            ru: [
                { title: 'Поиск стипендий', desc: 'Найдите возможности финансирования для учебы за рубежом' },
                { title: 'Гид по визам', desc: 'Пошаговая помощь с оформлением визы' },
                { title: 'Калькулятор расходов', desc: 'Рассчитайте общие расходы на учебу за рубежом' },
                { title: 'Отзывы студентов', desc: 'Читайте опыт текущих студентов' }
            ],
            kz: [
                { title: 'Стипендия іздеу', desc: 'Шетелде оқу үшін қаржыландыру мүмкіндіктерін табыңыз' },
                { title: 'Виза нұсқаулығы', desc: 'Визаны рәсімдеуге қадамдық көмек' },
                { title: 'Шығын калькуляторы', desc: 'Шетелде оқудың жалпы шығындарын есептеңіз' },
                { title: 'Студенттер пікірі', desc: 'Қазіргі студенттердің тәжірибесін оқыңыз' }
            ]
        };

        const popularCards = document.querySelectorAll('.popular-card');
        const cardData = popularCardData[this.currentLanguage];
        popularCards.forEach((card, index) => {
            if (cardData[index]) {
                const title = card.querySelector('.popular-title');
                const desc = card.querySelector('.popular-description');
                if (title) title.textContent = cardData[index].title;
                if (desc) desc.textContent = cardData[index].desc;
            }
        });

        // Guide section
        const guideTitle = document.querySelector('.guide-section .section-title h2');
        if (guideTitle) guideTitle.textContent = t.applicationGuide;

        const steps = document.querySelectorAll('.guide-step');
        const stepKeys = ['step1', 'step2', 'step3', 'step4'];
        steps.forEach((step, index) => {
            const title = step.querySelector('.step-title');
            const desc = step.querySelector('.step-description');
            if (title && t[stepKeys[index]]) title.textContent = t[stepKeys[index]];
            if (desc && t[stepKeys[index] + 'Desc']) desc.textContent = t[stepKeys[index] + 'Desc'];
        });
    }

    // Profile page translation
    translateProfilePage() {
        const t = this.translations.pages.profile[this.currentLanguage];
        if (!t) return;

        const pageTitle = document.querySelector('.profile-title');
        const pageSubtitle = document.querySelector('.profile-subtitle');
        if (pageTitle) pageTitle.textContent = t.pageTitle;
        if (pageSubtitle) pageSubtitle.textContent = t.pageSubtitle;

        // Login required section
        const loginTitle = document.querySelector('.login-title');
        const loginDesc = document.querySelector('.login-description');
        const loginBtn = document.querySelector('.login-btn');
        if (loginTitle) loginTitle.textContent = t.loginRequired;
        if (loginDesc) loginDesc.textContent = t.loginRequiredDesc;
        if (loginBtn) loginBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> ' + t.loginBtn;

        // Menu items
        const menuLinks = document.querySelectorAll('.profile-menu a');
        menuLinks.forEach(link => {
            const section = link.dataset.section;
            if (section === 'dashboard') link.innerHTML = '<i class="fas fa-th-large"></i> ' + t.dashboard;
            else if (section === 'saved') link.innerHTML = '<i class="fas fa-bookmark"></i> ' + t.savedUnis;
            else if (section === 'comparisons') link.innerHTML = '<i class="fas fa-balance-scale"></i> ' + t.comparisons;
            else if (section === 'applications') link.innerHTML = '<i class="fas fa-file-alt"></i> ' + t.applications;
            else if (section === 'settings') link.innerHTML = '<i class="fas fa-cog"></i> ' + t.settings;
        });
    }

    // Edu Helper page translation
    translateEduHelperPage() {
        const t = this.translations.pages.eduHelper[this.currentLanguage];
        if (!t) return;

        // Page header
        const pageTitle = document.querySelector('.page-title');
        const pageSubtitle = document.querySelector('.page-subtitle');
        if (pageTitle) pageTitle.innerHTML = 'Edu <span class="page-title-accent">Helper</span>';
        if (pageSubtitle) pageSubtitle.textContent = t.pageSubtitle;

        // Profile panel
        const profilePanelTitle = document.querySelector('.profile-panel h2');
        const profilePanelSubtitle = document.querySelector('.profile-panel .subtitle');
        if (profilePanelTitle) profilePanelTitle.innerHTML = '<i class="fas fa-user-graduate" style="color: var(--accent-gold); margin-right: 0.5rem;"></i> ' + t.yourProfile;
        if (profilePanelSubtitle) profilePanelSubtitle.textContent = t.profileSubtitle;

        // Input section headers
        const inputSections = document.querySelectorAll('.input-section h3');
        if (inputSections[0]) inputSections[0].innerHTML = '<i class="fas fa-chart-bar" style="margin-right: 0.5rem;"></i> ' + t.testScores;
        if (inputSections[1]) inputSections[1].innerHTML = '<i class="fas fa-heart" style="margin-right: 0.5rem;"></i> ' + t.interests;
        if (inputSections[2]) inputSections[2].innerHTML = '<i class="fas fa-globe" style="margin-right: 0.5rem;"></i> ' + t.studyPreferences;

        // Generate button
        const generateBtn = document.querySelector('.profile-panel .btn-primary');
        if (generateBtn) generateBtn.innerHTML = '<i class="fas fa-magic"></i> ' + t.generateBtn;

        // Chat header
        const chatTitle = document.querySelector('.chat-header-info h2');
        const chatSubtitle = document.querySelector('.chat-header-info p');
        const onlineBadge = document.querySelector('.online-badge');
        if (chatTitle) chatTitle.textContent = t.aiTitle;
        if (chatSubtitle) chatSubtitle.textContent = t.aiSubtitle;
        if (onlineBadge) onlineBadge.textContent = t.online;

        // Quick questions label
        const quickQLabel = document.querySelector('.quick-questions p');
        if (quickQLabel) quickQLabel.textContent = t.quickQuestions;

        // Chat input placeholder
        const chatInput = document.getElementById('userInput');
        if (chatInput) chatInput.placeholder = t.inputPlaceholder;

        // Features section
        const featuresTitle = document.querySelector('.features-section .section-title h2');
        const featuresSubtitle = document.querySelector('.features-section .section-title p');
        if (featuresTitle) featuresTitle.textContent = t.howItWorks;
        if (featuresSubtitle) featuresSubtitle.textContent = t.howItWorksSubtitle;

        // Feature items
        const featureItems = document.querySelectorAll('.feature-item');
        const featureKeys = ['step1', 'step2', 'step3', 'step4'];
        featureItems.forEach((item, index) => {
            const h3 = item.querySelector('h3');
            const p = item.querySelector('p');
            if (h3 && t[featureKeys[index]]) h3.textContent = t[featureKeys[index]];
            if (p && t[featureKeys[index] + 'Desc']) p.textContent = t[featureKeys[index] + 'Desc'];
        });

        // Footer translations
        this.translateFooter();
    }

    // 1+1 Dual Diploma page translation
    translateDualDiplomaPage() {
        const t = this.translations.pages.dualDiploma[this.currentLanguage];
        if (!t) return;

        // Hero section - use data-i18n if available
        document.querySelectorAll('[data-i18n^="dual."]').forEach(el => {
            const key = el.getAttribute('data-i18n').replace('dual.', '');
            if (t[key]) {
                if (el.tagName === 'H1' && key === 'heroTitle') {
                    el.innerHTML = t[key].replace('1+1', '<span>1+1</span>');
                } else {
                    el.textContent = t[key];
                }
            }
        });

        // Hero section fallback
        const heroTitle = document.querySelector('.dual-hero-content h1');
        const heroSubtitle = document.querySelector('.dual-hero-content p[data-i18n="dual.heroSubtitle"]');
        const heroDesc = document.querySelector('.dual-hero-content p:not([data-i18n])');
        
        if (heroTitle && !heroTitle.hasAttribute('data-i18n')) {
            heroTitle.innerHTML = t.heroTitle.replace('1+1', '<span>1+1</span>');
        }
        if (heroSubtitle && t.heroSubtitle) {
            heroSubtitle.textContent = t.heroSubtitle;
        }
        if (heroDesc && !heroDesc.hasAttribute('data-i18n') && t.heroDesc) {
            heroDesc.textContent = t.heroDesc;
        }

        // Hero badges
        const heroBadges = document.querySelectorAll('.hero-badge');
        if (heroBadges[0] && t.badge1) heroBadges[0].innerHTML = '<i class="fas fa-graduation-cap"></i> <span>' + t.badge1 + '</span>';
        if (heroBadges[1] && t.badge2) heroBadges[1].innerHTML = '<i class="fas fa-globe"></i> <span>' + t.badge2 + '</span>';
        if (heroBadges[2] && t.badge3) heroBadges[2].innerHTML = '<i class="fas fa-coins"></i> <span>' + t.badge3 + '</span>';

        // How it works section
        const howTitle = document.querySelector('.how-it-works .section-header h2');
        const howSubtitle = document.querySelector('.how-it-works .section-header p');
        if (howTitle) howTitle.textContent = t.howTitle;
        if (howSubtitle) howSubtitle.textContent = t.howSubtitle;

        // Steps
        const steps = document.querySelectorAll('.step-item');
        const stepKeys = ['step1Title', 'step2Title', 'step3Title', 'step4Title'];
        const stepDescKeys = ['step1Desc', 'step2Desc', 'step3Desc', 'step4Desc'];
        steps.forEach((step, index) => {
            const h3 = step.querySelector('h3');
            const p = step.querySelector('p');
            if (h3 && t[stepKeys[index]]) h3.textContent = t[stepKeys[index]];
            if (p && t[stepDescKeys[index]]) p.textContent = t[stepDescKeys[index]];
        });

        // Programs section
        const programsTitle = document.querySelector('.programs-section .section-header h2');
        const programsSubtitle = document.querySelector('.programs-section .section-header p');
        if (programsTitle) programsTitle.textContent = t.programsTitle;
        if (programsSubtitle) programsSubtitle.textContent = t.programsSubtitle;

        // Program cards - translate badges and features
        document.querySelectorAll('.program-badge').forEach((badge, index) => {
            const badges = document.querySelectorAll('.program-badge');
            badges.forEach((b, i) => {
                const text = b.textContent.trim();
                if (text.includes('Popular') || text.includes('Популярно') || text.includes('Танымал')) {
                    b.innerHTML = '<i class="fas fa-star"></i> <span>' + t.popular + '</span>';
                } else if (text.includes('Premium') || text.includes('Премиум')) {
                    b.innerHTML = '<i class="fas fa-award"></i> <span>' + t.premium + '</span>';
                } else if (text.includes('Tech') || text.includes('Технологии') || text.includes('Технология')) {
                    b.innerHTML = '<i class="fas fa-laptop-code"></i> <span>' + t.tech + '</span>';
                } else if (text.includes('Engineering') || text.includes('Инженерия')) {
                    b.innerHTML = '<i class="fas fa-microchip"></i> <span>' + t.engineering + '</span>';
                } else if (text.includes('Industry') || text.includes('Промышленность') || text.includes('Өнеркәсіп')) {
                    b.innerHTML = '<i class="fas fa-industry"></i> <span>' + t.industry + '</span>';
                } else if (text.includes('Research') || text.includes('Исследования') || text.includes('Зерттеу')) {
                    b.innerHTML = '<i class="fas fa-flask"></i> <span>' + t.research + '</span>';
                }
            });
        });

        // Program features - translate by data-i18n or content matching
        document.querySelectorAll('.program-features li span[data-i18n]').forEach(span => {
            const key = span.getAttribute('data-i18n').replace('dual.', '');
            if (t[key]) {
                span.textContent = t[key];
            }
        });

        // Fallback: translate features by content matching
        document.querySelectorAll('.program-features li:not([data-i18n])').forEach(li => {
            const span = li.querySelector('span:not([data-i18n])');
            if (!span) return;
            const text = span.textContent.trim();
            const featKeys = ['feat1', 'feat2', 'feat3', 'feat4', 'feat5', 'feat6', 'feat7', 'feat8', 'feat9', 'feat10', 'feat11', 'feat12', 'feat13', 'feat14', 'feat15', 'feat16', 'feat17', 'feat18'];
            featKeys.forEach(key => {
                if (t[key] && this.matchFeature(text, t[key])) {
                    const icon = li.querySelector('i');
                    span.textContent = t[key];
                }
            });
        });

        // Translate country names in program stats
        document.querySelectorAll('.stat-label').forEach(label => {
            const text = label.textContent.trim();
            if (text === 'Poland' || text === 'Польша' || text === 'Польша') {
                label.textContent = t.countryPoland;
            } else if (text === 'UK' || text === 'Великобритания' || text === 'Ұлыбритания') {
                label.textContent = t.countryUK;
            } else if (text === 'Italy' || text === 'Италия' || text === 'Италия') {
                label.textContent = t.countryItaly;
            } else if (text === 'Germany' || text === 'Германия' || text === 'Германия') {
                label.textContent = t.countryGermany;
            } else if (text === 'Czech Republic' || text === 'Чехия' || text === 'Чехия') {
                label.textContent = t.countryCzech;
            } else if (text === 'South Korea' || text === 'Южная Корея' || text === 'Оңтүстік Корея') {
                label.textContent = t.countryKorea;
            }
        });

        // Stat labels - translate by data-i18n first
        document.querySelectorAll('.stat-label[data-i18n]').forEach(label => {
            const key = label.getAttribute('data-i18n').replace('dual.', '');
            if (t[key]) {
                label.textContent = t[key];
            }
        });

        // Stat labels - fallback translation
        document.querySelectorAll('.stat-label:not([data-i18n])').forEach(label => {
            const text = label.textContent.trim();
            if (text.includes('Year') || text.includes('Год') || text.includes('Жыл')) {
                label.textContent = t.years;
            } else if (text.includes('Per Year') || text.includes('В год') || text.includes('Жылына')) {
                label.textContent = t.perYear;
            } else if (text === 'Poland' || text === 'Польша') {
                label.textContent = t.countryPoland;
            } else if (text === 'UK' || text === 'Великобритания' || text === 'Ұлыбритания') {
                label.textContent = t.countryUK;
            } else if (text === 'Italy' || text === 'Италия') {
                label.textContent = t.countryItaly;
            } else if (text === 'Germany' || text === 'Германия') {
                label.textContent = t.countryGermany;
            } else if (text === 'Czech Republic' || text === 'Czechia' || text === 'Чехия') {
                label.textContent = t.countryCzech;
            } else if (text === 'South Korea' || text === 'S. Korea' || text === 'Южная Корея' || text === 'Оңтүстік Корея') {
                label.textContent = t.countryKorea;
            }
        });

        // Partners section
        const partnersTitle = document.querySelector('.partners-section .section-header h2');
        const partnersSubtitle = document.querySelector('.partners-section .section-header p');
        if (partnersTitle) partnersTitle.textContent = t.partnersTitle;
        if (partnersSubtitle) partnersSubtitle.textContent = t.partnersSubtitle;

        // CTA section
        const ctaTitle = document.querySelector('.cta-content h2');
        const ctaSubtitle = document.querySelector('.cta-content p');
        const ctaBtn1 = document.querySelector('.cta-buttons .btn-primary');
        const ctaBtn2 = document.querySelector('.cta-buttons .btn-ghost');
        if (ctaTitle) ctaTitle.textContent = t.ctaTitle;
        if (ctaSubtitle) ctaSubtitle.textContent = t.ctaSubtitle;
        if (ctaBtn1) ctaBtn1.textContent = t.ctaBtn1;
        if (ctaBtn2) ctaBtn2.textContent = t.ctaBtn2;

        // Footer translations
        this.translateFooter();
    }

    matchFeature(text, translation) {
        // Simple matching for feature translation
        const words = text.split(' ').slice(0, 3);
        const transWords = translation.split(' ').slice(0, 3);
        return words.some(w => transWords.some(tw => tw.toLowerCase().includes(w.toLowerCase())));
    }

    // Compare page translation
    translateComparePage() {
        const t = this.translations.pages.compare[this.currentLanguage];
        if (!t) return;

        // Page header
        document.querySelectorAll('[data-i18n^="compare."]').forEach(el => {
            const key = el.getAttribute('data-i18n').replace('compare.', '');
            if (t[key]) {
                if (el.tagName === 'H1' && key === 'title') {
                    el.innerHTML = t[key].replace('Compare', '<span>Compare</span>').replace('Сравнить', '<span>Сравнить</span>').replace('Салыстыру', '<span>Салыстыру</span>');
                } else {
                    el.textContent = t[key];
                }
            }
        });

        // Filter labels
        const filterLabels = document.querySelectorAll('.filter-label');
        const filterSelects = document.querySelectorAll('.filter-select option');
        
        if (filterLabels[0]) filterLabels[0].textContent = t.city;
        if (filterLabels[1]) filterLabels[1].textContent = t.type;
        if (filterLabels[2]) filterLabels[2].textContent = t.sortBy;

        // Filter options
        filterSelects.forEach(opt => {
            const val = opt.value || opt.textContent.trim();
            if (val === 'all' || val.includes('All')) {
                if (opt.parentElement.id === 'cityFilter') opt.textContent = t.allCities;
                else if (opt.parentElement.id === 'typeFilter') opt.textContent = t.allTypes;
            } else if (val === 'public' || val.includes('Public') || val.includes('Государственный') || val.includes('Мемлекеттік')) {
                opt.textContent = t.public;
            } else if (val === 'private' || val.includes('Private') || val.includes('Частный') || val.includes('Жеке')) {
                opt.textContent = t.private;
            } else if (val === 'ranking' || val.includes('Ranking') || val.includes('Рейтинг')) {
                opt.textContent = t.ranking;
            } else if (val.includes('Tuition') || val.includes('Стоимость') || val.includes('Оқу ақысы')) {
                opt.textContent = t.tuition;
            } else if (val.includes('Student') || val.includes('Студент')) {
                opt.textContent = t.students;
            }
        });

        // Buttons
        const clearBtn = document.getElementById('clearSelection');
        const compareBtn = document.getElementById('compareSelected');
        if (clearBtn) clearBtn.innerHTML = '<i class="fas fa-times"></i> <span>' + t.clear + '</span>';
        if (compareBtn) {
            const span = compareBtn.querySelector('span:not(.selected-count)');
            if (span) span.textContent = t.compareBtn;
        }

        // University card buttons
        document.querySelectorAll('.select-uni-btn').forEach(btn => {
            btn.textContent = t.select;
        });
        document.querySelectorAll('.uni-card-actions .btn-secondary').forEach(btn => {
            btn.textContent = t.viewDetails;
        });

        // Stat labels - translate by data-i18n first
        document.querySelectorAll('.uni-stat-label[data-i18n]').forEach(label => {
            const key = label.getAttribute('data-i18n');
            if (key && t[key.replace('compare.', '')]) {
                label.textContent = t[key.replace('compare.', '')];
            }
        });

        // Fallback for stat labels without data-i18n
        document.querySelectorAll('.uni-stat-label:not([data-i18n])').forEach(label => {
            const text = label.textContent.trim();
            if (text.includes('QS World') || text.includes('QS Мировой') || text.includes('QS Әлемдік')) {
                label.textContent = t.qsWorld;
            } else if (text.includes('Tuition') || text.includes('Стоимость') || text.includes('Оқу ақысы')) {
                label.textContent = t.tuitionLabel;
            } else if (text.includes('Student') || text.includes('Студент')) {
                label.textContent = t.studentsLabel;
            } else if (text.includes('Employment') || text.includes('Трудоустройство') || text.includes('Жұмысқа орналасу')) {
                label.textContent = t.employment;
            }
        });

        // Modal title
        const modalTitle = document.querySelector('.compare-modal-header h2');
        if (modalTitle) modalTitle.textContent = t.modalTitle;

        // Footer translations
        this.translateFooter();
    }

    updateProfileUI() {
        const profileBtn = document.getElementById('profileBtn');
        const loginBtn = document.getElementById('loginBtn');
        const logoutBtn = document.getElementById('logoutBtn');

        if (this.currentUser) {
            if (profileBtn) profileBtn.style.display = 'block';
            if (loginBtn) loginBtn.style.display = 'none';
            if (logoutBtn) logoutBtn.style.display = 'block';
        } else {
            if (profileBtn) profileBtn.style.display = 'none';
            if (loginBtn) loginBtn.style.display = 'block';
            if (logoutBtn) logoutBtn.style.display = 'none';
        }
    }

    // Event Listeners
    setupEventListeners() {
        // Login form
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const emailOrPhone = document.getElementById('emailOrPhone').value;
                const password = document.getElementById('password').value;
                this.login(emailOrPhone, password);
            });
        }

        // Logout button
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.logout();
            });
        }

        // Compare button
        const compareBtn = document.getElementById('compareBtn');
        if (compareBtn) {
            compareBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.showComparison();
            });
        }

        // Modal close
        const closeModal = document.querySelector('.close-modal');
        if (closeModal) {
            closeModal.addEventListener('click', () => {
                document.getElementById('comparisonModal').style.display = 'none';
            });
        }

        // University selection checkboxes
        document.querySelectorAll('.university-select').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                this.toggleUniversitySelection(e.target.dataset.universityId);
            });
        });
    }

    // Animation Initialization
    initializeAnimations() {
        // Initialize Anime.js animations
        if (typeof anime !== 'undefined') {
            // Hero text animation
            anime({
                targets: '.hero-title',
                opacity: [0, 1],
                translateY: [50, 0],
                duration: 1000,
                easing: 'easeOutExpo'
            });

            // Cards animation
            anime({
                targets: '.university-card',
                opacity: [0, 1],
                translateY: [30, 0],
                duration: 800,
                delay: anime.stagger(100),
                easing: 'easeOutExpo'
            });
        }

        // Initialize Typed.js for hero text
        if (typeof Typed !== 'undefined') {
            new Typed('#typed-text', {
                strings: [
                    'Find Your Perfect University',
                    'Discover World-Class Education',
                    'Build Your Future Today'
                ],
                typeSpeed: 50,
                backSpeed: 30,
                backDelay: 2000,
                loop: true
            });
        }
    }

    // Search Functionality
    searchUniversities(query) {
        const results = Object.entries(this.universities).filter(([id, uni]) => {
            return uni.name[this.currentLanguage].toLowerCase().includes(query.toLowerCase()) ||
                   uni.location.toLowerCase().includes(query.toLowerCase());
        });
        
        this.displaySearchResults(results);
    }

    displaySearchResults(results) {
        const container = document.getElementById('searchResults');
        if (!container) return;

        if (results.length === 0) {
            container.innerHTML = '<p class="no-results">No universities found</p>';
            return;
        }

        let html = '';
        results.forEach(([id, uni]) => {
            html += `
                <div class="search-result-item" data-university="${id}">
                    <img src="${uni.image}" alt="${uni.name[this.currentLanguage]}" class="result-image">
                    <div class="result-info">
                        <h3>${uni.name[this.currentLanguage]}</h3>
                        <p>${uni.location}</p>
                        <span class="ranking">#${uni.ranking.world} World Ranking</span>
                    </div>
                </div>
            `;
        });
        
        container.innerHTML = html;
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.assylDataHub = new AssylDataHub();
});

// Utility functions for UI interactions
function showLoginModal() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.style.display = 'block';
    }
}

function hideLoginModal() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}