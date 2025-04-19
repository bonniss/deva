---
title: "Tất tần tật về định danh phiên bản phần mềm"
date: 2022-10-08T19:07:52+07:00
draft: false
categories:
  - Lập trình
tags:
  - semver
  - semantic-versioning
  - calver
  - calendar-versioning
  - npm
cover:
  image: "https://source.unsplash.com/iIV0PUqhs00"
  alt: "Prince Edward Viaduct, Toronto, Canada"
  caption: "Photo by Warren Wong on Unplash"
---

Làm sao để họ biết tôi đã thay đổi rất nhiều, nhất là khi tên tôi vẫn vậy?

<!--more-->

Định danh phiên bản phần mềm (Software versioning) là một công đoạn trong công nghệ phần mềm mà ở đó một tên riêng và duy nhất được sử dụng để đánh dấu một trạng thái cụ thể của phần mềm.

Ở phase phát triển (development), các hệ thống quản lý phiên bản (revision control) như Git sẽ tự động sinh `id`, [chẳng hạn `6ccda4c93c1fa3df8e02faf5382ddc86448ac878`](https://stackoverflow.com/a/29107504/6755585), mỗi khi người dùng commit các thay đổi.

Khi phát hành, tên cho phiên bản phần mềm thường thân thiện với con người hơn, có thể được gán dạng số tăng dần như `4.3.18`, hoặc tên riêng như [Dapper Drake](https://wiki.ubuntu.com/DapperDrake/), miễn là độc nhất.

Nghĩ ra một cái tên không khó, nhưng làm sao để tên đó phản ánh được mức độ thay đổi của trạng thái phần mềm, truyền tải ý nghĩa cho các bên liên quan có thể hiểu, thì không hề đơn giản. Bất kỳ ai cũng có thể sáng tạo ra cách định danh phiên bản cho riêng mình, thoả mãn được yêu cầu ở trên thì càng tốt. Tuy vậy trong thực tế có một số lược đồ định danh phiên bản hữu ích được cộng đồng đón nhận và áp dụng rộng rãi hơn cả.

## 🧱 SemVer

### Mô tả

Semantic Versioning hay [SemVer](https://semver.org/) là lược đồ định danh phiên bản được sử dụng rộng rãi nhất. Một cách ngắn gọn, mỗi phiên bản sẽ được đánh số theo cấu trúc __`MAJOR`.`MINOR`.`PATCH`__, trong đó nhà phát triển sẽ tăng:

- `MAJOR`: khi phần mềm giới thiệu API mới __hoàn toàn không tương thích với các bản trước đó__
- `MINOR`: khi phần mềm thêm các tính năng hoàn toàn tương thích với các API hiện có
- `PATCH`: khi phần mềm được fix bug hoàn toàn tương thích với các API hiện có

Dễ thấy độ rủi ro khi thay đổi phiên bản tăng dần từ phải qua trái. Độ rủi ro của phiên bản còn có thể thể hiện chi tiết hơn nữa thông qua 2 phần không bắt buộc sau:

- Hậu tố tiền xuất bản: (tiêu biểu như `alpha`, `beta`, `rc`, etc.) có thể được gắn sau `PATCH`, ngăn cách bởi dấu `-` để thể hiện thêm độ rủi ro của phiên bản, thường trong giai đoạn chuẩn bị phát hành (pre-release)
- Mã bản build (build metadata): có thể được gắn sau cùng và được ngăn cách bởi dấu `+`

<style>
  #semver__example {
    font-weight: 600;
    font-size: 200%;
  }
  #semver__example .semver__sep {
    color: var(--tw3-zinc-400)
  }
  #semver__example .semver__major {
    color: var(--tw3-rose-500)
  }
  #semver__example .semver__minor {
    color: var(--tw3-pink-500)
  }
  #semver__example .semver__patch {
    color: var(--tw3-yellow-500)
  }
  #semver__example .semver__prerelease {
    color: var(--tw3-cyan-500)
  }
  #semver__example .semver__buildmetadata {
    color: var(--tw3-emerald-500)
  }
</style>
<div id="semver__example" class="text-center">
<span class="semver__major">4</span>
<span class="semver__sep">.</span>
<span class="semver__minor">3</span>
<span class="semver__sep">.</span>
<span class="semver__patch">18</span>
<span class="semver__sep">-</span>
<span class="semver__prerelease">beta</span>
<span class="semver__sep">+</span>
<span class="semver__buildmetadata">5114f85</span>
</div>

Quy ước khi `MAJOR` bằng 0, phần mềm đang ở trạng thái bắt đầu phát triển. Mọi tính năng đang hình thành và thay đổi mạnh mẽ, nên rất thiếu ổn định để có thể sử dụng trong production.

> Tất nhiên vẫn có những ngoại lệ như React Native. Thư viện phát triển app mobile bằng JS này chưa biết đến khi nào mới phát hành chính thức bản đầu tiên, song đã được sử dụng vô cùng rộng rãi trong thực tế (phiên bản React Native ở thời điểm viết bài này là `0.70.x`).

### Minh hoạ tiêu biểu

Hệ sinh thái Javascript `npm` sử dụng SemVer để quản lý phiên bản các gói phần mềm. Các gói cần nêu rõ phiên bản trong file `package.json`:

```json
{
  "name": "mickey-mouse-boat",
  "version": "0.0.3"
  ...
}
```

