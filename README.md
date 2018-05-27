# rx-jweixin
Wrap jweixin with rxjs.

使用 rxjs 对微信jssdk进行封装，里面再包一层Promise，以解决在 Angular 中 wx的回调函数无法更新页面的问题。定义了输入参数的格式，使得在使用 VSCode 等工具编辑时能进行提示。


## 使用
函数名基本一一对应微信jssdk文档

### 初始化 config
```typescript
import { config } from "rx-jweixin";

config("appId","noncestr", 123123123, "signature", [JsApi.chooseImage, JsApi.getLocation]).subscribe()
```

### 获取地理位置
```typescript
import { getLocation, LocationType, openLocation } from "rx-jweixin";

getLocation(LocationType.wgs84).subscribe(
                (res) => {
                    console.log(res.latitude);
                    console.log(res.longtitude);
                }
            );
```


## 现有问题
1. 有关摇一摇的函数未能定义输出结果类型，因为微信的文档不够详细。
2. 添加了一些在1.3.2版本中才见到的函数，1.2.0的文档中没有对应描述。

有任何问题，请在issue中提出，欢迎fork