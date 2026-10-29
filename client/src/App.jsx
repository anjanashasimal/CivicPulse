
import { useState } from "react";
import "./App.css";

const issues = [
  {
    id: 1,
    title: "Damaged Road",
    location: "Kandy, Peradeniya Road",
    category: "Roads",
    status: "In Progress",
    icon: "🛣️",
    date: "Today",
  },
  {
    id: 2,
    title: "Garbage Not Collected",
    location: "Colombo, Nugegoda",
    category: "Waste",
    status: "Reported",
    icon: "🗑️",
    date: "Yesterday",
  },
  {
    id: 3,
    title: "Broken Street Light",
    location: "Galle, Main Street",
    category: "Electricity",
    status: "Resolved",
    icon: "💡",
    date: "2 days ago",
  },
];

function App() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [reports, setReports] = useState(issues);
  const [form, setForm] = useState({
    title: "",
    location: "",
    category: "Roads",
    description: "",
  });

  const filteredReports =
    activeFilter === "All"
      ? reports
      : reports.filter((report) => report.status === activeFilter);

  function submitReport(event) {
    event.preventDefault();

    const newReport = {
      id: Date.now(),
      title: form.title,
      location: form.location,
      category: form.category,
      description: form.description,
      status: "Reported",
      icon:
        form.category === "Roads"
          ? "🛣️"
          : form.category === "Waste"
            ? "🗑️"
            : form.category === "Water"
              ? "💧"
              : "💡",
      date: "Just now",
    };

    setReports((previous) => [newReport, ...previous]);
    setForm({
      title: "",
      location: "",
      category: "Roads",
      description: "",
    });
    setShowForm(false);
    setActiveFilter("All");
  }

  const reportedCount = reports.filter(
    (report) => report.status === "Reported",
  ).length;

  const progressCount = reports.filter(
    (report) => report.status === "In Progress",
  ).length;

  const resolvedCount = reports.filter(
    (report) => report.status === "Resolved",
  ).length;

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#" aria-label="CivicPulse home">
          <span className="brand-icon">C</span>
          <span>Civic<span className="brand-accent">Pulse</span></span>
        </a>

        <div className="sidebar-label">WORKSPACE</div>

        <button className="nav-item active">
          <span>▦</span> Dashboard
        </button>
        <button className="nav-item" onClick={() => setShowForm(true)}>
          <span>＋</span> Report an Issue
        </button>
        <button className="nav-item" onClick={() => setActiveFilter("All")}>
          <span>◷</span> All Reports
        </button>

        <div className="sidebar-bottom">
          <div className="help-card">
            <span className="help-icon">💬</span>
            <strong>Need some help?</strong>
            <p>Help make your community a better place.</p>
            <button onClick={() => setShowForm(true)}>Report a problem ↗</button>
          </div>

          <div className="profile">
            <div className="avatar">U</div>
            <div>
              <strong>Community User</strong>
              <small>Citizen account</small>
            </div>
            <span className="profile-menu">•••</span>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="breadcrumb">Workspace <span>/</span> Dashboard</div>
          <div className="topbar-right">
            <span className="online-dot"></span>
            <span className="community-label">Community Portal</span>
            <div className="top-avatar">U</div>
          </div>
        </header>

        <section className="welcome-row">
          <div>
            <div className="eyebrow">YOUR COMMUNITY, YOUR VOICE</div>
            <h1>Community Dashboard <span className="wave">👋</span></h1>
            <p>Report local issues and help make your neighborhood better.</p>
          </div>
          <button className="primary-button" onClick={() => setShowForm(true)}>
            <span>＋</span> Report an Issue
          </button>
        </section>

        <section className="stats-grid">
          <div className="stat-card">
            <div className="stat-top">
              <span>Total Reports</span>
              <span className="stat-icon purple">▤</span>
            </div>
            <strong>{reports.length.toString().padStart(2, "0")}</strong>
            <small>Community submissions</small>
          </div>

          <div className="stat-card">
            <div className="stat-top">
              <span>Reported</span>
              <span className="stat-icon orange">◷</span>
            </div>
            <strong>{reportedCount.toString().padStart(2, "0")}</strong>
            <small>Awaiting review</small>
          </div>

          <div className="stat-card">
            <div className="stat-top">
              <span>In Progress</span>
              <span className="stat-icon blue">↻</span>
            </div>
            <strong>{progressCount.toString().padStart(2, "0")}</strong>
            <small>Being addressed</small>
          </div>

          <div className="stat-card">
            <div className="stat-top">
              <span>Resolved</span>
              <span className="stat-icon green">✓</span>
            </div>
            <strong>{resolvedCount.toString().padStart(2, "0")}</strong>
            <small>Issues completed</small>
          </div>
        </section>

        <section className="reports-section">
          <div className="section-heading">
            <div>
              <h2>Recent Reports</h2>
              <p>Keep track of issues in your community.</p>
            </div>
            <button className="secondary-button" onClick={() => setShowForm(true)}>
              ＋ New Report
            </button>
          </div>

          <div className="filter-row">
            {["All", "Reported", "In Progress", "Resolved"].map((filter) => (
              <button
                key={filter}
                className={`filter-button ${activeFilter === filter ? "selected" : ""}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
                {filter === "All" && <span>{reports.length}</span>}
              </button>
            ))}
          </div>

          <div className="report-list">
            {filteredReports.map((report) => (
              <article className="report-card" key={report.id}>
                <div className="report-icon">{report.icon}</div>
                <div className="report-info">
                  <div className="report-title-row">
                    <h3>{report.title}</h3>
                    <span className={`status-badge ${report.status.toLowerCase().replace(" ", "-")}`}>
                      <span className="status-dot"></span>
                      {report.status}
                    </span>
                  </div>
                  <p className="report-location">⌖ {report.location}</p>
                  {report.description && (
                    <p className="report-description">{report.description}</p>
                  )}
                  <div className="report-meta">
                    <span>{report.category}</span>
                    <span>·</span>
                    <span>{report.date}</span>
                  </div>
                </div>
                <button
                  className="report-more"
                  title="View report details"
                  onClick={() => window.alert(`${report.title}\n${report.location}\nStatus: ${report.status}`)}
                >
                  ↗
                </button>
              </article>
            ))}

            {filteredReports.length === 0 && (
              <div className="empty-state">
                <span>📋</span>
                <h3>No reports found</h3>
                <p>There are no reports in this category yet.</p>
              </div>
            )}
          </div>
        </section>

        <footer className="footer">
          <span>© 2026 CivicPulse</span>
          <span>Built for better communities <span className="footer-heart">♥</span></span>
        </footer>
      </main>

      {showForm && (
        <div className="modal-backdrop" onClick={() => setShowForm(false)}>
          <section
            className="report-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="form-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="modal-heading">
              <div>
                <span className="eyebrow">MAKE A DIFFERENCE</span>
                <h2 id="form-title">Report an Issue</h2>
                <p>Tell us what needs attention in your community.</p>
              </div>
              <button
                className="close-button"
                aria-label="Close form"
                onClick={() => setShowForm(false)}
              >
                ×
              </button>
            </div>

            <form onSubmit={submitReport}>
              <label>
                Issue title
                <input
                  required
                  maxLength={100}
                  placeholder="e.g. Damaged road near the school"
                  value={form.title}
                  onChange={(event) =>
                    setForm({ ...form, title: event.target.value })
                  }
                />
              </label>

              <label>
                Location
                <input
                  required
                  maxLength={150}
                  placeholder="Town, street or nearby landmark"
                  value={form.location}
                  onChange={(event) =>
                    setForm({ ...form, location: event.target.value })
                  }
                />
              </label>

              <label>
                Category
                <select
                  value={form.category}
                  onChange={(event) =>
                    setForm({ ...form, category: event.target.value })
                  }
                >
                  <option value="Roads">Road damage</option>
                  <option value="Waste">Garbage and waste</option>
                  <option value="Water">Water and drainage</option>
                  <option value="Electricity">Street lights and electricity</option>
                </select>
              </label>

              <label>
                Description
                <textarea
                  required
                  rows="4"
                  maxLength={1000}
                  placeholder="Describe the issue and how it affects your community..."
                  value={form.description}
                  onChange={(event) =>
                    setForm({ ...form, description: event.target.value })
                  }
                />
              </label>

              <div className="form-note">
                ℹ️ This demo stores reports in the current browser session only.
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="primary-button">
                  Submit Report →
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </div>
  );
}

export default App;