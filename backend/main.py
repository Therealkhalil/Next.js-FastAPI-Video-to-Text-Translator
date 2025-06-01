from fastapi import FastAPI, File, Form, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import tempfile
import os
from pydub import AudioSegment
import speech_recognition as sr
from translate import Translator

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
app.state.last_uploaded_data = {"filename": None, "option": None, "message": None}

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

        # Save the file temporarily
        with tempfile.NamedTemporaryFile(delete=False, suffix=".mp4") as temp_file:
            temp_file.write(file_content)
            temp_file_path = temp_file.name

        # Convert .mp4 to .mp3
        print("Converting .mp4 to .mp3...")
        mp3_temp_path = temp_file_path.replace(".mp4", ".mp3")
        audio = AudioSegment.from_file(temp_file_path, format="mp4")
        audio.export(mp3_temp_path, format="mp3")

        # Convert .mp3 to .wav
        print("Converting .mp3 to .wav...")
        wav_temp_path = mp3_temp_path.replace(".mp3", ".wav")
        audio = AudioSegment.from_file(mp3_temp_path, format="mp3")
        audio.export(wav_temp_path, format="wav")

        # Transcribe .wav to text
        print("Transcribing .wav to text...")
        recognizer = sr.Recognizer()
        with sr.AudioFile(wav_temp_path) as source:
            audio_data = recognizer.record(source)
            transcription = recognizer.recognize_google(audio_data)
        print(f"Transcription: {transcription}")

        # Translate the transcription
        print("Translating transcription...")
        translator = Translator(to_lang=option)
        try:
            translation = translator.translate(transcription)
            print(f"Translation: {translation}")
        except Exception as te:
            print(f"Translation error: {te}")
            translation = "Translation failed due to an internal error."

        # Clean up temporary files
        os.remove(temp_file_path)
        os.remove(mp3_temp_path)
        os.remove(wav_temp_path)

        # Store the message for retrieval in the GET method
        app.state.last_uploaded_data["message"] = translation

        # Respond with the transcription and translation
        return JSONResponse(
            content={
                "message": "File processed successfully",
                "filename": file.filename,
                "transcription": transcription,
                "translation": translation,
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
    if data["filename"] and data["option"] and data["message"]:
        return {
            "message": "Data retrieved successfully",
            "filename": data["filename"],
            "option": data["option"],
            "translated_message": data["message"],
        }
    else:
        return {"message": "No data available"}