---
title: "Sử dụng Ansible trên Windows (Subsystem for Linux)"
description:
draft: false
date: 2021-08-06 02:32:08
categories:
  - Lập trình
tags:
  - ansible
  - automation
  - devops
---

Cách tốt nhất để sử dụng Ansible trên Windows đó là ...dùng Linux.

<!--more-->

> [Ansible](https://www.ansible.com/) là một công cụ tự động hoá hạ tầng hệ thống bằng code (Infrastructure-as-Code — [IaC](https://phoenixnap.com/blog/infrastructure-as-code-best-practices-tools)). Các nhiệm vụ như quản lý cài đặt, triển khai ứng dụng, tự động hóa network, điều phối máy trong mạng đều có thể hoàn thành dễ dàng bởi Ansible thông qua các mô tả cài đặt thân thiện bằng tiếng Anh vỡ lòng trong các file YAML. Ansible có [mã nguồn mở](https://github.com/ansible/ansible).

## Vấn đề của Ansible trên Windows

Bạn cần [cài đặt Ansible](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html) trên một máy chủ (control node hay master host) để có thể điều khiển các máy tính khác, gọi là máy con (controlled node). Về cơ bản, không có yêu cầu đặc biệt gì về phần mềm hoặc hệ điều hành trên các máy con để Ansible có thể điều khiển. Với máy chủ, các hệ điều hành Unix-like như Linux hoặc MacOS được hỗ trợ mặc định, Ansible không [chạy nguyên thủy (chả biết dịch run natively như nào) được trên Windows](https://docs.ansible.com/ansible/latest/user_guide/windows_faq.html#can-ansible-run-on-windows)!

Như vậy để dùng Ansible, người dùng Windows cần đến "một công cụ Linux" nào đó như Cygwin hoặc máy ảo Linux.
Từ Windows 10, Linux đã trở thành một tính năng nhúng trên Windows với Windows Subsytem for Linux (WSL). Bạn có thể làm theo hướng dẫn [cài đặt Ansible]((https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html)) trên WSL như trên máy Linux thật.

## Vấn đề của Ansible trên WSL

[Cấu hình Ansible](https://docs.ansible.com/ansible/latest/reference_appendices/config.html) được khởi tạo theo thứ tự sau:

1. Biến môi trường `ANSIBLE_CONFIG`
2. File `ansible.cfg` trong thư mục hiện tại
3. File `.ansible.cfg` trong thư mục home
4. File `/etc/ansible/ansible.cfg`

Ansible sẽ bỏ qua file cấu hình nếu thư mục hiện tại cho phép bất cứ ai cũng có thể ghi (world-writable). Lựa chọn này nhằm ngăn ngừa ai đó, dù không đủ quyền, vẫn có thể đặt các cấu hình nhằm thực hiện ý đồ xấu với cả máy chủ lẫn máy con.

```bash
 duytrung@DuyTrung-PC:/mnt/d/works/lo11/lo11-infrastructure$ ansible --version
[WARNING]: Ansible is being run in a world writable directory (/mnt/d/works/my-project), ignoring it as an ansible.cfg source. For more information see
https://docs.ansible.com/ansible/devel/reference_appendices/config.html#cfg-in-world-writable-dir
ansible 2.10.8
  config file = None
  ...
  python version = 3.10.4 (main, Apr  2 2022, 09:04:19) [GCC 11.2.0]
```

Để dùng được file `ansible.cfg` hiện tại, bạn cần giới hạn quyền ghi với thư mục hiện tại.

```bash
chmod o-w .
```

Chạy lại lệnh Ansible, lỗi `world-writable` vẫn xuất hiện, chẳng có gì thay đổi. Điều này là bởi không giống như máy ảo, WSL được thiết kế để dùng chung cây thư mục với Windows. Các phân vùng ổ đĩa trên Windows được mount vào `/mnt` như các thư mục trên WSL. Điều gì sẽ xảy ra khi một thư mục mà trên Windows ai cũng có thể ghi nhưng lại chỉ cho phép đọc trên WSL? _Đó là quyền trên Windows sẽ được ưu tiên cao hơn so với WSL, nghĩa là `chmod` không có hiệu lực_.

## Tách riêng quyền đọc ghi trên WSL khỏi Windows

Tuy nhiên Windows 10 vẫn không ngừng được cập nhật. Từ bản Insider Preview 17063, `DrvFs`, plugin làm cầu nối để WSL dùng chung được filesystem với Windows, đã cho phép gắn thêm `metadata` về quyền Linux lên file trên Windows. `metadata` cho phép bạn có thể cấp quyền ghi cho file trên WSL nhưng cấm ghi trên Windows, hoặc file có thể đọc trên Windows nhưng lại không thể đọc trên WSL.

{{< im src="images/gallery/ansible/permDiff.png" width=600 >}}

Để bật `metadata`, bạn cần unmount sau đó mount lại phân vùng mong muốn với cờ `metadata`, minh họa với ổ `D:`:

```bash
sudo umount /mnt/d
sudo mount -t drvfs D: /mnt/d -o metadata
```

Kết quả sau khi chạy xong cho thấy ổ `D:` đã được bật metadata.

```bash {linenos=table,hl_lines=[6]}
duytrung@DuyTrung-PC:~$ mount -l
rootfs on / type wslfs (rw,noatime)
none on /dev type tmpfs (rw,noatime,mode=755)
...
C:\ on /mnt/c type drvfs (rw,noatime,uid=1000,gid=1000,case=off)
D: on /mnt/d type drvfs (rw,relatime,metadata,case=off)
```

Boom! Bắt đầu thi triển các tuyệt kỹ Ansible như trên máy Linux thật nào.

## Tham khảo

- [Chmod/Chown WSL Improvements](https://devblogs.microsoft.com/commandline/chmod-chown-wsl-improvements/)
- [Advanced settings configuration in WSL Improvements](https://docs.microsoft.com/en-us/windows/wsl/wsl-config)
- [WSL File System Support](https://docs.microsoft.com/vi-vn/archive/blogs/wsl/wsl-file-system-support)
