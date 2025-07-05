# 🎙️ VoiceChef - The AI-Powered Cooking Assistant

**Live Demo:** https://voicechef1.vercel.app/ 

VoiceChef is a full-stack MERN application designed to revolutionize your home cooking experience. It acts as an intelligent kitchen companion that helps you discover recipes, plan meals, and cook with hands-free voice guidance, enhanced by cutting-edge AI features.

![VoiceChef Hero Image](https://github.com/user-attachments/assets/f49ce4fa-4557-47d6-9d4b-19c4bdfcdb43) 

---

## ✨ Key Features

VoiceChef is packed with features designed to make cooking smarter, easier, and more enjoyable.

| Feature | Description | Status |
| :--- | :--- | :---: |
| 🔐 **Passwordless Auth** | Secure user login/signup using OTPs sent via email. Sessions are managed with JWTs. | ✅ |
| 🍲 **Pantry Chef** | Find recipes based on ingredients you already have at home. Supports advanced filtering by time and cuisine. | ✅ |
| 📸 **Visual Pantry (AI)** | Upload a photo of your ingredients, and our AI will identify them and populate your search list automatically. | ✅ |
| 📖 **My Cookbook** | Save, view, and manage your favorite recipes in a personal, protected cookbook. | ✅ |
| 🗣️ **Hands-Free Voice Control** | Navigate recipe steps using voice commands like "next step", "go to step 5", and "repeat step". | ✅ |
| 🌐 **AI Recipe Translation** | Instantly translate entire recipes into multiple languages (Spanish, French, Hindi, etc.). | ✅ |
| 🧠 **AI Step Simplification** | Break down complex cooking instructions into simple, clear, bullet-pointed actions with the click of a button. | ✅ |
| 🍷 **AI Sommelier** | Get expert recommendations for wine, beer, and side dish pairings for any recipe. | ✅ |

---

## 🛠️ Tech Stack

This project leverages a modern, full-stack MERN architecture.

**Frontend:**
* **Framework:** React (with Vite)
* **Styling:** Tailwind CSS
* **State Management:** React Context API
* **Routing:** React Router DOM
* **API Calls:** Axios
* **Speech:** Web Speech API (Recognition & Synthesis)

**Backend:**
* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB (with Mongoose)
* **Authentication:** JSON Web Tokens (JWT)
* **File Uploads:** Multer

**Third-Party Services & APIs:**
* **AI:** Google Gemini API (for text generation and vision)
* **Recipe Data:** Spoonacular API
* **Email Delivery:** SendGrid API

---




## 📸 Screenshots

Here's a look at the VoiceChef application in action, showcasing its modern UI and powerful features.

---

### Main Pages & Core UI

| Landing Page (Logged Out) | Pantry Chef (Logged In) |
| :---: | :---: |
| ![Landing Page Screenshot 1](https://github.com/user-attachments/assets/f49ce4fa-4557-47d6-9d4b-19c4bdfcdb43) <br> ![Landing Page Screenshot 2](https://github.com/user-attachments/assets/05bde150-3e44-495e-bb69-f49a4a222b07) <br> ![Landing Page Screenshot 3](https://github.com/user-attachments/assets/d40d519c-3204-4342-bcbd-ca46d34c82d4) <br> ![Landing Page Screenshot 4](https://github.com/user-attachments/assets/1e355905-ec15-44fd-ab1d-22bf77350ddb) | ![Pantry Chef Search](https://github.com/user-attachments/assets/63d89fb9-7786-40a4-a3de-810e8a7b569d
) |
| **My Cookbook Page** | **My Profile Page** |
| ![My Cookbook Page](https://github.com/user-attachments/assets/a9051da7-3f22-4c86-9111-87e1199e78e4) | ![Profile Page](https://github.com/user-attachments/assets/eebe9c2d-f8ff-4622-9dc1-a2d7c2460e99) |

---

### AI & Voice Features

| AI Image Analysis & Results | AI Recipe Pairings |
| :---: | :---: |
| ![AI Image Analysis](https://github.com/user-attachments/assets/98cd6903-7cbe-41e8-ab37-1946c41f3f46) | ![AI Pairings](https://github.com/user-attachments/assets/2e014594-06d6-48ad-b4e4-bafa5819afa6) |
| **Recipe Detail Page** | **Voice Command Guide** |
| ![Recipe Detail Page](https://github.com/user-attachments/assets/74db9e4b-f3fe-4b0c-80c6-010b40110256) | ![Voice Command Guide](https://github.com/user-attachments/assets/e4a4a37e-1608-45ca-aa90-c23f2fcc8a06) |

---

### Recipe Translation & Simplification Showcase

| Original Instruction | Translated to Hindi | AI Simplified |
| :---: | :---: | :---: |
| ![Original Instruction 1](https://github.com/user-attachments/assets/87bf6aba-5922-4d19-ab52-ff5bd3779dca) | ![Translated Instruction 1](https://github.com/user-attachments/assets/99bd5a77-dfd4-4965-a2a8-a61f6fce7c80) | ![AI Simplified Instruction 1](https://github.com/user-attachments/assets/c56ef4c3-a02a-4d0a-b675-bef0d6a809bd) |
| ![Original Instruction 2](https://github.com/user-attachments/assets/9d20ea46-b58e-4eec-8a73-31b808dd86a7) | ![Translated Instruction 2](https://github.com/user-attachments/assets/0f41d014-ca2e-4e27-b5eb-9de912c372df) | ![AI Simplified Instruction 2](https://github.com/user-attachments/assets/40d4bed3-2c31-4fba-b7c5-b61c4150baae) |
---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

* Node.js (v18 or newer)
* npm
* A running instance of MongoDB

### Installation

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/Prabhatkumar906/Voice-Chef](https://github.com/Prabhatkumar906/Voice-Chef)
    cd Voice-Chef 
    ```
    *(Note: I corrected the `cd` command to match your repository name)*

2.  **Install Backend Dependencies:**
    ```sh
    cd backend
    npm install
    ```

3.  **Install Frontend Dependencies:**
    ```sh
    cd ../frontend
    npm install
    ```

4.  **Set Up Environment Variables:**
    * In the `/backend` directory, create a `.env` file.
    * Add the following variables, replacing the placeholder values with your actual API keys:
        ```env
        MONGO_URI=your_mongodb_connection_string
        JWT_SECRET=your_super_secret_jwt_key
        SENDGRID_API_KEY=your_sendgrid_api_key
        SPOONACULAR_API_KEY=your_spoonacular_api_key
        GEMINI_API_KEY=your_google_gemini_api_key
        ```
        ```

### Running the Application

You will need two terminals running simultaneously.

1.  **Start the Backend Server:**
    ```sh
    # In the /backend directory
    npm start
    ```
    The server will be running on `http://localhost:5000`.

2.  **Start the Frontend Development Server:**
    ```sh
    # In the /frontend directory
    npm run dev
    ```
    The application will be available at `http://localhost:5173` (or another port if 5173 is busy).

---

## 📬 Contact

Prabhat Kumar - [LinkedIn](https://www.linkedin.com/in/prabhat-kushwaha-027787276/) - kushwahaprabhat30@gmail.com

Project Link: [https://github.com/Prabhatkumar906/Voice-Chef](https://github.com/Prabhatkumar906/Voice-Chef)
