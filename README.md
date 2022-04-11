# Setup guide

## Cấu hình frontend

1. Lấy địa chỉ IP local của máy như
   sau: ([Hướng dẫn](https://www.whatismybrowser.com/detect/what-is-my-local-ip-address))
2. Chỉnh sửa lại nội dung file ```.env.development``` như sau:

- Thay địa chỉ IP ở dòng ```REACT_APP_API_URL=http://192.168.1.246:9090``` thành IP vừa lấy được ở bước 1
- VD địa chỉ IP bước 1 lấy được là ```192.168.1.113``` thì sẽ sửa thành như sau: ```REACT_APP_API_URL=http://192.168.1.113:9090```

Before

```
#.env.development
REACT_APP_API_URL=http://192.168.1.246:9090
REACT_APP_OAUTH_CLIENT_ID=client-id
REACT_APP_OAUTH_CLIENT_SECRET=client-secret
```

After

```
#.env.development
REACT_APP_API_URL=http://192.168.1.113:9090
REACT_APP_OAUTH_CLIENT_ID=client-id
REACT_APP_OAUTH_CLIENT_SECRET=client-secret
```

## Frontend

Nhớ bật VPN & làm theo bước setup bên trên trước khi chạy app

```
npm start
```

## Test account

```
ID: admin@git.com
Password: 123456aA@
```
