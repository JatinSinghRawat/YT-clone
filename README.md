# 🎥 YouTube Clone (React)

A **basic YouTube Clone** built while completing the **Namaste React Course** to revisit React and strengthen my **fundamentals of React** by building a real-world project.

The main goal of this project was **learning and revision**, focusing on understanding React concepts deeply rather than only replicating the UI.

---

## 🚀 Features

### 🏠 Home Page

* Displays recommended videos
* Dynamic video listing using reusable components
* Responsive video cards

### 🔍 Search Functionality

* Video search support
* Debounced search for optimization
* Search suggestions

### 📺 Watch Page

* Play videos using embedded YouTube player
* Dynamic video title & metadata
* Channel information
* Subscriber count formatting (`K`, `M`, `B`)
* Like count display
* Share / Like / Dislike UI

### 📝 Video Description

* Expand / collapse description (`Show More / Show Less`)
* Auto-detect links in descriptions
* Converts `http` → `https`
* Clickable links rendered dynamically

### 💬 Comments Section

* Fetch comments using **YouTube Data API v3**
* Displays:

  * User profile image
  * Username
  * Comment text
  * Like count
* Fallback avatar for missing profile images

### 🎛 Sidebar Navigation

* Toggle sidebar
* Mini menu support
* Redux-based state management

---

## 🛠 Tech Stack

### Frontend

* **React.js**
* **React Router DOM**
* **Redux Toolkit**
* **Tailwind CSS**

### APIs

* **YouTube Data API v3**

---

## 📚 React Concepts Practiced

This project was built mainly to **revisit React** and strengthen my fundamentals.

Concepts practiced:

* Functional Components
* JSX
* Props
* State Management (`useState`)
* Side Effects (`useEffect`)
* Conditional Rendering
* Event Handling
* React Router
* Dynamic Routing
* API Fetching
* Reusable Components
* Redux Toolkit
* Store & Slices
* State Management
* Debouncing
* Component Re-rendering
* React Performance Concepts

---

## 📂 Project Structure

```txt
src/
│── components/
│   ├── Header
│   ├── Sidebar
│   ├── VideoCard
│   ├── WatchPage
│
│── utils/
│   ├── constants.js
│   ├── appStore.js
│   ├── navSlice.js
│
│── App.js
│── index.js
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone <your-repository-url>
```

### 2. Navigate to the project folder

```bash
cd youtube-clone
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create `.env` file

Create a `.env` file in the **root directory** of the project.

Project structure:

```txt
youtube-clone/
│── node_modules/
│── public/
│── src/
│── .env
│── package.json
```

Add your YouTube API key:

```env
REACT_APP_YOUTUBE_API_KEY=YOUR_API_KEY

No spaces,quotes, and semicolons,etc.
```

### 5. Access `.env` variable

Inside `src/utils/constants.js`:

```js
export const YOUTUBE_API_KEY =
  process.env.REACT_APP_YOUTUBE_API_KEY;
```

---

## 🔑 How to Get YouTube API Key

### Step 1: Open Google Cloud Console

Go to:

https://console.cloud.google.com/

### Step 2: Create a Project

* Click **Select Project**
* Click **New Project**
* Create a new project

### Step 3: Enable YouTube Data API v3

* Go to **APIs & Services**
* Click **Library**
* Search for:

```txt
YouTube Data API v3
```

* Click **Enable**

### Step 4: Generate API Key

* Go to **APIs & Services → Credentials**
* Click **Create Credentials**
* Select **API Key**

Copy the generated key.

### Step 5: Paste into `.env`

```env
REACT_APP_YOUTUBE_API_KEY=YOUR_API_KEY
```

### Step 6: Restart Development Server

After creating `.env`, restart React server:

```bash
npm start
```

or

```bash
npm run dev
```

because environment variables load only when the app starts.

---

## 🎯 Purpose of This Project

I created this project to:

* Revisit React concepts
* Strengthen React fundamentals
* Practice building a real-world UI
* Improve understanding of component architecture
* Learn API integration
* Practice Redux state management

This project is intentionally **basic and learning-focused**, built to reinforce React concepts rather than production-level scalability.

---


## 🙌 Acknowledgement

Built while learning from the **Namaste React Course** by **Akshay Saini**.

A huge focus of this project was understanding concepts deeply and revisiting React fundamentals through practical implementation.

---

## 📜 License

This project is built for **learning and educational purposes**.
