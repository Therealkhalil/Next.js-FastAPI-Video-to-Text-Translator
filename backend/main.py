from fastapi import FastAPI, File, Form, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend origin
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# Store the last uploaded data
app.state.last_uploaded_data = {"filename": None, "option": None}

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/upload")
async def upload_file(file: UploadFile = File(...), option: str = Form(...)):
    try:
        # Validate file and option
        if not file.filename:
            raise ValueError("No file uploaded")
        if not option:
            raise ValueError("No option selected")

        # Log the received file and option for testing
        file_content = await file.read()
        print(f"Received file: {file.filename}, size: {len(file_content)} bytes")
        print(f"Selected option: {option}")

        # Store the filename and option for retrieval in the GET method
        app.state.last_uploaded_data = {"filename": file.filename, "option": option}

        # Respond with a success message
        return JSONResponse(
            content={
                "message": "File and option received successfully",
                "filename": file.filename,
                "option": option,
            },
            status_code=200,
        )
    except ValueError as ve:
        print(f"Validation error: {ve}")
        return JSONResponse(content={"message": str(ve)}, status_code=400)
    except Exception as e:
        print(f"Error processing file: {e}")
        return JSONResponse(content={"message": "Failed to process file"}, status_code=500)

@app.get("/get-data")
async def get_data():
    # Retrieve the last uploaded data
    data = app.state.last_uploaded_data
    if data["filename"] and data["option"]:
        return {
            "message": "Data retrieved successfully",
            "filename": data["filename"],
            "option": data["option"],
        }
    else:
        return {"message": "No data available"}