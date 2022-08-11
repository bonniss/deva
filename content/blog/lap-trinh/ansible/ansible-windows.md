---
title: Cài đặt Ansible trên Windows (Subsystem for Linux)
description: Cách tốt nhất để sử dụng Ansible trên Windows đó là trên Linux
draft: false
date: 2021-08-06 02:32:08
categories:
  - Lập trình
tags:
  - ansible
  - automation
  - devops
---

Tham khảo:

- [Chmod/Chown WSL Improvements](https://devblogs.microsoft.com/commandline/chmod-chown-wsl-improvements/)
- [Advanced settings configuration in WSL Improvements](https://docs.microsoft.com/en-us/windows/wsl/wsl-config)
- [WSL File System Support](https://docs.microsoft.com/vi-vn/archive/blogs/wsl/wsl-file-system-support)


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


