from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.base import get_db
from app.schemas.invitation import SingleInviteRequest, BulkInviteRequest, InvitationResponse
from app.core.dependencies import get_current_user  
from app.core.security import generate_invitation_token  
from app.schemas.user import UserInDB
from app.services.gmail_service import GmailService
from app.db.repositories.user_repository import UserRepository

router = APIRouter()

@router.post("/invite", response_model=InvitationResponse)
def invite_user(
    invite_data: SingleInviteRequest,
    db: Session = Depends(get_db),
    current_user: UserInDB = Depends(get_current_user)
):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Only admins can invite users")
    
    user_repo = UserRepository(db)
    if user_repo.get_user_by_email(invite_data.email):
        raise HTTPException(status_code=400, detail="Email already registered")
    
    token = generate_invitation_token(invite_data.email, invite_data.role)
    
    gmail = GmailService()
    success = gmail.send_invitation_email(
        to_email=invite_data.email,
        token=token,
        role=invite_data.role
          
    )
    
    if not success:
        raise HTTPException(status_code=500, detail="Failed to send email")
    
    return InvitationResponse(
        email=invite_data.email,
        status="sent",
        message=f"Invitation sent with subject"
    )

@router.post("/invite/bulk", response_model=list[InvitationResponse])
def bulk_invite_users(
    bulk_data: BulkInviteRequest,
    db: Session = Depends(get_db),
    current_user: UserInDB = Depends(get_current_user)
):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Only admins can invite users")
    
    user_repo = UserRepository(db)
    gmail = GmailService()
    results = []
    
    for invite in bulk_data.invitations:
        if user_repo.get_user_by_email(invite.email):
            results.append(InvitationResponse(
                email=invite.email,
                status="failed",
                message="User already exists"
            ))
            continue
        
        token = generate_invitation_token(invite.email, invite.role)
        success = gmail.send_invitation_email(
            to_email=invite.email,
            token=token,
            role=invite.role,
            
        )
        
        results.append(InvitationResponse(
            email=invite.email,
            status="sent" if success else "failed",
            message=f"Subject" if success else "Failed to send"
        ))
    
    return results