---
title: Sử dụng bare repository trong Git
summary: Sử dụng bare repository trong Git
date: 2022-07-02 07:11:48
draft: false
categories:
  - Lập trình
tags:
  - version-control
  - git
---
Chưa rõ Github lưu trữ code như thế nào? Khởi đầu trần trụi tại đây, sát nghĩa là vậy.

<!--more-->

## Bare repo là gì?

Để khởi tạo một repository (repo cho ngắn gọn) trong Git, ta thường gọi `git init`. Thư mục gốc của repo sẽ bao gồm:

1. Thư mục ẩn `.git` chứa lịch sử chỉnh sửa và metadata của repo.
2. Các file và thư mục trong project của bạn, gọi Cây thư mục hiện hành (working tree)

Bare repo được tạo bởi command `git init --bare`. Bare repo không có working tree, cũng không có thư mục `.git`. Thay vào đó nó lưu trữ nội dung của thư mục `.git` trong repo thường, gồm lịch sử chỉnh sửa và metadata, trực tiếp tại thư mục gốc chứa repo. Nghĩa là đúng như tên gọi, dữ liệu quản lý phiên bản sẽ được "phơi bày trần trụi" trong bare repo.

## Khi nào dùng bare repo

Repo tạo bởi `git init` dùng để __làm việc__. Bạn có thể chỉnh sửa thoải mái working tree, và sau đó `git commit` để lưu lại các thay đổi. Trong đa số trường hợp, bạn sẽ dùng loại "repo làm việc" này, tại máy cá nhân (local machine).

Bare repo tạo bởi `git init --bare` dùng để __chia sẻ__. Do không có working tree, bạn không thể commit trong bare repo. Bare repo lại cho phép `fetch`, `pull`, `push` và `clone`, các tác vụ không dùng được trên repo làm việc.

Dễ thấy là các tác vụ trong bare repo giống hệt với các tác vụ bạn hay làm với remote repo từ Github hay Gitlab. Sử thật là, các nền tảng code hosting này đều _sử dụng bare repo như một cuốn sổ cái tập trung_ trong mô hình quản lý phiên bản _phi tập trung_ của Git.

- Git không cho phép chỉnh sửa nội dung trực tiếp trong bare repo
- Người dùng clone từ bare repo về thành repo làm việc, biên tập, commit và push lên bare repo để cập nhật thay đổi.

## Trường hợp sử dụng thực tế

Ta có thể dùng bare repo làm remote repo để tự host code như Github. Quy ước tên thư mục chứa bare repo phải kết thúc bằng `.git`, ví dụ: `bootstrap.git`, `react.git`, `next.js.git`.

![bare repo suffix](/images/gallery/git-bare-repo/suffix.jpg#center)

Các máy sử dụng trong các bước dưới đây có thể là máy thật hoặc máy ảo, yêu cầu phải nằm chung một mạng.

### Bước 1: Khởi tạo bare repo

Sử dụng một máy làm máy chủ để host code.

```bash
cd /home
mkdir new-tesla.git
cd new-tesla.git
git init --bare
```

### Bước 2: Clone repo

Sử dụng một máy khác, clone code bằng ssh từ máy chủ ở bước 1.

```bash
git clone ssh://<username>@<server-ip>/home/new-tesla.git
```

### Bước 3: Biên tập và commit

Tại máy khách, thêm 1 file và commit

```bash
cd new-tesla
echo whoosh > rocket.md
git add -A
git commit -m "Launch the first rocket"
```

### Bước 4: Push code

Tại máy khách, ghi nhận cập nhật lên remote repo.

```bash
git push origin master
```

### Bước 5: Kiểm tra bare repo

Tại thư mục bare repo trên máy chủ, kiểm tra xem lịch sử chỉnh sửa đã được cập nhật.

```bash
git log
```

## Tham khảo

- [Blog Obstree: What is a bare Git Repository](https://blog.opstree.com/2022/06/21/what-is-a-bare-git-repository/)
