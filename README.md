# Smart Content Aggregator API

This project is a technical assessment for the Backend Associate Developer role. It is a RESTful API for a content aggregator service built with Node.js, Express, TypeScript, and MongoDB.

## Table of Contents

- [Features](#features)
- [Technical Choices](#technical-choices)
- [API Endpoints](#api-endpoints)
- [Setup and Installation](#setup-and-installation)
- [Running the Application](#running-the-application)
- [Stretch Goal: AI-Powered Summary Generation](#stretch-goal-ai-powered-summary-generation)
- [What I Would Do Next](#what-i-would-do-next)

## Features

- Create and manage articles, users, and interactions.
- Paginated retrieval of articles.
- Automatic summary generation for articles submitted without one.
- Simple, scalable, and well-documented codebase.

## Technical Choices

*   **Framework**: **Express.js** was chosen for its minimalist, unopinionated nature, which provides flexibility and is excellent for building RESTful APIs quickly. It has a massive ecosystem and great community support.
*   **Language**: **TypeScript** was used to add static typing to JavaScript. This improves code quality, readability, and maintainability by catching errors during development rather than at runtime.
*   **Database**: **MongoDB** (with Mongoose) was selected as the NoSQL database. Its document-based model is a natural fit for storing articles and user profiles, which can have varied structures. It's also highly scalable.
*   **AI Summary Service**: For the stretch goal, I integrated with the **Google Vertex AI (Gemini) API**. It's a powerful generative AI model that can produce high-quality, abstractive summaries. This demonstrates practical integration with a modern, large-scale AI service.

## API Endpoints

The following endpoints are available:

*   `POST /articles`: Create a new article.
*   `GET /articles`: Get a paginated list of all articles.
*   `GET /articles/:id`: Get a single article by its ID.
*   `POST /users`: Create a new user.
*   `POST /interactions`: Log a user's interaction with an article.

## Setup and Installation

1.  **Prerequisites**
    *   Node.js (v18 or later)
    *   MongoDB or a MongoDB Atlas account.
    *   A Google Cloud Project with the Vertex AI API enabled.
    *   Google Cloud SDK (`gcloud` CLI) installed and authenticated (run `gcloud auth application-default login`).

2.  **Clone the repository**

    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

3.  **Install dependencies**

    ```bash
    npm install
    ```

4.  **Set up environment variables**

    Create a `.env` file in the root of the project and add the following variables.

    ```
    PORT=3000
    MONGO_URI=<your_mongodb_connection_string> 
    GCP_PROJECT_ID=<your-google-cloud-project-id>
    GCP_LOCATION=us-central1
    ```

## Running the Application

*   **Development Mode** (with hot-reloading):

    ```bash
    npm run dev
    ```

*   **Production Mode**:

    ```bash
    npm run build
    npm start
    ```

The API will be available at `http://localhost:3000`.

## Stretch Goal: AI-Powered Summary Generation

I chose **Option B: AI-Powered Summary Generation**.

When a user makes a `POST` request to the `/articles` endpoint, the system checks if the `summary` field in the request body is empty or null.

If it is, the application sends the `content` of the article to the Google Vertex AI (Gemini) API. This external service analyzes the text and returns a concise summary. The generated summary is then saved along with the rest of the article data in the database.

This approach was chosen because it demonstrates the practical skill of integrating a major cloud provider's AI service, a common requirement in modern web development. It provides high-quality summaries without the overhead of building, training, and maintaining a local NLP model. The integration is encapsulated within a dedicated `SummaryService` for clean separation of concerns.

## What I Would Do Next

If I had more time, I would focus on the following:

1.  **Authentication & Authorization**: Implement JWT-based authentication to secure endpoints. Users should only be able to manage their own data.
2.  **Input Validation**: Add robust validation (using a library like `zod` or `joi`) to sanitize and validate all incoming request bodies and parameters to prevent bad data and improve security.
3.  **Comprehensive Testing**: Write unit and integration tests (using a framework like Jest) to ensure the reliability and correctness of the API.
4.  **Error Handling**: Create a more sophisticated centralized error-handling middleware to manage different types of errors (e.g., validation, database, not found) and return consistent, meaningful error responses.
5.  **Containerization**: Dockerize the application for consistent development and deployment environments.
