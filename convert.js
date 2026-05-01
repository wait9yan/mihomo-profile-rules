/*
 * Mihomo profile override for Aethersailor/Custom_OpenClash_Rules.
 *
 * Source template:
 * https://github.com/Aethersailor/Custom_OpenClash_Rules/blob/main/cfg/Custom_Clash.ini
 *
 * Usage:
 * Import this script into a client that supports JavaScript profile overrides.
 * The client should call main(config), then use the returned Mihomo config.
 */

// Aethersailor 规则仓库的 CDN 基址。所有远程 rule-provider 都从这里拼接
const BASE_URL = 'https://testingcf.jsdelivr.net/gh/Aethersailor/Custom_OpenClash_Rules@main';

// url-test 策略组使用的连通性测试地址
const TEST_URL = 'https://cp.cloudflare.com/generate_204';

// 集中维护所有策略组名称
const GROUPS = {
	manual: '🚀 手动选择',
	auto: '♻️ 自动选择',
	communication: '💬 即时通讯',
	social: '🌐 社交媒体',
	github: '🚀 GitHub',
	ai: '🤖 AI服务',
	anthropic: '🤖 Claude',
	openai: '🤖 ChatGPT',
	streaming: '🎬 流媒体',
	youtube: '📹 YouTube',
	tiktok: '🎶 TikTok',
	spotify: '🎻 Spotify',
	media: '🌎 国外媒体',
	ecommerce: '🛒 国外电商',
	googlefcm: '📢 谷歌FCM',
	google: '🇬 谷歌服务',
	apple: '🍎 苹果服务',
	microsoft: 'Ⓜ️ 微软服务',
	games: '🎮 游戏平台',
	steam: '🎮 Steam',
	speedtest: '🚀 测速工具',
	final: '🐟 漏网之鱼',
	nonstandardPort: '🔀 非标端口',
	frontProxy: '🧩 前置节点',
	residential: '🏠 家宽节点',
	hk: '🇭🇰 香港节点',
	us: '🇺🇸 美国节点',
	jp: '🇯🇵 日本节点',
	sg: '🇸🇬 新加坡节点',
	tw: '🇼🇸 台湾节点',
	kr: '🇰🇷 韩国节点',
	direct: '🎯 全球直连',
};

// 默认地区测速组
const DEFAULT_REGION_GROUPS = [GROUPS.hk, GROUPS.us, GROUPS.jp, GROUPS.sg, GROUPS.tw, GROUPS.kr];
// 流媒体分流组顺序，优先新加坡
const STREAMING_REGION_GROUPS = [GROUPS.sg, GROUPS.hk, GROUPS.us, GROUPS.jp, GROUPS.tw, GROUPS.kr];

// 排除订阅中的信息节点，例如流量、到期时间、官网、客服等说明性节点
// 这里使用 Mihomo 支持的 (?i) 大小写不敏感写法，由 Mihomo 运行时解释
const NODE_EXCLUDE_FILTER =
	'(?i)DIRECT|直接连接|群|邀请|返利|循环|官网|客服|网站|网址|获取|订阅|流量|到期|机场|下次|版本|官址|备用|过期|已用|联系|邮箱|工单|贩卖|通知|倒卖|防止|国内|地址|频道|无法|说明|使用|提示|特别|访问|支持|教程|关注|更新|作者|加入|USE|USED|TOTAL|EXPIRE|EMAIL|Panel|Channel|Author|Traffic|GB|Expire';

// 家宽/落地类节点匹配，用于单独挑选住宅、家庭宽带、商宽、落地等节点
const RESIDENTIAL_NODE_KEYWORDS = '家宽|家庭|商宽|住宅|原生|落地|专线|IEPL|IPLC|Starlink|星链|Residential|Home|ISP|Native|Fixed|Static|HKT|HKBN';
const RESIDENTIAL_NODE_FILTER = `(?i)${RESIDENTIAL_NODE_KEYWORDS}`;
const RESIDENTIAL_NODE_REGEX = new RegExp(RESIDENTIAL_NODE_KEYWORDS, 'i');
const FRONT_PROXY_EXCLUDE_FILTER = `${NODE_EXCLUDE_FILTER}|${RESIDENTIAL_NODE_KEYWORDS}`;

