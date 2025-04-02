# News-website-MVC

A web application for an Electronic Newspaper with various modules and functionalities.

## Features and Functionality

*   **Article Management:**
    *   Publish, reject, and retrieve articles.
    *   Support for different article statuses (draft, published, rejected, pending).
    *   Categorization and tagging of articles.
    *   Display top viewed, newest, and popular articles.
    *   Search functionality.
*   **User Authentication and Authorization:**
    *   User registration and login.
    *   Role-based access control (guest, subscriber, writer, editor, administrator).
    *   JWT (JSON Web Token) based authentication.
*   **Category Management:**
    *   Create, read, update, and delete categories.
*   **Tag Management:**
    *   Create, read, update, and delete tags.
*   **User Management:**
    *   CRUD operations for user accounts (administrator only).
    *   Assignment of categories to editors for article review.
*   **Commenting (Partial):**
    *   Comment model is defined, but controllers are missing.
*   **Frontend Rendering:**
    *   Uses Handlebars (hbs) as the templating engine.
    *   Displays articles, categories, and other content on different pages.

## Technology Stack

*   **Backend:**
    *   Node.js
    *   Express.js
    *   Mongoose (ODM for MongoDB)
    *   bcryptjs (for password hashing)
    *   jsonwebtoken (for JWT authentication)
    *   cookie-parser
*   **Database:**
    *   MongoDB
*   **Frontend:**
    *   HTML
    *   CSS
    *   JavaScript
    *   jQuery
    *   Handlebars (hbs)
    *   Owl Carousel
    *   CKEditor
    *   Quill Editor
*   **Other:**
    *   express-handlebars

## Prerequisites

*   Node.js and npm installed.
*   MongoDB installed and running.

## Installation Instructions

1.  Clone the repository:

    ```bash
    git clone https://github.com/HuyHoang04/News-website-MVC.git
    cd News-website-MVC
    ```

2.  Navigate to the `Backend` directory:

    ```bash
    cd Backend
    ```

3.  Install dependencies:

    ```bash
    npm install
    ```

4.  Configure the MongoDB connection:

    *   Edit the `Backend/utils/db.js` file and replace the connection string with your MongoDB connection string.

        ```javascript
        import mongoose from "mongoose";

        export const connectDB = async () => {
          try {
            await mongoose.connect(
              "mongodb+srv://lahuyhoang04:123@cluster0.wnly6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0" // Replace with your connection string
            );
            console.log("MongoDB connected successfully");
          } catch (err) {
            console.error("MongoDB connection error:", err);
            process.exit(1);
          }
        };
        ```

5.  (Optional) Seed the database:

    *   The `Backend/main.js` file contains commented-out code to seed the database with initial users, categories, tags, and articles.  Uncomment the relevant sections and run the application once to seed the data.  **Note:** Ensure you hash the password using bcrypt before saving users.

    ```javascript
    // Uncomment to seed users (remember to hash passwords)
    // await seedUsers();

    // Uncomment to seed categories, tags, and articles
    // seedDatabase();
    ```

6.  Start the server:

    ```bash
    npm start
    ```

    The server will start running on the specified port (default is 10000) as defined in `Backend/main.js`.

## Usage Guide

1.  **Access the application:** Open your web browser and navigate to `http://localhost:10000` (or the port your server is running on).

2.  **User Registration/Login:**  Use the "Register" and "Login" links to create an account or log in.

3.  **Administrator Interface:**  After logging in as an administrator, you can access the admin interface at `/administrator`.

4.  **Editor Interface:** After logging in as an editor, access the editor interface at `/editor`.

5.  **Writer Interface:**  After logging in as a writer, access the writer interface at `/writer`. Writers can submit articles to be published. Access article list at `/writer/articles`.

6.  **Browsing Articles:**  Browse articles by category by navigating to `/category?name=[category_name]`.

7.  **Searching Articles:**  Use the search bar to find articles based on keywords in the title or content.

8.  **Viewing Article Details:** Click on an article to view its details. The URL will be `/details?id=[article_id]`.

## API Documentation (Partial)

The backend exposes several API endpoints. Some key functionalities are:

*   **Authentication:**
    *   `POST /login`: Logs in a user.  Requires `username` and `password` in the request body. Returns a JWT token in a cookie named `token`.
    *   `POST /register`: Registers a new user.

*   **Category Management (Administrator Only):**
    *   `POST /category`: Creates a new category. Requires `catagoryName` and `catagoryDes` in the request body.
    *   `POST /category/delete/:id`: Deletes a category by ID.
    *   `GET /category?name=[category_name]`: Retrieves articles in specific category

*   **Tag Management (Administrator Only):**
    *   `POST /tag`: Creates a new tag. Requires `tagName` in the request body.
    *   `POST /tag/delete/:id`: Deletes a tag by ID.

*   **User Management (Administrator Only):**
    *   `POST /user`: Creates a new user.
    *   `POST /user/delete/:id`: Deletes a user by ID.
    *    `POST /administrator/editor/addcategory`: Assigns a category to an editor. Requires `userid` and `catagoryid` in the request body.

*   **Article Management:**
    *   `POST /submit_article` (Writer/Administrator): Submits a new article.  Requires `title`, `content`, `category`, and optionally `image_url`, `video_url`, `tags`, and `premium` in the request body. Requires a valid JWT token in cookie to identify the author.
    *   `POST /article/approve` (Editor/Administrator): Publishes a pending article. Requires `articleId` in the request body.
    *   `POST /article/reject` (Editor/Administrator): Rejects a pending article. Requires `articleIdReject` and `rejectNote` in the request body.
    *   `GET /search?q=[search_query]`: Searches for articles based on a query.
    *   `GET /details?id=[article_id]`: Retrieves a specific article by ID.

## Contributing Guidelines

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with descriptive messages.
4.  Push your changes to your forked repository.
5.  Submit a pull request to the `main` branch of the original repository.

## License Information

No license specified. All rights reserved.

## Contact/Support Information

[HuyHoang04](https://github.com/HuyHoang04)