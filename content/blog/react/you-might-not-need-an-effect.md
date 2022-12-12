---
title: Có thể bạn không cần đến Effect
description: Cẩm nang `useEffect` đúng cách trong React
draft: false
date: 2022-08-15 22:32:08
categories:
  - Lập trình
tags:
  - javascript
  - reactjs
  - new-reactjs-docs
  - useEffect
---

Hiệu ứng hay hệ quả có thể đến sau hoặc không, nhưng nguyên nhân thì chắc chắn đến trước.

<!--more-->

Effect có vai trò như một cửa thoát hiểm trong mô hình của React. Chúng cho phép bạn "bước ra ngoài" React và đồng bộ các component với các hệ thống bên ngoài như giao tiếp các thư viện bên thứ ba, với mạng hay với DOM. Nếu component không kết nối với hệ thống ngoại lai nào khác, _bạn không nên sử dụng Effect_. Loại bỏ các Effect không cần thiết giúp code dễ theo dõi logic, chạy nhanh và ít lỗi hơn.

---

## Làm thế nào để loại bỏ Effect không cần thiết

Hai trường hợp thường gặp mà _bạn không cần dùng đến Effect_:

* __Không cần Effect để chuyển đổi dữ liệu cho render__. Chẳng hạn, bạn muốn lọc một danh sách trước mỗi lần hiển thị. Bạn có thể thấy hấp dẫn với ý tưởng viết một Effect để cập nhật biến state mỗi khi danh sách này thay đổi. Tuy nhiên, làm vậy thực ra không hiệu quả. Mỗi khi state của component thay đổi, React trước tiên sẽ gọi các hàm để tính toán những gì _sẽ được hiển thị_, sau đó mới "commit" những thay đổi này lên DOM. Tiếp đến React chạy các Effect. Nếu Effect _lại tiếp tục cập nhật state_, toàn bộ quá trình lại chạy lại từ đầu. Để loại bỏ mọi render thừa, hãy chuyển đổi toàn bộ dữ liệu _ở ngay đầu component_. Những hàm chuyển đổi đó sẽ tự động chạy lại mỗi khi props hay state thay đổi.
* __Không cần Effect để xử lý event từ người dùng__. Giả dụ mỗi khi người dùng mua một sản phẩm, bạn muốn gửi một request POST đến `/api/buy` và hiển thị một notification. Mọi xử lý nên được đặt trong event handler tương ứng của nút "Mua", chứ không phải Effect.

Chúng ta hãy tìm hiểu các ví dụ cụ thể sau để hiểu rõ hơn.

### Cập nhật state dựa trên props hoặc state

Giả dụ bạn có một component với 2 biến state: `firstName` và `lastName`, và muốn hiển thị tên đầy đủ `fullName` bằng cách nối hai biến trên. `fullName` phải tự động cập nhật mỗi `firstName` hoặc `lastName` thay đổi. Trực giác mách bảo bạn nên cập nhật `fullName` trong một Effect.

```jsx
function Form() {
  const [firstName, setFirstName] = useState('Taylor');
  const [lastName, setLastName] = useState('Swift');

  // 🔴 Cần tránh: state và Effect không cần thiết
  const [fullName, setFullName] = useState('');
  useEffect(() => {
    setFullName(firstName + ' ' + lastName);
  }, [firstName, lastName]);
  // ...
}
```

Mọi thứ có vẻ phức tạp hơn bình thường, và kém hiệu quả nữa: toàn bộ component phải render khi khai báo state cho `fullName`, rồi render tiếp khi nó được cập nhật bởi Effect. Hãy xoá cả state và Effect:

```js
function Form() {
  const [firstName, setFirstName] = useState('Taylor');
  const [lastName, setLastName] = useState('Swift');
  // ✅ Tốt: tính ngay khi render
  const fullName = firstName + ' ' + lastName;
  // ...
}
```