// 地区分组的节点名匹配规则，写入 Mihomo 配置的字符串
const REGION_PATTERNS = {
	[GROUPS.hk]:
		'(?i)(🇭🇰|港|\\bHK(?:[-_ ]?\\d+(?:[-_ ]?[A-Za-z]{2,})?)?\\b|hk|Hong Kong|HongKong|hongkong|HONG KONG|HONGKONG|深港|HKG|九龙|Kowloon|新界|沙田|荃湾|葵涌)',
	[GROUPS.us]:
		'(?i)(🇺🇸|美|波特兰|达拉斯|俄勒冈|凤凰城|费利蒙|硅谷|拉斯维加斯|洛杉矶|圣何塞|圣克拉拉|西雅图|芝加哥|纽约|纽纽|亚特兰大|迈阿密|华盛顿|\\bUS(?:[-_ ]?\\d+(?:[-_ ]?[A-Za-z]{2,})?)?\\b|United States|UnitedStates|UNITED STATES|USA|America|AMERICA|JFK|EWR|IAD|ATL|ORD|MIA|NYC|LAX|SFO|SEA|DFW|SJC)',
	[GROUPS.jp]:
		'(?i)(🇯🇵|日本|川日|东京|大阪|泉日|埼玉|沪日|深日|\\bJP(?:[-_ ]?\\d+(?:[-_ ]?[A-Za-z]{2,})?)?\\b|Japan|JAPAN|JPN|NRT|HND|KIX|TYO|OSA|关西|Kansai|KANSAI)',
	[GROUPS.sg]: '(?i)(🇸🇬|新加坡|坡|狮城|\\bSG(?:[-_ ]?\\d+(?:[-_ ]?[A-Za-z]{2,})?)?\\b|Singapore|SINGAPORE|SIN)',
	[GROUPS.tw]: '(?i)(🇹🇼|🇼🇸|台|新北|彰化|\\bTW(?:[-_ ]?\\d+(?:[-_ ]?[A-Za-z]{2,})?)?\\b|Taiwan|TAIWAN|TWN|TPE|ROC)',
	[GROUPS.kr]: '(?i)(🇰🇷|\\bKR(?:[-_ ]?\\d+(?:[-_ ]?[A-Za-z]{2,})?)?\\b|Korea|KOREA|KOR|首尔|韩|韓|春川|Chuncheon|ICN)',
};

// Claude/Anthropic 明细规则
const CLAUDE_RULES = [
	// 核心域名
	`DOMAIN-SUFFIX,anthropic.com,${GROUPS.anthropic}`,
	`DOMAIN-SUFFIX,claude.ai,${GROUPS.anthropic}`,
	`DOMAIN-SUFFIX,claude.com,${GROUPS.anthropic}`,
	`DOMAIN-SUFFIX,clau.de,${GROUPS.anthropic}`,
	`DOMAIN-SUFFIX,claudemcpclient.com,${GROUPS.anthropic}`,
	`DOMAIN-SUFFIX,claudemcpcontent.com,${GROUPS.anthropic}`,
	`DOMAIN-SUFFIX,claudeusercontent.com,${GROUPS.anthropic}`,
	// CDN 和基础设施
	`DOMAIN,cdn.anthropic.com,${GROUPS.anthropic}`,
	`DOMAIN,anthropic.com.cdn.cloudflare.net,${GROUPS.anthropic}`,
	`DOMAIN,servd-anthropic-website.b-cdn.net,${GROUPS.anthropic}`,
	// 认证服务
	`DOMAIN,anthropic.auth0.com,${GROUPS.anthropic}`,
	`DOMAIN,anthropic-com.ghost.io,${GROUPS.anthropic}`,
	// 监控和数据上报
	`DOMAIN-SUFFIX,sentry.io,${GROUPS.anthropic}`,
	`DOMAIN-SUFFIX,statsigapi.net,${GROUPS.anthropic}`,
	`DOMAIN,browser-intake-us5-datadoghq.com,${GROUPS.anthropic}`,
	`DOMAIN-KEYWORD,datadog,${GROUPS.anthropic}`,
	`DOMAIN-KEYWORD,sentry,${GROUPS.anthropic}`,
	`DOMAIN-KEYWORD,sift,${GROUPS.anthropic}`,
	// 客服 / 第三方 widget
	`DOMAIN-SUFFIX,intercom.io,${GROUPS.anthropic}`,
	`DOMAIN-SUFFIX,intercomcdn.com,${GROUPS.anthropic}`,
	`DOMAIN,cdn.usefathom.com,${GROUPS.anthropic}`,
	// IP 段 / ASN 兜底规则
	`IP-CIDR,160.79.104.0/21,${GROUPS.anthropic},no-resolve`,
	`IP-CIDR6,2607:6bc0::/32,${GROUPS.anthropic},no-resolve`,
	`IP-ASN,399358,${GROUPS.anthropic},no-resolve`,
	// geosite 和关键词兜底
	`GEOSITE,anthropic,${GROUPS.anthropic}`,
	`GEOSITE,category-ntp,${GROUPS.anthropic}`,
];

