---
title: "Extract State Logic Into Reducer"
date: 2023-03-22T11:30:15+07:00
draft: true
---

Update state cho component qua rất nhiều event handler có thể rất phức tạp. Với những trường hợp này, bạn có thể quy tụ tất cả logic cập nhật state vào một hàm nằm ngoài component được gọi là _reducer_.

Reducer là một cách khác để xử lý state. Bạn có thể chuyển dịch từ `useState` sang `useReducer` trong 3 bước:

1. __Đổi__ từ set state sang dispatch _action_
2. __Viết__ hàm reducer
3. __Dùng__ reducer trong component

```js
function handleAddTask(text) {
  setTasks(
    // thêm task
  )
}

function handleChangeTask(task) {
  setTasks(
    // cập nhật task
  )
}

function handleDeleteTask(taskId) {
  setTasks(
    // xóa task
  )
}
```

Xóa toàn bộ logic xử lý state. Logic này tóm gọn trong 3 event handler:

- `handleAddTask(text)` được gọi _khi người dùng nhấn "Add"_.
- `handleChangeTask(task)` được gọi _khi người dùng nhấn "Save"_.
- `handleDeleteTask(task)` được gọi _khi người dùng nhấn "Delete"_.

Quản lý state bằng reducer khác biệt một chút so với set state trực tiếp. Thay vì bảo React "làm cái gì" bằng set state, bạn chỉ ra "người dùng vừa làm gì" bằng cách dispatch một action từ event handler (logic để update state nằm ở một nơi khác!). Như vậy thay vì set `tasks` qua event handler, bạn dispatch một action "thêm/sửa/xóa một task". Code sẽ mang tính mô tả cao hơn.

```js
function handleAddTask(text) {
  dispatch({
    type: 'added',
    id: nextId++,
    text: text,
  });
}

function handleChangeTask(task) {
  dispatch({
    type: 'changed',
    task: task,
  });
}

function handleDeleteTask(taskId) {
  dispatch({
    type: 'deleted',
    id: taskId,
  });
}
```

Object bạn truyền vào dispatch là một "action":

```js
function handleDeleteTask(taskId) {
  dispatch(
    // "action" object:
    {
      type: 'deleted',
      id: taskId,
    }
  );
}
```
