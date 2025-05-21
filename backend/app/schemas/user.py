from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, EmailStr, validator
from enum import Enum

class UserStatus(str, Enum):
    active = "active"
    inactive = "inactive"

class UserRole(str, Enum):
    admin = "admin"
    recruiter = "recruiter"
    hiring_manager = "hiring_manager"
    candidate = "candidate"

class TimeFormat(str, Enum):
    twelve_hour = "12h"
    twenty_four_hour = "24h"

class AdminRegister(BaseModel):
    email: EmailStr
    first_name: str
    last_name: str
    password: str

    @validator('first_name', 'last_name')
    def validate_names(cls, v):
        if not v.replace(" ", "").isalpha():
            raise ValueError('Name should contain only letters and spaces')
        return v.strip()

    @property
    def full_name(self) -> str:
        return f"{self.first_name} {self.last_name}"

class UserCreateByAdmin(BaseModel):
    email: EmailStr
    first_name: str
    last_name: str
    phone_number: str
    role: UserRole
    status: UserStatus = UserStatus.active
    groups_assigned: List[str] = []
    address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    zipcode: Optional[str] = None
    country: Optional[str] = None
    time_format: TimeFormat = TimeFormat.twelve_hour
    time_zone: str = "UTC"

    @validator('first_name', 'last_name')
    def validate_names(cls, v):
        if not v.replace(" ", "").isalpha():
            raise ValueError('Name should contain only letters and spaces')
        return v.strip()

    @property
    def full_name(self) -> str:
        return f"{self.first_name} {self.last_name}"

class UserUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    phone_number: Optional[str] = None
    role: Optional[UserRole] = None
    status: Optional[UserStatus] = None
    groups_assigned: Optional[List[str]] = None
    address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    zipcode: Optional[str] = None
    country: Optional[str] = None
    time_format: Optional[TimeFormat] = None
    time_zone: Optional[str] = None
    password: Optional[str] = None

    @property
    def full_name(self) -> Optional[str]:
        if self.first_name and self.last_name:
            return f"{self.first_name} {self.last_name}"
        return None

class UserInDB(BaseModel):
    id: int
    full_name: str
    role: UserRole
    status: UserStatus
    groups_assigned: List[str]
    address: Optional[str]
    city: Optional[str]
    state: Optional[str]
    zipcode: Optional[str]
    country: Optional[str]
    time_format: TimeFormat
    time_zone: str
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None