# Darrow – News Scanner (Fullstack Assignment)

[![Figma](https://img.shields.io/badge/Figma-Design-blue)](https://www.figma.com/design/dzPZ6UHCxFy6Daby8MRjad/Full-Stack-Task--Copy-?node-id=32-2153&p=f&m=dev)

One of the many things we do at Darrow is scan the news for legal violations 🙂.  
In this exercise, we aim to create a news legal violation scanner page that displays recent news and utilizes an LLM to detect legal violations.

We will fetch the news articles from [newsapi.org](https://newsapi.org).  
(You received a NewsAPI access key with this task)

![News Grid](media/grid.png)

### Step 1: QueryInput

`<QueryInput />` is a simple input-controlled component.  
It accepts a `value` and an `onChange` method from the outside.

![QueryInput](media/step1.png)

---

### Step 2: CategorySelect

`<CategorySelect />` is the category filter (show just the news of the selected category).

Fetch the available categories from the server API at `/api/categories`.

![CategorySelect](media/step2.png)

---

### Step 3: NewsDisplay

Clicking the **Fetch News** button should fetch the news articles from our API at `/api/news` and display them in a grid.

For this assignment, type **“Violation”** in the search input.

#### Server

1. For the category you chose (Step 2), retrieve all sources that are in **English** and originate from the **United States**.
2. Filter to use only the first **5 sources**.
3. Fetch **all news** (not just headlines) from these 5 sources.
4. Fetch **6 articles per page**.

#### Client

For each article, show a news card containing:

- Image
- Title
- Description
- Source
- **AI Summary** button (see Step 4)

Implement an **endless scroll**: when the user reaches the end, fetch the next 6 items until there are no more.

![NewsGrid](media/step3.png)

![PreAI](media/beforeAI.png)

---

### Step 4: AI Summary

Clicking the **AI Summary** button enhances the article with:

- a **3‑line summary** of the article, and
- a **1‑line** description of the violation the article refers to.

Create a new API endpoint that accepts the article content, injects it into an LLM, and returns this JSON shape:

```json
{
  "summary": "<3 lines of summary>",
  "violation": "<1 line of the specified violation in this article>"
}
```

Please use `openai.service.ts` — it is a wrapper over OpenAI and shares the same API.

![EnhancedArticleCard](media/step4.png)

---

## Additional Notes

- External libraries are okay.
- Have a basic API design in mind.
- Think about security — **do not commit sensitive API keys**.
- The design should be pixel‑perfect as shown in Figma.

---

## Code Template

### This starter template includes

#### 1) Client (React)

- `<CategorySelect />`, `<QueryInput />`, and `<FetchNewsButton />` components.
- Basic CSS styling files.
- `http-client.ts` — an Axios instance for making API calls. The base URL (`localhost:5000`) is already configured, so you only need to import it and call the API, e.g.:

```ts
import axiosInstance from "./http-client";

axiosInstance.get("/api/news");
```

#### 2) Server (ExpressJS)

- Initial server and router implementation.
- A mock `categories` file.
- `openai.service.ts` — a wrapper around OpenAI. Insert the ApiKey and OpenAI key you received here.
- Typings for the NewsAPI API.

---

## Getting Started

1. Install dependencies

```bash
npm run install:all
```

2. Start both the server and the client

```bash
npm run start
```

**Good luck!**
