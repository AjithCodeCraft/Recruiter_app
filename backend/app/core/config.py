from pydantic import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    GMAIL_USER: str
    GMAIL_PASSWORD: str  
    GMAIL_SENDER: str = "alameena068@gmail.com"
    APP_NAME: str = "Recruiter App"
    FRONTEND_URL: str = "https://recruiter-app.com"
    INVITATION_EXPIRE_HOURS: int = 24

    class Config:
        env_file = ".env"

settings = Settings()