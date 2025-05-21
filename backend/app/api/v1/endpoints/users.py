from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.core.dependencies import get_current_user, oauth2_scheme
from app.db.base import get_db
from app.db.repositories.user_repository import UserRepository
from app.schemas.user import UserInDB, UserUpdate, UserCreateByAdmin

router = APIRouter()


@router.post("/", response_model=UserInDB)
def create_user(
    user: UserCreateByAdmin,
    db: Session = Depends(get_db),
    current_user: UserInDB = Depends(get_current_user)
):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Only admins can create users")
    
    user_repo = UserRepository(db)
    db_user = user_repo.get_user_by_email(user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    return user_repo.create_user(user)

@router.get("/", response_model=List[UserInDB])
def read_users(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: UserInDB = Depends(get_current_user)
):
    if not current_user.role == "admin":
        raise HTTPException(status_code=403, detail="Not enough permissions")
    user_repo = UserRepository(db)
    return user_repo.get_users(skip=skip, limit=limit)

@router.get("/{user_id}", response_model=UserInDB)
def read_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: UserInDB = Depends(get_current_user)
):
    user_repo = UserRepository(db)
    db_user = user_repo.get_user(user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Users can view their own profile or admins can view any
    if not (current_user.role == "admin" or current_user.id == user_id):
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    return db_user

@router.put("/{user_id}", response_model=UserInDB)
def update_user(
    user_id: int,
    user_update: UserUpdate,
    db: Session = Depends(get_db),
    current_user: UserInDB = Depends(get_current_user)
):
    user_repo = UserRepository(db)
    db_user = user_repo.get_user(user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    
   
    if not (current_user.role == "admin" or current_user.id == user_id):
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
   
    if not current_user.role == "admin":
        if user_update.role is not None or user_update.status is not None:
            raise HTTPException(status_code=403, detail="Cannot change role or status")
    
    return user_repo.update_user(user_id, user_update)

@router.delete("/{user_id}")
def delete_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: UserInDB = Depends(get_current_user)
):
    if not current_user.role == "admin":
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    user_repo = UserRepository(db)
    if not user_repo.delete_user(user_id):
        raise HTTPException(status_code=404, detail="User not found")
    return {"message": "User deleted successfully"}