// 生成 Mihomo rule-provider 配置
function provider(behavior, file, interval = 28800) {
	return {
		type: 'http',
		behavior,
		format: 'yaml',
		interval,
		url: `${BASE_URL}/rule/${file}`,
		path: `./ruleset/${file}`,
	};
}

function buildRuleProviders() {
	return {
		// 自定义直连域名规则
		Custom_Direct_Domain: provider('domain', 'Custom_Direct_Domain.yaml'),
		// 自定义直连 IP/端口等 classical 规则
		Custom_Direct_Classical_IP: provider('classical', 'Custom_Direct_Classical_IP.yaml'),
		// 自定义代理域名规则
		Custom_Proxy_Domain: provider('domain', 'Custom_Proxy_Domain.yaml'),
		// 自定义代理 IP/端口等 classical 规则
		Custom_Proxy_Classical_IP: provider('classical', 'Custom_Proxy_Classical_IP.yaml'),
		// Steam 下载 CDN 直连规则
		Steam_CDN_Classical: provider('classical', 'Steam_CDN_Classical.yaml'),
		// 80/443 以外端口分流规则，对应 “🔀 非标端口”
		Custom_Port_Direct: provider('classical', 'Custom_Port_Direct.yaml'),
	};
}

// 生成最终分流规则
// 前面的规则优先级更高，最后用 MATCH 兜底
function buildRules() {
	return [
		// 本地地址、私有地址优先直连
		`GEOSITE,private,${GROUPS.direct}`,
		`GEOIP,private,${GROUPS.direct},no-resolve`,
		// 项目自带直连/代理补充规则
		`RULE-SET,Custom_Direct_Domain,${GROUPS.direct}`,
		`RULE-SET,Custom_Direct_Classical_IP,${GROUPS.direct}`,
		`RULE-SET,Custom_Proxy_Domain,${GROUPS.manual}`,
		`RULE-SET,Custom_Proxy_Classical_IP,${GROUPS.manual}`,
		// 国内可用服务、下载 CDN、BT tracker 等直连
		`GEOSITE,google-cn,${GROUPS.direct}`,
		`GEOSITE,category-games@cn,${GROUPS.direct}`,
		`RULE-SET,Steam_CDN_Classical,${GROUPS.direct}`,
		`GEOSITE,category-game-platforms-download,${GROUPS.direct}`,
		`GEOSITE,category-public-tracker,${GROUPS.direct}`,
		// 海外服务按业务类型进入不同策略组
		`GEOSITE,category-communication,${GROUPS.communication}`,
		`GEOSITE,category-social-media-!cn,${GROUPS.social}`,
		`GEOSITE,github,${GROUPS.github}`,
		...CLAUDE_RULES,
		`GEOSITE,openai,${GROUPS.openai}`,
		`GEOSITE,category-ai-!cn,${GROUPS.ai}`,
		`GEOSITE,youtube,${GROUPS.youtube}`,
		`GEOSITE,tiktok,${GROUPS.tiktok}`,
		`GEOSITE,spotify,${GROUPS.spotify}`,
		`GEOSITE,netflix,${GROUPS.streaming}`,
		`GEOSITE,disney,${GROUPS.streaming}`,
		`GEOSITE,hbo,${GROUPS.streaming}`,
		`GEOSITE,primevideo,${GROUPS.streaming}`,
		`GEOSITE,category-emby,${GROUPS.streaming}`,
		`GEOSITE,apple-tvplus,${GROUPS.streaming}`,
		`GEOSITE,googlefcm,${GROUPS.googlefcm}`,
		`GEOSITE,google,${GROUPS.google}`,
		`GEOSITE,apple,${GROUPS.apple}`,
		`GEOSITE,microsoft,${GROUPS.microsoft}`,
		`GEOSITE,steam,${GROUPS.steam}`,
		`GEOSITE,category-games,${GROUPS.games}`,
		`GEOSITE,category-entertainment,${GROUPS.media}`,
		`GEOSITE,category-ecommerce,${GROUPS.ecommerce}`,
		`GEOSITE,category-speedtest,${GROUPS.speedtest}`,
		`GEOSITE,gfw,${GROUPS.manual}`,
		// 常见海外服务的 IP 规则，no-resolve 避免为 IP 规则额外触发 DNS 解析
		`GEOIP,telegram,${GROUPS.communication},no-resolve`,
		`GEOIP,twitter,${GROUPS.social},no-resolve`,
		`GEOIP,facebook,${GROUPS.social},no-resolve`,
		`GEOIP,google,${GROUPS.google},no-resolve`,
		`GEOIP,netflix,${GROUPS.streaming},no-resolve`,
		// 中国大陆域名/IP 兜底直连
		`GEOSITE,cn,${GROUPS.direct}`,
		`GEOIP,cn,${GROUPS.direct},no-resolve`,
		// 非 80/443 端口交给专门策略组，最后 MATCH 走漏网之鱼
		`RULE-SET,Custom_Port_Direct,${GROUPS.nonstandardPort}`,
		`MATCH,${GROUPS.final}`,
	];
}

