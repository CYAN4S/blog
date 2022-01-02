---
title: "Scriptable Object를 통한 Unity 게임 구조 설계"
categories: [dev]
tags: [unity, pattern, game]
image: "assets/posts/unity-ga-with-so.jpg"
---

유니티로 게임을 만들 때 유용히 사용할 수 있는 옵저버 패턴을 활용하고, 싱글톤 패턴의 사용을 피하는 방법을 정리하였습니다. 또한 옵저버 패턴 구현을 위해 Scriptable Object를 Channel로 사용하는 방법을 소개합니다.

현재 제가 개인적으로 개발 중인 리듬게임인 [Microbeat](https://github.com/CYAN4S/microbeat)는 소프트웨어 공학 지식이 전무할 때부터 개발해 온 것입니다. 처음에는 간단한 구조였지만, 여러 기능을 넣으면서 구조가 점점 복잡해졌으며, 기능을 하나 추가할 때마다 코드 전체를 수정해야 하는 문제가 생기기 시작했습니다. 다행히 디자인 패턴 등의 소프트웨어 공학 관련 지식을 도입함으로서 문제를 해결할 수 있었고, 이 포스트에 문제를 어떻게 해결하였는지 소개하고자 합니다.

이 포스트에서는 게임 구조를 수정하면서 사용한 디자인 패턴들을 소개하고, 패턴 적용으로 인해 얻은 이점에 대해 설명합니다.

> 이 문서는 왕도가 절대 아닙니다. 하나의 패턴에 따라 여러 구현 방법이 나올 수 있으며, 여기에 소개한 코드들은 개인적인 구현 방법입니다. 또한 디자인 패턴은 만능이 아니며, 패턴이 정말 필요한지 충분히 고민해보고 도입을 하는 것이 좋습니다.

## 이상적인 게임 개발

에서 소개한 게임 엔지니어링의 3대 요소는 다음과 같습니다.

- 모듈형 디자인 사용
- 쉬운 변경과 수정
- 쉬운 디버깅

## 예시로...

실제 저의 개발 사례를 통해 설명하는 것이므로, 예시 또한 리듬게임으로 들겠습니다. 리듬게임을 만들 때 필요한 요소들을 정리해보자면,

- 게임 내에는 기본적으로 다음 요소들이 있다.
  - 노트 객체
  - 사용자 입력
  - 게임 매니저 등...
- 게임은 진행 상황에 맞춰 다음 일을 수행한다.
  - 생성

항상 그래왔던 것처럼, 일단 Scene에 필요한 것들을 배치합니다. `GameManager` 클래스를 만들어 빈 Game Object에 넣고, 노트는 여러 개를 사용할테니 미리 Prefab으로 만들어 놓고, 기타 게임에 필요한 요소들은 다 넣습니다. 점수를 표시할 텍스트, 노트가 터질 때 나올 이펙트 애니메이션, 일시정지 했을 때 나올 다이얼로그 창 등등... 그리고는 이제 이 요소들을 어떻게 이을지 고민에 빠집니다.

게임을 개발하려면 Scene에 존재하는 여러 GameObject끼리 서로 정보를 주고 받아야 하는 때가 반드시 오며, 이는 비단 리듬게임에만 해당되는 문제가 아닌 거의 모든 종류의 게임에서 필요합니다.

> 여기에 나온 코드들은 실제 Microbeat에 사용된 코드가 아닌, 원활한 설명을 위해 여러 부분이 생략된 코드이며, 의사 코드와 유사합니다.

### 가장 간단한 방식: 하드코딩

가장 단순무식한 방법은, 아까 만든 `GameManager`에게 모든 책임을 지게 만드는 것입니다. 매 프레임마다 노트를 손수 움직여주고, 입력을 받아 처리하고, 점수가 바뀌면 UI 파트도 손수 손봐줍니다.

```csharp
using UnityEngine;

public class GameManager : MonoBehaviour
{
    List<NoteObject> notes;

    void Awake()
    {
        notes = FileManager.GetNotesFromFile();
    }

    void Update()
    {
        foreach (var note in notes)
        {
            notes.Move(currentTime);
        }

        if ()
        {

        }
    }
}
```

## 싱글톤 패턴?!

> 오직 한 개의 인스턴스만을 갖도록 보장하고, 이에 대한 전역적인 접근점을 제공합니다.



### 구현

```cs
// Source: https://youtu.be/WLDgtRNK2VE?t=110

using UnityEngine;

public class Singleton<T> : MonoBehaviour where T : MonoBehaviour
{
    private static T _instance = null;

    public static T Instance
    {
        get
        {
            if (_instance == null)
            {
                _instance = GameObject.FindObjectOfType<T>();
                if (_instance == null)
                {
                    var singletonObj = new GameObject();
                    singletonObj.name = typeof(T).ToString();
                    _instance = sigletonObj.AddComponent<T>();
                }
            }
            return _instance;
        }
    }

    public virtual void Awake()
    {
        if (_instance != null)
        {
            Destroy(gameObject);
            return;
        }

        _instance = GetComponent<T>();

        DontDestroyOnLoad(gameObject);

        if (_instance == null)
            return;
    }
}
```

위의 구현은 유니티 공식 유튜브 영상에서 나온 코드로, 가장 중요한 점은 *static* 문을 사용한 것입니다.

#### 왜 쓰는걸까?

싱글톤 객체는 클래스 당 하나

따라서 유용하게 사용될 수 있습니다.

#### 왜 쓰지 말라고 할까?

다만 대부분의 개발자들은 싱글톤 패턴을 쓰지 말라고 합니다. 싱글톤은 커플링을 쉬게 유도

## 옵저버 패턴!

> 객체 사이에 일 대 디의 의존 관계를 정의해두어, 어떤 객체의 상태가 변할 때 그 객체에 의존성을 가진 다른 객체들이 그 변화를 통지 받고 자동으로 업데이트될 수 있게 만듭니다.

옵저버 패턴의 핵심은 

### 기본 구조

### 구독을 책임지는 객체는?

그럼 옵저버 패턴에서

### 싱글톤 재등장!

옵저버 패턴을 구현하기 위해 싱글톤을 활용할 수도 있습니다.

싱글톤을 옵저버 패턴만을 위해서만 사용한다면 싱글톤을 단독으로 사용하는 것보다는 문제가 


## ScriptableObject의 등장!

여기서 Scriptable Object가 등장합니다.

### ScriptableObject VS MonoBehaviour

#### Mono Behaviour

- MoboBehaviour를 상속받은 객체는 GameObject
- Scene 혹은 Prefab에서 활동
- 모든 State 저장
- Unity로부터 여러 Callback을 받음(Awake, Start, Update, OnEnable 등)

문제는

- 

이를 위해 Prefab

- Prefab 컨셉의 오용
- C# static 사용

#### Scriptable Object

줄여서 SO

### Event Channel로서의 SO

그럼 옵저버 패턴과 SO와 무슨 관계가 있냐는 질문이 떠오르실 겁니다. 어떻게 SO를 옵저버 패턴의 채널을 수행

#### 구조 설명


### Data Channel로서의 SO

옵저버의 이벤트

#### 한계

## 종합

### 뭐든 만능은 아니다.

패턴에 너무 의존하지 

### 여담으로,

옵저버 패턴은 사실

이 포스트엔 옵저버와 싱글톤 위주로만 설명이 되었지만, 게임에 적용된 패턴은 이게 끝이 아닙니다.

- **팩토리**: 노트 생성을 위해 팩토리 패턴을 사용 중이지만, 이게 좋은 접근인지 고민 중입니다.
- **오브젝트 풀링**: 초기 노트 개수가 많고, 삭제가 빈번히 일어나기에 도입을 검토하고 있습니다. 현재는 관련 성능 이슈가 없기에 도입은 하고 있지 않습니다.

이에 대한 설명은 나중에 기회가 되면 관련 포스트를 올리겠습니다.+

## 참고 자료

- GitHub 문서: [Habrador/Unity-Programming-Patterns](https://github.com/Habrador/Unity-Programming-Patterns)
- Unity 공식 유튜브 채널: [Game architecture with ScriptableObjects](https://youtu.be/WLDgtRNK2VE), [Unite 2016](https://youtu.be/6vmRwLYWNRo)
- 유니티에서 제공하는 문서: [스크립터블 오브젝트로 게임을 설계하는 세 가지 방법](https://unity.com/kr/how-to/architect-game-code-scriptable-objects)
- 아키텍쳐
- 게임 프로그래밍 패턴