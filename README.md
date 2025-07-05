# 🎙️ VoiceChef - The AI-Powered Cooking Assistant

**Live Demo:** https://voicechef1.vercel.app/ 

VoiceChef is a full-stack MERN application designed to revolutionize your home cooking experience. It acts as an intelligent kitchen companion that helps you discover recipes, plan meals, and cook with hands-free voice guidance, enhanced by cutting-edge AI features.

![VoiceChef Hero Image]("https://github.com/user-attachments/assets/347fe9c4-a52b-4215-a3a7-24693140b433") 

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

<!-- ## 📸 Screenshots

`(This is a very important section! Take screenshots of your app and add them here. Show off the landing page, the Pantry Chef form, the recipe results, the beautiful recipe detail page, and the AI features in action.)`

| **Landing Page** | **Pantry Chef** |
| :---: | :---: |
| `![Landing Page](![Image](https://github.com/user-attachments/assets/8c72ac58-df4f-4443-80c7-f5ca8c4b09b8)) | `![features](![Image](https://github.com/user-attachments/assets/ab2cdf11-ee6d-4a67-96ca-091ab74d5fc0))| `![Landing Page](![Image](https://github.com/user-attachments/assets/7088b898-d1c1-43f3-8233-e7b13cdf802e))| `![Pantry Chef](![Image](https://github.com/user-attachments/assets/8a254cd0-03aa-4d63-a8b3-931ac96dda55))` |

|**Search with Image AI**|**Get Result**|
| `![Image AI](link-to-your-screenshot)` | `![Response](![Image](https://github.com/user-attachments/assets/98cd6903-7cbe-41e8-ab37-1946c41f3f46))` |


| **Recipe Detail Page** | **AI Pairings** |
| `![Recipe Detail](![Image](https://github.com/user-attachments/assets/74db9e4b-f3fe-4b0c-80c6-010b40110256))` | `![AI Pairings](![Image](https://github.com/user-attachments/assets/2e014594-06d6-48ad-b4e4-bafa5819afa6))` |

| **recipe imstruction** | **Voice Command** |
| `![recipe instruction in diffrent language](![Image](https://github.com/user-attachments/assets/99bd5a77-dfd4-4965-a2a8-a61f6fce7c80)

![Image](https://github.com/user-attachments/assets/c56ef4c3-a02a-4d0a-b675-bef0d6a809bd)

![Image](https://github.com/user-attachments/assets/87bf6aba-5922-4d19-ab52-ff5bd3779dca)

![Image](https://github.com/user-attachments/assets/9d20ea46-b58e-4eec-8a73-31b808dd86a7)

![Image](https://github.com/user-attachments/assets/0f41d014-ca2e-4e27-b5eb-9de912c372df)

![Image](https://github.com/user-attachments/assets/40d4bed3-2c31-4fba-b7c5-b61c4150baae))` | `![Voice Command](![Image](https://github.com/user-attachments/assets/e4a4a37e-1608-45ca-aa90-c23f2fcc8a06))` |

| **My Profile Page** | **My Cookbook Page** |
| `![Recipe Detail](![Image](https://github.com/user-attachments/assets/e69d0ac4-3208-4812-a88a-a8658ff478f5))` | `![My Cookbook Page](![Image](https://github.com/user-attachments/assets/0085de61-f5d2-430e-8290-d58dfc007cdd))` | -->


## 📸 Screenshots

Here's a look at the VoiceChef application in action, showcasing its modern UI and powerful features.

---

### Main Pages & Core UI

| Landing Page (Logged Out) | Pantry Chef (Logged In) |
| :---: | :---: |
| ![Landing Page Screenshot 1](https://github.com/user-attachments/assets/8c72ac58-df4f-4443-80c7-f5ca8c4b09b8) <br> ![Landing Page Screenshot 2](https://github.com/user-attachments/assets/ab2cdf11-ee6d-4a67-96ca-091ab74d5fc0) <br> ![Landing Page Screenshot 3](https://github.com/user-attachments/assets/1193592b-2bd3-4162-8277-225af96bee4b) <br> ![Landing Page Screenshot 4](https://github.com/user-attachments/assets/7088b898-d1c1-43f3-8233-e7b13cdf802e) | ![Pantry Chef Search](https://github.com/user-attachments/assets/8a254cd0-03aa-4d63-a8b3-931ac96dda55) |
| **My Cookbook Page** | **My Profile Page** |
| ![My Cookbook Page](https://github.com/user-attachments/assets/0085de61-f5d2-430e-8290-d58dfc007cdd) | ![Profile Page](https://github.com/user-attachments/assets/e69d0ac4-3208-4812-a88a-a8658ff478f5) |

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
