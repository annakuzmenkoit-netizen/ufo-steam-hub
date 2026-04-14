
# UFO STEAM HUB — Children's Educational Center Website

## Overview
A vibrant, modern, multi-page website for a Ukrainian children's STEAM education center. All content in Ukrainian, with playful yet professional design using the brand color palette.

## Setup
- Install `framer-motion` for animations
- Configure brand colors (#3056dd, #f7df5d, #17c590, #fffdf1, #f04770) in the CSS theme
- Set background to cream (#fffdf1)

## Shared Components
- **Header/Navbar**: Sticky responsive nav with "UFO STEAM HUB" logo, links (Головна, Про нас, Курси, Табори, Розклад, Контакти), and pink "Записатись" CTA button. Mobile hamburger menu.
- **Footer**: Logo, contact info, social links, quick navigation
- **AnimatedSection**: Reusable framer-motion wrapper for scroll-triggered fade/slide animations

## Pages (6 route files)

### Page 1: Головна (Home) — `index.tsx`
1. **Hero**: Large title "UFO STEAM HUB", subtitle "Освіта на дотик", decorative SVG/CSS shapes (rockets, gears, atoms), prominent CTA button
2. **Courses Grid**: Intro text + 6 colorful cards (STEAM-гурток, Робототехніка, Анімація, Math&mind, Математика, 3D моделювання) with colored borders and icons
3. **Why Us**: 4 feature cards with Lucide icons (Users, Shield, Lightbulb, Brain) — mini groups, safe learning, STEAM approach, future skills
4. **What is STEAM**: Split layout — text explanation on left, decorative graphics on right
5. **Map & Contact Form**: Embedded map placeholder + form (Ім'я, Телефон, Повідомлення)

### Page 2: Про нас (About) — `about.tsx`
- Hero with mission/values
- History section
- Team cards: Катерина, Анна, Станіслав, Олександра, Валерія with avatar placeholders

### Page 3: Курси (Courses) — `courses.tsx`
- Detailed program cards with descriptions, age ranges, and schedules
- Each course in an expandable or full card layout

### Page 4: Табори (Camps) — `camps.tsx`
- "Майбутні табори" upcoming camps section
- Photo gallery placeholder for past camps
- "Відгуки батьків" parent testimonials section

### Page 5: Розклад (Schedule) — `schedule.tsx`
- Clean weekly schedule table with color-coded courses
- Responsive table/card layout for mobile

### Page 6: Контакти (Contacts) — `contacts.tsx`
- Contact info (address, phone, email)
- Map embed placeholder
- Contact form

## Design Details
- Rounded corners (xl/2xl), soft shadows throughout
- Playful CSS decorative elements (circles, dots, waves) using brand colors
- Smooth framer-motion animations: fade-up on scroll, staggered card entrances, hover scale effects
- Fully responsive with mobile-first approach
- Each page gets unique SEO head() metadata in Ukrainian
