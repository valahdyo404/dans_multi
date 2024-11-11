opsi 1
SELECT T.*
FROM TRANSACTION T
JOIN ACCOUNT A ON T.TRS_FROM_ACCOUNT = A.ACC_ID
JOIN CUSTOMER C ON A.ACC_OWNER = C.CUST_ID
WHERE C.CUST_NAME = 'John Michael'
ORDER BY A.ACC_ID, T.TRS_DATE;

opsi 2
SELECT T.*
FROM TRANSACTION T
JOIN ACCOUNT A ON T.TRS_FROM_ACCOUNT = A.ACC_ID
WHERE A.ACC_OWNER = (SELECT CUST_ID FROM CUSTOMER WHERE CUST_NAME = 'John Michael')
ORDER BY A.ACC_ID, T.TRS_DATE;