# User Management App

## Overview
The **User Management App** is a React-based web application that allows users to view and manage user details. The app supports both light and dark themes and utilizes React Router for navigation.

---

## Features
- **Light/Dark Mode Toggle**: Users can switch between light and dark themes for a better viewing experience.
- **User List View**: Displays a list of users with basic details.
- **User Detail View**: Provides detailed information about a selected user.
- **Responsive Design**: Ensures the app is accessible across various devices and screen sizes.

---

## Tech Stack
- **Frontend**:
  - React.js
  - React Router
  - Tailwind CSS for styling
  - React Icons for UI enhancements
- **State Management**:
  - Custom Context API for theme management

---

## Installation

### Prerequisites
- Node.js (v16 or higher recommended)
- npm or yarn package manager

### Steps
1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd user-management-app
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

4. Open the app in your browser:
   ```
   http://localhost:3000
   ```

---

## Deployment
The app can be deployed on platforms like Netlify or Vercel.

### Deploy on Netlify
1. Build the app:
   ```bash
   npm run build
   ```

2. Drag and drop the `build` folder to the Netlify dashboard, or link your repository for continuous deployment.

---

## Folder Structure
```
user-management-app/
├── public/
├── src/
│   ├── components/
│   │   ├── Home.js
│   │   ├── UserDetail.js
│   ├── context/
│   │   ├── ThemeContext.js
│   ├── App.js
│   ├── index.js
├── package.json
```

---

## Known Issues
### Build Warnings
- Ensure all external links using `target="_blank"` include `rel="noreferrer"` for security.

### Dependency Issues
- If encountering issues with Babel presets, add the following to your `devDependencies`:
  ```bash
  npm install --save-dev @babel/plugin-proposal-private-property-in-object
  ```

---

## Future Enhancements
- Add user creation and editing features.
- Implement API integration for dynamic data.
- Include user authentication.

---

## License
This project is licensed under the MIT License.

---

## Contact
For any queries, reach out to:
- **Developer**: Sanjay Narukulla
- **Email**: [narukullasanjay@gmail.com](mailto:narukullasanjay@gmail.com)
