---
title: Bí kíp viết code "như một nhẫn giả"
slug: bi-kip-viet-code-nhu-mot-nhan-gia
date: 2019-08-26 22:32:08
draft: false
favorite: true
categories:
  - Lập trình
tags:
  - javascript
  - best-practices
  - programming-jokes
---

Khổng Tử nói: "Học mà không nghĩ thì phí công phí sức, nghĩ mà không học thì hiểm họa khôn lường".
<!--more-->

> Nhẫn Giả hay còn gọi là Ninja (忍者) hoặc Shinobi (忍び) - cách viết vắn tắt của shinobi no mono (忍の者). Trong nghĩa gốc Hán, chữ 忍 có nghĩa là "nhẫn" (nhẫn nhịn, kiên nhẫn), trong tiếng Nhật nó lại có nghĩa là "ẩn" (ẩn nấp, tàng ẩn). Chữ 者 nghĩa là "giả" (người).

{{< im "/images/gallery/ninja-code/ninja.jpg" "" 500 >}}

Từ ngàn xưa, các ninja lập trình đã dùng những chiêu thức sắp kể sau đây để tôi luyện trí não cho các maintainer.

Cao thủ review code trong thiên hạ tìm kiếm những thứ này trong khi test code.

Các tiểu tử miệng còn hôi sữa đôi khi lại thi triển thuần thục hơn cả các ninja!

Hãy đọc cho kỹ "tàng kinh các" sau để biết mình đang ở đâu - một ninja, một đệ tử tập sự hay một reviewer. Dù là ai đi nữa, bạn hoàn toàn có thể bị hạ gục, hoặc chính bạn dù gà mờ cũng có thể khiến một cao thủ ninja vò đầu bứt óc bằng cách dùng ít nhất một trong các chiêu thức sau đây.

## 🥷 Cô đọng là tinh hoa

Hãy viết code ngắn nhất có thể, càng ngắn càng thể hiện bạn thông minh, cực kỳ thông minh.

Thông minh mới lĩnh hội được những tinh túy sâu thẳm nhất trong ngôn ngữ kia.

Chẳng hạn, hãy nhìn vào toán tử rẽ nhánh rút gọn (ternary operator) `?` sau đây

```js
// lấy từ một thư viện Javascript nổi tiếng
i = i ? i < 0 ? Math.max(0, len + i) : i : 0;
```

Rất ngầu phải không? Hẳn sẽ có nhiều trò vui nếu một vị lãng nhân vô tình ngang qua dòng code này và gắng tìm ra giá trị của `i`. Hắn sẽ phải mò đến bạn, để có câu trả lời.

Hãy nói với hắn rằng, cô đọng là tinh hoa. Hãy dẫn dắt hắn vào con đường trở thành một ninja code như bạn.

## 🥷 Đặt tên biến một ký tự

Một chiêu thức hữu hiệu để code nhanh hơn đó là sử dụng tên biến chỉ có một ký tự như `a`, `b` hoặc `p`, mọi lúc mọi nơi!

Các biến này hòa vào trong code như một ninja vụt mất sau cánh rừng thẳm: không ai có thể tìm được chúng bằng tính năng "search" của editor. Hoặc kể cả khi một gã may mắn nào đó tìm được, hắn chẳng thể "giải mã" được `a` hay `b` có ý nghĩa gì.

...Nhưng có một ngoại lệ: một ninja đích thực không bao giờ đặt biến đếm là `i` trong vòng lặp `for` cả. Nhìn quanh mà xem, `x` hoặc `y` chẳng hạn chẳng phải bí hiểm hơn nhiều sao.

Những tên biến kỳ vĩ như thế càng trở nên ảo diệu hơn trong trường hợp thân vòng lặp dài cả 1,2 trang (gắng viết dài hơn nữa nếu được). Lúc này nếu ai đó muốn khám phá vòng lặp này, họ sẽ không dễ gì mà thấy được `x` ở đây là biến đếm của vòng lặp.

## 🥷 Dùng ký hiệu viết tắt

Nếu không may luật của team cấm sử dụng biến một ký tự hoặc tên kém nghĩa - hãy thu gọn chúng lại thành các *ký hiệu viết tắt*.

Như này:

- list → lst.
- userAgent → ua.
- browser → brsr.
*..vân vân*

Ai có trực giác tốt mới hiểu được những cái tên này. Hãy rút ngắn tất cả. Chỉ những người xứng đáng mới được phát triển di sản code của bạn.

## 🥷 Bồng bềnh như làn sương mờ ảo

Hãy chọn những cái tên mơ hồ nhất có thể, ví dụ `obj`, `data`, `value`, `item`, `elem`..

- `data` là cái tên mơ ước với mọi biến. Biến nào mà chẳng chứa dữ liệu, phải không?
  ...Nhưng nếu `data` đã được đặt rồi thì sao? Hãy thử `value`. Chân lý rồi, sau tất cả, biến phải có một giá trị nào đó chứ, kể cả là `null` hay `undefined`.

