CREATE TABLE CUSTOMER (
    CUST_ID INT PRIMARY KEY,           
    CUST_NAME VARCHAR(100) NOT NULL,   
    CUST_GENDER INT CHECK (CUST_GENDER IN (1, 2)),
    CONSTRAINT UN_CUST_NAME UNIQUE (CUST_NAME)
);

CREATE TABLE ACCOUNT (
    ACC_ID INT PRIMARY KEY,             
    ACC_OWNER INT NOT NULL,             
    BALANCE DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    FOREIGN KEY (ACC_OWNER) REFERENCES CUSTOMER(CUST_ID) ON DELETE CASCADE
);

CREATE TABLE TRANSACTION (
    TRS_ID INT PRIMARY KEY,             
    TRS_FROM_ACCOUNT INT NOT NULL,      
    TRS_TYPE CHAR(2) CHECK (TRS_TYPE IN ('DB', 'CR', 'TF')),
    TRS_DATE DATETIME DEFAULT CURRENT_TIMESTAMP, 
    TRS_STATUS INT CHECK (TRS_STATUS IN (0, 1, -1)),
    FOREIGN KEY (TRS_FROM_ACCOUNT) REFERENCES ACCOUNT(ACC_ID) ON DELETE CASCADE
);

CREATE TABLE TRANSACTION_TRANSFER (
    TRANSFER_ID INT PRIMARY KEY,         
    TRS_ID INT NOT NULL,                 
    TRS_TO_ACCOUNT INT NOT NULL,         
    FOREIGN KEY (TRS_ID) REFERENCES TRANSACTION(TRS_ID) ON DELETE CASCADE,
    FOREIGN KEY (TRS_TO_ACCOUNT) REFERENCES ACCOUNT(ACC_ID) ON DELETE CASCADE
);