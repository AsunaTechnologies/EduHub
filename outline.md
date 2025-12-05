# Assyl DataHub - Project Outline

## Project Structure
```
/mnt/okcomputer/output/
├── index.html              # Main landing page with hero section
├── study-in-kazakhstan.html # Kazakhstani universities with comparison
├── study-abroad.html       # International universities
├── pricing.html           # Pricing tiers for students and business
├── contact.html           # Contact information
├── profile.html           # User profile and login system
├── main.js               # Core JavaScript functionality
├── resources/            # Images and assets folder
│   ├── hero-bg.jpg       # Futuristic hero background
│   ├── university-*.jpg  # University images
│   ├── profile-*.jpg     # User avatar images
│   └── sci-fi-*.jpg      # Sci-fi themed assets
└── README.md             # Documentation
```

## Core Features
1. **Navigation System**: Main menu with "FOLLOW YOUR DREAMS" title
2. **University Data Hub**: Comprehensive database with comparison tools
3. **User Profiles**: Login system with phone/email authentication
4. **Multi-language Support**: EN, RU, KZ localization
5. **3D Virtual Tours**: Interactive campus exploration
6. **Pricing Tiers**: Student and business subscription models

## Pages Breakdown

### Index.html
- Hero section with futuristic sci-fi design
- "FOLLOW YOUR DREAMS" main title
- Navigation to all sections
- Featured universities carousel
- Quick comparison tool preview

### Study-in-Kazakhstan.html
- University selection tabs
- Detailed university profiles with sub-tabs:
  - About the university (mission, history, leadership, achievements)
  - Academic programs (courses and programs)
  - Admission (requirements, procedures, deadlines, scholarships)
  - 3D tour (virtual campus simulation)
  - International cooperation (exchange programs, partners)
- University comparison functionality
- Filter and search options

### Study-abroad.html
- International university options
- Country-based filtering
- Program type selection
- Application guidance

### Pricing.html
- Student tier pricing
- Business tier pricing
- Feature comparison table
- Subscription management

### Contact.html
- Contact form
- Office locations
- Support information
- FAQ section

### Profile.html
- User authentication system
- Personal dashboard
- Saved universities
- Application tracking
- Preference settings

## Technical Implementation
- Responsive design for all devices
- Local storage for user data
- Session management
- Interactive 3D elements using Three.js
- Smooth animations with Anime.js
- Data visualization with ECharts
- Multi-language text management