- Dùng kiểu của biến làm tên cho nó luôn: `str`, `num`...
  Những tên biến này có quá tầm thường với một ninja? Không hề. Rõ ràng, việc dùng kiểu dữ liệu làm tên biến có ý nghĩa hẳn hoi. Nhưng nếu một kẻ ngoại đạo lạc vào code và nhìn thấy các biến này, thì lại chẳng thu được chút thông tin nào. Hắn ta sẽ chẳng thể xâm hại đến pho code cao diệu của bạn.

- ...Nhưng nếu tất cả những cái tên tuyệt đỉnh này đều đã được đặt? Dễ lắm, hãy thêm số vào: `data1`, `item2`, `elem5`...

## 🥷 Kiểm tra độ tập trung

Chỉ những lập trình viên thật sự tập trung mới có vinh dự được hiểu code của bạn. Nhưng làm thế nào để kiểm tra điều đó?

**Có một cách đơn giản - sử dụng tên biến gần giống nhau, như `date` và `data`.**

Trộn chúng vào nhau.

Không thể đọc lướt mà hiểu được code kiểu này. Và nếu chẳng may bạn ...gõ sai ở đâu đó, chúng ta sẽ có thêm thời gian để thưởng trà và đàm đạo.

## 🥷 Từ đồng nghĩa khôn ngoan

> Không gì khó bằng việc phải tìm một con mèo đen trong một căn phòng tối, nhất là khi không có con mèo nào cả.</p>
> — <cite>Khổng Tử</cite>

Sự lặp lại đôi khi thật nhàm chán. Cuộc đời sẽ thi vị hơn biết bao khi ta sử dụng nhiều từ khác nhau để diễn tả cùng một sự vật. Thiên hạ sẽ trầm trồ trước sự sáng tạo của ta.

Ví dụ, bạn hãy sử dụng tiếp đầu ngữ cho tên biến. Nếu một hàm làm nhiệm vụ đưa thông báo lên màn hình - hãy bắt đầu nó bằng `display...` như `displayMessage`. Một hàm khác đưa tên user lên màn hình lại bắt đầu bằng `show...`, chẳng hạn `showUserName`.

Hãy tạo cảm giác hai hàm y như tạc về chức năng này có sự khác biệt nào đó.

Hãy lan tỏa tinh thần ra các ninja khác trong team: bạn dùng `display...`, John dùng `render...`, Ann lại thích `paint...` Wow, code sẽ trở nên đặc sắc, và loạn xạ, hơn bao giờ hết.

...Nhưng đây mới là cao trào!

Kể cả với hai hàm chức năng khác nhau hoàn toàn, hãy cứ dùng chung một tiếp đầu ngữ!

Thế này, hàm `printPage(page)` được dùng cho máy in, trong khi hàm `printText(text)` thì hiện văn bản lên màn hình. Một người đọc code tầm thường sẽ không khỏi rối trí: vậy thì hàm `printMessage` sẽ đưa thông điệp ra máy in hay lên màn hình hiện tại? Và để ghi cú hat-trick, `printMessage(message)` nên xuất thông điệp lên một cửa sổ mới!

## 🥷 Dùng lại tên biến

Chỉ tạo tên mới khi thực sự cần thiết.

Còn không, hãy tái sử dụng tên biến. Ghi đè giá trị mới lên là đủ.

Nếu là hàm, hãy tận dụng những biến đối số được truyền vào.

Khi đó, giá trị của biến là gì, xuất phát từ đâu? Quá khó để trả lời. Mục đích là để mài giũa trực giác và trí nhớ của người đọc code. Một người trực giác yếu sẽ phải phân tích code từng dòng một và để ý chi li mỗi khi code rẽ nhánh.

**Một dị bản cao cấp của cách tiếp cận này đó là len lén thêm một hai câu lệnh "hòa cả làng" vào thân vòng lặp hoặc thân hàm.**

```js
function ninjaFunction(elem) {
  // 20 dòng đầu làm việc với elem
  elem = clone(elem);
  // 20 dòng sau làm việc với clone của elem
}
```

Đồng môn của bạn, đang chạy code với elem, đến nửa sau của hàm sẽ phải sững sờ... Chỉ đến khi debug, họ mới biết đang làm việc với clone của elem.

Phép thuật này không hiếm gặp trong code. Sát thương cực mạnh, ngay cả với những ninja lão làng.

## 🥷 "Gạch dưới" vì đam mê

Hãy thêm `_` và `__` vào trước tên biến, ví dụ `_name` và `__value`. Thật tuyệt nếu chỉ mình bạn hiểu ý nghĩa của chúng. Hoặc cao hơn, làm vậy cho vui thôi, không có nghĩa gì đặc biệt cả. Hay ma mị hơn nữa là ý nghĩa thế nào còn tùy thuộc vào vị trí xuất hiện của chúng trong code.