Người dùng có thể sử dụng lệnh [`npm version`](https://docs.npmjs.com/cli/v8/commands/npm-version) để tự động thay đổi phiên bản trong `package.json` và commit.

```bash
npm version major   # 1.1.9 -> 2.0
npm version minor   # 1.1.9 -> 1.2
npm version patch   # 1.1.0 -> 1.1.10
```

Tuỳ thuộc vào nhu cầu sử dụng, `npm` hỗ trợ nhiều toán tử để khai báo phiên bản cho các gói/thư viện phụ thuộc trong `package.json`:

- `1.2.3`: khớp chính xác phiên bản `1.2.3`
- `>=1.2.7 <1.3.0`: khớp `1.2.8`, `1.2.99`, không khớp `1.3.0` hay `1.2.5`
- `1.2.7 || >=1.2.9 <2.0.0`: khớp `1.2.7` hoặc `1.2.10`, không khớp `1.2.8`
- `1.2.3 - 2.3.4`: khớp phiên bản theo khoảng, tương đương `>=1.2.3 <2.4.0`
- `1.2.X`, `1.2.x`, `1.2.*`: khớp mọi `PATCH` của bản 1.2. `X`, `x` hay `*` tất nhiên có thể sử dụng với cả `MAJOR` hay `MINOR`
- `~1.2.3`: tương tự `>=1.2.3 <1.3.0`
- `~1.2`: tương tự `>=1.2.0 <1.3.0`
- `~1`: tương tự `>=1.0.0 <2.0.0` hay `1.x`
- `^1.2.3`: tương tự `>=1.2.3 <2.0.0`
- `^0.x`: tương tự `>=0.0.0 <1.0.0`

Đọc thêm [hướng dẫn sử dụng npm semver](https://docs.npmjs.com/cli/v6/using-npm/semver), hay vọc ngay [npm semver calculator](https://semver.npmjs.com/).

## 📅 CalVer

### Mô tả

Calendar Versioning hay CalVer là lược đồ định danh phiên bản dựa trên thời gian phát hành phiên bản đó. Tên của phiên bản bao gồm những phần sau:

- `MAJOR`: Số đầu tiên trong phiên bản
- `MINOR`: Số thứ 2 trong phiên bản
- `MICRO`/`PATCH`: Số thứ 3, thường là số cuối cùng, trong phiên bản
- `MODIFIER`: tag tuỳ ý, không bắt buộc: `alpha`, `beta`, `rc`, etc.

Không khó để thấy các thành phần này rất tương đồng với lược đồ SemVer. Tuy nhiên trong khi SemVer chỉ rõ ý nghĩa và cách tính cho từng thành phần thì CalVer không giới hạn một quy chuẩn chung nào. Mỗi dự án có thể lựa chọn cách tính cho từng thành phần theo yêu cầu của mình, từ những giá trị sau:

||||
|---|---|---|
|YYYY| Full year| 2006, 2016, 2106|
|YY| Short year| 6, 16, 106|
|0Y| Zero-padded year| 06, 16, 106|
|MM| Short month| 1, 2 ... 11, 12|
|0M| Zero-padded month| 01, 02 ... 11, 12|
|WW| Short week (since start of year)| 1, 2, 33, 52|
|0W| Zero-padded week| 01, 02, 33, 52|
|DD| Short day| 1, 2 ... 30, 31|
|0D| Zero-padded day| 01, 02 ... 30, 31|

### Minh hoạ tiêu biểu

Ubuntu, 1 distro Linux nổi tiếng, sử dụng tên CalVer theo định dạng `YY.MM`, với phiên bản đầu tiên `4.10` được phát hành vào tháng 10/2004.

[youtube-dl](https://github.com/ytdl-org/youtube-dl/) sử dụng CalVer theo định dạng `YYYY.MM.DD`. Ở thời điểm viết bài, bản mới nhất là `2021.12.17` phát hành vào ngày, hmm, có lẽ bạn đã biết rồi đó.

C, ngôn ngữ lập trình của Chúa, định danh theo `YY`, chẳng hạn các phiên bản 89, 99, 11.

CockcroachDB đang ở bản `22.2.0-beta.2`, định dạng `YYYY.MINOR.MICRO-MODIFIER`. Dự án này từng dùng SemVer, và họ có lý giải [vì sao họ chuyển qua CalVer](https://www.cockroachlabs.com/blog/calendar-versioning/).

Xem thêm các dự án khác dùng CalVer tại [đây](https://calver.org/users.html).

## 🐾 Ngoài tự nhiên

### 🐍 Python - chỉ có cái áo là SemVer!

Mặc dù Python sử dụng định dạng `MAJOR.MINOR.MICRO` trông rất giống `SemVer`, *nhưng thực tế lại khác biệt đáng kể*. Lịch sử phát triển của ngôn ngữ này chứng kiến cú chuyển đổi nổi tiếng từ [**Python 2.x**](https://en.wikipedia.org/wiki/Python_2) sang [**Python 3.0**](https://www.python.org/download/releases/3.0/) *phá vỡ hoàn toàn sự tương thích ngược*:

- [`print`](https://docs.python.org/3/whatsnew/3.0.html#print-is-a-function) chuyển từ keyword sang function: `print "hello"` → `print("hello")`
- [Chia số nguyên](https://docs.python.org/3/whatsnew/3.0.html#integers) `/` trả về float thay vì int
- [`str`](https://docs.python.org/3/whatsnew/3.0.html#text-vs-data-instead-of-unicode-vs-8-bit) mặc định là Unicode thay vì ASCII
- [`range()`](https://docs.python.org/3/whatsnew/3.0.html#builtins) trả về iterator thay vì list
- Thay đổi cách xử lý `dict`, `bytes`, exception, v.v.

Theo nguyên tắc `SemVer`, tăng `MAJOR` (từ `2` lên `3`) cho phép breaking changes. Nhưng với Python, những **thay đổi từ gốc rễ** làm cho code Python 2 gần như **không thể chạy được trên Python 3** nếu không chỉnh sửa đầy đủ.

- Quy mô phá vỡ quá lớn
- Không có công cụ migration hiệu quả ([2to3](https://docs.python.org/3.12/library/2to3.html) chỉ giúp một phần)
- → Kết quả là cộng đồng phải duy trì Python 2 và 3 song song suốt **hơn 10 năm**

📅 [**Python 2.7**](https://www.python.org/downloads/release/python-2718/), bản cuối cùng của dòng Python 2, chỉ chính thức **ngừng hỗ trợ vào ngày 1/1/2020** ([Thông báo từ python.org](https://www.python.org/doc/sunset-python-2/)). Với Python, phiên bản phản ánh **giai đoạn phát triển và triết lý thiết kế**, hơn là sự đảm bảo về API.

#### Lược đồ phiên bản của trình thông dịch Python (CPython)

Trình thông dịch chính thức của Python – CPython – sử dụng định dạng phiên bản theo:

```
MAJOR.MINOR.MICRO[alpha|beta|rcN][.devN]
```

Ví dụ:
- [`3.12.0a1`](https://www.python.org/downloads/release/python-3120a1/) → Alpha release đầu tiên của Python 3.12
- [`3.12.0rc2`](https://www.python.org/downloads/release/python-3120rc2/) → Release Candidate lần 2
- [`3.12.0`](https://www.python.org/downloads/release/python-3120/) → Bản chính thức

Chu kỳ phát hành Python thường rơi vào khoảng 12–18 tháng, theo quy trình chính thức tại [PEP 101 – Release Process](https://peps.python.org/pep-0101/). Mặc dù trông giống SemVer, nhưng versioning của Python *không cam kết về backwards compatibility*: Các thay đổi "phá vỡ" vẫn có thể xuất hiện giữa các phiên bản `3.x`.

#### Lược đồ phiên bản của package cho Python

Trước đây, hệ sinh thái Python dùng [PEP 440](https://peps.python.org/pep-0440/) làm tài liệu chuẩn cho việc đặt và so sánh phiên bản gói. Tuy nhiên, hiện tại *PEP 440 đã trở thành tài liệu lịch sử*, và được *thay thế bởi đặc tả chính thức do [Python Packaging Authority (PyPA)](https://www.pypa.io/) duy trì*:

> 📖 **Tài liệu chính thức:**
> [Version Specifiers – PyPA Specifications](https://packaging.python.org/specifications/version-specifiers/)

Một phiên bản Python hợp lệ là **dãy số theo định dạng**:

```
[N!]X.Y[.Z][suffix][+local_version]
```

- `N!` – epoch (tuỳ chọn, dùng để ưu tiên so sánh cao hơn)
- `X.Y[.Z]` – phần chính của phiên bản (major.minor[.patch])
- `suffix` – tiền tố như:
  - `a1`, `b2`, `rc3` – các bản pre-release
  - `.post1` – post-release
  - `.dev2` – development release
- `+local_version` – đánh dấu build nội bộ, không phân phối chính thức

📌 Ví dụ hợp lệ:
- `1.0.0`
- `2.1.3rc2`
- `1.0.post1`
- `1.0.dev4`
- `1.0+exp.sha.5114f85`

✅ Tất cả các ví dụ trên đều hợp lệ theo đặc tả [**Version Specifiers**](https://packaging.python.org/specifications/version-specifiers/) của [**Python Packaging Authority (PyPA)**](https://www.pypa.io/), và được hỗ trợ đầy đủ bởi:

- [`pip`](https://pip.pypa.io/en/stable/cli/pip_install/#requirement-specifiers) – công cụ cài đặt gói phổ biến nhất trong Python
- [`setuptools`](https://setuptools.pypa.io/en/latest/userguide/dependency_management.html) – công cụ build/distribute truyền thống
- [`poetry`](https://python-poetry.org/docs/dependency-specification/) – trình quản lý phụ thuộc và gói hiện đại, hỗ trợ `pyproject.toml`

Khi khai báo phụ thuộc (`dependencies`) trong `requirements.txt`, `setup.py` hoặc `pyproject.toml`, bạn có thể sử dụng các **toán tử so sánh phiên bản** như sau:

| Toán tử | Ý nghĩa                         | Ví dụ                       |
|--------|----------------------------------|-----------------------------|
| `==`   | Chính xác                        | `requests==2.28.1`          |
| `!=`   | Loại trừ                         | `Django!=3.2`               |
| `>=`   | Lớn hơn hoặc bằng                | `pandas>=1.4`               |
| `<=`   | Nhỏ hơn hoặc bằng                | `numpy<=1.22`               |
| `>`    | Lớn hơn                          | `scipy>1.10`                |
| `<`    | Nhỏ hơn                          | `flask<2.0`                 |
| `~=`   | Tương thích với phiên bản X.Y    | `~=1.4.2` ⇨ `>=1.4.2,==1.4.*` |
| `===`  | So khớp tuyệt đối cả phần build  | `requests===1.0+abc123`     |

🧠 **Lưu ý:** toán tử `~=` thường được dùng để cho phép nâng cấp bản vá nhưng khóa `MAJOR.MINOR`.

### 🅰️ Angular – Khi version là công cụ tái định vị sản phẩm

#### 🧭 Từ "AngularJS" đến "Angular 2"

- **AngularJS (`v1.x`)** ra đời 2010, dùng JavaScript, `$scope`, và mô hình MVC.
- Đến 2014–2015, Google quyết định **viết lại hoàn toàn** bằng TypeScript, DI, component-based, hiệu suất tốt hơn.
- Dự án mới mang tên "**Angular 2**", **không tương thích ngược** với AngularJS.

> 📎 [What is Angular?](https://angular.dev/overview)

#### 🔥 Bỏ qua `v3` để đồng bộ package

- Sau `v2.4`, `@angular/router` đã lên `v3.3`, khiến toàn bộ hệ module không đồng bộ.
- Nhóm phát triển quyết định **bỏ qua `v3`** và nhảy thẳng lên `v4.0.0`.

#### 📅 Chu kỳ phát hành đều đặn

- Từ `v4` (2017), Angular phát hành **2 major mỗi năm**, thường vào **tháng 3 và tháng 9**.
- Mỗi bản LTS được hỗ trợ **18 tháng**.
- Một số major không có thay đổi lớn, nhưng vẫn tăng version để giữ nhịp độ.

> 📎 [Angular versioning and releases](https://angular.dev/reference/releases)

#### 📐 SemVer... kiểu Angular

- Angular tuân **SemVer**, nhưng có đặc thù:
  - **Major** không phải lúc nào cũng có breaking lớn
  - Một số breaking nhẹ (đổi tên CLI flag) cũng khiến bump version
- Bản cập nhật thường có tool `ng update` giúp migrate dễ dàng.

#### 📦 Module đồng bộ version

- Toàn bộ package chính (`core`, `router`, `cli`, `forms`,...) luôn phát hành cùng version:
  ```bash
  @angular/core    17.2.0
  @angular/router  17.2.0
  ```

> 📎 [Angular Package Format](https://angular.dev/tools/libraries/angular-package-format)

#### 📢 Version là thông điệp cộng đồng

- Việc tăng major đều đặn tạo **cảm giác framework luôn “tiến lên”**
- Mỗi bản đi kèm migration guide, công cụ hỗ trợ, changelog đầy đủ
- Không gây sốc, nhưng giúp cộng đồng thống nhất hành vi cập nhật

> 🧭 *Version của Angular là nhịp điệu – hơn là mức độ thay đổi.*

### ⚛️ React – Khi version là cầu nối, không phải vạch ngăn

#### 🧭 Từ Facebook Hackathon đến hiện tại

- React ra đời năm 2013 tại Facebook, ban đầu chỉ là thư viện view cho Facebook Ads.
- Phiên bản đầu dùng `v0.x`, được phát triển song song với `react-dom` – sau này tách riêng.
- Đến `v0.14`, cộng đồng phát triển mạnh, nhu cầu đồng bộ version giữa các package trở nên cấp thiết.

> 📎 [React v15 Announcement](https://reactjs.org/blog/2016/04/07/react-v15.html)

#### 🔀 Nhảy vọt lên `v15`, không bao giờ có React v1

- React **bỏ qua hoàn toàn `v1` đến `v14`**, nhảy thẳng từ `0.14.x` → `v15.0.0`.
- Mục tiêu là đồng bộ `react`, `react-dom`, `react-addons`, tránh nhầm lẫn giữa các package.
- Đây là cú nhảy “âm thầm hợp lý” thay vì thay đổi kiến trúc lớn.

> 🧠 React không “bắt đầu lại từ đầu” như Angular, nhưng dùng version để tái sắp xếp hệ sinh thái.

#### 🪜 `v17` – phiên bản không có tính năng mới

- React 17 (2020) ra đời không có bất kỳ tính năng mới nào – chỉ thay đổi ngầm:
  - Tách phase commit/mount
  - Chuẩn bị khả năng chạy **nhiều React version trong cùng một tree**
- Đây là phiên bản “cầu nối” giúp cộng đồng migrate dễ hơn trước khi `v18` ra mắt.

> 📎 [React 17 – No New Features](https://reactjs.org/blog/2020/10/20/react-v17.html)

#### ⚙️ `v18` – mở cổng cho concurrent rendering

- React 18 (2022) giới thiệu **Concurrent Features**, nhưng là opt-in:
  - `createRoot()`
  - `startTransition`, `useDeferredValue`
  - Streaming SSR mới
- API không đổi nhiều, nhưng **engine rendering đổi hoàn toàn**

> 📎 [React 18 Release](https://reactjs.org/blog/2022/03/29/react-v18.html)

#### 🧘 SemVer cực kỳ bảo thủ

- React tuân SemVer, nhưng **rất hạn chế bump major**:
  - Major chỉ tăng khi có thay đổi sâu trong hệ thống, ngay cả khi public API không đổi.
  - Các minor có thể thêm tính năng lớn (`hooks` là `16.8`, không phải `17`)

> 📎 [React Versioning Policy – RFC](https://github.com/reactjs/rfcs/blob/main/text/0000-react-versioning.md)

#### 📦 Ecosystem gắn liền nhưng không đồng bộ

- `react`, `react-dom`, `react-test-renderer`, `react-refresh`… thường cùng version – nhưng không ép buộc.
- Ví dụ: `react-dom` v18.2 có thể dùng được với `react` v18.1 (nếu API không mâu thuẫn)

#### 📢 Version phản ánh chiến lược hơn là thay đổi

- React dùng version để gửi tín hiệu:
  - “Đã sẵn sàng migrate”
  - “Có thứ mới bên dưới, nhưng bạn không cần biết nếu không quan tâm”
- Rất khác với Angular – React **không tăng version để marketing**, mà để “âm thầm nâng sàn”.

> 🧠 *Version của React giống như câu lệnh `setTimeout`: bạn không thấy nó chạy, nhưng nó thay đổi cuộc chơi.*

### 🔵 Vue.js – Phiên bản v3 mất 3 năm để được coi là chính thức

- Vue khởi đầu đơn giản, tập trung vào tính dễ học và linh hoạt.
- `v2.0` ra mắt năm 2016, tạo nên cú hích lớn, framework nhanh chóng trở thành đối trọng với React và Angular.
- `v3.0` phát hành **cuối 2020**, nhưng phải đến **năm 2022** mới được đặt làm mặc định trong Vue CLI.

> 📎 [Vue 3 as the New Default – Official blog](https://blog.vuejs.org/posts/vue-3-as-the-new-default.html)

- Lý do chậm phổ biến:
  - `Vue 3` đổi sâu kiến trúc: Virtual DOM rewrite, Composition API
  - Ecosystem chưa theo kịp (`vue-router`, `vuex`, tooling...)
- Phiên bản `v3` là SemVer đúng nghĩa, nhưng việc migrate đòi hỏi học lại concepts mới – **không dễ dàng như bump version.**

> 📎 [Migration Guide](https://v3-migration.vuejs.org/)

- Giai đoạn `2020–2022`, Vue core team phải duy trì cả `2.x` và `3.x`, gây nhiều rối cho ecosystem.
- Sau khi `"Vue 3 as default"` được công bố, mọi thư viện chính thức cũng bắt đầu update đồng bộ (`router`, `devtools`, etc.)

> 🔁 Vue v3 là ví dụ kinh điển cho việc version đúng, nhưng **ecosystem chưa sẵn sàng** thì bản mới cũng "không phải mặc định."

### ⚖️ Django – Version nghiêm túc, ổn định cho enterprise

- Django dùng **SemVer có điều chỉnh**, với chu kỳ:
  - 1 bản major mỗi ~8 tháng
  - 1 bản LTS mỗi ~2 năm, hỗ trợ 3 năm
- Tất cả lịch phát hành và EOL được công bố công khai và duy trì ổn định từ nhiều năm qua.

> 📎 [Django release process](https://docs.djangoproject.com/en/stable/internals/release-process/)
> 📎 [Supported versions](https://www.djangoproject.com/download/#supported-versions)

- Ví dụ:
  - `3.2 LTS` (2021–2024)
  - `4.2 LTS` (2023–2026)
  - `5.0` phát hành tháng 12/2023

- Breaking changes luôn được ghi rõ trong mỗi release note.
- Django có **migrator tool mạnh**, giúp nâng cấp giữa các version tương đối dễ dàng, đặc biệt khi dùng `manage.py check --deploy`

> 🧠 Version của Django là kiểu bạn “có thể lập kế hoạch 5 năm mà không sợ vỡ app.”

### ⚒️ Laravel – Version đều như cơm bữa, update như event thường niên

- Laravel cũng theo SemVer, nhưng **tăng version major mỗi năm**, thường vào tháng 9 – bất kể thay đổi lớn hay nhỏ.
- Các bản major thường được **đóng gói như sự kiện**, kèm bài blog, video, LaravelConf, v.v.

> 📎 [Laravel Releases](https://laravel.com/docs/releases)

- Ví dụ:
  - `v8`: giới thiệu model factory mới
  - `v9`: chuẩn hóa PHP 8
  - `v10`: support native types
  - `v11`: cleanup cực mạnh – bỏ toàn bộ boilerplate trong dự án mặc định

> 📎 [Laravel 11 release notes](https://laravel-news.com/laravel-11)

- Mặc dù theo SemVer, nhiều bản major **không có breaking đáng kể**, và upgrade path thường chỉ mất vài dòng lệnh (`laravel shift`, hoặc thủ công bằng `composer`).

> 📢 Laravel dùng version như một **chiếc loa phát động cộng đồng** – dễ update, dễ truyền thông, ít rủi ro.

### ⚙️ Symfony – Version như đồng hồ Thụy Sĩ

- Symfony dùng SemVer khá chuẩn mực, nhưng có **quy ước riêng**:
  - **Version chẵn là stable**, ví dụ `6.0`, `6.2`
  - **Version `x.4` luôn là LTS**
  > 📎 [Symfony Release Strategy](https://symfony.com/releases)

- Chu kỳ phát hành cố định:
  - Minor: mỗi 6 tháng (`x.1`, `x.2`, ...)
  - Major: mỗi 2 năm (`v4`, `v5`, `v6`, `v7`...)
  - LTS: 3 năm bugfix + 4 năm security support

- Ví dụ:
  - `5.4`, `6.4`, `7.4` → đều là bản LTS
  - `6.1`, `6.2`, `6.3` → stable ngắn hạn

- Community packages cũng phát hành theo nhịp đó – bạn có thể dựa vào version để quyết định độ an toàn của upgrade.

> 🧭 Symfony dùng version như nhịp tim – ổn định, đoán trước được, và không bị giật mình.

### 🦋 Flutter – Phiên bản nhẹ nhàng, nhưng thay đổi không nhẹ

> 📎 [Flutter release notes](https://docs.flutter.dev/release/release-notes)

- Flutter dùng version kiểu `X.Y.Z`, ví dụ `3.19.6`, nhưng không SemVer hoàn toàn:
  - Không luôn bump MAJOR dù có breaking
  - Thay vào đó dùng **release channels**: `stable`, `beta`, `dev`, `master`
- Thay đổi lớn (như Material 3, Impeller renderer, Dart isolate tweaks) có thể xuất hiện ở bất kỳ version nào – nên version chỉ **mang tính thời điểm**, không phản ánh mức độ thay đổi.
- Mỗi bản Flutter cũng đi kèm version Dart tương ứng:
  - `Flutter 3.19` → `Dart 3.3`
  - `Flutter 3.13` → `Dart 3.1`

> 📎 [Flutter & Dart compatibility](https://docs.flutter.dev/release/compatibility-policy)

- Vì dùng release channel, nên nhiều tính năng mới **chỉ có ở `beta` hoặc `dev` trong nhiều tháng**, trước khi merge vào `stable`.

> 🔀 Flutter dùng version như đánh dấu mốc snapshot – nếu bạn ở đúng channel, bạn sẽ có “hiện tại” riêng của mình.

### ☕ Java – CalVer trá hình, số thì đều nhưng không đơn giản

- Java được phát triển bởi Sun Microsystems từ giữa thập niên 90, với version ban đầu là `1.0`.
- Trong hơn một thập kỷ, Java giữ format version kiểu `1.X`, ví dụ:
  - `1.2` (1998) → Java 2
  - `1.4` (2002) – cải tiến I/O và assert
  - `1.5` (2004) – đổi tên thành **Java 5** cho marketing dễ hơn
  - Sau đó: `1.6` = Java 6, `1.7` = Java 7, `1.8` = Java 8

> 📎 [Oracle Java Versioning FAQ](https://www.oracle.com/java/technologies/javase/versioning-naming.html)

- Từ **Java 9** (2017), Oracle chuyển sang format **version đơn giản `X`**, bỏ hẳn `1.` prefix:
  - `Java 9`, `Java 10`, `Java 11`...

#### 📅 Tăng version định kỳ – nhìn như CalVer, nhưng không phải

- Sau Java 9, Oracle áp dụng lịch phát hành mới:
  - **Mỗi 6 tháng có một phiên bản mới**, thường vào tháng 3 và tháng 9
  - Version tăng đều: `9`, `10`, `11`, `12`, `13`, ...
  - Mỗi **3 năm có một bản LTS**:
    - `Java 8` (2014) – LTS
    - `Java 11` (2018) – LTS
    - `Java 17` (2021) – LTS
    - `Java 21` (2023) – LTS
    - `Java 25` (dự kiến 2025) – LTS tiếp theo

> 📎 [OpenJDK release roadmap](https://openjdk.org/projects/jdk/)

- Dù version nhìn giống CalVer (`22`, `23`,...), Java vẫn giữ chu kỳ “đều đều” – không bị gắn chặt vào ngày tháng cụ thể.

#### 🧱 Version đồng bộ từ JDK đến JVM

- Các thành phần chính của Java (JVM, compiler `javac`, standard API) đều gắn version giống nhau theo JDK:
  - `javac -version` → `javac 21.0.1`
  - `java -version` → `Java(TM) SE Runtime Environment (build 21.0.1+12)`

- Các bản OpenJDK và vendor JDK (Temurin, Azul, Amazon Corretto…) tuân theo version scheme này.

> 📎 [Java SE download archive](https://www.oracle.com/java/technologies/javase/jdk21-archive-downloads.html)

#### 🔁 Không hoàn toàn SemVer – minor vẫn có thay đổi

- Java không tuân SemVer. Một bản Java `X` có thể phá vỡ hành vi ở `X-1` (ví dụ: module system ở Java 9).
- Tuy nhiên, từ Java 11 trở đi:
  - API mới được thêm có annotation `@since`
  - Các thay đổi lớn đều đi kèm JEP (JDK Enhancement Proposal), giúp developer chủ động theo dõi.

> 📎 [JEP Index](https://openjdk.org/jeps/0)

### Go – Khi version là sự ổn định tuyệt đối

- Go ra mắt năm 2009, đến 2012 phát hành `v1.0` — và giữ nguyên major version đến… nay (`1.22` vào năm 2024).
- Code viết cho Go 1.0 sẽ luôn chạy được trên mọi Go 1.x sau này.
  - Go đảm bảo tương thích ở cấp độ mã nguồn — bạn giữ `.go` là đủ.
  - Nhưng không hứa là file biên dịch từ Go cũ sẽ chạy được trên runtime Go mới. Vì thế nên nên luôn rebuild lại project khi đổi version Go.

> 📎 [Go 1 compatibility](https://go.dev/doc/go1compat)

- “Go 2” đã được thảo luận từ 2017, nhưng nhóm phát triển quyết định **không ra `v2.0`**, mà sẽ thêm dần các thay đổi lớn kiểu “opt-in”:
  - Error handling mới (`errors.Is`, `errors.As`)
  - Generics (Go 1.18)
  - Workspace mode (Go 1.22)

> 📎 [Go 2 Roadmap](https://go.dev/doc/go2)

- Những cải tiến lớn này được coi là **Go 2 in spirit**, không cần bump major vì vẫn giữ backward compatibility.

> 🧘 *Version Go giống như lời hứa: bạn viết code hôm nay, sẽ không bị phản bội trong tương lai.*

### 🦀 Rust – SemVer nghiêm ngặt, nhưng vẫn “giật mình”

- Rust tuân thủ [SemVer nghiêm ngặt](https://doc.rust-lang.org/cargo/reference/semver.html), tăng **minor để thêm tính năng**, major nếu phá vỡ API.
- Tuy nhiên, trong thực tế: breaking change thường tránh được bằng feature flags và stabilization process dài.
- `v1.0` phát hành năm 2015. Đến 2024 vẫn ở `1.x`, nhưng đã có gần 80 bản minor (`1.78`, `1.79`...)

> 📎 [Rust Release Notes](https://github.com/rust-lang/rust/releases)

- Thay đổi lớn như `async/.await`, `const generics`, `impl Trait`... đều nằm trong `1.x`, nhưng được chuẩn hóa cực kỳ cẩn trọng.

- Công cụ như `rustup`, `cargo`, `clippy`, `rustfmt`… cùng version `1.x`, cập nhật đều đặn 6 tuần/lần.

> 🔧 Rust không bump major vì không cần – ecosystem làm việc như một “đội ngũ phát hành vi mô”.

---

### 💎 Ruby – Phiên bản “có cảm xúc”, phá nhưng không báo

- Ruby có truyền thống release cuối năm, và từng nổi tiếng vì... **phá API mà không báo SemVer**.
- Dù từ `v2.0` trở đi tuân SemVer trên lý thuyết, **nhiều minor vẫn gây gãy code**:
  - `2.7 → 3.0`: safe navigation (`&.`), pattern matching
  - `3.0 → 3.1`: keyword arguments thay đổi hành vi

> 📎 [Ruby 3 Release Note](https://www.ruby-lang.org/en/news/2020/12/25/ruby-3-0-0-released/)

- `Ruby 3` còn có mục tiêu “Ruby 3x faster” – tức version không chỉ là đánh dấu tính năng, mà còn... benchmark.

- Rails cũng ảnh hưởng lớn đến perception version Ruby: bản `Rails 7` yêu cầu `Ruby >= 2.7`, khiến dev phải theo vòng xoáy upgrade.

> 💔 Với Ruby, version không phá code thì... hơi lạ.

---

### 🧪 Elixir – SemVer chuẩn mực, cẩn trọng như một hiền triết

- Elixir tuân thủ **SemVer đầy đủ** với định dạng `MAJOR.MINOR.PATCH`, và thực hiện đúng các quy tắc:
  - Tăng **MAJOR** nếu có breaking change
  - Tăng **MINOR** khi thêm tính năng mới, vẫn giữ tương thích
  - Tăng **PATCH** khi sửa lỗi hoặc cải thiện không ảnh hưởng hành vi

- Tuy nhiên, điểm đặc biệt ở Elixir không nằm ở định dạng, mà nằm ở **cách họ quản lý việc thay đổi**. Cộng đồng Elixir (do José Valim dẫn dắt) có triết lý rất chặt chẽ về **stability-first**:

  - Không bao giờ đưa breaking change “đột ngột”.
  - Mọi thay đổi phá vỡ tương thích đều được **deprecate trước đó nhiều version**, thường là từ 2–3 version minor.
  - Deprecation luôn đi kèm:
    - Thông báo rõ ràng trong changelog
    - Cảnh báo runtime hoặc compile-time
    - Tài liệu thay thế / migration rõ ràng

- Ví dụ:
  - `v1.11` deprecate một số hành vi của `Code.eval_string`
  - `v1.13` deprecate `Logger.metadata/1` khi dùng sai kiểu
  - `v1.15` chính thức loại bỏ các API đã cảnh báo từ `v1.11`–`v1.13`
  → Điều này cho phép developer có **ít nhất 12–18 tháng chuẩn bị**

- Chính vì vậy, các bản **MAJOR của Elixir thường không phải để giới thiệu tính năng mới**, mà là dịp để:
  - **Gỡ bỏ các API lỗi thời**
  - **Ổn định lại API đã cảnh báo**
  - **Tái cấu trúc nhẹ cho chuẩn hóa hành vi**

- Ngoài core language, các công cụ quan trọng như:
  - `Mix` (build tool)
  - `Hex` (package manager)
  - `ExUnit` (testing)
  - và thậm chí cả VM layer (BEAM/Erlang)
  → đều được phát triển và version hóa theo cùng tinh thần cẩn trọng và tương thích cao.

> 📎 [Changelog chính thức của Elixir](https://github.com/elixir-lang/elixir/blob/main/CHANGELOG.md)

> 🧘 Với Elixir, version không chỉ để đếm — mà là nhịp thở đều đặn, ổn định và minh bạch. Một framework không hứa sẽ làm bạn “wow” ở mỗi bản mới, nhưng sẽ khiến bạn **tin tưởng** để đầu tư dài hạn.

---

### 🟦 TypeScript – Tưởng nhỏ, mà phá thì vẫn phá

- TypeScript tuân SemVer, nhưng thực tế:
  - Một số bản **minor** vẫn có breaking change (vì thay đổi kiểu có thể ảnh hưởng đến kiểm tra type của mã cũ).
- Dù gọi là "breaking", team TypeScript gọi đó là **“strictness change”**, không bump major vì không ảnh hưởng đến runtime.

> 📎 [TypeScript Versioning Policy](https://github.com/microsoft/TypeScript/wiki/TypeScript-Versioning-Policy)

- `v3.0`: introduce project references
- `v4.0`: variadic tuples
- `v5.0`: decorators chính thức, performance rewrite

- Tăng version đều đặn 3–4 bản mỗi năm. Không có LTS – dùng latest là best practice.

> ⚠️ Với TypeScript, “type error hôm nay là tính năng của ngày mai.”

---

### 🔷 Kotlin – Version tăng chậm, chuyển mình thầm lặng

- Kotlin giữ `v1.x` từ năm 2016 đến tận 2024.
- Đến `v2.0` (2024), chuyển đổi cấu trúc nền:
  - Compose Multiplatform
  - K2 compiler chính thức
  - Module reorganization

> 📎 [Kotlin 2.0 Roadmap](https://kotlinlang.org/docs/whatsnew20.html)

- Vẫn giữ backward compatibility, nhưng một số API sẽ cần flag bật thủ công (`-X` options).

- Version tăng chậm, nhưng rất ý thức – mỗi bản minor đều có changelog cực kỳ chi tiết.

> 🧭 Với Kotlin, version là một bản đồ – càng về sau, đường càng rõ.

---

### 🐘 PostgreSQL – Tiệm cận SemVer, nhưng khác một nhịp

- Trước phiên bản `10.0`, PostgreSQL dùng format `MAJOR.MINOR.PATCH`, ví dụ: `9.6.3`, `9.5.21`, v.v.
- Từ `v10` (2017), chuyển sang **2-part versioning**: `MAJOR.MINOR`.
  - Ví dụ: `15.4` = bản vá thứ 4 của dòng `15`, không có PATCH riêng.

> 📎 [PostgreSQL versioning policy](https://www.postgresql.org/support/versioning/)
> 📎 [Release notes](https://www.postgresql.org/docs/release/)

- Một bản `x.0` mới được phát hành **mỗi năm**, thường vào tháng 9.
- Các bản `.0` thường được xem là chưa ổn định; admin production thường chờ `.1` trở đi.
- Dù chỉ có 2 phần, nhưng release vẫn diễn ra thường xuyên, fix bugs và bảo mật rõ ràng.

> 🧠 PostgreSQL không cần SemVer đầy đủ – nhưng lại hành xử còn kỷ luật hơn cả SemVer.

---

### 🐬 MySQL – Bỏ cả v6, v7, và định cư lâu dài ở v8

- Từ `5.0` đến `5.7`, MySQL phát triển ổn định (Oracle đã mua lại).
- `MySQL 6.0` bị hủy do tính năng Falcon storage engine thất bại.
- Sau đó, Oracle **bỏ qua v6 & v7, nhảy thẳng lên `8.0`**, phát hành năm 2018.

> 📎 [MySQL 8.0 release notes](https://dev.mysql.com/doc/relnotes/mysql/8.0/en/)

- `8.0` đã tồn tại từ 2018 đến nay (2025), với hơn 35 bản vá nhỏ: `8.0.1`, `8.0.33`, `8.0.36`…
- Oracle giữ `MAJOR.MINOR` cố định, và **chỉ tăng PATCH** đều đặn vài tháng một lần.
- Các bản mới vẫn có tính năng lớn: Invisible Indexes, Hash Join, JSON_TABLE… nhưng không đổi MAJOR.

> 🐢 Với MySQL, version ổn định là tài sản – tăng số cũng phải “nói chuyện với sales”.

---

### 🍃 MongoDB – CalVer trá hình, một năm một lần

- Từng dùng `2.6`, `3.0`, `3.6`, `4.2`, nhưng từ `5.0` (2021) chuyển sang lịch phát hành mới:
  - **1 bản major mỗi năm**, ~tháng 7
  - **1 bản minor mỗi quý**, PATCH định kỳ

> 📎 [MongoDB release schedule](https://www.mongodb.com/docs/manual/release-notes/)

- Không dùng CalVer chính thức, nhưng **tăng số major đều như CalVer**:
  - `5.0` (2021) → `6.0` (2022) → `7.0` (2023)

- Tính năng mới đi kèm version rõ ràng:
  - `6.0`: Time Series Enhancements
  - `7.0`: Queryable Encryption

- Version tăng đều, nhưng Mongo không theo SemVer – vẫn phá API nhẹ ở minor (ví dụ: bỏ syntax cũ cho aggregation).

> 🔁 MongoDB dùng version như một timeline sống động – không cố định về format, nhưng rất nhất quán về nhịp độ.

---

### SQL Server – Số thì tăng, tên thì… khác hẳn

- SQL Server dùng **CalVer cho tên thương mại**: `SQL Server 2008`, `2012`, `2019`, `2022`
- Nhưng version thật lại là `10.x`, `11.x`, `15.x`, `16.x`...

> 📎 [SQL Server build numbers](https://learn.microsoft.com/en-us/troubleshoot/sql/releases/sql-server-build-versions)

- Ví dụ:
  - `SQL Server 2019` = `v15.x`
  - `SQL Server 2022` = `v16.x`

- Các bản cập nhật có dạng Cumulative Update (`CU10`, `CU12`...), đi kèm số build dài ngoằng (`15.0.4102.2`)

- Vì admin thường quan tâm đến **tên thương mại**, còn dev/script cần `@@VERSION`, nên Microsoft giữ 2 tầng version riêng.

> 🔍 Với SQL Server, version là hai mặt – một cho marketing, một cho PowerShell.

---

### 🧱 SQLite – Nhỏ gọn, version như mã định danh

- SQLite dùng version `X.Y.Z`, nhưng thật ra là **chuyển thể từ ngày + số lượng testcase**:
  - `3.36.0` = phiên bản tháng 6/2021, sau 3 triệu test cases

> 📎 [SQLite Chronology](https://www.sqlite.org/chronology.html)
> 📎 [Release policy](https://www.sqlite.org/releaselog/)

- Không có LTS, không có CalVer, không cần major bump – mỗi bản mới được đánh số tuần tự.
- Code cực kỳ ổn định, có bản build lại được từ năm 2000 – lý do khiến họ không cần thay đổi versioning strategy.

> 🪶 Với SQLite, version là dấu vết — không phải tuyên bố.

---

### 🧊 Cassandra – Version nghẽn cổ chai vì tiến độ

- Cassandra dùng SemVer, nhưng bản `v4.0` mất hơn **6 năm** để phát hành (2015 → 2021)
  - Lý do: yêu cầu stability cực cao cho production workloads

> 📎 [Cassandra 4.0 release notes](https://www.datastax.com/blog/announcing-apache-cassandra-4-0)

- `v4.1` (2022) ra sau đó khá nhanh – cải tiến background compaction, TLSv1.3 support
- `v5.0` (dự kiến từ 2023) **đã trì hoãn nhiều lần**, đang ở beta

> 📎 [Cassandra 5.0 roadmap](https://cwiki.apache.org/confluence/display/CASSANDRA/5.0+Release+Plan)

- Hệ sinh thái lớn (DataStax, Netflix, etc.) yêu cầu upgrade cực kỳ cẩn trọng – mỗi version là một trận đánh.

> ⏳ Cassandra dùng version như mã phát hành sản phẩm quốc phòng.

---

### 🔁 Redis – Nhỏ gọn nhưng vẫn “bóp nhẹ” ở minor

- Redis tuân SemVer, nhưng minor version **có thể có breaking** nhỏ:
  - Ví dụ: `7.2` thêm ACL rules mới, thay đổi format config

> 📎 [Redis changelog](https://github.com/redis/redis/blob/unstable/00-RELEASENOTES)

- Các bản `6.0`, `7.0` có nhiều cải tiến sâu (IO threading, ACL, RedisJSON), nhưng vẫn giữ backward tương đối.

- Tăng version đều đặn ~1 năm/bản major, nhưng luôn cung cấp doc upgrade rõ ràng.

> 🧠 Redis giống một ông anh kỹ tính: “anh sửa đấy, nhưng anh sẽ nói trước.”

---

### 📊 ClickHouse – CalVer thực dụng, đổi version như lịch Excel

- ClickHouse dùng version kiểu `YY.MM`, ví dụ:
  - `22.8`, `23.3`, `24.1` – mỗi tháng đều có thể có bản mới

> 📎 [ClickHouse release notes](https://clickhouse.com/docs/en/whats-new/release-notes/)

- Không theo SemVer: có thể phá API ở `23.1` nhưng không tăng MAJOR
- Bản LTS được gắn tag riêng, ví dụ: `22.3 LTS`

- Tốc độ phát hành nhanh, nhưng changelog chi tiết đến từng pull request → phù hợp cho hệ thống data pipeline lớn cần version rõ.

> 🧾 ClickHouse dùng version như bảng chấm công – mỗi tháng tick một dòng, và không chờ ai.

---

### 🧸 Debian – Tên gọi Toy Story, version truyền thống

- Debian là hệ điều hành Linux được phát triển bởi cộng đồng, có lịch sử lâu đời nhất trong các distro còn hoạt động mạnh.
- Phiên bản Debian có **số hiệu kiểu `X.Y`** như `12.5`, `11.7`, tương đối giống SemVer nhưng không có quy định rõ ràng về breaking change.

> 📎 [Debian Releases](https://www.debian.org/releases/)
> 📎 [Debian Version History](https://www.debian.org/doc/manuals/project-history/releases.en.html)

- Điểm đặc biệt: **mỗi bản phát hành có tên mã theo nhân vật Toy Story**, ví dụ:
  - `1.1` Buzz
  - `2.2` Potato
  - `6.0` Squeeze
  - `7` Wheezy
  - `12` Bookworm
- Các tên mã thường được nhắc đến trong quá trình cài đặt hoặc cấu hình sources list (`/etc/apt/sources.list`)

> 🎭 Với Debian, version là định danh kỹ thuật – còn codename là bản sắc cộng đồng.

---

### 🐧 Ubuntu – Lược đồ theo thời gian và… động vật

- Ubuntu dùng **CalVer dạng `YY.MM`**, ví dụ:
  - `20.04`, `22.04`, `24.04` – phát hành đều đặn tháng 4 và tháng 10 hằng năm

> 📎 [Ubuntu release cycle](https://ubuntu.com/about/release-cycle)

- Mỗi bản Ubuntu có tên **động vật** theo thứ tự alphabet:
  - `16.04 Xenial Xerus`
  - `18.04 Bionic Beaver`
  - `22.04 Jammy Jellyfish`
  - `24.04 Noble Numbat`

- Các bản `.04` là LTS (Long-Term Support), được Canonical hỗ trợ 5 năm (có thể gia hạn đến 10 năm với Ubuntu Pro)

> 🐾 Ubuntu là CalVer “thuần chủng” nhất, dùng version như nhịp độ thời gian sản phẩm.

---

### 🍎 macOS – Sống với `10.x` gần 20 năm, rồi nhảy vọt

- Từ năm 2001 đến 2020, macOS (trước đây là OS X) giữ nguyên major `10`, chỉ tăng minor:
  - `10.1 Puma` → `10.14 Mojave` → `10.15 Catalina`
- Mỗi bản đi kèm tên gọi theo **địa danh California** kể từ `10.9 Mavericks`

> 📎 [macOS version history – Apple](https://support.apple.com/en-us/HT201260)

- Đến `Big Sur` (2020), Apple **bỏ mốc `10` và đổi thành `11.0`**
  - Sau đó: `12 Monterey`, `13 Ventura`, `14 Sonoma`, v.v.

- Về kỹ thuật, version nội bộ vẫn là `21.x`, `22.x`, `23.x`... tương ứng với Darwin kernel version.

> 🔁 macOS dùng version như cách Apple làm thiết kế: không thay đổi số nhiều, nhưng khi đổi là đổi luôn cả hệ hình ảnh.

---

### Windows – Khi version thật khác cái bạn thấy

- Người dùng thấy: `Windows XP`, `7`, `8`, `10`, `11`
- Nhưng version nội bộ lại là:
  - `Windows XP` = `5.1`
  - `Windows 7` = `6.1`
  - `Windows 10` = `10.0`
  - `Windows 11` = `10.0` luôn (same kernel!)

> 📎 [Why no Windows 9 – Raymond Chen](https://devblogs.microsoft.com/oldnewthing/20140930-00/?p=43903)

- Lý do bỏ `Windows 9`: để tránh nhầm lẫn với check `Windows 95`, `98` trong các phần mềm cũ:
  ```js
  if (version.startsWith("Windows 9")) { ... }  // match 95, 98
  ```

- Version build đầy đủ dạng: `10.0.22621.3447`, dùng cho phân biệt feature update và cumulative patch.

> 🧙 Windows dùng version như ảo thuật – có cái để nhìn, có cái để máy đọc.

---

### 🤖 Android – Bánh kẹo chuyển mình thành số

- Trước Android 10, mỗi bản Android có tên bánh ngọt:
  - `1.5 Cupcake`, `2.3 Gingerbread`, `4.4 KitKat`, `8.0 Oreo`, `9.0 Pie`
- Từ Android 10 (2019), Google bỏ tên bánh – chỉ dùng số `10`, `11`, `12`, `13`, `14`

> 📎 [Android version history – official](https://source.android.com/docs/setup/about/build-numbers)

- Tuy nhiên, **tên nội bộ vẫn còn**, ví dụ:
  - Android 13 = “Tiramisu”
  - Android 14 = “Upside Down Cake”

- Dòng build gồm nhiều tầng:
  - API level (ex: 34)
  - Build ID (`UP1A.240305.007`)
  - Kernel version

> 🍬 Android có thể lớn lên, nhưng vẫn giữ chút “ngọt ngào” trong tên nội bộ.

---

### 🧬 Linux Kernel – Sống lâu trong chuỗi `1.x`, `2.x`, rồi nhảy đều

- Kernel Linux từng giữ `2.6.x` suốt **từ 2003 đến 2011**
- Sau đó:
  - `3.x` (2011–2015)
  - `4.x` (2015–2019)
  - `5.x` (2019–2022)
  - `6.x` (từ 2022 đến nay)

> 📎 [Linux Kernel release timeline – Wikipedia](https://en.wikipedia.org/wiki/Linux_kernel#Version_numbering)

- Không theo SemVer: một bản `5.10` có thể sống rất lâu, được cập nhật security đều đặn hàng tháng
- `Longterm` kernel được chọn riêng bởi maintainers → bản như `5.4`, `5.10`, `6.1` sống đến 6 năm+

> 🦖 Kernel Linux không tăng version để vui – mà để phản ánh sự dịch chuyển của nền tảng phần cứng.

---

### 🐣 Fedora – Version như lúa lên đều

- Fedora tăng version mỗi 6 tháng, `v38` → `v39` → `v40` (2024)
- Mỗi bản sống khoảng 13 tháng, không có LTS – được dùng như “sandbox” cho RHEL sau này.

> 📎 [Fedora Release Schedule](https://fedorapeople.org/groups/schedule/)

- Không theo SemVer, không theo CalVer, chỉ **một số nguyên tăng đều**, bản mới = “bộ sưu tập mới”
- Tính năng lớn (Systemd, PipeWire, GNOME major...) thường xuất hiện ở đây trước khi đi mainstream

> 🌾 Với Fedora, version là mùa vụ: ai theo kịp thì gặt, ai lười thì ngủ đông.

### 🌐 Chrome – Version tăng đều như deadline

- Chrome từ `v1` (2008) → `v124` (2024) – tức tăng hơn **100 version trong 16 năm**
- Từ 2021, Google chính thức rút chu kỳ phát hành xuống **4 tuần/lần**, tạo nên mô hình “version như deadline”.

> 📎 [Chrome 4-week release cycle](https://blog.chromium.org/2021/03/speeding-up-release-cycle.html)

- Không tuân SemVer: bất kỳ bản `vX` có thể chứa thay đổi nhỏ hoặc lớn
- Tính năng mới có thể bị **ẩn sau flag**, rollout từ từ qua field trial

> 🏃 Chrome coi version là mốc quản lý tiến độ – không phải để nói bạn nên update hay không.

---

### 🦊 Firefox – Đuổi theo Chrome bằng chiến thuật sprint

- Firefox từng từ `v1` đến `v4` rất chậm (2004–2011), nhưng sau đó:
  - Tăng **1 major mỗi 6 tuần** → `v5` đến `v28` chỉ trong ~3 năm!
- Mục tiêu: tránh thua thiệt về perception “độ hiện đại” khi Chrome tăng số vèo vèo

> 📎 [Firefox version history – Mozilla Wiki](https://wiki.mozilla.org/Release_Management/Calendar)

- Về sau Mozilla chuyển sang lịch phát hành 4 tuần (giống Chrome), hiện tại là `v124+`

- Dù major tăng đều, mỗi bản vẫn có changelog chi tiết – dev cần theo dõi là chính

> 🔁 Firefox dùng version như số áo cầu thủ chạy wing: không quan trọng số mấy, miễn là chạy nhanh.

---

### 🍏 Safari – Phiên bản thấp, động cơ mạnh

- Safari hiện tại (2024) chỉ ở `v17.4`, dù xuất hiện từ 2003
- Mỗi bản Safari gắn liền với macOS: Safari 16 đi với Ventura, Safari 17 đi với Sonoma

> 📎 [Safari Release Notes](https://developer.apple.com/safari/)

- Tuy nhiên, phần quan trọng nhất là **WebKit** – engine bên trong – có version và changelog riêng.
- Apple ưu tiên backward compatibility, nên version tăng chậm – nhưng thay đổi engine có thể rất sâu (WebGPU, AVIF...)

> 🧊 Safari dùng version như Apple dùng jack tai nghe: ít thay đổi, nhưng khi đổi thì có lý (mà bạn không cần hiểu 😄)

---

### 🧩 Edge (Chromium) – Bản sao version Chrome

- Microsoft Edge Chromium (ra mắt 2020) dùng chung engine với Chrome → **version gần như trùng khớp**

> 📎 [Edge release schedule](https://learn.microsoft.com/en-us/deployedge/microsoft-edge-relnote-stable-channel)

- Nếu Chrome ở `v124.0.6367.92`, thì Edge thường ở `124.0.2478.51` – khác phần sau do patch riêng

- Cũng phát hành 4 tuần/lần, và có các channel: `Stable`, `Beta`, `Dev`, `Canary`

> 🪞 Version của Edge là hình phản chiếu Chrome – nhưng đằng sau gương là Microsoft ecosystem.

---

### 🧩 TeX – Version như số π, càng gần càng ít thay đổi

- Từ bản `3.0` năm 1989, Donald Knuth tuyên bố: **không thêm tính năng mới nữa**
- Mỗi bản fix chỉ thêm 1 chữ số sau dấu phẩy – tiệm cận số π:
  - `3.141`, `3.1415`, `3.14159`, `3.1415926`...

> 📎 [TeX FAQ – Versioning](https://tug.org/texfaq/FAQ-versions.html)

- Khi Knuth qua đời, bản cuối cùng sẽ được đánh số là... π và frozen mãi mãi

> 🧠 TeX không chỉ là phần mềm, mà là một tuyên ngôn toán học về sự bất biến.

---

### 🎮 Unreal Engine – Version như... thời đại

- Unreal Engine dùng version `X.Y`, ví dụ:
  - `UE3`, `UE4`, `UE5.3`
- Mỗi major là **1 thế hệ engine hoàn toàn mới**, thường cách nhau 5–7 năm

> 📎 [UE version history](https://docs.unrealengine.com/5.0/en-US/unreal-engine-release-notes/)

- `UE5` (2022) giới thiệu Nanite, Lumen – đòi hỏi project migrate toàn bộ
- `Minor` (`5.1`, `5.2`,...) thêm tính năng, fix bug lớn

> 🎬 Với Unreal, version giống số phần Fast & Furious – bạn không cần nhớ từng cái, chỉ cần biết “nó là đời mới”.

---

### 🎮 Unity – CalVer chuẩn `YYYY.X`, không có MAJOR

- Unity từ 2017 dùng lược đồ CalVer `YYYY.X`, ví dụ:
  - `2021.3`, `2022.2`, `2023.1`

> 📎 [Unity release cycle](https://unity.com/releases/editor/qa/lts-releases)

- `.X` là Tech Stream (TS) – bản mới nhiều tính năng
  - `.3` thường là bản LTS, được support 2 năm

- Trước đó Unity có version `5.x`, `2017.x`, rồi chuyển dần sang CalVer sau khi 2 dòng TS/LTS được tách rõ

> ⏳ Unity dùng version như checkpoint trong game – không nhất thiết phải update, nhưng biết là mình đang ở đâu.

---

### 🔐 OpenSSL – Khi version là chính sách bảo mật

- Trước `v3`, OpenSSL dùng version kiểu `1.0.2`, `1.1.1`, với từng bản có vòng đời LTS riêng
- Đến năm 2021, ra mắt `v3.0.0`, cải tổ policy version hóa:
  - Version `X.Y.Z`
  - **X**: major – breaking
  - **Y**: minor – feature, backward-compatible
  - **Z**: patch

> 📎 [OpenSSL release strategy](https://www.openssl.org/policies/releasestrat.html)

- `v3.0` là bản đầu tiên dưới chính sách mới, LTS đến 2026
- `v3.2`, `v3.3` thêm tính năng như QUIC, engine rewrite

> 🛡️ OpenSSL dùng version như giấy chứng nhận an toàn – ai dùng bản cũ tự chịu trách nhiệm.

### Tổng hợp

| STT | Hệ thống         | Lược đồ version chính            | Ghi chú nổi bật |
|-----|------------------|----------------------------------|-----------------|
| 1   | Angular          | SemVer + CalVer hybrid           | Bỏ v3, major 6 tháng, ecosystem đồng bộ |
| 2   | React            | SemVer (rất cẩn trọng)           | Không có v1–14, v17 không feature |
| 3   | Node.js          | SemVer + lịch riêng              | Tách io.js, 2 major/năm, LTS |
| 4   | Vue.js           | SemVer                           | v3 chậm phổ biến do ecosystem |
| 5   | Django           | SemVer + LTS định kỳ             | Major 8 tháng, LTS 2 năm |
| 6   | Laravel          | SemVer (theo năm)                | Major hàng năm, upgrade dễ |
| 7   | Symfony          | SemVer với LTS `x.4`             | Predictable, chu kỳ ổn định |
| 8   | Flutter          | CalVer-style + Channel           | Không rõ breaking, sync Dart |
| 9   | Go               | SemVer (`1.x` mãi mãi)           | Go 2 là mindset, không đổi số |
| 10  | Rust             | SemVer chặt                      | Tính năng lớn vẫn `1.x` |
| 11  | Python           | SemVer "áo", không cam kết      | Minor có thể phá, có alpha/rc |
| 12  | Java             | CalVer trá hình                  | Major 6 tháng, LTS 3 năm |
| 13  | Ruby             | SemVer lỏng                      | Minor phá code, nhiều cảm xúc |
| 14  | Elixir           | SemVer ổn định cao               | Deprecate dài, hiếm break |
| 15  | TypeScript       | SemVer lý thuyết                 | Minor có breaking về types |
| 16  | Kotlin           | SemVer chậm                      | v2 ra sau 8 năm |
| 17  | PostgreSQL       | MAJOR.MINOR                      | Không PATCH, major mỗi năm |
| 18  | MySQL            | SemVer-ish                       | Bỏ v6/v7, stuck ở v8 |
| 19  | MongoDB          | CalVer-style                     | Major mỗi năm, rõ lifecycle |
| 20  | SQL Server       | CalVer + internal build          | Tên khác version thật |
| 21  | SQLite           | Ngày + số testcase               | Rất ổn định, không major bump |
| 22  | Cassandra        | SemVer + delay dài               | v4 mất 6 năm, v5 trễ nải |
| 23  | Redis            | SemVer, minor có thể phá nhẹ     | Changelog rõ, dễ migrate |
| 24  | ClickHouse       | CalVer `YY.MM`                   | Mỗi tháng một bản |
| 25  | Debian           | MAJOR.MINOR + codename Toy Story| Tên gắn văn hóa Toy Story |
| 26  | Ubuntu           | CalVer `YY.MM` + động vật        | LTS bản chẵn tháng 4 |
| 27  | macOS            | Từ `10.x` → `11+`                | Version phản ánh hệ hình ảnh |
| 28  | Windows          | Tên ≠ version thật               | Bỏ `9`, version thật là `10.0.xxxx` |
| 29  | Android          | Bánh → số                        | Codename vẫn còn nội bộ |
| 30  | Linux Kernel     | MAJOR.x                          | Không SemVer, có LTS chọn lọc |
| 31  | Fedora           | Tăng số nguyên đều               | Không LTS, 6 tháng/bản |
| 32  | Chrome           | Major đều 4 tuần                 | Version = deadline, không SemVer |
| 33  | Firefox          | Major đều như Chrome             | Sprint version, có lịch rõ |
| 34  | Safari           | Version thấp, engine mới         | Gắn với macOS, WebKit riêng |
| 35  | Edge             | Theo Chrome                      | Sync Chromium version |
| 36  | TeX              | Tiệm cận π                       | Fix bug = thêm chữ số |
| 37  | Unreal Engine    | MAJOR = thế hệ engine            | v5 = Nanite, Lumen |
| 38  | Unity            | CalVer `YYYY.X`, `.3` = LTS      | Tách Tech Stream & LTS |
| 39  | OpenSSL          | SemVer + LTS policy              | v3 cải cách version chính thức |
| 40  | Brave            | Clone Chrome, rút gọn version    | Có canary/beta riêng |

## Chọn lược đồ nào?

Theo [hướng dẫn từ trang chủ CalVer](https://calver.org/overview.html#when-to-use-calver), nếu dự án của bạn có các đặc điểm:

- Quy mô lớn, thường xuyên thay đổi
- Lĩnh vực phục vụ nhạy cảm với thời gian, múi giờ
- Phát triển đến mức độ mà SemVer không còn phù hợp (như CockroachDB)

thì hãy chọn CalVer. Các trường hợp còn lại (là đa số), SemVer sẽ là chân ái.

## Tham khảo

- [[Official Specs] SemVer](https://semver.org/)
- [[Official Specs] CalVer](https://calver.org/)
- [[Wikipedia] Software Versioning](https://www.wikiwand.com/en/Software_versioning)
- [[Wikipedia] Software Release Lifecycle](https://www.wikiwand.com/en/Software_release_life_cycle)
