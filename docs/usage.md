# 使用说明

## 适用范围

本仓库的 `convert.js` 是 Mihomo Profile 覆写脚本。只要客户端支持 JavaScript 覆写，并以 `main(config)` 形式传入 Mihomo 配置对象，就可以使用。

适用场景：

- Mihomo Party 覆写脚本。
- Clash Party 覆写脚本。
- Sub-Store 的 `mihomoProfile` 文件脚本操作。
- 其他兼容 `main(config)` 的 Mihomo 配置处理流程。

## 导入链接

Raw 链接：

```text
https://raw.githubusercontent.com/wait9yan/mihomo-profile-rules/main/convert.js
```

CDN 链接：

```text
https://cdn.jsdelivr.net/gh/wait9yan/mihomo-profile-rules/convert.js
```

## Mihomo Party / Clash Party

1. 打开客户端侧边栏的覆写页面。
2. 新增远程 JavaScript 覆写。
3. 填入 `convert.js` 链接。
4. 在订阅管理中为目标订阅选择该覆写。
5. 更新订阅。

生成配置后，建议检查：

- 是否存在 `🚀 手动选择`、`🎬 流媒体`、`🤖 Claude` 等策略组。
- `🏠 家宽节点` 是否只包含家宽/落地类节点。
- 家宽节点是否带有 `dialer-proxy: 🧩 前置节点`。

## Sub-Store

Sub-Store 中推荐把它用于 Mihomo Profile 文件，而不是普通节点数组脚本。

流程：

1. 创建文件，类型选择 Mihomo Profile。
2. 来源选择订阅或组合订阅。
3. 添加脚本操作。
4. 脚本内容使用 `convert.js` 链接。
5. 预览输出。

## 固定版本

建议生产使用固定 tag 链接：

```text
https://cdn.jsdelivr.net/gh/wait9yan/mihomo-profile-rules@v1.0.0/convert.js
```

这样仓库后续更新不会立刻影响你的客户端配置。

## 注意事项

- `dialer-proxy` 需要 Mihomo 内核支持。
- 如果 `🧩 前置节点` 选择了不可用节点，所有依赖它的家宽节点都会不可用。
- 家宽识别依赖节点名称关键词。
- 本脚本不设置 DNS/TUN/端口/GeoData。
