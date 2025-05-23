from typing import List
from pydantic import BaseModel, EmailStr

class SingleInviteRequest(BaseModel):
    email: EmailStr
    role: str 
    groups: List[str] = []

class BulkInviteRequest(BaseModel):
    invitations: List[SingleInviteRequest]
    

class InvitationResponse(BaseModel):
    email: EmailStr
    status: str  
    message: str = ""