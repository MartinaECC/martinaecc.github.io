import { NavLink } from "react-router-dom";

const bottomTabs = [
  { key: "home", label: "首页", to: "/", icon: "home" },
  { key: "reports", label: "报告", to: "/reports", icon: "report" },
  { key: "benefits", label: "福利", to: "/benefits", icon: "gift" },
  { key: "me", label: "我的", to: "/me", icon: "user" }
];

export default function AppShell({ children, activeTab = "home", screenClassName = "", screenInnerClassName = "" }) {
  return (
    <main className="app-prototype-page">
      <div className="mobile-app-shell">
        <section className={"app-screen " + screenClassName}>
          <div className={"app-screen-inner " + screenInnerClassName}>{children}</div>
        </section>
        <nav className="app-tabbar" aria-label="主导航">
          {bottomTabs.map((tab) => (
            <NavLink
              key={tab.key}
              to={tab.to}
              className={({ isActive }) => "app-tab" + (isActive || activeTab === tab.key ? " active" : "")}
            >
              <span className={"app-tab-icon icon-" + tab.icon} aria-hidden="true"></span>
              <span>{tab.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </main>
  );
}
