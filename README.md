
# Node ADV 02 - Exercise of Session 5 
 Exercise of Session 5 by Lê Sơn Tùng

## Backend

#### 1. Chuyển vào thư mục `backend`:

```bash
cd backend
```

#### 2. Tạo file `.env`

Tạo một file .env trong thư mục backend và điền vào các thông tin sau:

```env
DATABASE_URL="postgresql://postgres:1234@localhost:5432/db_es_5_test"
JWT_SECRET=your-jwt-secret-key
BACKEND_URL=http://localhost:8080
PORT=8080
```
`BACKEND_URL`: Địa chỉ URL tuyệt đối cho backend (dùng để lưu trữ hình ảnh).

`PORT`: Cổng mà backend sẽ chạy.


#### 3. Cài đặt các dependencies:
Sử dụng `yarn` để cài đặt tất cả các dependencies cho backend:
```bash
yarn install
```

#### 4. Cập nhật cơ sở dữ liệu và tạo Prisma Client:

Chạy các lệnh sau để đồng bộ schema của Prisma với cơ sở dữ liệu:

```bash
yarn prisma db push --schema src/prisma/schema.prisma
yarn prisma generate --schema src/prisma/schema.prisma
```

#### 5. Chạy ứng dụng ở chế độ phát triển:
Sau khi cấu hình xong, bắt đầu backend bằng cách chạy lệnh sau:
```bash
yarn start:dev
```


## Frontend

#### 1. Chuyển vào thư mục `frontend`:

```bash
cd frontend
```

#### 2. Tạo file `.env`

Tạo một file .env trong thư mục frontend và điền vào các thông tin sau:

```env
NEXT_PUBLIC_API_URL="http://localhost:8080"
NEXT_PUBLIC_LOCAL_STORAGE_TOKEN_NAME="BEAMIN"
```
`NEXT_PUBLIC_API_URL`: Địa chỉ URL của backend.


#### 3. Cài đặt các dependencies:
Sử dụng `yarn` để cài đặt tất cả các dependencies cho frontenf:
```bash
yarn install
```

#### 4. Chạy ứng dụng ở chế độ phát triển:
Sau khi cấu hình xong, bắt đầu frontend bằng cách chạy lệnh sau:
```bash
yarn dev
```


## Các bước thực hiện:
* Đăng ký tài khoản admin
* Đăng nhập
* Thêm danh mục
* Thêm thức ăn
* Nhấn vào Thức ăn ở trang chủ để đặt hàng
* vào /cart để Thanh toán





