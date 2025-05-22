import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from app.core.config import settings
import ssl

class GmailService:
    def __init__(self):
        self.smtp_server = "smtp.gmail.com"
        self.smtp_port = 587
        self.sender_email = settings.GMAIL_SENDER
        self.username = settings.GMAIL_USER
        self.password = settings.GMAIL_PASSWORD
        self.context = ssl.create_default_context()

    def send_invitation_email(self, to_email: str, token: str, subject: str) -> bool:
        try:
            msg = MIMEMultipart('alternative')
            msg['Subject'] = subject  
            msg['From'] = settings.GMAIL_SENDER
            msg['To'] = to_email

            html = f"""
            <html>
            <body>
                <h2>You've been invited to {settings.APP_NAME}</h2>
               
                <a href="{settings.FRONTEND_URL}/accept-invite?token={token}" 
                   style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none;">
                    Accept Invitation
                </a>
                <p>Link expires in {settings.INVITATION_EXPIRE_HOURS} hours</p>
            </body>
            </html>
            """

            msg.attach(MIMEText(html, 'html'))
            
            with smtplib.SMTP(self.smtp_server, self.smtp_port) as server:
                server.starttls(context=self.context)
                server.login(self.username, self.password)
                server.send_message(msg)
            return True
        except Exception as e:
            print(f"Email send failed: {str(e)}")
            return False