// 生成 select 策略组。
// includeAll=true 时，会让 Mihomo 把所有订阅节点也纳入该组，并用 exclude-filter 排除信息节点。
function selectGroup(name, proxies, includeAll = false, excludeFilter = NODE_EXCLUDE_FILTER, filter) {
	const group = { name, type: 'select', proxies: [...proxies] };
	if (includeAll) {
		group['include-all'] = true;
		group['exclude-filter'] = excludeFilter;
	}
	if (filter) group.filter = filter;
	return group;
}

// 生成 url-test 自动测速组。地区组会额外传入 filter，只测试对应地区节点
function urlTestGroup(name, filter) {
	const group = {
		name,
		type: 'url-test',
		url: TEST_URL,
		interval: 300,
		tolerance: 50,
		'include-all': true,
		'exclude-filter': NODE_EXCLUDE_FILTER,
	};
	if (filter) group.filter = filter;
	return group;
}

// 生成 proxy-groups。这里对应 Custom_Clash.ini 中所有 custom_proxy_group 行
function buildProxyGroups() {
	return [
		// 核心手动选择与自动选择。
		selectGroup(GROUPS.manual, [GROUPS.auto, GROUPS.residential, ...DEFAULT_REGION_GROUPS], true),
		urlTestGroup(GROUPS.auto),
		// 业务策略组。不同服务的候选策略顺序来自默认模板
		selectGroup(GROUPS.communication, [GROUPS.manual, GROUPS.auto, GROUPS.direct, ...DEFAULT_REGION_GROUPS]),
		selectGroup(GROUPS.social, [GROUPS.manual, GROUPS.auto, GROUPS.direct, ...DEFAULT_REGION_GROUPS]),
		selectGroup(GROUPS.github, [GROUPS.manual, GROUPS.auto, GROUPS.direct, ...DEFAULT_REGION_GROUPS]),
		selectGroup(GROUPS.ai, [GROUPS.residential, GROUPS.manual, GROUPS.auto, ...DEFAULT_REGION_GROUPS]),
		selectGroup(GROUPS.anthropic, [GROUPS.residential, GROUPS.manual, GROUPS.auto, ...DEFAULT_REGION_GROUPS]),
		selectGroup(GROUPS.openai, [GROUPS.residential, GROUPS.manual, GROUPS.auto, ...DEFAULT_REGION_GROUPS]),
		selectGroup(GROUPS.streaming, [GROUPS.manual, GROUPS.auto, GROUPS.direct, ...STREAMING_REGION_GROUPS]),
		selectGroup(GROUPS.youtube, [GROUPS.manual, GROUPS.auto, ...STREAMING_REGION_GROUPS]),
		selectGroup(GROUPS.tiktok, [GROUPS.manual, GROUPS.auto, ...STREAMING_REGION_GROUPS]),
		selectGroup(GROUPS.spotify, [GROUPS.manual, GROUPS.auto, ...STREAMING_REGION_GROUPS]),
		selectGroup(GROUPS.media, [GROUPS.manual, GROUPS.auto, GROUPS.direct, ...DEFAULT_REGION_GROUPS]),
		selectGroup(GROUPS.ecommerce, [GROUPS.manual, GROUPS.auto, GROUPS.direct, ...DEFAULT_REGION_GROUPS]),
		selectGroup(GROUPS.googlefcm, [GROUPS.manual, GROUPS.auto, GROUPS.residential, ...DEFAULT_REGION_GROUPS]),
		selectGroup(GROUPS.google, [GROUPS.manual, GROUPS.auto, GROUPS.residential, ...DEFAULT_REGION_GROUPS]),
		selectGroup(GROUPS.apple, [GROUPS.direct, GROUPS.manual, GROUPS.auto, GROUPS.residential, ...DEFAULT_REGION_GROUPS]),
		selectGroup(GROUPS.microsoft, [GROUPS.direct, GROUPS.manual, GROUPS.auto, GROUPS.residential, ...DEFAULT_REGION_GROUPS]),
		selectGroup(GROUPS.games, [GROUPS.direct, GROUPS.manual, GROUPS.auto, ...DEFAULT_REGION_GROUPS]),
		selectGroup(GROUPS.steam, [GROUPS.direct, GROUPS.manual, GROUPS.auto, ...DEFAULT_REGION_GROUPS]),
		selectGroup(GROUPS.speedtest, [GROUPS.direct, GROUPS.manual, GROUPS.auto, GROUPS.residential, ...DEFAULT_REGION_GROUPS], true),
		selectGroup(GROUPS.final, [GROUPS.manual, GROUPS.auto, GROUPS.direct, ...DEFAULT_REGION_GROUPS], true),
		selectGroup(GROUPS.nonstandardPort, [GROUPS.final, GROUPS.direct]),
		selectGroup(GROUPS.frontProxy, [], true, FRONT_PROXY_EXCLUDE_FILTER),
		selectGroup(GROUPS.residential, [], true, NODE_EXCLUDE_FILTER, RESIDENTIAL_NODE_FILTER),
		// 地区测速组，使用 include-all + filter 由 Mihomo 运行时筛选节点。
		...DEFAULT_REGION_GROUPS.map((name) => urlTestGroup(name, REGION_PATTERNS[name])),
		// 直连组只包含 Mihomo 内置 DIRECT。
		selectGroup(GROUPS.direct, ['DIRECT']),
	];
}

// 给家宽/落地类节点设置前置代理组，形成链式代理
function applyResidentialDialerProxy(config) {
	if (!Array.isArray(config.proxies)) return;
	for (const proxy of config.proxies) {
		if (!proxy || typeof proxy.name !== 'string') continue;
		if (proxy['dialer-proxy']) continue;
		if (RESIDENTIAL_NODE_REGEX.test(proxy.name)) {
			proxy['dialer-proxy'] = GROUPS.frontProxy;
		}
	}
}

// Mihomo Profile 覆写脚本入口
// 这里会为家宽节点写入 dialer-proxy，并覆盖策略组和规则，合并 rule-providers
// dns、tun、端口等运行环境配置不在这里处理
function main(config) {
	applyResidentialDialerProxy(config);
	config['proxy-groups'] = buildProxyGroups();
	config['rule-providers'] = {
		...(config['rule-providers'] || {}),
		...buildRuleProviders(),
	};
	config.rules = buildRules();
	return config;
}
