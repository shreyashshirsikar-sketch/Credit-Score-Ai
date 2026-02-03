import uvicorn
import os

if __name__ == "__main__":
    # Ensure required directories exist
    os.makedirs("ml_model/saved_models", exist_ok=True)
    
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=int(os.getenv("PORT", 8000)),
        reload=True,
        log_level="info",
        workers=1
    )