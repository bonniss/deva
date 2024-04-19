---
title: Hết năm 2018, tôi không giỏi như mọi người nghĩ
slug: het-nam-2018-toi-khong-gioi-nhu-moi-nguoi-nghi
date: 2019-08-12 01:13:47
categories:
  - Quan điểm
tags:
  - toi-dich
  - dan-abramov
  - overreacted
summary: Có rất rất nhiều thứ tôi không rành như mọi người vẫn tưởng tượng. Tôi không thấy đó là điều gì khủng khiếp và cũng chẳng có ý định ca thán.
---

> *[Lời người dịch]*
>
> [Dan Abramov](https://twitter.com/dan_abramov) là developer@Reactjs của Facebook. Anh là đồng tác giả của [Redux](https://github.com/reduxjs/redux) và [create-react-app](https://github.com/facebook/create-react-app). Ngoài việc là một core member của team React, Dan đóng góp rất tích cực vào cộng đồng open source qua những trả lời issue trên Github hay [những bài viết cực kỳ chất lượng trên Medium](https://medium.com/@dan_abramov), hỗ trợ hiệu quả cho các dev Javascript trên toàn thế giới. Dan còn là một diễn giả ấn tượng tại các sự kiện lớn của cộng đồng Javascript với lối diễn đạt gần gũi, dễ hiểu nhưng chặt chẽ, cách giải quyết vấn đề trọng tâm và trực quan. Phong cách đặc trưng này được thấy ngay tại blog cá nhân [Overreacted](https://overreacted.io) nơi Dan "explain with words and code". Nội dung blog viết bằng tiếng Anh và Nga, nội dung đa ngôn ngữ được [đóng góp bởi cộng đồng](https://github.com/gaearon/overreacted.io#contributing-translations). [Xem tại đây](https://twitter.com/dan_abramov/status/618009308211585024) nếu bạn muốn biết rõ hơn về anh chàng tài năng này.
>
> Post sau đây được Dan viết vào cuối năm 2018 về nhiều thứ mà anh không giỏi như người ta vẫn nghĩ. Bài học rút ra là không ai có thể giỏi mọi thứ. Hãy xác định tốt những thế mạnh của mình và bổ sung những thiếu hụt khi cần thiết, đừng tự hạ thấp giá trị bản thân. Xem bài viết gốc bằng tiếng Anh [tại đây](https://overreacted.io/things-i-dont-know-as-of-2018). Bản dịch dưới đây đã được [chấp nhận như bản tiếng Việt chính thức cho bài viết này](https://overreacted.io/vi/things-i-dont-know-as-of-2018/).

Có rất rất nhiều thứ tôi không rành như mọi người vẫn tưởng tượng. Tôi không thấy đó là điều gì khủng khiếp và cũng chẳng có ý định ca thán. (Bạn không thể tránh khỏi những ý kiến trái chiều từ đám đông ngoài kia, kể cả khi bạn đã có chút tiếng tăm nhờ sự nỗ lực không ngừng, thật chuối!)

Trong bài này, tôi sẽ đưa ra một danh sách chưa đầy đủ về những chủ đề trong lập trình mà mọi người lầm tưởng rằng tôi biết. Tôi KHÔNG nói rằng bạn KHÔNG nên học chúng, hay tôi không biết những thứ hay ho khác. Hiện tại tôi không đảm nhận một vị trí trọng yếu nào cả, do đó tôi có thể vô tư mà thành thật về những thứ này.

Tại sao danh sách này quan trọng?
***
Thứ nhất, luôn tồn tại những kỳ vọng phi thực tế rằng một kỹ sư lâu năm sẽ biết mọi công nghệ trong lĩnh vực đang hoạt động. Một "lộ trình học tập" (learning roadmap) bao gồm cả trăm thư viện và công cụ? Xem qua thì hấp dẫn - nhưng cũng đáng sợ, phải không nào.

Tiếp đến là bất kể kinh nghiệm đến cỡ nào, bạn vẫn sẽ rơi vào trạng thái lúc thì thấy mình thật kém cỏi ("Hội chứng kẻ mạo danh"), lúc lại tự tin thái quá về năng lực của bản thân ("Hiệu ứng Dunning-Kruger"). Trạng thái này phụ thuộc vào môi trường, nghề nghiệp, tính tình bản thân, đồng nghiệp, tình trạng tinh thần, thời điểm trong ngày, vân vân.

Các dev lão làng cũng không ít lần trải lòng về những bất an thường trực nhằm động viên những người mới. Nhưng việc một bác sỹ phẫu thuật, dù kinh nghiệm đầy mình, vẫn lo lắng khi vào phòng mổ rõ ràng khác một trời một vực với một sinh viên lập cập cầm dao mổ lần đầu tiên!

Với nhiều người vốn đã bị hổng kiến thức, khẩu hiệu kiểu như "chúng ta đều là những dev non trẻ" vô tình lại trở nên sáo rỗng và khiến họ chẳng còn hứng thú. Những lời thú tội đầy hào hứng từ một chuyên gia nhiệt thành như tôi cũng không thay đổi được tình thế đó.

Vậy đó, các kỹ sư kinh nghiệm cũng thiếu hụt nhiều mảng kiến thức lắm. Bài này là về những thiếu hụt của tôi, và tôi khích lệ những ai đã gom góp đủ những tổn thương tương tự hãy chia sẻ về chúng. Tuy nhiên, việc chia sẻ chắc chắn không bao giờ làm giảm đi giá trị vốn có của những kinh nghiệm mà chúng ta đã tích lũy được.

**Ta thừa nhận rằng bản thân còn nhiều mặt yếu, có thể làm kẻ mạo danh, song vẫn sở hữu chuyên môn uyên thâm mà phải mất nhiều năm làm việc cật lực mới có được.**

***

Xong phần khuyến cáo, dưới đây chỉ là một vài thứ mà tôi không rành như người ta nghĩ:

- *Lệnh Unix và Bash.* Tôi biết `ls` và `cd`, còn những thứ khác thì phải tìm kiếm. Tôi hiểu được khái niệm piping nhưng chỉ biết dùng nó trong trường hợp đơn giản. Tôi không biết tạo những chuỗi lệnh phức tạp bằng `xargs`, hay tạo và phân luồng output. Tôi chưa bao giờ học Bash cho ra hồn nên chỉ viết được các shell script đơn giản (và thường có bug).

- *Ngôn ngữ lập trình bậc thấp.* Tôi hiểu Assembly cho phép lưu trữ các thứ trong bộ nhớ và nhảy chỗ nọ chỗ kia trong code, và chỉ biết đến thế. Tôi từng viết một ít C và hiểu con trỏ là gì, nhưng tôi không biết dùng `malloc` hoặc các kỹ thuật quản lý vùng nhớ thủ công tương tự. Chưa bao giờ đụng vào Rust.

- *Networking stack.* Tôi biết máy tính có địa chỉ IP, và DNS dùng để phân giải tên miền. Tôi biết một số giao thức cấp thấp như TCP/IP để vận chuyển gói tin mà (có thể?) đảm bảo toàn vẹn dữ liệu. Vậy thôi, còn tôi khá lờ mờ nếu đi sâu vào chi tiết.

- *Container.* Tôi không biết sử dụng Docker và Kubernetes (mấy gã này có liên quan đến nhau không nhỉ?) Tôi hiểu sơ sơ rằng chúng giúp tôi tạo nhanh, nhưng kiểm soát được, một máy ảo riêng biệt. Thú vị đấy nhưng chưa thử bao giờ.

- *Serverless.* Nghe cũng rất ngầu nhưng tôi cũng chưa thử. Tôi chưa có ý niệm rõ ràng về việc mô hình này sẽ thay đổi việc lập trình phía backend thế nào.

- *Microservice.* Nếu tôi không nhầm, khái niệm này có bản chất là "nhiều endpoint API nói chuyện với nhau". Tôi không hiểu lắm về lợi ích hay nhược điểm của cách tổ chức này vì tôi chưa có cơ hội làm việc với nó.

- *Python.* Tôi khá xấu hổ về điều này - Tôi đã có cơ hội làm Python trong vài năm và tôi đã không tập trung vào học nó hẳn hoi. Rất nhiều thứ kiểu như cách hoạt động của import thực sự khó hiểu đối với tôi.

- *Node backend.* Tôi hiểu chạy Node thế nào, sử dụng các API như `fs` để tạo tool, dựng Express. Nhưng tôi chưa bao giờ kết nối Node với database, và không thực sự biết viết một chương trình backend hoàn chỉnh. Tôi cũng không biết nhiều hơn ví dụ "Hello world" trong các framework React, như Next chẳng hạn.

- *Native platform.* Tôi từng thử học Objective C một vài lần nhưng không hiệu quả. Tôi cũng chưa từng học Swift. Java cũng thế. (Tuy vậy tôi nghĩ mình học được thôi vì tôi từng làm việc với C# rồi.)

- *Thuật toán.* Bubble sort và Quicksort là những gì tôi có thể nói ngay cho bạn, nếu là một ngày đẹp trời. Tôi duyệt được đồ thị đơn giản gắn với một số bài toán thực tế. Tôi hiểu ký hiệu O(n), nhưng hiểu biết này cũng chỉ đến mức "đừng tạo các vòng lặp lồng nhau" mà thôi.

- *Function programming language.* Ngoài Javascript, tôi không thạo bất cứ ngôn ngữ hướng hàm thuần túy nào (Tôi thông thạo C# và Javascript - và giờ đã quên gần hết C#.) Tôi khá chật vật khi đọc code của các ngôn ngữ lấy cảm hứng từ LISP (như Clojure), Haskell (ví dụ Elm), hay ML (OCaml chẳng hạn).

- *Các thuật ngữ functional programming.* Đến giờ thì `map` và `reduce` là những gì tôi dùng. Tôi không biết `monoid`, `functor`, etc. Tôi hiểu `monad` là gì nhưng có khi chỉ là tôi tưởng vậy.

- *Modern CSS.* Tôi không biết Flexbox và Grid. Float là món khoái khẩu của tôi.

- *Hệ phương pháp CSS.* Tôi đã dùng BEM (phần dành cho CSS, không phải BEM gốc), và chỉ vậy thôi. Tôi chưa thử OOCSS hay các hệ phương pháp khác.

- *SCSS / Sass.* Chưa từng học luôn.

- *CORS.* Tôi bị ám ảnh với lỗi này! Giờ thì tôi đã biết chỉnh một số header để giải quyết chứ trước đây lỗi này khiến tôi mất nhiều giờ đồng hồ để xử lý.

- *HTTPS/SSL.* Chưa từng cài đặt phần này. Không rõ lắm về cách thức hoạt động ngoài ý tưởng sử dụng khóa bí mật và khóa công khai.

- *GraphQL.* Tôi đọc được câu truy vấn nhưng không rành lắm về cách thể hiện giải pháp bằng node và edge, khi nào sử dụng fragment, và phân trang hoạt động như nào.

- *Socket.* Ý niệm trong đầu tôi là bên cạnh mô hình request/response thì máy tính còn nói chuyện với nhau thông qua thứ này, tiếc là đó là tất cả những gì tôi biết.

- *Stream.* Ngoại trừ Rx Observables, tôi không thường xuyên làm việc với stream. Đã từng dùng Node stream vài lần nhưng đều tanh bành khi xử lý lỗi.

- *Electron.* Chưa thử bao giờ.

- *Typescript.* Tôi hiểu khái niệm về type và annotation nhưng chưa viết thử. Một số lần sử dụng ngôn ngữ này tôi đều gặp không ít khó khăn.

- *Deployment và devops.* Những kỹ năng devops của tôi đến lúc này là biết gửi file qua FTP và kill một vài process khi cần thiết.

- *Đồ họa.* Dù là canvas, SVG, WebGL hay đồ họa bậc thấp, tôi đều không xuất sắc. Tôi hiểu ý tưởng bao trùm nhưng cần học thêm những thứ căn bản.

Danh sách này chắc chắn là chưa đầy đủ. Còn ty tỷ thứ khác mà tôi không biết.

***

Thảo luận một chủ đề như này có vẻ kỳ lạ. Thậm chí có gì đó sai sai khi viết ra danh sách này. Có phải tôi đang vạch áo cho người xem lưng không? Thực ra, thông điệp mấu chốt tôi muốn truyền tải qua bài này là:

- **Kể cả những dev bạn ái mộ chưa chắc đã biết nhiều hơn bạn.**

- **Bất kể trình độ của bạn ở mức nào, độ tự tin của bạn còn phụ thuộc vào nhiều yếu tố.**

- **Các dev kinh nghiệm đều sâu sắc ở chuyên môn của mình kể cả nếu họ không biết thứ này thứ khác.**

Tôi nhận thức được bản thân thiếu hụt những gì (ít nhất nếu không phải tất cả thì cũng một vài mảng). Tôi có thể học chúng sau này nếu tôi thấy tò mò hoặc nếu cần chúng cho công việc.

Danh sách này không hạ thấp kiến thức và kinh nghiệm của tôi. Có hàng tá thứ khác mà tôi đang làm cực kỳ ổn. Chẳng hạn, học các công nghệ mới mỗi khi tôi cần.

./.
