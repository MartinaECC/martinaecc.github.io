import { useState } from "react";
import { Link } from "react-router-dom";
import AppShell from "../components/AppShell.jsx";

const homeQuickEntries = [
  { label: "查风险", icon: "shield", to: "https://m.udataai.com/?udchl=UO8NQWCD&ut=8", external: true, badge: "AI优化" },
  { label: "查企业", icon: "tower", to: "https://qixun.udataai.com/?udchl=Ul2c4JGD&ut=4", external: true, badge: null },
  { label: "查财税", icon: "user-search", to: "https://m.gzzdcredit.com/?udchl=UZtgfvCD&ut=3", external: true, badge: null },
  { label: "查保姆", icon: "guard", to: "https://m.udataai.com/?udchl=UkM4q7JD&ut=7", external: true, badge: null },
  { label: "手机报告", icon: "phone", to: "https://m.udataai.com/?udchl=UfNELh7D&ut=7", external: true, badge: "防骚扰" },
  { label: "查车辆", icon: "car", to: "https://m.udataai.com/?udchl=UMdYg76D&ut=1", external: true, badge: null },
  { label: "婚恋查", icon: "heart", to: "https://m.udataai.com/?udchl=UaoreseD&ut=5", external: true, badge: null },
  { label: "司法案件", icon: "wallet", to: "https://m.udataai.com/advlogin?udchl=UY1BSgwD&ut=2", external: true, badge: "限免" },
  { label: "查学历", icon: "book", to: "https://m.udataai.com/?udchl=UeK6PCWD&ut=5", external: true, badge: null },
  { label: "运势", icon: "compass", to: "/assessments", badge: null }
];

const reportCards = [
  {
    title: "手机风险报告",
    date: "26/02/03",
    summary: "有1项风险尽快查看",
    tone: "warning",
    meta: "最新"
  },
  {
    title: "个人风险报告",
    date: "26/01/03",
    summary: "立刻完成授权查看报告，110+风险待查",
    cta: "去授权"
  },
  {
    title: "背调报告",
    date: "26/01/01",
    summary: "等待 xx 完成授权，去提醒",
    meta: "处理中"
  }
];

const monitorCards = [
  {
    title: "xx企业",
    date: "26/01/01",
    summary: "xx 开庭信息"
  }
];

const benefitTabs = ["风险排查", "手机雷达", "生活服务", "0元领", "好物券", "影视会员", "音频会员", "小说会员", "吃喝红包", "打车券", "券包天天领", "车主福利"];

const benefitCards = [
  { title: "风险报告免费领", count: "", type: "gauge", primary: true, tags: ["失信风险检测", "130+个人风险项", "司法涉诉检测"] },
  { title: "手机防骚扰雷达免费领", count: "", type: "radar", badge: "防骚扰防护", tags: ["一键反诈", "防信息泄露", "风险预警"] },
  { title: "生活服务免费领", count: "可领1次", type: "service", items: ["同程", "流量话费", "京东卡", "美团", "轻喜到家"] },
  { title: "好物0元领", count: "可领1次", type: "goods", items: ["形象美护手霜", "泊泉雅鼻膜", "形象美洁面膏", "韩纪芦荟啫喱"] },
  { title: "好物券免费领", count: "千元券包免费领", type: "coupon", items: ["双头眉笔", "荞麦面60g×两包", "猴头菇味饼干", "吮指薯片"] },
  { title: "影视会员", count: "可领2次", type: "ticket", label: "免费开通月卡", brands: ["腾讯", "芒果", "爱奇艺"] },
  { title: "音频会员", count: "可领2次", type: "ticket", label: "免费开通月卡", brands: ["网易云", "喜马", "QQ音乐"] },
  { title: "小说会员", count: "可领1次", type: "ticket", label: "免费开通月卡", brands: ["快看", "知乎", "书旗"] },
  { title: "吃喝红包免费领", count: "可领2次", type: "ticket", label: "30元 最大面额", brands: ["美团", "饿了么", "奈雪"] },
  { title: "打车券免费领", count: "可领1次", type: "ticket", label: "10元 最大面额", brands: ["滴滴", "曹操", "T3"] },
  { title: "电影券免费领", count: "免费领", type: "movie", label: "热门电影 86折看" },
  { title: "券包天天领", count: "天天免费领", type: "daily", items: ["京东外卖", "美团外卖", "滴滴出行"] },
  { title: "车主福利免费领", count: "免费领", type: "carOwner", items: ["洗车券", "车保养"] }
];

