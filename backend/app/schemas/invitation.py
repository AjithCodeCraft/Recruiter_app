from typing import List
from pydantic import BaseModel, EmailStr

class SingleInviteRequest(BaseModel):
    email: EmailStr
    subject: str  
    groups: List[str] = []

class BulkInviteRequest(BaseModel):
    invitations: List[SingleInviteRequest]
    custom_message: str = ""

class InvitationResponse(BaseModel):
    email: EmailStr
    status: str  
    message: str = ""