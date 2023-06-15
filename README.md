# 🍳 Smart Recipe | Server

A React.js web app with MongoDB and AI. **Personalized recipe recommendations** based on user preferences and dietary restrictions.

<!-- <p align="center" style="padding:1rem;">
  <a
  style="background-color: #84a59d; border-radius:20px; padding:1rem; color:#f7ede2; font-weight:bold; text-decoration:none;"
  href="https://ai-interviewer-gh3q.onrender.com">👉 Check the Live version here 👈</a>
</p> -->

<a
style="background-color:#bfd3c1; border-radius:20px; padding:0.5rem; color:#3d5a80; font-size:0.75rem; padding-right:1rem; font-weight:bold; text-decoration:none;"
href="https://github.com/lucianosimoni/smart-recipe-client"
target="_blank">
💻 Frontend GitHub
</a>

## ✨ Features

- Recipe Database
- Recipe Recommendations
- Search and Filtering ⚠️
- User Registration and Authentication 🔑
- User Profile & Favorite Recipes 🧑
- Mobile Friendly 📱
- AI LLM 🧠

---

---

## ⚙️ Technologies Used

- ### Frontend 💻

  - React.js
  - CSS
  - Axios

- ### Backend 👈(ﾟヮﾟ 👈)

  - Node.js
  - OpenAI
  - MongoDB 🌿
  - JWT Authentication 🔑
  - Express.js

---

## 🚂 Getting Started

To get started with the project, clone the repository and install the dependencies.

_Install the dependencies_

```bash
npm install
```

_Create the **.env** file_

- Duplicate the `.env.example`
- Rename to `.env` and _fill it up_.

_Start the application locally_

```bash
 npm start # Starts the Local Server at port 3000
```

---

<!-- ## 🧠 OpenAI

- Base model in use: `curie`
- Fine-tunned model with more than 150+ lines of data.

### Fine-tuning model

Check docts [here](https://platform.openai.com/docs/guides/fine-tuning/create-a-fine-tuned-model)

1. _Check if `training-data` is well formatted_

```bash
 openai tools fine_tunes.prepare_data -f <LOCAL_FILE>
```

2. _Fine-tune a new model_

```bash
openai -k <API_KEY> api fine_tunes.create -t <TRAIN_FILE_ID_OR_PATH> -m <BASE_MODEL> --suffix "custom model name"
```

3. _Train already made Fine-tuned model_

```bash
openai -k <API_KEY> api fine_tunes.create -t <TRAIN_FILE_ID_OR_PATH> --model <MODEL_ID>
``` -->

## Do you have recommendations to me? just send me a message 😁
