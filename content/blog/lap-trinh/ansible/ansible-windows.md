---
title: Sử dụng Ansible trên Windows (Subsystem for Linux)
description: Cách tốt nhất để sử dụng Ansible với Windows đó là ...dùng Linux
draft: false
date: 2021-08-06 02:32:08
categories:
  - Lập trình
tags:
  - ansible
  - automation
  - devops
---

Cách tốt nhất để sử dụng Ansible với Windows đó là ...dùng Linux.

<!--more-->

> Ansible là công cụ tự động hoá quá trình cài đặt, triển khai hạ tầng cho ứng dụng. Lý do khiến Ansible rất được ưa chuông là agentless. Máy tính không cần cài đặt thêm phần mềm gì để có thể được truy cập và cài đặt bởi Ansible. Được phát triển bởi Red Hat, Ansible tất nhiên hoạt động rất tốt trên các OS Unix-based, song cũng có thể sử dụng được trên Windows.

Tham khảo:

- [Chmod/Chown WSL Improvements](https://devblogs.microsoft.com/commandline/chmod-chown-wsl-improvements/)
- [Advanced settings configuration in WSL Improvements](https://docs.microsoft.com/en-us/windows/wsl/wsl-config)
- [WSL File System Support](https://docs.microsoft.com/vi-vn/archive/blogs/wsl/wsl-file-system-support)

Trên tài liệu hướng dẫn chính thức của Ansible, đối với HĐH Windows, người dùng cần cài đặt thêm OpenSSH và TODO.

Nếu để ý, Ansible hoạt động nguyên thuỷ trên Linux, và kể từ Windows 10 thì người dùng có thể sử dụng Linux "nhúng" với Windows Subsytem for Linux (WSL). Tuy là nhúng nhưng HĐH này vẫn đáp ứng được những nhu cầu cơ bản của người dùng Linux. Vì thế nếu bạn đang dùng phiên bản Windows 10 trở lên, bạn có thể thử sử dụng Ansible với WSL để cảm nhận sự trơn tru một cách native mà ngay trên HĐH con cưng của mình là Windows.

### ...Cho đến khi "Ansible is being run in a world writable directory"

Cài đặt Ansible trên Linux vô cùng dễ dàng. Bạn có thể tạo một project test Ansible với file config với tên gọi ansible.cfg. Cho đến khi một lỗi mà có lẽ bất cứ người dùng Ansible nào cũng đã từng gặp phải xuất hiện: _"Ansible is being run in a world writable directory"_

Ansible có thể làm mọi thứ trên liên quan đến hạ tầng, quyền lực như vậy nên Ansible chỉ giới hạn việc hoạt động trên một nhóm user trong hệ điều hành. Ansible không cho phép sử dụng `asible.cfg` với các thư mục mà bất cứ ai cũng có quyền ghi vì an toàn bảo mật.

Khắc phục lỗi này như thế nào

```bash
chmod 777
```

...Nahhh

```bash
chmod o-w
```

Boom. Bạn chạy lại và mọi thứ vẫn thế. Vấn đề ở đây là gì, filesystem trên WSL không tổ chức riêng biệt mà dùng chung với tổ chức file trên Windows. Các partition trên Windows đóng vai trò như các thư mục được mount vào các thư mục cha `/mnt` trên WSL. Điều gì sẽ xảy ra khi một thư mục mà trên Windows ai cũng có thể ghi nhưng lại chỉ cho phép đọc trên WSL? Đó là quyền trên Windows sẽ được ưu tiên cao hơn so với WSL. Do vậy `chmod` không phát huy tác dụng nếu như thư mục có quyền ghi trên Windows.

Nhưng WSL cũng như Windows không ngừng cập nhật những tính năng mới. Từ bản TODO, bạn đã có thể sử dụng `meta`, tên gọi cho loại thông tin dùng để lưu trữ quyền cho file và thư mục trên WSL tách biệt khỏi Windows. Việc của bạn là unmount partition đang dùng và mount lại với tuỳ chọn dùng thêm `meta`.


```bash
 duytrung@DuyTrung-PC:/mnt/d/works/lo11/lo11-infrastructure$ ansible --version
[WARNING]: Ansible is being run in a world writable directory (/mnt/d/works/my-project), ignoring it as an ansible.cfg source. For more information see
https://docs.ansible.com/ansible/devel/reference_appendices/config.html#cfg-in-world-writable-dir
ansible 2.10.8
  config file = None
  ...
  python version = 3.10.4 (main, Apr  2 2022, 09:04:19) [GCC 11.2.0]
```

```bash
duytrung@DuyTrung-PC:~$ mount -l
rootfs on / type wslfs (rw,noatime)
none on /dev type tmpfs (rw,noatime,mode=755)
...
C:\ on /mnt/c type drvfs (rw,noatime,uid=1000,gid=1000,case=off)
D:\ on /mnt/d type drvfs (rw,noatime,uid=1000,gid=1000,case=off)
```

```bash
sudo umount /mnt/d
sudo mount -t drvfs D: /mnt/d -o metadata
```

```bash
duytrung@DuyTrung-PC:~$ mount -l
rootfs on / type wslfs (rw,noatime)
none on /dev type tmpfs (rw,noatime,mode=755)
...
C:\ on /mnt/c type drvfs (rw,noatime,uid=1000,gid=1000,case=off)
D: on /mnt/d type drvfs (rw,relatime,metadata,case=off)
```

```bash
duytrung@DuyTrung-PC:~$ cd /mnt/d/works/my-project
duytrung@DuyTrung-PC:~$ ll

```


