from sqlalchemy import Column, Integer, String, Boolean, Enum, JSON, DateTime
from sqlalchemy.sql import func
from sqlalchemy.dialects.mysql import ENUM
from app.db.base import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(255))
    
    # Status field (replacing is_active)
    status = Column(
        ENUM('active', 'inactive', 'suspended', 'pending', name='user_status'),
        default='active',
        nullable=False
    )
    
    # Role and permissions
    is_superuser = Column(Boolean, default=False)
    role = Column(
        ENUM('admin', 'recruiter', 'hiring_manager', 'candidate', name='user_role'),
        default='candidate',
        nullable=False
    )
    
    # Contact information
    phone_number = Column(String(20), nullable=True)
    address = Column(String(255), nullable=True)
    city = Column(String(100), nullable=True)
    state = Column(String(100), nullable=True)
    zipcode = Column(String(20), nullable=True)
    country = Column(String(100), nullable=True)
    
    # Groups/Teams assignment
    groups_assigned = Column(JSON, default=list, nullable=False)
    
    # Time preferences
    time_format = Column(
        ENUM('12h', '24h', name='time_format'),
        default='12h',
        nullable=False
    )
    time_zone = Column(String(50), default='UTC', nullable=False)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())