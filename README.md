# TanStack Query で CRUD を叩いてみる

インターン先の業務でフロントエンド関連のタスクを任されている  
標準搭載の React hooks のみで開発して、後々改修するというのは避けたいので、  
非同期処理とキャッシュの管理を容易にするためにライブラリを選定する。

## 現在の候補

- TanStack Query[旧 ReactQuery]
- SWR

## TanStack Query のメリット

旧版の React Query の情報が多いため、ベストプラクティスの知見がネットに転がってそう  
解説記事が多い  
可能性は少なそうだが、今後 Vue 等に利用する場合に流用できる

## TanStack Query のデメリット

旧版の React Query の情報と混在している。  
公式日本語ドキュメントがない  
公式ドキュメント(英語)の情報が SWR に比べて多い (SWR の方が綺麗にまとめられている)

## SWR のメリット

Next を開発している Vercel が開発元  
公式日本語ドキュメントがある

## SWR のデメリット

基本的には React か Next で使う前提  
ネットの記事はTanStack Queryを使っているものが多い印象  

## SWRも試したので貼っておく

## *Get*
*TanStack Queryと使い方似てる*
```ts
// データフェッチのためのPromiseを返す関数
const fetcher = async (string) => {
  const res = await fetch("url");
  
  // axiosの場合500系は自動でerrorを投げる
  if (!res.ok) {
    const json = await res.json();
    throw new Error(json.message);
  }

  return res.json();
};

// keyは文字列 配列 null  keyの値はfetcherに渡される
const { data, error, isLoading } = useSWR(hoge, fetcher, options)

if (isLoading) {}

if (error) {}
```

## *Post*

```ts
const addTodo = async (_, { arg }) => {
  const res = await fetch("url", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: arg,
    }),
  });

  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);
  }

  return res.json();
};

// 以下 Component内で行う
const [text, setText] = useState()
const { trigger } = useSWRMutation("todos", addTodo);

const handleSubmit = (e) => {
  e.preventDefault();
  trigger(text); // 引数がaddTodoの第2引数に渡される
};
```

## 削除
```ts
const deleteTodo = async (_, { arg }) => {
  const res = await fetch(`http://localhost:4000/todos/${arg}`, {
    method: "DELETE",
  });
  
  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);
  }
  
  return res.json();
};

const { trigger } = useSWRMutation("todos", deleteTodo);

const handleDelete = (id) => {
  trigger(id);
};
```

## *更新もTanStack Queryと同じ感じでいけそう*