export default function AppPrototypePage({ activeTab }) {
  return (
    <AppShell
      activeTab={activeTab}
      screenClassName={activeTab === "benefits" ? "benefits-screen" : ""}
      screenInnerClassName={activeTab === "benefits" ? "benefits-screen-inner" : ""}
    >
      {renderTab(activeTab)}
    </AppShell>
  );
}

function renderTab(activeTab) {
  if (activeTab === "reports") {
    return <ReportsTab />;
  }

  if (activeTab === "benefits") {
    return <BenefitsTab />;
  }

  if (activeTab === "me") {
    return <MeTab />;
  }

  return <HomeTab />;
}

function HomeTab() {
  return (
    <div className="app-tab-page app-home-tab">
      <header className="app-topbar">
        <div>
          <p className="app-brand-mark">优鉴信用</p>
        </div>
        <div className="app-top-actions">
          <a className="icon-pill" href="https://a8-im.7x24cc.com/phone_webChat.html?accountId=N000000050790&chatId=292fda02-6f42-465d-a2b9-4d8c0dec68ef" target="_blank" rel="noreferrer">客服</a>
          <Link className="icon-pill" to="/reports">报告</Link>
        </div>
      </header>

      <div className="search-shell">搜索框</div>

      <section className="quick-grid" aria-label="快捷入口">
        {homeQuickEntries.map((entry) => (
          entry.external ? (
            <a key={entry.label} className="quick-entry" href={entry.to} target="_blank" rel="noreferrer">
              <span className="quick-icon-wrap">
                {entry.badge ? <span className="quick-badge">{entry.badge}</span> : null}
                <span className={"quick-icon icon-" + entry.icon} aria-hidden="true"></span>
              </span>
              <span className="quick-label">{entry.label}</span>
            </a>
          ) : (
            <Link key={entry.label} className="quick-entry" to={entry.to}>
              <span className="quick-icon-wrap">
                {entry.badge ? <span className="quick-badge">{entry.badge}</span> : null}
                <span className={"quick-icon icon-" + entry.icon} aria-hidden="true"></span>
              </span>
              <span className="quick-label">{entry.label}</span>
            </Link>
          )
        ))}
      </section>

      <article className="news-card">
        <div className="news-bell"></div>
        <div className="news-copy">
          <p><span className="news-tag">最新</span>您的最新报告已生成，<strong>立刻查看</strong></p>
          <p>有 <span className="news-danger">1项</span> 风险，请关注并及时优化</p>
        </div>
        <span className="news-dot"></span>
      </article>

      <section className="risk-hero-card">
        <span className="hero-floating-tag">借款被拒？</span>
        <div className="risk-copy">
          <h1>全面排查个人风险</h1>
          <ul className="risk-points">
            <li>落实核心敏感原因</li>
            <li>了解信用扣分项</li>
            <li>快速挽回信用损失</li>
          </ul>
        </div>
        <div className="risk-meter">
          <div className="risk-arc"></div>
          <p>申请风险</p>
          <strong>风险偏高</strong>
        </div>
        <a className="hero-cta" href="https://m.udataai.com/pay?udchl=UMdYgZbD&ut=5" target="_blank" rel="noreferrer">立即排查风险</a>
      </section>

      <section className="promo-grid" aria-label="运营卡片">
        <article className="promo-card promo-card-visual">
          <div>
            <h2>图片</h2>
            <p>深度信用解读</p>
          </div>
          <span className="promo-placeholder promo-mint"></span>
        </article>
        <article className="promo-card promo-card-report">
          <div>
            <h2>报告免费查</h2>
            <p>每日首单免费</p>
          </div>
          <span className="promo-placeholder promo-green"></span>
        </article>
        <Link className="promo-card promo-card-event" to="/benefits">
          <div>
            <h2>优鉴会员</h2>
            <p>免费赠 10 次</p>
          </div>
        </Link>
        <article className="promo-card promo-card-article">
          <div>
            <h2>2026 逾期记录</h2>
            <p>全面清零</p>
          </div>
        </article>
      </section>
    </div>
  );
}

