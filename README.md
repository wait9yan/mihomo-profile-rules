# mihomo-profile-rules

基于 [Aethersailor/Custom_OpenClash_Rules](https://github.com/Aethersailor/Custom_OpenClash_Rules) 默认模板思路整理的个人 Mihomo Profile JavaScript 覆写脚本，在此感谢！

这个仓库提供一个 `convert.js`，用于支持 JavaScript 覆写的 Mihomo 客户端，例如 Mihomo Party、Clash Party，以及能以 `mihomoProfile` 调用 `main(config)` 的 Sub-Store 文件配置。

## 特性

- 复刻 Custom_OpenClash_Rules 默认分流思路，合并部分流媒体分组。
- 提供链式代理，入口为 `🧩 前置节点`，出口为`🏠 家宽节点`。
- 为 Claude、ChatGPT、通用 AI 服务分别设置策略组，默认将其流量分流至`🏠 家宽节点`。

## 使用链接

Github：

```text
https://raw.githubusercontent.com/wait9yan/mihomo-profile-rules/main/convert.js
```

jsDelivr：

```text
https://testingcf.jsdelivr.net/gh/wait9yan/mihomo-profile-rules/convert.js
```

## 使用方法

### Mihomo Party / Clash Party

1. 打开客户端的覆写页面。
2. 导入 `convert.js` 的 Raw 或 CDN 链接。
3. 在订阅配置中选择该覆写脚本。
4. 更新订阅并检查生成配置。

### Sub-Store

1. 创建或编辑一个 Mihomo Profile 文件。
2. 添加脚本操作。
3. 使用 `convert.js` 链接或直接粘贴脚本内容。
4. 预览文件输出，确认策略组和规则生成正常。

更多细节见 [docs/usage.md](docs/usage.md)。

## 链式代理说明

脚本会识别节点名中的家宽/落地关键词：

```text
家宽|家庭|商宽|住宅|原生|落地|专线|IEPL|IPLC|Starlink|星链|Residential|Home|ISP|Native|Fixed|Static|HKT|HKBN
```

命中的节点会被注入：

```yaml
dialer-proxy: 🧩 前置节点
```

## GeoData

本脚本不会设置：

```yaml
geox-url:
geodata-mode:
```

当前 `GEOSITE` / `GEOIP` 实际使用的数据源由客户端或现有 Mihomo 配置决定。

## 文档

- [使用说明](docs/usage.md)
- [常见问题](docs/faq.md)

## License

MIT
