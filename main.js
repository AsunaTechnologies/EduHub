// Assyl DataHub - Main JavaScript File
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
                        studyAbroad: 'Study Abroad',
                        pricing: 'Pricing',
                        contact: 'Contact',
                        profile: 'Profile',
                        login: 'Login',
                        logout: 'Logout',
                        // Footer
                        footerAbout: 'Empowering students and families to make informed decisions about higher education since 2025.',
                        quickLinks: 'Quick Links',
                        resources: 'Resources',
                        contactUs: 'Contact',
                        appGuide: 'Application Guide',
                        scholarshipDb: 'Scholarship Database',
                        studentBlog: 'Student Blog',
                        faq: 'FAQ',
                        copyright: '© 2025 Assyl DataHub. All rights reserved.',
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
                        studyAbroad: 'Учеба за рубежом',
                        pricing: 'Цены',
                        contact: 'Контакты',
                        profile: 'Профиль',
                        login: 'Войти',
                        logout: 'Выйти',
                        footerAbout: 'Помогаем студентам и семьям принимать обоснованные решения о высшем образовании с 2025 года.',
                        quickLinks: 'Быстрые ссылки',
                        resources: 'Ресурсы',
                        contactUs: 'Контакты',
                        appGuide: 'Руководство по поступлению',
                        scholarshipDb: 'База стипендий',
                        studentBlog: 'Блог студентов',
                        faq: 'Вопросы и ответы',
                        copyright: '© 2025 Assyl DataHub. Все права защищены.',
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
                        studyAbroad: 'Шетелде оқу',
                        pricing: 'Бағалар',
                        contact: 'Байланыс',
                        profile: 'Профиль',
                        login: 'Кіру',
                        logout: 'Шығу',
                        footerAbout: '2025 жылдан бері студенттер мен отбасыларға жоғары білім туралы негізделген шешім қабылдауға көмектесеміз.',
                        quickLinks: 'Жылдам сілтемелер',
                        resources: 'Ресурстар',
                        contactUs: 'Байланыс',
                        appGuide: 'Түсу нұсқаулығы',
                        scholarshipDb: 'Стипендия базасы',
                        studentBlog: 'Студенттер блогы',
                        faq: 'Сұрақ-жауап',
                        copyright: '© 2025 Assyl DataHub. Барлық құқықтар қорғалған.',
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
                        whyChoose: 'Why Choose Assyl DataHub?',
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
                        testimonial1: 'Assyl DataHub made the overwhelming process of choosing a university so much easier. The comparison tools helped us understand exactly what each school offered.',
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
                        ctaBtn2: 'View Our Services'
                    },
                    ru: {
                        badge: 'Ваше будущее начинается здесь',
                        heroTitle1: 'Найдите свой идеальный',
                        heroTitle2: 'Университет',
                        heroTitle3: 'Путь',
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
                        whyChoose: 'Почему выбирают Assyl DataHub?',
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
                        testimonial1: 'Assyl DataHub сделал сложный процесс выбора университета намного проще. Инструменты сравнения помогли нам понять, что предлагает каждый вуз.',
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
                        ctaBtn2: 'Наши услуги'
                    },
                    kz: {
                        badge: 'Сіздің болашағыңыз осы жерден басталады',
                        heroTitle1: 'Өзіңіздің керемет',
                        heroTitle2: 'Университет',
                        heroTitle3: 'Жолыңызды табыңыз',
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
                        whyChoose: 'Неге Assyl DataHub таңдайсыз?',
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
                        testimonial1: 'Assyl DataHub университетті таңдаудың күрделі процесін әлдеқайда жеңілдетті. Салыстыру құралдары әр мектептің не ұсынатынын түсінуге көмектесті.',
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
                        ctaBtn2: 'Біздің қызметтер'
                    }
                },
                // Contact page
                contact: {
                    en: {
                        pageTitle: 'Contact Us',
                        pageSubtitle: 'Have questions? We\'re here to help you on your educational journey.',
                        getInTouch: 'Get in Touch',
                        getInTouchDesc: 'Fill out the form and our team will get back to you within 24 hours.',
                        emailLabel: 'Email',
                        phoneLabel: 'Phone',
                        addressLabel: 'Address',
                        address: 'Almaty, Kazakhstan',
                        yourName: 'Your Name',
                        yourEmail: 'Your Email',
                        subject: 'Subject',
                        selectSubject: 'Select a subject',
                        generalInquiry: 'General Inquiry',
                        admissionHelp: 'Admission Help',
                        scholarshipInfo: 'Scholarship Information',
                        partnership: 'Partnership',
                        yourMessage: 'Your Message',
                        messagePlaceholder: 'Tell us how we can help you...',
                        sendMessage: 'Send Message',
                        supportTitle: 'Support Options',
                        liveChat: 'Live Chat',
                        liveChatDesc: 'Chat with our team in real-time',
                        startChat: 'Start Chat',
                        emailSupport: 'Email Support',
                        emailSupportDesc: 'Get a response within 24 hours',
                        sendEmail: 'Send Email',
                        phoneSupport: 'Phone Support',
                        phoneSupportDesc: 'Mon-Fri, 9:00 AM - 6:00 PM',
                        callNow: 'Call Now',
                        officeLocations: 'Office Locations',
                        mainOffice: 'Main Office',
                        hours: 'Hours'
                    },
                    ru: {
                        pageTitle: 'Свяжитесь с нами',
                        pageSubtitle: 'Есть вопросы? Мы здесь, чтобы помочь вам в вашем образовательном пути.',
                        getInTouch: 'Связаться',
                        getInTouchDesc: 'Заполните форму, и наша команда ответит вам в течение 24 часов.',
                        emailLabel: 'Эл. почта',
                        phoneLabel: 'Телефон',
                        addressLabel: 'Адрес',
                        address: 'Алматы, Казахстан',
                        yourName: 'Ваше имя',
                        yourEmail: 'Ваша почта',
                        subject: 'Тема',
                        selectSubject: 'Выберите тему',
                        generalInquiry: 'Общий вопрос',
                        admissionHelp: 'Помощь с поступлением',
                        scholarshipInfo: 'Информация о стипендиях',
                        partnership: 'Партнерство',
                        yourMessage: 'Ваше сообщение',
                        messagePlaceholder: 'Расскажите, как мы можем вам помочь...',
                        sendMessage: 'Отправить сообщение',
                        supportTitle: 'Варианты поддержки',
                        liveChat: 'Онлайн чат',
                        liveChatDesc: 'Общайтесь с нашей командой в реальном времени',
                        startChat: 'Начать чат',
                        emailSupport: 'Поддержка по почте',
                        emailSupportDesc: 'Ответ в течение 24 часов',
                        sendEmail: 'Написать',
                        phoneSupport: 'Поддержка по телефону',
                        phoneSupportDesc: 'Пн-Пт, 9:00 - 18:00',
                        callNow: 'Позвонить',
                        officeLocations: 'Наши офисы',
                        mainOffice: 'Главный офис',
                        hours: 'Часы работы'
                    },
                    kz: {
                        pageTitle: 'Бізбен байланысыңыз',
                        pageSubtitle: 'Сұрақтарыңыз бар ма? Біз сіздің білім жолыңызда көмектесуге дайынбыз.',
                        getInTouch: 'Байланысу',
                        getInTouchDesc: 'Форманы толтырыңыз, біздің команда 24 сағат ішінде жауап береді.',
                        emailLabel: 'Эл. пошта',
                        phoneLabel: 'Телефон',
                        addressLabel: 'Мекенжай',
                        address: 'Алматы, Қазақстан',
                        yourName: 'Сіздің атыңыз',
                        yourEmail: 'Сіздің поштаңыз',
                        subject: 'Тақырып',
                        selectSubject: 'Тақырыпты таңдаңыз',
                        generalInquiry: 'Жалпы сұрақ',
                        admissionHelp: 'Түсуге көмек',
                        scholarshipInfo: 'Стипендия ақпараты',
                        partnership: 'Серіктестік',
                        yourMessage: 'Сіздің хабарламаңыз',
                        messagePlaceholder: 'Қалай көмектесе алатынымызды айтыңыз...',
                        sendMessage: 'Хабарлама жіберу',
                        supportTitle: 'Қолдау опциялары',
                        liveChat: 'Онлайн чат',
                        liveChatDesc: 'Біздің командамен нақты уақытта сөйлесіңіз',
                        startChat: 'Чат бастау',
                        emailSupport: 'Пошта арқылы қолдау',
                        emailSupportDesc: '24 сағат ішінде жауап',
                        sendEmail: 'Жазу',
                        phoneSupport: 'Телефон арқылы қолдау',
                        phoneSupportDesc: 'Дс-Жм, 9:00 - 18:00',
                        callNow: 'Қоңырау шалу',
                        officeLocations: 'Біздің офистер',
                        mainOffice: 'Бас офис',
                        hours: 'Жұмыс сағаттары'
                    }
                },
                // Pricing page
                pricing: {
                    en: {
                        pageTitle: 'Simple, Transparent Pricing',
                        pageSubtitle: 'Choose the plan that fits your needs. All plans include access to our university database.',
                        forStudents: 'For Students',
                        forBusiness: 'For Business',
                        free: 'Free',
                        freeDesc: 'Get started with basic features',
                        freePrice: '$0',
                        perMonth: '/month',
                        freeTrial: 'Start Free',
                        premium: 'Premium',
                        premiumDesc: 'Everything you need for success',
                        popular: 'Most Popular',
                        getStarted: 'Get Started',
                        enterprise: 'Enterprise',
                        enterpriseDesc: 'For schools and organizations',
                        contactSales: 'Contact Sales',
                        compareTitle: 'Compare Plans',
                        feature: 'Feature',
                        faqTitle: 'Frequently Asked Questions'
                    },
                    ru: {
                        pageTitle: 'Простые и прозрачные цены',
                        pageSubtitle: 'Выберите план, который вам подходит. Все планы включают доступ к базе университетов.',
                        forStudents: 'Для студентов',
                        forBusiness: 'Для бизнеса',
                        free: 'Бесплатно',
                        freeDesc: 'Начните с базовых функций',
                        freePrice: '$0',
                        perMonth: '/месяц',
                        freeTrial: 'Начать бесплатно',
                        premium: 'Премиум',
                        premiumDesc: 'Все необходимое для успеха',
                        popular: 'Популярный',
                        getStarted: 'Начать',
                        enterprise: 'Корпоративный',
                        enterpriseDesc: 'Для школ и организаций',
                        contactSales: 'Связаться с продажами',
                        compareTitle: 'Сравнение планов',
                        feature: 'Функция',
                        faqTitle: 'Часто задаваемые вопросы'
                    },
                    kz: {
                        pageTitle: 'Қарапайым, ашық бағалар',
                        pageSubtitle: 'Сізге сәйкес келетін жоспарды таңдаңыз. Барлық жоспарлар университеттер базасына кіруді қамтиды.',
                        forStudents: 'Студенттерге',
                        forBusiness: 'Бизнеске',
                        free: 'Тегін',
                        freeDesc: 'Негізгі мүмкіндіктерден бастаңыз',
                        freePrice: '$0',
                        perMonth: '/ай',
                        freeTrial: 'Тегін бастау',
                        premium: 'Премиум',
                        premiumDesc: 'Табысқа қажет барлығы',
                        popular: 'Танымал',
                        getStarted: 'Бастау',
                        enterprise: 'Корпоративтік',
                        enterpriseDesc: 'Мектептер мен ұйымдарға',
                        contactSales: 'Сатумен байланысу',
                        compareTitle: 'Жоспарларды салыстыру',
                        feature: 'Мүмкіндік',
                        faqTitle: 'Жиі қойылатын сұрақтар'
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
                        history: 'History',
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
                        history: 'История',
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
                        history: 'Тарих',
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
        
        // Load saved language preference
        const savedLang = localStorage.getItem('assylLanguage');
        if (savedLang) {
            this.currentLanguage = savedLang;
            document.querySelectorAll('.lang-btn').forEach(b => {
                b.classList.toggle('active', b.dataset.lang === savedLang);
            });
            this.updateUI();
        }
    }

    switchLanguage(lang) {
        this.currentLanguage = lang;
        localStorage.setItem('assylLanguage', lang);
        this.updateUI();
        this.saveUserPreference('language', lang);
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
                else if (href.includes('study-abroad')) link.textContent = common.studyAbroad;
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
        } else if (path.includes('study-abroad')) {
            this.translateStudyAbroadPage();
        } else if (path.includes('profile')) {
            this.translateProfilePage();
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
    }

    // Contact page translation
    translateContactPage() {
        const t = this.translations.pages.contact[this.currentLanguage];
        if (!t) return;

        const pageTitle = document.querySelector('.page-title');
        const pageSubtitle = document.querySelector('.page-subtitle');
        if (pageTitle) pageTitle.textContent = t.pageTitle;
        if (pageSubtitle) pageSubtitle.textContent = t.pageSubtitle;

        // Section title
        const sectionTitle = document.querySelector('.contact-info .section-title h2');
        if (sectionTitle) sectionTitle.textContent = t.getInTouch;
        const sectionDesc = document.querySelector('.contact-info .section-title p');
        if (sectionDesc) sectionDesc.textContent = t.getInTouchDesc;

        // Form labels
        const formLabels = document.querySelectorAll('.form-label');
        formLabels.forEach(label => {
            const forAttr = label.getAttribute('for') || '';
            const text = label.textContent.toLowerCase();
            if (forAttr.includes('name') || text.includes('name')) label.textContent = t.yourName;
            else if (forAttr.includes('email') || text.includes('email')) label.textContent = t.yourEmail;
            else if (forAttr.includes('subject') || text.includes('subject')) label.textContent = t.subject;
            else if (forAttr.includes('message') || text.includes('message')) label.textContent = t.yourMessage;
        });

        // Form placeholders
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        if (nameInput) nameInput.placeholder = t.yourName;
        if (emailInput) emailInput.placeholder = t.yourEmail;
        if (messageInput) messageInput.placeholder = t.messagePlaceholder;

        // Subject select options
        const subjectSelect = document.getElementById('subject');
        if (subjectSelect) {
            const options = subjectSelect.querySelectorAll('option');
            if (options[0]) options[0].textContent = t.selectSubject;
            if (options[1]) options[1].textContent = t.generalInquiry;
            if (options[2]) options[2].textContent = t.admissionHelp;
            if (options[3]) options[3].textContent = t.scholarshipInfo;
            if (options[4]) options[4].textContent = t.partnership;
        }

        const submitBtn = document.querySelector('.submit-btn');
        if (submitBtn) submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> ' + t.sendMessage;

        // Contact items
        const contactDetails = document.querySelectorAll('.contact-details h3');
        contactDetails.forEach(h3 => {
            const text = h3.textContent.toLowerCase();
            if (text.includes('email')) h3.textContent = t.emailLabel;
            else if (text.includes('phone') || text.includes('телефон')) h3.textContent = t.phoneLabel;
            else if (text.includes('address') || text.includes('адрес') || text.includes('мекен')) h3.textContent = t.addressLabel;
        });

        // Support section
        const supportTitle = document.querySelector('.support-section .section-title h2');
        if (supportTitle) supportTitle.textContent = t.supportTitle;

        const supportCards = document.querySelectorAll('.support-card');
        supportCards.forEach((card, index) => {
            const title = card.querySelector('.support-title');
            const desc = card.querySelector('.support-description');
            const btn = card.querySelector('.support-button');
            if (index === 0) {
                if (title) title.textContent = t.liveChat;
                if (desc) desc.textContent = t.liveChatDesc;
                if (btn) btn.textContent = t.startChat;
            } else if (index === 1) {
                if (title) title.textContent = t.emailSupport;
                if (desc) desc.textContent = t.emailSupportDesc;
                if (btn) btn.textContent = t.sendEmail;
            } else if (index === 2) {
                if (title) title.textContent = t.phoneSupport;
                if (desc) desc.textContent = t.phoneSupportDesc;
                if (btn) btn.textContent = t.callNow;
            }
        });

        // Office locations
        const locationsTitle = document.querySelector('.locations-section .section-title h2');
        if (locationsTitle) locationsTitle.textContent = t.officeLocations;
    }

    // Pricing page translation
    translatePricingPage() {
        const t = this.translations.pages.pricing[this.currentLanguage];
        if (!t) return;

        const pageTitle = document.querySelector('.page-title');
        const pageSubtitle = document.querySelector('.page-subtitle');
        if (pageTitle) pageTitle.textContent = t.pageTitle;
        if (pageSubtitle) pageSubtitle.textContent = t.pageSubtitle;

        const toggleBtns = document.querySelectorAll('.toggle-btn');
        if (toggleBtns[0]) toggleBtns[0].textContent = t.forStudents;
        if (toggleBtns[1]) toggleBtns[1].textContent = t.forBusiness;

        // Pricing cards - translate plan names and descriptions
        const pricingCards = {
            en: [
                { name: 'Free', desc: 'Get started with basic features', btn: 'Start Free' },
                { name: 'Premium', desc: 'Everything you need for success', btn: 'Get Started' },
                { name: 'Enterprise', desc: 'For schools and organizations', btn: 'Contact Sales' }
            ],
            ru: [
                { name: 'Бесплатно', desc: 'Начните с базовых функций', btn: 'Начать бесплатно' },
                { name: 'Премиум', desc: 'Все необходимое для успеха', btn: 'Начать' },
                { name: 'Корпоративный', desc: 'Для школ и организаций', btn: 'Связаться' }
            ],
            kz: [
                { name: 'Тегін', desc: 'Негізгі мүмкіндіктерден бастаңыз', btn: 'Тегін бастау' },
                { name: 'Премиум', desc: 'Табысқа қажет барлығы', btn: 'Бастау' },
                { name: 'Корпоративтік', desc: 'Мектептер мен ұйымдарға', btn: 'Байланысу' }
            ]
        };

        const cards = document.querySelectorAll('.pricing-card');
        const cardData = pricingCards[this.currentLanguage] || pricingCards.en;
        cards.forEach((card, index) => {
            if (cardData[index]) {
                const name = card.querySelector('.plan-name');
                const desc = card.querySelector('.plan-description');
                const btn = card.querySelector('.cta-button');
                if (name) name.textContent = cardData[index].name;
                if (desc) desc.textContent = cardData[index].desc;
                if (btn) btn.textContent = cardData[index].btn;
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

        // Section headers inside tabs
        document.querySelectorAll('.sub-tab-content h3').forEach(h3 => {
            const text = h3.textContent.toLowerCase();
            if (text.includes('mission')) h3.textContent = t.mission;
            else if (text.includes('history')) h3.textContent = t.history;
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