Một công đôi việc. Thứ nhất, code sẽ dài hơn, khó đọc hơn hẳn, và thứ hai, các đồng môn của bạn sẽ tốn thời gian hơn để làm rõ ý nghĩa của dấu gạch dưới là gì.

Một ninja lanh lợi sẽ dùng gạch dưới ở chỗ này và không dùng ở chỗ khác. Code sẽ phân mảnh, khó maintain và tăng cơ hội cho các lỗi xuất hiện trong tương lai.

## 🥷 Lồng vào cảm xúc

Hãy để loài người thấy các thực thể trong code của bạn tuyệt mỹ đến nhường nào. Các tên biến như `superElement`, `megaFrame` và `niceItem` chắc chắn sẽ khai sáng cho người đọc code.

Thật vậy, một mặt, mọi thứ sẽ "chất hơn", "kỳ diệu hơn", "dễ thương hơn". Mặt khác, chúng lại không hề mang lại thông tin gì. Người đọc code sẽ băn khoăn rằng có ẩn ý gì không, có khi phải ngồi thiền một vài giờ công nhật để giải tỏa căng thẳng.

## 🥷 Chồng lấn scope biến (Shadow name)

Hãy dùng cùng một tên biến cả trong và ngoài hàm. Đơn giản. Sao phải tốn công nghĩ ra tên mới.

```js
let user = authenticateUser();

function render() {
  let user = anotherValue();
  // ...
  // ...rất nhiều code tiếp sau...
  // ...
  // ... <-- Một dev khác muốn làm việc từ đây
  // ...
}
```

Một lãng khách nhảy vào `render` sẽ không dễ gì nhận ra `user` trong hàm đang "bóng đè" lên `user` ngoài. Hắn sẽ giả thiết giá trị `user` được trả về từ `authenticateUser()`. Bẫy sập! Xin chào debugger...

## 🥷 Tác dụng phụ (Side Effect) khắp nơi

Một số hàm, như `isReady()`, `checkPermission()`, `findTags()`, có vẻ như không thay đổi gì cả. Chúng được cho là sẽ thực hiện tính toán và trả về kết quá, không đả động gì đến bất cứ thứ gì bên ngoài hàm. Nói cách khác, không có "tác dụng phụ".

**Một tà thuật hữu hiệu đó là, bên cạnh nhiệm vụ chính, hãy thêm những hành vi thú vị vào các hàm này.**

Hãy nhìn vào khuôn mặt đáng thương của anh bạn đồng môn khi thấy các hàm `is..`, `check..`, `find..` lại tác động đến những thức khác - chắc chắn sẽ khai minh cho đầu óc luận lý của cậu ta.

**Một cách làm khác nhẹ tay hơn đó là trả về các kết quả khác chuẩn.**

Hãy để `checkPermission` thay vì trả về `true/false`, lại là một object phức tạp có chứa kết quả check bên trong.

Những dev ngây thơ cố viết `if (checkPermission(..))` sẽ kinh ngạc khi code không chạy. Bao dung nói với chúng "Đọc tài liệu đi!". Và gửi kèm tàng kinh các này.

## 🥷 Tạo ra các hàm quyền năng

Đừng giới hạn khả năng của hàm bởi tên của chúng. Nghĩ thoáng ra.

Ví dụ, hàm `validateEmail(email)` bên cạnh việc check email có hợp lệ không, hãy xuất thống báo lỗi và yêu cầu nhập lại email nữa.

Các hành động thêm vào không nên thể hiện qua tên hàm. Một ninja đích thực còn làm cho chúng không rõ ràng cả trong code nữa.

**Hợp nhất nhiều hành động vào một hàm giúp bảo vệ code của bạn khỏi việc bị dùng lại.**

Thử tưởng tượng, một dev khác chỉ muốn check email và không xuất ra thông báo gì cả. Hàm `validateEmail(email)` của bạn không đáp ứng cả hai. Vậy là họ chẳng thể khai thác được gì từ bạn.

## 🥷 Kết luận

Tất cả những "tà chiêu" ở trên đều được đúc rút từ code thật, thậm chí tác giả nhiều khi là những dev giàu kinh nghiệm, giàu hơn bạn tưởng nữa.

- Bắt chước một vài, code của bạn biến ảo khó lường.
- Tu luyện phần lớn, code của bạn bất khả xâm phạm: không ai có thể (thèm?) sửa code của bạn nữa.
- Thuần thục tất cả, code của bạn được lưu danh sử sách như bài học vô giá cho những dev trẻ đang khao khát được khai sáng.

## 🥷 Tham khảo

[Javascript.info: Ninja code](https://javascript.info/ninja-code)
