import React, { useState, useEffect } from "react";
import AdminLayout from "../../../layouts/AdminLayout/AdminLayout";
import styles from "./MemberListPage.module.css";
import { memberService } from "../../../services/memberService";
import type { Member } from "../../../types/member.types";

const MembersListPage: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All Status");

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await memberService.getAllMembers();
      setMembers(data);
    } catch (err: any) {
      console.error("Failed to fetch members:", err);
      setError(err.message || "Failed to load members");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this member?")) return;
    try {
      await memberService.deleteMember(id);
      fetchMembers();
    } catch (err) {
      alert("Failed to delete member");
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return styles.active;
      case "BANNED":
        return styles.deactivated;
      case "SUSPENDED":
        return styles.deactivated;
      default:
        return styles.active;
    }
  };

  const filteredMembers = members.filter((member) => {
    const term = searchQuery.toLowerCase();

    const matchesSearch =
      member.user.name.toLowerCase().includes(term) ||
      member.user.email.toLowerCase().includes(term) ||
      member.membershipCode.toLowerCase().includes(term);

    const matchesStatus =
      selectedStatus === "All Status" ||
      member.status === selectedStatus.toUpperCase();

    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <AdminLayout>
        <div style={{ textAlign: "center", padding: "3rem", color: "#64748b" }}>
          Loading members...
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div style={{ textAlign: "center", padding: "3rem", color: "#ef4444" }}>
          Error: {error}
          <br />
          <button
            onClick={fetchMembers}
            style={{ marginTop: "1rem", cursor: "pointer" }}
          >
            Retry
          </button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className={styles.pageHeader}></div>

      <div className={styles.filterCard}>
        <div className={styles.filterHeader}>
          <h2 className={styles.filterTitle}>Filters</h2>
          <button
            className={styles.clearBtn}
            onClick={() => {
              setSearchQuery("");
              setSelectedStatus("All Status");
            }}
          >
            Clear all
          </button>
        </div>

        <div className={styles.filterGrid}>
          <div className={styles.searchWrapper}>
            <span className={`material-symbols-outlined ${styles.searchIcon}`}>
              search
            </span>
            <input
              type="text"
              placeholder="Search name, email, code..."
              className={styles.input}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <select
            title="Filter by status"
            className={styles.select}
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option>All Status</option>
            <option>Active</option>
            <option>Banned</option>
            <option>Suspended</option>
          </select>

          <input
            type="text"
            placeholder="mm/dd/yyyy"
            className={styles.select}
            disabled
            style={{ opacity: 0.5, cursor: "not-allowed" }}
          />

          <button className={styles.applyBtn}>
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "18px" }}
            >
              filter_list
            </span>
            Apply Filters
          </button>
        </div>
      </div>

      <div className={styles.tableCard}>
        <div className={styles.tableHeader}>
          <div>
            <h3 className={styles.tableTitle}>Members List</h3>
            <p className={styles.tableSub}>{filteredMembers.length} total</p>
          </div>
          <div className={styles.tableActions}>
            <button className={styles.iconBtn}>
              <span className="material-symbols-outlined">download</span>
            </button>
            <button className={styles.iconBtn}>
              <span className="material-symbols-outlined">print</span>
            </button>
          </div>
        </div>

        <div className={styles.tableOverflow}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th}>
                  <input title="Select all" type="checkbox" />
                </th>
                <th className={styles.th}>Member Code</th>
                <th className={styles.th}>Name</th>
                <th className={styles.th}>Email</th>
                <th className={styles.th}>Status</th>
                <th className={styles.th}>Joined Date</th>
                <th className={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    style={{ textAlign: "center", padding: "2rem" }}
                  >
                    No members found.
                  </td>
                </tr>
              ) : (
                filteredMembers.map((member) => (
                  <tr key={member.id}>
                    <td className={styles.td}>
                      <input
                        title={`Select ${member.user.name}`}
                        type="checkbox"
                      />
                    </td>

                    <td className={`${styles.td} ${styles.tdBold}`}>
                      {member.membershipCode || `#${member.id}`}
                    </td>

                    <td className={styles.td}>
                      <div className={styles.userInfo}>
                        <img
                          src={`https://ui-avatars.com/api/?name=${member.user.name}&background=random`}
                          alt={member.user.name}
                          className={styles.avatar}
                        />
                        <span className={styles.userName}>
                          {member.user.name}
                        </span>
                      </div>
                    </td>

                    <td className={styles.td}>{member.user.email}</td>

                    <td className={styles.td}>
                      <span
                        className={`${styles.badge} ${getStatusClass(
                          member.status
                        )}`}
                      >
                        {member.status}
                      </span>
                    </td>

                    <td className={styles.td}>
                      {new Date(member.createdAt).toLocaleDateString()}
                    </td>

                    <td className={styles.td}>
                      <div className={styles.rowActions}>
                        <button className={styles.editBtn} title="Edit status">
                          <span
                            className={`material-symbols-outlined ${styles.actionIcon}`}
                          >
                            edit
                          </span>
                        </button>
                        <button
                          className={styles.deleteBtn}
                          title="Delete member"
                          onClick={() => handleDelete(member.id)}
                        >
                          <span
                            className={`material-symbols-outlined ${styles.actionIcon}`}
                          >
                            delete
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className={styles.pagination}>
          <div className={styles.paginationInfo}>
            Showing{" "}
            <span className={styles.paginationBold}>
              {filteredMembers.length}
            </span>{" "}
            entries
          </div>
          <div className={styles.pageNav}>
            <button className={styles.pageBtn} disabled>
              <span
                className={`material-symbols-outlined ${styles.chevronIcon}`}
              >
                chevron_left
              </span>
            </button>
            <button className={`${styles.pageBtn} ${styles.activePage}`}>
              1
            </button>
            <button className={styles.pageBtn} disabled>
              <span
                className={`material-symbols-outlined ${styles.chevronIcon}`}
              >
                chevron_right
              </span>
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default MembersListPage;
