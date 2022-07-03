---
title: Bùng nổ hiệu suất với dotfile
slug: dotfile-101
date: 2022-07-01 06:11:48
draft: true
categories:
  - Hiệu suất
tags:
  - linux
  - macos
  - unix-like
  - productivity
---

Phú ông cất nóc nhà mới cho vợ ba, dụ anh nông dân nếu xếp được sập gụ tủ chè y hệt như nhà ông trong một buổi sáng thì sẽ gả con gái cho. Nắm lòng thần chú của cây tre trăm DOT, anh nhếch mép, thủ thỉ "Khắc nhập, khắc nhập"...

<!--more-->

Nhiều chương trình, ứng dụng máy tính lưu cài đặt cấu hình dưới dạng plain text. Trong các hệ điều hành nền Unix như Linux hay MacOS, các file có ký tự đầu tiên trong tên là dấu chấm `.` (tiếng Anh là dot) sẽ bị ẩn. Nhân vật chính của chúng ta trong bài viết này có cả 2 đặc điểm trên: là file ẩn lưu cấu hình của các chương trình, ứng dụng trong máy tính, gọi là `dotfile`.

## Các dotfile phổ biến

- `.bash_profile` và `.bashrc` chứa các script cấu hình cho bash shell, được load mỗi khi một cửa sổ terminal được tạo ra.
- Nếu bạn dùng Zsh shell, là shell mặc định trên MacOS, file cấu hình tương ứng là `.zshrc`.
- Vim - ứng dụng chỉnh sửa văn bản trong terminal, lưu cấu hình trong file `.vimrc`.
- Sau khi cài đặt và cấu hình Git trên, các thông tin sẽ được lưu tron  file `gitconfig`.

### Bash shell



## Resources

- [FCC - What is dotfiles?](https://www.freecodecamp.org/news/dotfiles-what-is-a-dot-file-and-how-to-create-it-in-mac-and-linux/)
