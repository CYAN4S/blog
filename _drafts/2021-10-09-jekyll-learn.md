---
title: "Jekyll 정리 및 요약"
categories: [dev]
tags: [jekyll, web]
image: "assets/posts/jekyll-learn.jpg"
---

Jekyll을 이용하여 기본적인 블로그 기능을 지원하는 정적 웹사이트를 만드는 방법을 소개합니다.

## 초기 설정

### Ruby 환경 구성

운영체제에 맞는 설치 과정이 [여기](https://jekyllrb.com/docs/installation/)에 소개되어 있습니다. Guides 항목에서 자신과 맞는 운영체제에 대한 가이드를 확인하실 수 있습니다.

설치가 완료되면, 터미널을 통해 다음 항목들을 확인하는 것이 좋습니다.

- Ruby: `ruby -v` **2.5.0 버전 이상**이어야 합니다.
- RubyGems: `gem -v`

이후, `gem install jekyll bundler`로 **Jekyll**과 **Bundler**, 2개의 Gem을 설치합니다.

#### Gem, Gemfile, Bundler

Gem은

Gemfile은

Bundler는

#### GitHub Pages에 호스팅

### 프로젝트 생성

새로운 Jekyll 사이트를 생성하기 위한 방법은 크게 두 가지가 있습니다.

- 빈 디렉토리에서 시작
- 기본적인 틀만 잡힌 프로젝트에서 시작 _(추천)_
- 기본적인 내용이 담긴 프로젝트에서 시작

블로그를 입맛에 맞춰 개조하기 시작하면 어느 방법으로 시작하던지 결과는 서로 비슷해집니다. 공식 문서고에 있는 [단계별 튜토리얼](https://jekyllrb.com/docs/step-by-step/01-setup/)은 빈 디렉토리에서 시작합니다. 개인적으로 

### 프로젝트 구동

```shell
bundle exec jekyll serve
```

#### 유용한 명령

개인적으로 개발할 때 주로 사용하는 명령어입니다.

```shell
bundle exec jekyll serve --drafts -I -l -H 0.0.0.0
```



- `--drafts`
  - 초안을 포함하여 페이지를 생성합니다. 뒤에서 다시 설명드리겠습니다.
- `-I`
  - 점진적
- `-l`
- `-H [HOSTNAME]`


#### 에러

##### webrick 에러

`bundle add webrick`을 수행하여 webrick을 설치합니다. Jekyll이 3.0 버전부터 webrick을 기본적으로 포함하지 않아 생기는 문제입니다.

##### Live Reload시 에러

```
Unable to load the EventMachine C extension; To use the pure-ruby reactor, require 'em/pure_ruby'
C:/Ruby30-x64/lib/ruby/gems/3.0.0/gems/eventmachine-1.2.7-x64-mingw32/lib/rubyeventmachine.rb:2:in `require': cannot load such file -- 3.0/rubyeventmachine (LoadError)
```

**Gemfile.lock**에서 `eventmachine (1.2.7-x64-mingw32)`를 찾아 `-x64-mingw32`를 없에 `eventmachine (1.2.7)`로 변경한 다음, 터미널에서 `bundle`을 다시 수행한 후 실행합니다. (버전은 작성일 기준이며, 추후에 달라질 수 있습니다.)

mingw와 관련하여 문제가 생기므로, Windows에서만 발생되는 것으로 예상됩니다. 해결하는데 꽤 애를 먹은 문제였습니다.

##### 그 외

## Jekyll 기본

### 테마


## GitHub Pages로 배포