function ReportsTab() {
  return (
    <div className="app-tab-page app-reports-tab">
      <header className="app-section-top">
        <h1>报告</h1>
      </header>

      <section className="segmented-summary">
        <article className="summary-pill selected">
          <strong>我的报告</strong>
          <span>3</span>
        </article>
        <article className="summary-pill">
          <strong>实时监控</strong>
          <span>2</span>
        </article>
      </section>

      <nav className="filter-tabs" aria-label="报告筛选">
        <button className="filter-tab active" type="button">全部</button>
        <button className="filter-tab" type="button">待授权</button>
        <button className="filter-tab" type="button">已完成</button>
      </nav>

      <section className="report-card-list">
        {reportCards.map((card) => (
          <article key={card.title + card.date} className={"report-card" + (card.tone ? " " + card.tone : "") }>
            <div className="report-card-head">
              <h2>{card.title}</h2>
              <span>{card.date}</span>
            </div>
            <p>{card.summary}</p>
            {card.meta ? <span className="status-chip">{card.meta}</span> : null}
            {card.cta ? <button type="button" className="report-cta">{card.cta}</button> : null}
            {card.tone === "warning" ? <span className="report-alert-dot"></span> : null}
          </article>
        ))}
      </section>

      <section className="monitor-section">
        <h2>实时监控</h2>
        <div className="report-card-list compact">
          {monitorCards.map((card) => (
            <article key={card.title} className="report-card monitor-card">
              <div className="report-card-head">
                <h3>{card.title}</h3>
                <span>{card.date}</span>
              </div>
              <p>{card.summary}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function BenefitsTab() {
  const [activeBenefit, setActiveBenefit] = useState("风险排查");
  const [agreed, setAgreed] = useState(false);
  const [paymentState, setPaymentState] = useState("idle");

  function handleBuy() {
    if (!agreed) {
      setPaymentState("needAgreement");
      window.setTimeout(() => setPaymentState("idle"), 900);
      return;
    }

    setPaymentState("selected");
  }

  return (
    <div className="app-tab-page app-benefits-tab">
      <div className="benefit-bg-panel">
        <div className="benefit-rule">规则</div>
        <section className="benefit-summary-card">
          <div className="benefit-summary-title"><span className="crown-mark">♛</span>会员尊享</div>
          <div className="benefit-summary-content">
            <div>
              <span>尊享权益</span>
              <strong>27项</strong>
            </div>
            <div>
              <span>预计可享</span>
              <strong>7528元</strong>
            </div>
            <button type="button" onClick={handleBuy}>开通领权益</button>
          </div>
        </section>

        <nav className="benefit-category-tabs" aria-label="福利分类">
          {benefitTabs.map((tab) => (
            <button
              key={tab}
              type="button"
              className={activeBenefit === tab ? "active" : ""}
              onClick={() => setActiveBenefit(tab)}
            >
              {tab}
              {tab === "风险排查" ? <span>免费领</span> : null}
              {tab === "手机雷达" ? <span>防骚扰</span> : null}
            </button>
          ))}
        </nav>

        <section className="benefit-list" aria-label="会员权益列表">
          {benefitCards.map((card) => (
            <BenefitCard key={card.title} card={card} onClaim={handleBuy} />
          ))}
        </section>
      </div>

      <section className={"floating-price-card " + (paymentState === "needAgreement" ? "needs-agreement" : "") + (paymentState === "selected" ? " selected" : "")}>
        <button className="floating-price-main" type="button" onClick={handleBuy}>
          <span className="floating-price-left"><strong>¥69特价</strong><span>原价¥99</span></span>
          <span className="floating-price-right">{paymentState === "selected" ? "已选择" : "开通包回本"}</span>
        </button>
        <button className="agreement-row" type="button" onClick={() => setAgreed((current) => !current)}>
          <span className={"agreement-check" + (agreed ? " checked" : "")}></span>
          <span>开通即同意 <a href="#">《会员服务协议》</a></span>
        </button>
      </section>
    </div>
  );
}

function BenefitCard({ card, onClaim }) {
  return (
    <article className={"benefit-item-card benefit-type-" + card.type}>
      <div className="benefit-item-head">
        <h2>{card.title}</h2>
        {card.count ? <span>{card.count}</span> : null}
      </div>

      {card.type === "gauge" ? <GaugePreview tags={card.tags} /> : null}
      {card.type === "radar" ? <RadarPreview tags={card.tags} badge={card.badge} /> : null}
      {card.type === "service" || card.type === "goods" || card.type === "coupon" ? <ItemGrid items={card.items} type={card.type} /> : null}
      {card.type === "ticket" ? <TicketPreview label={card.label} brands={card.brands} /> : null}
      {card.type === "movie" ? <MovieTicket label={card.label} /> : null}
      {card.type === "daily" ? <DailyCoupon items={card.items} /> : null}
      {card.type === "carOwner" ? <CarOwner items={card.items} /> : null}

      <button type="button" className="benefit-claim-btn" onClick={onClaim}>开通可领</button>
    </article>
  );
}

function GaugePreview({ tags }) {
  return (
    <div className="benefit-gauge-preview">
      <div className="gauge-tag-cloud">
        {tags.map((tag) => <span key={tag}>{tag}</span>)}
      </div>
      <div className="benefit-gauge"><span>综合评分</span><strong>???</strong></div>
    </div>
  );
}

function RadarPreview({ tags, badge }) {
  return (
    <div className="benefit-radar-preview">
      <div>
        <p>您有潜在风险待排查</p>
        <strong>深度排查泄露风险</strong>
        <div>{tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
      </div>
      <div className="radar-circle">较高</div>
      <span className="radar-badge">{badge}</span>
    </div>
  );
}

function ItemGrid({ items, type }) {
  return (
    <div className={"benefit-product-grid " + type}>
      {items.map((item) => <button key={item} type="button"><span></span>{item}</button>)}
    </div>
  );
}

function TicketPreview({ label, brands }) {
  return (
    <div className="benefit-ticket-preview">
      <div className="ticket-label">{label}</div>
      <div className="ticket-brands">{brands.map((brand) => <span key={brand}>{brand.slice(0, 2)}</span>)}<span>...</span></div>
      <button type="button">开通可领</button>
    </div>
  );
}

function MovieTicket({ label }) {
  return (
    <div className="movie-ticket-preview">
      <div className="film-strip"></div>
      <strong>{label}</strong>
      <span>免费取</span>
    </div>
  );
}

function DailyCoupon({ items }) {
  return (
    <div className="daily-coupon-grid">
      {items.map((item) => <button key={item} type="button"><strong>{item}</strong><span>天天领</span></button>)}
    </div>
  );
}

function CarOwner({ items }) {
  return (
    <div className="car-owner-preview">
      <div className="car-owner-banner">/// 途虎养车 ///</div>
      <div>{items.map((item) => <button key={item} type="button"><strong>{item}</strong><span>免费领</span></button>)}</div>
    </div>
  );
}

function MeTab() {
  return (
    <div className="app-tab-page app-me-tab">
      <header className="profile-header">
        <div className="profile-main">
          <div className="profile-avatar">小</div>
          <div>
            <h1>小优</h1>
            <p className="profile-role">普通用户</p>
          </div>
        </div>
        <div className="profile-actions">
          <button className="circle-action" type="button">客服</button>
          <button className="circle-action" type="button">设置</button>
        </div>
      </header>

      <section className="member-info-card">
        <div>
          <h2>会员信息</h2>
          <p>开通会员享特权</p>
        </div>
        <Link className="member-info-cta" to="/benefits">立即查看</Link>
      </section>

      <section className="me-banner-card">Banner 广告位</section>

      <section className="me-panel-card">
        <h2>我的订单</h2>
        <div className="me-order-grid">
          <article>
            <span className="me-order-icon icon-report"></span>
            <p>报告</p>
          </article>
          <article>
            <span className="me-order-icon icon-gift"></span>
            <p>订单</p>
          </article>
          <article>
            <span className="me-order-icon icon-shield"></span>
            <p>退款售后</p>
          </article>
          <article>
            <span className="me-order-icon icon-settings"></span>
            <p>订阅管理</p>
          </article>
        </div>
      </section>

      <section className="partner-card">
        <div>
          <strong>合伙人</strong>
          <p>邀请有礼</p>
        </div>
        <div>
          <strong>优鉴豆</strong>
          <p>0</p>
        </div>
        <a className="cash-button" href="https://m.shuzhigui.com/login?udchl=UY1BS41D&ut=1" target="_blank" rel="noreferrer">赚现金</a>
      </section>

      <section className="service-list-card">
        <Link to="#" className="service-item">
          <span className="service-icon icon-headset"></span>
          <span>客服中心（找小优助手）</span>
          <span className="service-arrow">›</span>
        </Link>
        <Link to="#" className="service-item">
          <span className="service-icon icon-chat"></span>
          <span>企微助手（加企微领福利）</span>
          <span className="service-arrow">›</span>
        </Link>
      </section>
    </div>
  );
}
