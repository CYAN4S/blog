---
title: "Next.js Learn 요약 및 정리"
categories: [dev]
tags: [nodejs, nextjs, react, web]
image: "assets/posts/nextjs-learn.jpg"
---

Vercel 사에서 제공하는 Next.js 튜토리얼인 [Learn Next.js](https://nextjs.org/learn)에서 중요하다 생각되는 내용을 요약 및 정리를 하였습니다.

튜토리얼을 통해 제작된 프로젝트는 [이 링크](https://github.com/CYAN4S/nextjs-blog)를 통해 볼 수 있으며, 해당 프로젝트는 TypeScript를 사용합니다. 이 요약본은 JavaScript를 기준으로 서술하였습니다.

> 이 포스트는 Next.js를 이미 알고 있는 사람들이, 자신의 지식을 재확인할 수 있는 용도로 작성되었습니다. [Learn Next.js](https://nextjs.org/learn)에서 보다 친절한 강의가 있으니, 이 포스트로 Next.js를 입문하시는 것은 권장드리지 않습니다.

## Create a Next.js App

### 앱 생성

[Create Next App](https://nextjs.org/docs/api-reference/create-next-app)을 이용해 Next.js 앱을 자동으로 만들 수 있습니다.

```shell
npx create-next-app
# Typescript
npx create-next-app --typescript
```

### CLI에서 앱 구동

[CLI](https://nextjs.org/docs/api-reference/cli) 환경에서 서버를 실행할 수 있습니다. 생성된 디렉토리에서 다음 커맨드를 실행하여 개발 서버를 구동합니다.

```shell
npm run dev
```

개발 서버는 [Fast Refresh](https://nextjs.org/docs/basic-features/fast-refresh)가 적용되어 있어, 파일 내용의 변경점을 브라우저에 즉시 반영합니다.

## Navigate Between Pages

Next.js에서의 페이지는 [`pages` 디렉토리](https://nextjs.org/docs/basic-features/pages)의 파일에서 내보낸 React 컴포넌트입니다.

페이지는 해당 **파일 이름**에 따라 라우트(경로)와 연결됩니다. 예를 들어:

- `pages/posts/first-post.js`의 라우트는 `/posts/first-post`입니다.
- `pages/index.js`의 라우트는 `/`입니다.

### Link 컴포넌트

[라우팅](https://nextjs.org/docs/routing/introduction)은 페이지 링크에 사용되는 `<a>` HTML 태그를 **[Link 컴포넌트](https://nextjs.org/docs/api-reference/next/link)**로 감싸서 사용합니다.

```jsx
import Link from "next/link";

<h1 className="title">
  Read{" "}
  <Link href="/posts/first-post">
    <a>this page!</a>
  </Link>
</h1>;
```

### Client-Side Navigation

Link 컴포넌트는 같은 Next.js 앱에 있는 두 페이지 간에 **client-side navigation**을 활성화합니다.

Client-side navigation이란 페이지 전환이 *JavaScript*로 이루어지는 것으로, 이는 기존 브라우저의 탐색 기능보다 빠르게 작동합니다.

#### Code splitting 및 Prefetch

Next.js는 code splitting을 자동으로 수행하여, 각 페이지는 필요에 의해서만 로드됩니다. 이를 통해 수백개의 페이지가 있어도 홈페이지가 빠르게 로드됩니다.

또한, 프로덕션 상태에서 Link 컴포넌트가 사용자의 화면에 표시될 때, Next.js는 백그라운드에서 자동으로 링크된 페이지에 해당하는 코드를 **prefetch**합니다. 그 결과로 링크를 클릭할 때 페이지 전환이 빠르게 이루어집니다.

## Assets, Metadata, CSS

Next.js는 CSS와 Sass 지원이 기본 탑재되어 있습니다.

### Assets

Next.js는 이미지같은 정적 리소스를 [`public` 디렉토리](https://nextjs.org/docs/basic-features/static-file-serving)에 두어 활용할 수 있습니다.

#### Image 컴포넌트 및 최적화

[Image 컴포넌트](https://nextjs.org/docs/api-reference/next/image)는 일반 `<img>` HTML 태그의 확장형이며, 최적화를 자동으로 수행합니다.

```jsx
import Image from "next/image";

const YourComponent = () => (
  <Image
    src="/images/profile.jpg" // Route of the image file
    height={144} // Desired size with correct aspect ratio
    width={144} // Desired size with correct aspect ratio
    alt="Your Name"
  />
);
```

### Metadata

`<title>` 등의 `<head>` 태그에 해당하는 메타데이터는 [Head 컴포넌트](https://nextjs.org/docs/api-reference/next/head)를 활용하여 변경합니다.

```jsx
import Head from "next/head";

export default function FirstPost() {
  return (
    <>
      <Head>
        <title>First Post</title>
      </Head>
      <h1>First Post</h1>
    </>
  );
}
```

> `./pages/document.js` 파일을 생성하여 [커스텀 `Document`](https://nextjs.org/docs/advanced-features/custom-document)로 `<html>` 에 해당되는 어트리뷰트(`lang` 등)를 수정할 수 있습니다.

### CSS

Next.js는 기본적으로 여러 형태의 [CSS 지원](https://nextjs.org/docs/basic-features/built-in-css-support)을 기본적으로 포함합니다.

### Layout 컴포넌트

Layout 컴포넌트를 만들어 모든 페이지에서 활용할 수 있게 만들 수 있습니다. 예로, `components/layout.js` 파일을 만들어 CSS Modules을 적용한 예시입니다.

```jsx
import styles from "./layout.module.css";

export default function Layout({ children }) {
  return <div className={styles.container}>{children}</div>;
}
```

### 전역 스타일

**`pages/_app.js`의 [`App` 컴포넌트](https://nextjs.org/docs/advanced-features/custom-app)**는 모든 페이지를 아우르는 top-level 컴포넌트입니다. 이를 통해 전역 CSS를 적용하는 등, 다른 페이지를 탐색할 때도 상태를 유지하는 데 사용할 수 있습니다.

```jsx
import "../styles/global.css";

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
```

## Pre-rendering, Data Fetching

### Pre-rendering

Next.js는 기본적으로 모든 페이지를 **pre-render**합니다. 즉, _모든 페이지에 대한 HTML을 사전에 생성합니다._ Pre-rendering은 성능과 SEO에 유리합니다.

생성된 각 HTML 문서는 작은 JavaScript 코드를 포함하며, 페이지가 로드될 때 JavaScript 코드가 수행되어 페이지를 완전히 인터렉티브하게 만들어주는 **hydration** 과정이 수행됩니다.

#### Plain React 앱과의 차이

Plain한 React 앱은 pre-render 과정이 없기에 모든 웹 요소가 hydration을 통해 초기화되며, JavaScript를 비활성화하면 아무 것도 표시되지 않습니다. 이와 달리 Next.js는 Pre-rendered HTML이 표시된 후, JavaScript가 React 컴포넌트를 초기화하는 방식으로 이루어집니다.

### 두 가지의 Pre-rendering

Next.js의 pre-rendering에는 페이지에 대한 HTML을 **어느 시점에** 생성하는 지에 따라 두 가지로 나누어집니다.

- [**Static Generation(정적 생성)**](https://nextjs.org/docs/basic-features/pages#static-generation-recommended): **빌드될 때** HTML이 생성됩니다.
- [**Server-side Rendering(SSR)**](https://nextjs.org/docs/basic-features/pages#server-side-rendering): **각 요청마다** HTML이 생성됩니다.

> 개발 모드에서는 무조건 SSR로 동작합니다.

중요한 점은, Next.js에서는 각 페이지 별로 어떤 Pre-redering 방식을 사용할 지 **선택**할 수 있습니다.

요청마다 페이지를 렌더링하는 것보다 한 번 생성된 페이지를 CDN에서 제공하는 것이 더욱 빠르기에, 가급적 **Static Generation**을 사용하는 것이 좋습니다.

자기 자신에게 "사용자의 요청에 **앞서서** 페이지를 pre-render할 수 있나?" 라는 질문을 던지는 것이 방법 결정에 도움이 됩니다. 만약 대답이 "할 수 있다." 이면 **정적 생성**을 선택하는 것이 좋습니다.

만약 페이지에 자주 갱신되는 데이터를 표시해야 하고, 페이지 내용이 요청마다 매번 변경된다면 정적 생성은 좋은 선택이 아닙니다. **Server-side Rendering**은 다소 느리지만, 항상 최신 정보를 페이지에 표시할 수 있습니다. 혹은, pre-render 없이 Client-side JavaScript를 통해 표시할 수도 있습니다.

### Static Generation, Data Fetching

정적 생성은 데이터 유무와 관계없이 이루어질 수 있습니다.

외부 데이터 페칭이 필요하지 않은 페이지는 프로덕션 빌드 때 자동으로 정적 생성이 이루어집니다.

혹은, HTML을 렌더링하기 전에 먼저 외부 데이터 페칭(파일 시스템 접근, 외부 API 호출, DB 쿼리 등)이 필요한 경우인 [**데이터를 포함한** 정적 생성](https://nextjs.org/docs/basic-features/pages#static-generation-with-data) 또한 기본적으로 지원합니다.

Next.js에서는 데이터 페칭을 포함한 페이지 생성을 위해 **[`getStaticProps`](https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation)** 라는 async 함수를 사용할 수 있습니다. 페이지 컴포넌트를 export할 때 같이 export할 수 있으며, 기본적인 내용은 다음과 같습니다.

- 프로덕션 빌드 때 수행되며,
- 함수 내에서 외부 데이터를 페치하고, 페이지에 props로 전달할 수 있습니다.

```jsx
export default function Home(props) {
  // ...
}

export async function getStaticProps() {
  // Get external data from the file system, API, DB, etc.

  // The value of the `props` key will be passed to the `Home` component
  return {
    props: {},
  };
}
```

`getStaticProps`를 사용함으로서, Next.js에게 *이 페이지는 데이터 의존성이 있어서 pre-render 이전에 먼저 수행해야 함*이라 안내할 수 있습니다.

이를 통해 Markdown 형태의 블로그 포스트를 불러와 블로그 사이트를 만들 수 있습니다. 다음은 이를 활용한 블로그 사이트 코드의 일부입니다.

```jsx
import { getSortedPostsData } from "../lib/posts";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  /* ... */
}
```

### getStaticProps 세부 사항

`getStaticProps`는 **server-side에서만 작동**합니다. client-side에선 절대로 작동하지 않기에, 브라우저에 전송하는 것 없이 DB에 직접적으로 쿼리를 보낼 수도 있습니다.

**개발 모드**에서는 `getStaticProps`는 *매 요청*마다 실행됩니다. **프로덕션 모드**에서는 기본적으로 _빌드 시_ 수행되지만, [`getStaticPaths`](https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation)가 반환하는 [`fallback` key](https://nextjs.org/docs/basic-features/data-fetching#the-fallback-key-required) 를 이용해 변경할 수 있습니다.

`getStaticProps`는 **페이지에 의해서만** export될 수 있습니다.

### 요청 시 데이터 페칭

#### `getServerSideProps`를 이용한 SSR

만약 데이터를 빌드가 아닌 **요청 시** 페치해야 한다면, Server-side Rendering을 이용할 수 있습니다. 이는 `getStaticProps` 대신 [`getServerSideProps`](https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering)를 export합니다.

```jsx
export async function getServerSideProps(context) {
  return {
    props: {
      // props for your component
    },
  };
}
```

`getServerSideProps`는 요청 시 호출되는 특성으로 인해, 파라미터인 `context`에는 요청과 관련된 파라미터들이 포함되어 있습니다.

#### Client-side Rendering

페이지에서 외부 데이터를 필요로 하지 않는 부분은 정적으로 생성 후, 페이지가 로드될 때 JavaScript를 통해 외부 데이터를 페치하여 남은 부분을 배치하는 [Client-side Rendering](https://nextjs.org/docs/basic-features/data-fetching#fetching-data-on-the-client-side)을 사용할 수도 있습니다.

CSR은 사용자 대시보드와 같이 개인적이고, 사용자 특정적이고, SEO와는 상관없고, pre-render될 필요없는 페이지에 적합합니다.

CSR을 위해 Next.js에는 [SWR](https://swr.vercel.app/)이라는 React hook 사용을 권장합니다. SWR은 캐싱, 재검증, 포커스 트래킹, 주기마다 다시 패칭 등을 관리할 수 있습니다.

```jsx
import useSWR from "swr";

function Profile() {
  const { data, error } = useSWR("/api/user", fetch);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return <div>hello {data.name}!</div>;
}
```

## Dynamic Routes

Next.js에서는 **페이지의 경로**가 외부 데이터에 의존적인 경우에도 페이지의 정적 생성이 가능합니다. 이는 Next.js의 **dynamic URLs**을 활성화합니다.

블로그의 게시글을 예로 들자면, 먼저 [Dynamic routes](https://nextjs.org/docs/routing/dynamic-routes)를 만듭니다. Dynamic routes는 이름이 `[` 로 시작하여 `]`로 끝나는 페이지입니다. 예를 들어 `pages/posts/[id].js`를 가정해보겠습니다.

아까 전부터 해왔던 것 처럼, 페이지를 렌더링하는 코드를 적습니다. 그 다음, [`getStaticPaths`](https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation)라는 async 함수를 같이 export합니다. `getStaticPaths` 함수에서는, **주소값이 될 수 있는 모든 값의 리스트를 반환**해야 합니다. 예시인 `pages/posts/[id].js`에서는, `id`의 **모든 가능한 값**의 리스트를 반환해야합니다.

끝으로, `getStaticProps`를 적용합니다. 여기에서는 `params`로 온 주소값(`id`)을 이용하여 필요한 데이터를 페치합니다.

```jsx
import Layout from "../../components/layout";

export default function Post() {
  return <Layout>...</Layout>;
}

export async function getStaticPaths() {
  // Return a list of possible value for id
}

export async function getStaticProps({ params }) {
  // Fetch necessary data for the blog post using params.id
}
```

### getStaticPaths

`getStaticPaths`가 반환해야 하는 값은 다음 형태를 가지고 있어야 합니다.

```js
return {
  paths: [
    { params: { id: "1" } },
    { params: { id: "2" } },
    { params: { id: "3" } },
  ],
  fallback: false,
};
```

- `paths`: 가능한 주소값을 모두 담는 일종의 배열로, _그냥 배열 형태가 아닌_ **반드시** 위의 형태를 띄어야합니다.
- `fallback`: `paths`에 해당되지 않는 주소가 들어올 때 처리 방법을 지정합니다. 뒤에서 자세히 설명하겠습니다.

### getStaticProps

`getStaticPaths`를 통해 얻은 주소값을 통해 `getStaticProps`에서 필요한 데이터를 페치합니다. 다음은 `id` 값(주소값)을 이용하는 예시입니다.

```js
import { getAllPostIds, getPostData } from "../../lib/posts";

export async function getStaticProps({ params }) {
  const postData = getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}
```

### Dynamic Routes 세부 사항

`getStaticProps`와 비슷하게, `getStaticPaths`는 **개발 모드**에서는 *매 요청*마다, **프로덕션 모드**에서는 *빌드 시* 수행됩니다.

#### Fallback

`getStaticPaths`가 반환하는 객체의 [`fallback`](https://nextjs.org/docs/basic-features/data-fetching#the-fallback-key-required)은 `boolean | "blocking"` 형태로, 값에 따라 적용되는 효과는 다음과 같습니다.

- [`fallback`이 `false`](https://nextjs.org/docs/basic-features/data-fetching#fallback-false): `getStaticPaths`의 반환값에 해당되지 않는 주소는 **404 페이지**로 처리합니다.
- [`fallback`이 `true`](https://nextjs.org/docs/basic-features/data-fetching#fallback-true): `getStaticProps`의 행동이 바뀝니다.
  - `getStaticPaths`의 반환값에 해당되는 주소의 페이지는 빌드 때 렌더링됩니다.
  - 빌드 때 랜더링되지 않은 페이지의 주소는 404 페이지로 처리되지 **않으며**, 대신 해당 주소의 첫 요청에 대해 해당 페이지의 "fallback" 버전을 보여줍니다.
  - 그와 동시에, Next.js가 요청받은 주소의 페이지를 정적 생성합니다. 후에 동일한 주소 요청이 들어올 경우 다른 pre-render된 페이지와 동일하게 취급합니다.
- [`fallback`이 `blocking`](https://nextjs.org/docs/basic-features/data-fetching#fallback-blocking): 새로운 경로는 `getStaticProps`를 이용해 SSR되며, 이후의 요청을 위해 캐싱됩니다.

#### 모든 경로 잡기

Dynamic route에 점 3개(`...`)를 넣어 [모든 경로를 잡을 수 있습니다](https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes). 예를 들어, `pages/posts/[...id].js`는 `/posts/a`, `/posts/a/b`, `/posts/a/b/c` 등을 잡습니다.

이 때, `getStaticPaths`는 다음과 같아야합니다.

```js
return [
  {
    params: {
      // Statically Generates /posts/a/b/c
      id: ["a", "b", "c"],
    },
  },
];
```

이 경우, `getStaticProps`는 다음 형태가 됩니다.

```js
export async function getStaticProps({ params }) {
  // params.id will be like ['a', 'b', 'c']
}
```

#### 라우터

Next.js의 라우터에 접근하려면, [`next/router`](https://nextjs.org/docs/api-reference/next/router)의 [`useRouter`](https://nextjs.org/docs/api-reference/next/router#userouter) hook을 import하여 사용할 수 있습니다.

#### 404 페이지

`pages/404.js` 파일을 이용해 [자체 404 페이지](https://nextjs.org/docs/advanced-features/custom-error-page#404-page)를 만듭니다.

## API Routes

[API Routes](https://nextjs.org/docs/api-routes/introduction)로 API 엔드포인트를 만들 수 있습니다. `pages/api` 디렉토리 안에 함수를 만들어 넣으면 되며, 그 함수는 다음과 같은 형식입니다.

```js
// req = HTTP incoming message, res = HTTP server response
export default function handler(req, res) {
  // ...
}
```

이는 서버리스 함수(람다)로 배포될 수 있습니다.

사용 예로, `pages/api/hello.js`의 내용을 다음과 같이 만들고, `api/hello`로 접속합니다.

```js
export default function handler(req, res) {
  res.status(200).json({ text: "Hello" });
}
```

```json
{ "text": "Hello" }
```

- `req`: [`http.IncomingMessage`](https://nodejs.org/api/http.html#http_class_http_incomingmessage) 형식. 참고로 [미리 제작된 미들웨어](https://nextjs.org/docs/api-routes/api-middlewares)를 제공합니다.
- `res`: [`http.ServerResponse`](https://nodejs.org/api/http.html#http_class_http_serverresponse) 형식. 참고로 [도우미 함수](https://nextjs.org/docs/api-routes/response-helpers)를 제공합니다.

### API Routes 세부 사항

절대로 `getStaticProps`나 `getStaticPaths`에서 **API Route를 페치하지 마십시오**.

API Routes를 잘 사용한 사례로, 폼 입력을 관리하는 경우입니다.

이 외에도, [Preview Mode](https://nextjs.org/docs/advanced-features/preview-mode), [Dynamic API Routes](https://nextjs.org/docs/api-routes/dynamic-api-routes) 등의 기능이 있습니다.
