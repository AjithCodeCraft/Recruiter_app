from sqlalchemy.orm import Session
from app.db.models.user import User
from app.schemas.user import AdminRegister, UserCreateByAdmin, UserUpdate
from app.core.security import get_password_hash
import re

class UserRepository:
    def __init__(self, db: Session):
        self.db = db

    def register_admin(self, admin: AdminRegister) -> User:
        hashed_password = get_password_hash(admin.password)
        db_user = User(
            email=admin.email,
            hashed_password=hashed_password,
            full_name=admin.full_name,
            phone_number="",  
            role="admin",
            status="active",
            time_format="12h",
            time_zone="UTC"
        )
        self.db.add(db_user)
        self.db.commit()
        self.db.refresh(db_user)
        return db_user

    def create_user(self, user: UserCreateByAdmin) -> User:
        
        email_domain = user.email.split('@')[-1].split('.')[0]
        password = f"{email_domain}@demo"
        hashed_password = get_password_hash(password)
        
        db_user = User(
            email=user.email,
            hashed_password=hashed_password,
            full_name=user.full_name,
            phone_number=user.phone_number,
            role=user.role.value,
            status=user.status.value,
            groups_assigned=user.groups_assigned,
            address=user.address,
            city=user.city,
            state=user.state,
            zipcode=user.zipcode,
            country=user.country,
            time_format=user.time_format.value,
            time_zone=user.time_zone
        )
        self.db.add(db_user)
        self.db.commit()
        self.db.refresh(db_user)
        return db_user

    def update_user(self, user_id: int, user_update: UserUpdate) -> User:
        db_user = self.get_user(user_id)
        if not db_user:
            return None
        
        update_data = user_update.dict(exclude_unset=True)
        
        # Handle name update
        if user_update.full_name:
            update_data['full_name'] = user_update.full_name
            if 'first_name' in update_data:
                del update_data['first_name']
            if 'last_name' in update_data:
                del update_data['last_name']
        
        if "password" in update_data:
            hashed_password = get_password_hash(update_data["password"])
            del update_data["password"]
            update_data["hashed_password"] = hashed_password
            
        for field, value in update_data.items():
            setattr(db_user, field, value)
            
        self.db.commit()
        self.db.refresh(db_user)
        return db_user
    
    def delete_user(self, user_id: int) -> bool:
    
        db_user = self.db.query(User).filter(User.id == user_id).first()
        if not db_user:
            return False
        
        
        if db_user.role == "admin" and db_user.id == user_id:
            return False
        
        self.db.delete(db_user)
        self.db.commit()
        return True

    def get_user(self, user_id: int) -> User:
        return self.db.query(User).filter(User.id == user_id).first()

    def get_user_by_email(self, email: str) -> User:
        return self.db.query(User).filter(User.email == email).first()

    def get_users(self, skip: int = 0, limit: int = 100):
        return self.db.query(User).offset(skip).limit(limit).all()