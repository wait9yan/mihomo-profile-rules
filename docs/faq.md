# FAQ

## 这个脚本只能给 Sub-Store 用吗？

不是。它是通用 Mihomo Profile JavaScript 覆写脚本，只要客户端支持调用 `main(config)` 就可以使用。

## 为什么不设置 geox-url？

不同客户端已经有自己的 GeoData 管理方式。脚本强制设置 `geox-url` 可能会和客户端配置冲突，所以默认不覆盖。

## 家宽节点为什么会自动写入 dialer-proxy？

这用于链式代理场景，让家宽/落地节点先通过 `🧩 前置节点` 出站。

## 为什么前置节点不包含其他策略组？

为了避免循环引用。例如：

```text
家宽节点 -> 前置节点 -> 地区组 -> 家宽节点
```

前置节点只通过 `include-all + exclude-filter` 收集非家宽实际节点。

## 已有 dialer-proxy 会被覆盖吗？

不会。脚本检测到节点已有 `dialer-proxy` 时会跳过。

## 家宽节点没有被识别怎么办？

检查节点名称是否包含脚本里的关键词。当前关键词包括：

```text
家宽|家庭|商宽|住宅|原生|落地|专线|IEPL|IPLC|Starlink|星链|Residential|Home|ISP|Native|Fixed|Static|HKT|HKBN
```

你可以在 `convert.js` 中扩充 `RESIDENTIAL_NODE_KEYWORDS`。

## 某个 GEOSITE 规则没有生效怎么办？

先确认客户端使用的 `geosite.dat` 是否包含该分类。脚本只写规则，不维护 GeoData 数据库。
