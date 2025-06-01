# Next.js-FastAPI-Video-to-Text-Translator
![website](https://github.com/user-attachments/assets/283ddf54-93c9-4db6-bcaa-6bc966da99c6)

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup (FastAPI)](#backend-setup-fastapi)
  - [Frontend Setup (Next.js)](#frontend-setup-nextjs)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Docker Setup](#docker-setup)

## Features

- **MP4 Video Upload:** Easily upload MP4 video files through a user-friendly interface.
- **Language Selection:** Choose the original spoken language for accurate transcription.
- **AI-Powered Transcription:** Utilizes OpenAI's Whisper (or a similar model) to accurately transcribe spoken content from the uploaded video.
- **LLM-based Translation:** Translates the transcribed text into a selected target language using a Large Language Model.
- **Real-time Feedback:** Provides immediate alerts for file validation and submission status.
- **Client-Side Data Transfer:** Uses Session Storage to pass client-selected file name and language to the result page, ensuring data is available even if not returned by the backend in the initial response.
- **Robust Backend:** FastAPI backend handles file uploads, validation, and serves as the processing hub.
- **Responsive UI:** Built with Tailwind CSS and Shadcn UI for a modern and adaptive user experience across devices.

## Technologies Used

This project leverages a powerful combination of modern web and AI technologies:

**Frontend:**

- **Next.js 14+ (App Router):** React framework for building fast web applications.
- **React.js:** JavaScript library for building user interfaces.
- **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
- **Shadcn UI:** Reusable components built with Tailwind CSS and Radix UI.
- **Lucide React:** A collection of beautiful and customizable open-source icons.
- **`next/navigation`:** Next.js hook for client-side routing.
- **`sessionStorage`:** Browser API for client-side data persistence across page navigations within a session.

**Backend:**

- **Python 3.9+:** The programming language for the backend logic.
- **FastAPI:** A modern, fast (high-performance) web framework for building APIs with Python 3.7+ based on standard Python type hints.
- **Uvicorn:** An ASGI server for running FastAPI applications.
- **python-multipart:** Required for parsing form data, including file uploads, in FastAPI.
- **`os`, `shutil`:** Python standard library modules for file system operations.
- **`fastapi.middleware.cors.CORSMiddleware`:** For handling Cross-Origin Resource Sharing.
- **OpenAI API (Conceptual/Integration Point):** For Whisper transcription and LLM translation (integration details would be added in backend).

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js (LTS recommended):** [nodejs.org](https://nodejs.org/en/download/)
- **npm or Yarn:** (Comes with Node.js)
- **Python 3.9+:** [python.org](https://www.python.org/downloads/)
- **pip:** Python package installer (comes with Python).

### Backend Setup (FastAPI)

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/Therealkhalil/Next.js-FastAPI-Video-to-Text-Translator.git](https://www.github.com/Therealkhalil/Next.js-FastAPI-Video-to-Text-Translator.git)
    cd Next.js-FastAPI-Video-to-Text-Translator
    ```

2.  **Navigate to the backend directory:**

    ```bash
    cd backend
    ```

3.  **Create and activate a Python virtual environment:**

    ```bash
    python -m venv venv
    # On Windows:
    .\venv\Scripts\activate
    # On macOS/Linux:
    source venv/bin/activate
    ```

4.  **Install backend dependencies:**

    ```bash
    pip install fastapi "uvicorn[standard]" python-multipart
    # If you integrate OpenAI:
    # pip install openai
    ```

5.  **Run the FastAPI server:**
    ```bash
    uvicorn main:app --reload --port 8000
    ```
    The backend will run on `http://127.0.0.1:8000`. You should see output in your terminal indicating it's running.

### Frontend Setup (Next.js)

1.  **Navigate to the frontend directory:**
    Open a **new terminal window** and navigate to the frontend folder.

    ```bash
    cd frontend
    ```

2.  **Install frontend dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

    _If you haven't set up Shadcn UI components yet, follow their documentation to add them (`npx shadcn-ui@latest init` and `npx shadcn-ui@latest add button input select` etc.)._

3.  **Run the Next.js development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    The frontend will run on `http://localhost:3000`.

## Usage

1.  Ensure both your FastAPI backend (`http://localhost:8000`) and Next.js frontend (`http://localhost:3000`) are running.
2.  Open your web browser and navigate to `http://localhost:3000`.
3.  **Upload a MP4 File:** Click on the upload area or drag and drop an MP4 video file.
4.  **Select a Language:** Choose the language spoken in the video from the dropdown menu.
5.  **Submit:** Click the "Submit" button.
6.  **View Results:** After submission, you will be redirected to the Result Page (`/result`), where you can see the name of the file you uploaded and the language you selected. If your backend provides an additional message, it will also be displayed.

## API Endpoints

### Backend (FastAPI - `http://localhost:8000`)

- **`GET /`**

  - **Description:** Root endpoint to confirm the backend is running.
  - **Response:** `{"message": "Hello from FastAPI backend, serving Next.js!"}`

- **`POST /api/upload-video`**

  - **Description:** Handles the upload of an MP4 video file and an associated language option.
  - **Request Type:** `multipart/form-data`
  - **Form Fields:**
    - `file`: (`UploadFile`) The MP4 video file.
    - `option`: (`str`) The selected language code (e.g., "eng", "fr", "ar", "other").
  - **Validation:** Ensures the uploaded file is an MP4.
  - **Response (JSON):**
    ```json
    {
      "message": "Video uploaded and language selected successfully!",
      "filename": "your_video_name.mp4",
      "content_type": "video/mp4",
      "option": "eng",
      "file_size": 1234567 // size in bytes
    }
    ```
  - **Error Response (JSON - 400 Bad Request / 500 Internal Server Error):**
    ```json
    {
      "detail": "Only MP4 video files are allowed."
    }
    ```
    or
    ```json
    {
      "detail": "Could not upload file: [error details]"
    }
    ```

## Docker Setup

To run the project using Docker, follow these steps:

1. **Install Docker:**
   Ensure Docker is installed on your system. You can download it from [docker.com](https://www.docker.com/).

2. **Build Docker Images:**
   Navigate to the project root directory and build the Docker images for both the backend and frontend.

   ```bash
   docker-compose build
   ```

3. **Run Docker Containers:**
   Start the containers using Docker Compose.

   ```bash
   docker-compose up
   ```

4. **Access the Application:**

   - Backend: `http://localhost:8000`
   - Frontend: `http://localhost:3000`

5. **Stop Containers:**
   To stop the containers, press `Ctrl+C` in the terminal or run:

   ```bash
   docker-compose down
   ```

6. **Optional: Clean Up Docker Resources:**
   Remove unused Docker images and containers to free up space.

   ```bash
   docker system prune -a
   ```

- **GitHub:** [Therealkhalil](https://github.com/Therealkhalil)