Khi thứ gì đó có thể được tính toán từ props hoặc state đã tồn tại, __đừng tạo state__. Thay vào đó hay tính toán khi render. Điều này giúp code nhanh hơn (loại các tính toán "chồng nhau"), đơn giản hơn (ít code hơn), và ít lỗi hơn (tránh được các bug khi các state không được đồng bộ với nhau). Nếu đã đọc được tới đây mà mọi thứ vẫn mù mịt, bạn có thể phải dừng lại và học cách ["suy nghĩ theo React"](https://beta.reactjs.org/learn/thinking-in-react#step-3-find-the-minimal-but-complete-representation-of-ui-state) trước.

### Cache các tính toán phức tạp

Phần trên khuyên ta nên tính toán các giá trị ngay khi render. Vậy nếu các tính toán đó rất tốn tài nguyên thì sao? Component `TodoList` sau tính toán `visibleTodos` bằng cách đem props `todos` đi lọc theo props `filter`. Bạn dễ bị cuốn theo suy nghĩ lưu kết quả tính toán vào state và update trong Effect:

```jsx
function TodoList({ todos, filter }) {
  const [newTodo, setNewTodo] = useState('');

  // 🔴 Cần tránh: state và Effect không cần thiết
  const [visibleTodos, setVisibleTodos] = useState([]);
  useEffect(() => {
    setVisibleTodos(getFilteredTodos(todos, filter));
  }, [todos, filter]);

  // ...
}
```

Giống như ví dụ trước, cách làm này vừa thừa vừa phí. Đầu tiên, cần loại bỏ state và Effect:

```jsx
function TodoList({ todos, filter }) {
  const [newTodo, setNewTodo] = useState('');
  // ✅ Ổn nếu getFilteredTodos() nhanh.
  const visibleTodos = getFilteredTodos(todos, filter);
  // ...
}
```

Code trên sẽ gặp vấn đề nếu `getFilteredTodos` chạy chậm hoặc có rất nhiều `todos`. Trong trường hợp đó, bạn sẽ không muốn tính lại `getFilteredTodos()` nêú state không liên quan kiểu như `newTodo` thay đổi, mà thay vào đó cache (hay ["memoize"](https://en.wikipedia.org/wiki/Memoization) kết quả tính toán lại, bằng `useMemo`:

```jsx
import { useMemo, useState } from 'react';

function TodoList({ todos, filter }) {
  const [newTodo, setNewTodo] = useState('');
  const visibleTodos = useMemo(() => {
    // ✅ Không chạy lại trừ khi todos hay filter thay đổi
    return getFilteredTodos(todos, filter);
  }, [todos, filter]);
  // ...
}
```

Hay ngắn gọn chỉ với 1 dòng:

```jsx
import { useMemo, useState } from 'react';

function TodoList({ todos, filter }) {
  const [newTodo, setNewTodo] = useState('');
  // ✅ Không chạy lại trừ khi todos hay filter thay đổi
  const visibleTodos = useMemo(() => getFilteredTodos(todos, filter), [todos, filter]);
  // ...
}
```

Code trên bảo React không cần chạy alij hàm bên trong `useMemo` trừ trường hợp `todos` hoặc `filter` thay đổi. React sẽ ghi nhớ kết quả tính toán từ `getFilteredTodos()` trong lần render khởi tạo. Những lần render sau, nó sẽ kiểm tra xem `todos` hoặc `filter` có khác không. Nếu chung vẫn giống lần render trước, `useMemo` sẽ trả lại kết quả trước đã được lưu sẵn. Nếu chúng khác, React gọi chạy lại hàm bên trong, trả về đồng thời lưu lại kết quả tính toán mới. Lưu ý hàm bên trong `useMemo` phải là [hàm thuần khiết - pure function](https://beta.reactjs.org/learn/keeping-components-pure).

### Reset toàn bộ state khi prop thay đổi

Component `ProfilePage` nhận được prop `userId`. Nó bao gồm một input để nhập bình luận, lưu trong state `comment`. Một buổi sáng bạn nhận ra khi trang này thay đổi hồ sơ từ người này sang người khác, `comment` không thay đổi. Sẽ không dễ chịu gì nếu bình luận của người này lại được đăng trong hồ sơ của một người khác. Để sửa, bạn sẽ xoá `comment` _mỗi khi_ `userId` thay đổi:

```jsx
export default function ProfilePage({ userId }) {
  const [comment, setComment] = useState('');

  // 🔴 Cần tránh: Reset state theo prop trong Effect
  useEffect(() => {
    setComment('');
  }, [userId]);
  // ...
}
```

Cách làm này không hiệu quả bởi `ProfilePage` sẽ render giá trị cũ trước rồi mới render lại. Nó còn phức tạp nữa bởi bạn sẽ phải xoá state trong mọi component trong `ProfilePage`. Ví dụ, nên UI phần bình luận có nhiều cấp, bạn có thể phải xoá cả state bình luận lồng nhau.

Thay vào đó, bạn có thể nói React rằng mỗi hồ sơ người dùng về mặt khái niệm là khác nhau hoàn toàn bằng cách sử dụng `key`. Chia component làm hai và truyền `key` từ component ngoài vào component trong:

```jsx
export default function ProfilePage({ userId }) {
  return (
    <Profile
      userId={userId}
      key={userId}
    />
  );
}

function Profile({ userId }) {
  // ✅ State này và mọi state ở dưới sẽ được reset tự động
  const [comment, setComment] = useState('');
  // ...
}
```

Thông thường, React bảo toàn state khi component giống nhau được render tại vị trí giống nhau. Bằng cách truyền `userId` như `key` vào component `Profile`, bạn yêu cầu React đối xử `Profile` với `userId` khác nhau như những component khác nhau không dùng chung bất cứ state nào. Mỗi khi key thay đổi, React tạo lại DOM và reset toàn bộ state của `Profile` và các con của nó. Kết quả `comment` được xoá tư động mỗi khi chuyển sang hồ sơ khác.

Đáng chú ý là chỉ `ProfilePage` cha được export trong project. Component nào render `ProfilePage` không cần phải truyền key cho nó, mà chỉ truyền `userId` như prop bình thường. Việc `ProfilePage` truyền `key` cho `Profile` bên trong chỉ là cách thực thi trong nội bộ của nó thôi.

### Điều chỉnh một số state theo prop

Đôi khi, bạn muốn reset hoặc điều chỉnh chỉ một số state, không phải toàn bộ, mỗi khi prop thay đổi.

Component `List` sau đây nhận vào một danh sách `items`, mà lưu danh sách các item được chọn bởi người dùng vào state `selection`. Bạn muốn reset `selection` về `null` mỗi khi `items` nhận vào một mảng mới:

```jsx
function List({ items }) {
  const [isReverse, setIsReverse] = useState(false);
  const [selection, setSelection] = useState(null);

  // 🔴 Cần tránh: Điều chỉnh state theo prop trong Effect
  useEffect(() => {
    setSelection(null);
  }, [items]);
  // ...
}
```

Mỗi khi `items` thay đổi, `List` và các component con sẽ render lại với giá trị cũ của `selection` trước. Sau đó React mới cập nhật DOM và chạy Effect. Cuối cùng, `setSelection(null)` được gọi khiến render lại `List` và các component con thêm một lần nữa.

Cách làm đúng là xoá Effect rồi điều chỉnh state ngay trong render.


```jsx
function List({ items }) {
  const [isReverse, setIsReverse] = useState(false);
  const [selection, setSelection] = useState(null);

  // Tốt hơn: Điều chỉnh state ngay khi render
  const [prevItems, setPrevItems] = useState(items);
  if (items !== prevItems) {
    setPrevItems(items);
    setSelection(null);
  }
  // ...
}
```

[Lưu trữ thông tin từ lần render trước](https://beta.reactjs.org/apis/react/useState#storing-information-from-previous-renders) có vẻ là một kỹ thuật khó hiểu, nhưng nó ổn hơn so với việc cập nhật lại state cũ trong Effect. Trong ví dụ trên, `setSelection` được gọi trực tiếp khi render. React sẽ render lại `List` ngay sau khi `return`. React không render lại các con của `List` và cập nhật DOM ngay, bỏ qua lần render với giá trị cũ của `selection`.

Khi bạn cập nhật một component trong render, React vứt bỏ hết JSX trả về và cố gắng render lại ngay. Để phòng tránh các lần thử lại bị xếp chồng, React chỉ cho phép bạn cập nhật state của component giống nhau trong mỗi lần render. Nếu bạn cập nhật state của component khác, bạn sẽ gặp lỗi. Điều kiện như `items !== prevItems` là cần thiết để tránh vòng lặp. Điều chỉnh state có thể làm như này còn các hiệu ứng phụ khác như thay đổi DOM hay đặt hẹn giờ nên được giữ trong event handler hoặc Effect để [giữ cho component hoạt động ổn định](https://beta.reactjs.org/learn/keeping-components-pure).

__Mặc dù pattern này hiệu quả hơn Effect, chúng không nên được sử dụng nhiều__. Điều chỉnh state dựa trên props hoặc state khác khiến luồng dữ liệu khó theo dõi và debug. Luôn kiểm tra rằng bạn có thể reset toàn bộ state bằng `key` hoặc tính toán mọi thứ khi render không. Chẳng hạn, thay vì lưu (và reset) item được chọn, bạn có thể lưu ID của nó:

```jsx
function List({ items }) {
  const [isReverse, setIsReverse] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  // ✅ Tốt nhất: Tính toán mọi thứ ngay trong render
  const selection = items.find(item => item.id === selectedId) ?? null;
  // ...
}
```

Giờ bạn không cần phải "điều chỉnh" state nữa. Nếu ID nằm trong danh sách, item tương ứng vẫn được chọn. Nếu không, `selection` sẽ bằng `null`. Hành vi này khác biệt chút ít, nhưng rõ ràng là ổn hơn vì mọi thay đổi của `items` lúc này đều phản ánh ngay vào `selection`. Lưu ý nhỏ là bạn cần sử dụng `selection` trong mọi logic sau đó bởi `selectedId` có thể không tồn tại.

### Chia sẻ logic giữa nhiều event handler

Bạn có một trang sản phẩm với 2 nút `Mua` và `Giỏ hàng`, cả hai đều dùng để mua hàng. Bạn muốn hiện một thông báo _mỗi khi_ người dùng thêm sản phẩm vào giỏ hàng. Gọi hàm `showNotification()` trong handler của cả 2 nút có vẻ lặp lại, nên bạn thấy sẽ hơn hay nếu đặt logic này trong Effect:

```jsx
function ProductPage({ product, addToCart }) {
  // 🔴 Cần tránh: Đặt logic gắn liền với event trong Effect
  useEffect(() => {
    if (product.isInCart) {
      showNotification(`Added ${product.name} to the shopping cart!`);
    }
  }, [product]);

  function handleBuyClick() {
    addToCart(product);
  }

  function handleCheckoutClick() {
    addToCart(product);
    navigateTo('/checkout');
  }
  // ...
}
```

Effect này không chỉ thừa, mà còn dễ tạo ra bug. Giả dụ app của bạn có khả năng "ghi nhớ" giỏ hàng kể cả tải lại các trang. Nếu bạn thêm hàng vào giỏ và tải lại trang, thông báo sẽ lại xuất hiện. Điều này bởi `product.isInCart` luôn `true` khi trang tải, nên Effect gọi `showNotification()`.

__Khi bạn không chắc chắn rằng code nào nên nằm trong Effect hoặc trong hàm xử lý event, hãy tự hỏi _tại sao_ cần phải chạy đoạn code này. Chỉ sử dụng Effect cho đoạn code cần chạy _bởi vì_ component phải hiển thị cho người dùng__. Trong ví dụ này, thông báo nên xuất hiện bởi vị người dùng _nhấn nút_, không phải bởi trang được hiển thị! Xoá Effect và đưa logic chung vào một hàm mà bạn sẽ gọi từ cả hai hàm xử lý event:

```jsx
function ProductPage({ product, addToCart }) {
  // ✅ Tốt: Logic gắn liền với event nằm trong handler
  function buyProduct() {
    addToCart(product);
    showNotification(`Added ${product.name} to the shopping cart!`);
  }

  function handleBuyClick() {
    buyProduct();
  }

  function handleCheckoutClick() {
    buyProduct();
    navigateTo('/checkout');
  }
  // ...
}
```

Effect được xoá và bug được fix.

### Gửi một request POST

`Form` sau gửi hai loại request POST. Nó gửi event đo lường khi mount. Khi bạn điền xong form và nhấn vào nút Submit, nó sẽ gửi một request POST tới `/api/register`:

```jsx
function Form() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  // ✅ Tốt: Logic này chỉ chạy khi component phải xuất hiện
  useEffect(() => {
    post('/analytics/event', { eventName: 'visit_form' });
  }, []);

  // 🔴 Cần tránh: Logic gắn với event lại đặt trong Effect
  const [jsonToSubmit, setJsonToSubmit] = useState(null);
  useEffect(() => {
    if (jsonToSubmit !== null) {
      post('/api/register', jsonToSubmit);
    }
  }, [jsonToSubmit]);

  function handleSubmit(e) {
    e.preventDefault();
    setJsonToSubmit({ firstName, lastName });
  }
  // ...
}
```

Hãy đánh giá đoạn code bởi cùng tiêu chuẩn cho ví dụ trước.

Request POST đo lường nên nằm trong Effect, bởi _lý do_ để gửi sự kiện này là sự xuất hiện của `Form`.

Tuy nhiên, request POST lên `/api/register` thì không phải vì sự xuất hiện của form, mà vì người dùng bấm nút gửi. Do đó xoá Effect thứ 2 đi và chuyển request này vào trong event handler:

```jsx
function Form() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  // ✅ Tốt: Logic này chỉ chạy khi component phải xuất hiện
  useEffect(() => {
    post('/analytics/event', { eventName: 'visit_form' });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    // ✅ Tốt: Logic gắn với event nằm trong handler
    post('/api/register', { firstName, lastName });
  }
  // ...
}
```

Vậy mỗi khi bạn cần quyết định xem một đoạn logic nằm trong event handler hay Effect, câu hỏi chính cần trả lời là _đây là loại logic gì_ từ góc nhìn của người dùng. Nếu đoạn logic được gọi bởi một tương tác xác định, đặt chúng trong event handler. Nếu chúng được gây ra bởi sự xuất hiện trên màn hình của user, đặt chúng trong Effect.

### "Domino" Effect

Xem xét đoạn code sau:

```jsx
function Game() {
  const [card, setCard] = useState(null);
  const [goldCardCount, setGoldCardCount] = useState(0);
  const [round, setRound] = useState(1);
  const [isGameOver, setIsGameOver] = useState(false);

  // 🔴 Cần tránh: một state thay đổi kích hoạt một chuỗi Effect
  useEffect(() => {
    if (card !== null && card.gold) {
      setGoldCardCount(c => c + 1);
    }
  }, [card]);

  useEffect(() => {
    if (goldCardCount > 3) {
      setRound(r => r + 1)
      setGoldCardCount(0);
    }
  }, [goldCardCount]);

  useEffect(() => {
    if (round > 5) {
      setIsGameOver(true);
    }
  }, [round]);

  useEffect(() => {
    alert('Good game!');
  }, [isGameOver]);

  function handlePlaceCard(nextCard) {
    if (isGameOver) {
      throw Error('Game already ended.');
    } else {
      setCard(nextCard);
    }
  }
  // ...
```

Có 2 vấn đề:

Một là, code này rất kém hiệu quả: component phải render lại mỗi khi gọi `set` gì đó thành chuỗi. Trong trường hợp xấu nhất, `setCard` → render → `setGoldCardCount` → render → `setRound` → render → `setIsGameOver` → render, tạo thêm 3 lần render thừa.

Kể cả khi nó không chậm, khi code phát triển lên, bạn sẽ gặp những trường hơp "chuỗi" này sẽ không còn đáp ứng yêu cầu nữa. Tưởng tượng nếu bạn thêm tính năng quay lại lịch sử từng nước đi bằng cách cập nhật `card` về một nước đi trong quá khứ, dẫn đến kích hoạt chuỗi Effect chạy lại và thay đổi dữ liệu đang hiển thị. Cách viết như vậy rất khó maintain và debug.

Tốt hơn là bạn nên cố gắng tính nhiều nhất có thể khi render, và điều chỉnh state trong event handler:

```jsx
function Game() {
  const [card, setCard] = useState(null);
  const [goldCardCount, setGoldCardCount] = useState(0);
  const [round, setRound] = useState(1);

  // ✅ Tính toán mọi thứ ngay khi render
  const isGameOver = round > 5;

  function handlePlaceCard(nextCard) {
    if (isGameOver) {
      throw Error('Game already ended.');
    }

    // ✅ Tính toán state tiếp theo ngay trong event handler
    setCard(nextCard);
    if (nextCard.gold) {
      if (goldCardCount <= 3) {
        setGoldCardCount(goldCardCount + 1);
      } else {
        setGoldCardCount(0);
        setRound(round + 1);
        if (round === 5) {
          alert('Good game!');
        }
      }
    }
  }

  // ...
```

Cần nhớ rằng trong event handler, state hoạt động giống như một trạng thái xác định, nghĩa là kể cả khi bạn gọi `setRound(round + 1)`, thì biến `round` vẫn chứa giá trị cũ khi người dùng bấm nút mà thôi. Nếu bạn muốn sử dụng giá trị tiếp theo cho tính toán, hãy tự định nghĩa một biến kiểu như `const nextRound = round + 1`.

Tuy nhiên không phải lúc nào bạn cũng biết chính xác trạng thái tiếp theo là gì trong event handler. Chẳng hạn, hãy tưởng tượng một form có nhiều dropdown mà trong đó các tuỳ chọn của dropdown sau phụ thuộc vào lựa chọn từ dropdown trước (ví dụ khi điền tỉnh - huyện - xã). Lúc ấy mô hình xếp chuỗi Effect lại phù hợp để đồng bộ dữ liệu.

### Khởi tạo app

Một số logic chỉ nên chạy một lần duy nhất khi app khởi tạo. Bạn nên đặt chúng trong Effect ở component cao nhất.

```jsx
function App() {
  // 🔴 Cần tránh: Effect chứa logic chỉ chạy một lần duy nhất
  useEffect(() => {
    loadDataFromLocalStorage();
    checkAuthToken();
  }, []);
  // ...
}
```

Tuy nhiên, bạn nhanh chóng nhận ra nó vẫn được chạy hai lần ở chế độ development. Điều này gây ra rắc rối - ví dụ như nó huỷ xác thực token khi chạy hai lần. Nhìn chung, component nên bền bỉ với việc bị mount lại. Nếu một số logic chỉ được phép chạy một lần khi _app khởi tạo_ chứ không phải một lần khi _app mount_, bạn nên dùng một biến để giám sát việc khởi tạo:

```jsx
let didInit = false;

function App() {
  useEffect(() => {
    if (!didInit) {
      didInit = true;
      // ✅ Chỉ chạy một lần duy nhất khi khởi động app
      loadDataFromLocalStorage();
      checkAuthToken();
    }
  }, []);
  // ...
}
```

Bạn thậm chí còn có thể chạy chúng trong khi khởi tạo module và trước khi app render:

```jsx
if (typeof window !== 'undefined') { // Kiểm tra có phải môi trường browser không
  // ✅ Chỉ chạy một lần duy nhất khi khởi động app
  checkAuthToken();
  loadDataFromLocalStorage();
}

function App() {
  // ...
}
```

### Báo hiệu cho component cha khi state thay đổi

Bạn có một component `Toggle` với state `isOn` có thể `true` hoặc `false`. Bạn muốn báo hiệu cho component cha mỗi khi `Toggle` đổi trạng thái, vì thế bạn bộc lộ event `onChange` và gọi nó từ Effect:

```jsx
function Toggle({ onChange }) {
  const [isOn, setIsOn] = useState(false);

  // 🔴 Cần tránh: onChange chạy muộn quá
  useEffect(() => {
    onChange(isOn);
  }, [isOn, onChange])

  function handleClick() {
    setIsOn(!isOn);
  }

  function handleDragEnd(e) {
    if (isCloserToRightEdge(e)) {
      setIsOn(true);
    } else {
      setIsOn(false);
    }
  }

  // ...
}
```

`Toggle` cập nhật state trước, React cập nhật màn hình. Tiếp đến React chạy Effect, gọi `onChange` truyền vào từ component cha. Lúc này component cha lại cập nhật state của nó, dẫn đến một lần render nữa. Sẽ tốt hơn nếu mọi thứ diễn ra chỉ trong một lần render.

Xoá Effect và cập nhật trạng thái của cả hai component trong cùng một event handler:

```jsx
function Toggle({ onChange }) {
  const [isOn, setIsOn] = useState(false);

  function updateToggle(nextIsOn) {
    // ✅ Tốt: chạy mọi cập nhật ngay trong event khiến state thay đổi
    setIsOn(nextIsOn);
    onChange(nextIsOn);
  }

  function handleClick() {
    updateToggle(!isOn);
  }

  function handleDragEnd(e) {
    if (isCloserToRightEdge(e)) {
      updateToggle(true);
    } else {
      updateToggle(false);
    }
  }

  // ...
}
```

Với cách làm này, cả component `Toggle` và cha đều update trạng thái trong event. React [cập nhật theo lô](https://beta.reactjs.org/learn/queueing-a-series-of-state-updates) từ nhiều component khác nhau, nên chỉ có một lần render diễn ra.

Bạn cũng có thể xoá luôn state và nhận `isOn` từ component cha:

```jsx
// ✅ Cũng tốt: state cho component cha toàn quyền xử lý
function Toggle({ isOn, onChange }) {
  function handleClick() {
    onChange(!isOn);
  }

  function handleDragEnd(e) {
    if (isCloserToRightEdge(e)) {
      onChange(true);
    } else {
      onChange(false);
    }
  }

  // ...
}
```

["Đưa state lên trên"](https://beta.reactjs.org/learn/sharing-state-between-components) cho phép cha toàn quyền điều khiển `Toggle` từ state của cha. Điều này cũng có nghĩa là component cha sẽ phải thêm nhiều logic hơn, nhưng tổng thể sẽ có ít state phải lo hơn. Mỗi khi bạn đang tìm cách đồng bộ state từ hai chỗ khác nhau, đó là dấu hiệu cho thấy cần đưa state lên trên!

### Đưa dữ liệu cho component cha

Component `Child` gọi về dữ liệu và muốn truyền dữ liệu đó cho component cha:

```jsx
function Parent() {
  const [data, setData] = useState(null);
  // ...
  return <Child onFetched={setData} />;
}

function Child({ onFetched }) {
  const data = useSomeAPI();
  // 🔴 Cần tránh: truyền dữ liệu từ con lên cha trong Effect
  useEffect(() => {
    if (data) {
      onFetched(data);
    }
  }, [onFetched, data]);
  // ...
}
```

Trong React, dữ liệu chảy từ component cha đến các con. Khi gặp lỗi, bạn có thể mò được thông tin lỗi đến từ đâu bằng cách đi ngược dần lên theo chuỗi component cho tới khi bạn tìm được "thủ phạm" truyền sai prop hoặc lỗi state. Nếu bạn dùng Effect để cập nhật dữ liệu cho cha từ con, luồng dữ liệu trở nên rất khó theo dõi. Nếu cả con và cha đều cần cùng một dữ liệu, tốt nhất hãy để cha lấy dữ liệu và truyền cho con:

```jsx
function Parent() {
  const data = useSomeAPI();
  // ...
  // ✅ Tốt: dữ liệu truyền từ cha xuống con
  return <Child data={data} />;
}

function Child({ data }) {
  // ...
}
```

### Đăng ký theo dõi nguồn bên ngoài

Nhiều khi component có thể cần đăng ký một nguồn dữ liệu nào đó nằm ngoài state React, như một thư viện bên thứ ba hoặc API của browser. Nguồn dữ liệu này có thể thay đổi tuỳ ý mà React không biết, đòi hỏi bạn sử dụng Effect để theo dõi nguồn dữ liệu:


```jsx
function useOnlineStatus() {
  // Không tốt: viết hàm theo dõi thủ công
  const [isOnline, setIsOnline] = useState(true);
  useEffect(() => {
    function updateState() {
      setIsOnline(navigator.onLine);
    }

    updateState();

    window.addEventListener('online', updateState);
    window.addEventListener('offline', updateState);
    return () => {
      window.removeEventListener('online', updateState);
      window.removeEventListener('offline', updateState);
    };
  }, []);
  return isOnline;
}

function ChatIndicator() {
  const isOnline = useOnlineStatus();
  // ...
}
```

Mặc dù cách làm này tương đối phổ biến, React trang bị sẵn cho chúng ta một Hook chuyên trách cho công việc đăng ký nguồn dữ liệu ngoài. Xoá Effect đi và thay thế bằng `useSyncExternalStore`:

```jsx
function subscribe(callback) {
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);
  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
}

function useOnlineStatus() {
  // ✅ Tốt: đăng ký theo dõi nguồn bên ngoài với Hook hỗ trợ sẵn bởi React
  return useSyncExternalStore(
    subscribe, // React không đăng ký lại trừ phi bạn truyền hàm khác
    () => navigator.onLine, // Hàm này chạy ở client
    () => true // Hàm này chạy với server
  );
}

function ChatIndicator() {
  const isOnline = useOnlineStatus();
  // ...
}
```

### Tải về dữ liệu

Rất nhiều app sử dụng Effect để khởi động tải về dữ liệu, điển hình như sau:

```jsx
function SearchResults({ query }) {
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    // 🔴 Cần tránh: Kéo dữ liệu mà quên dọn dẹp
    fetchResults(query, page).then(json => {
      setResults(json);
    });
  }, [query, page]);

  function handleNextPageClick() {
    setPage(page + 1);
  }
  // ...
}
```

Đoạn code trên có bug. Tưởng tượng bạn nhập nhanh tìm kiếm `"hello"`. `query` sẽ thay đổi từ `"h"`, thành `"he"`, `"hel"`, `"hell"`, và `"hello"`. Mỗi thay đổi sẽ khởi động việc gọi dữ liệu cho riêng mình, nhưng không có gì đảm bảo các response sẽ về theo đúng thứ tự đó. Chẳng hạn, response cho `"hell"` có thể về sau response của `"hello"`, dẫn đến hiển thị sai kết quả tìm kiếm. Đây là một dạng [`"race condition"`](https://en.wikipedia.org/wiki/Race_condition): hai request khác nhau chạy đua và kết quả trả về theo thứ tự khác với những gì bạn mong đợi.

Để khắc phục, bạn cần thêm một hàm dọn dẹp để phớt lờ những response cũ:

```jsx
function SearchResults({ query }) {
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    let ignore = false;
    fetchResults(query, page).then(json => {
      if (!ignore) {
        setResults(json);
      }
    });
    return () => {
      ignore = true;
    };
  }, [query, page]);

  function handleNextPageClick() {
    setPage(page + 1);
  }
  // ...
}
```

Xử lý race condition không chỉ là thách thức duy nhất khi thực hành tải về dữ liệu. Bạn phải tính đến cache dữ liệu trả về ra sao (để người dùng có thể nhấn Back và thấy ngay màn hình trước đó thay vì biểu tượng xoay xoay), làm sao để gọi dữ liệu phía server (để render được HTML thay vì biểu tượng xoay xoay), và làm sao để phòng ngừa thác đổ dữ liệu (network waterfall - component con phải chờ tất cả cha của nó kéo dữ liệu xong mới đến lượt nó). __Những vấn đề trên xuất hiện với mọi thư viện UI__ chứ không riêng gì React. Giải quyết các vấn đề này không dễ dàng gì, vì thế các framework hiện đại thường cung cấp sẵn cơ chế gọi về dữ liệu thay vì viết Effect ngay trong component.

Nếu bạn không sử dung framework (và không muốn tự build một cái) mà vẫn muốn gọi về dữ liệu một cách thân thiện và hiệu quả, tham khảo custom Hook sau đây:

```jsx
function SearchResults({ query }) {
  const [page, setPage] = useState(1);
  const params = new URLSearchParams({ query, page });
  const results = useData(`/api/search?${params}`);

  function handleNextPageClick() {
    setPage(page + 1);
  }
  // ...
}

function useData(url) {
  const [data, setData] = useState(null);
  useEffect(() => {
    let ignore = false;
    fetch(url)
      .then(response => response.json())
      .then(json => {
        if (!ignore) {
          setData(json);
        }
      });
    return () => {
      ignore = true;
    };
  }, [url]);
  return data;
}
```

Bạn sẽ phải thêm logic để xử lý lỗi và theo dõi nội dung đã tải xong hay chưa. Dù giải pháp này chưa hoàn hảo, nhưng đưa logic kéo về dữ liệu ra riêng một custom Hook giúp ta tuỳ biến chiến thuật kéo về dữ liệu một cách dễ dàng và hiệu quả hơn.

Nhìn chung, mỗi khi bạn định viết Effect, hãy kiểm tra xem đoạn logic dùng Effect đó có thể tách ra riêng một custom Hook như `useData` ở trên không. Càng ít viết `useEffect` trực tiếp trong component, app của bạn càng dễ để maintain.

## Tổng kết

* Nếu có thể tính toán trong ngay trong render, bạn không cần đến Effect.
* Để cache các tính toán tốn kém, dùng `useMemo` thay vì `useEffect`.
* Để reset toàn bộ state của một component, thay đổi `key` của nó.
* Để thay đổi một vài state theo prop, hãy thay đổi ngay khi render.
* Code cần chạy vì một component phải xuất hiện trên màn hình thì nên đặt trong Effect, còn lại nên đặt trong event handler.
* Nếu cần cập nhật state của nhiều component cùng lúc, tốt hơn cả là gom hết vào một event.
* Bất cứ lúc nào cố gắng đồng bộ state giữa nhiều component, cân nhắc đẩy state lên trên.
* Bạn có thể kéo về dữ liệu với Effect, nhưng nhớ dọn dẹp để tránh race condition.

---

## Tài liệu tham khảo

Reactjs đang viết lại trang tài liệu chính thức. Một vài điểm đáng chú ý về nội dung mới:

* Tất cả diễn giải __sử dụng Hook__ thay cho class.
* Tăng graphic trực quan và ví dụ tương tác.
* Có câu hỏi (kèm lời giải!) để kiểm tra mức độ hiểu bài của độc giả.

Ở thời điểm năm 2022, [bản beta của tài liệu mới tại đây](https://beta.reactjs.org/).

Bài viết này dựa phần lớn trên bản gốc [You Might Not Need an Effect](https://beta.reactjs.org/learn/you-might-not-need-an-effect).
