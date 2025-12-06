import React from "react";
import AdminLayout from "../../../layouts/AdminLayout/AdminLayout";
import styles from "./MemberListPage.module.css";
import { MOCK_MEMBERS } from "../../../data/mockMember";

const MembersListPage: React.FC = () => {
  // Helper để lấy class màu cho trạng thái
  const getStatusClass = (status: string) => {
    return status === "Active" ? styles.active : styles.deactivated;
  };

  return (
    <AdminLayout>
      <div className={styles.pageHeader}>
        <button className={styles.addBtn}>
          <span className={`material-symbols-outlined ${styles.addIcon}`}>
            add
          </span>
          Add Member
        </button>
      </div>

      {/* Filter Section */}
      <div className={styles.filterCard}>
        <div className={styles.filterHeader}>
          <h2 className={styles.filterTitle}>Filters</h2>
          <button className={styles.clearBtn}>Clear all</button>
        </div>

        <div className={styles.filterGrid}>
          {/* Search */}
          <div className={styles.searchWrapper}>
            <span className={`material-symbols-outlined ${styles.searchIcon}`}>
              search
            </span>
            <input
              type="text"
              placeholder="Search members..."
              className={styles.input}
            />
          </div>

          {/* Status Dropdown */}
          <select title="Filter by status" className={styles.select}>
            <option>All Status</option>
            <option>Active</option>
            <option>Deactivated</option>
          </select>

          {/* Date Picker (Mock text input) */}
          <input
            type="text"
            placeholder="mm/dd/yyyy"
            className={styles.select}
          />

          {/* Apply Button */}
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

      {/* Members Table */}
      <div className={styles.tableCard}>
        {/* Table Header Info */}
        <div className={styles.tableHeader}>
          <div>
            <h3 className={styles.tableTitle}>Members List</h3>
            <p className={styles.tableSub}>1,247 total</p>
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

        {/* Table Content */}
        <div className={styles.tableOverflow}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th}>
                  <input title="Select all" type="checkbox" />
                </th>
                <th className={styles.th}>Member ID</th>
                <th className={styles.th}>Name</th>
                <th className={styles.th}>Email</th>
                <th className={styles.th}>Status</th>
                <th className={styles.th}>Membership Date</th>
                <th className={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_MEMBERS.map((member) => (
                <tr key={member.id}>
                  <td className={styles.td}>
                    <input title={`Select ${member.name}`} type="checkbox" />
                  </td>
                  <td className={`${styles.td} ${styles.tdBold}`}>
                    {member.id}
                  </td>
                  <td className={styles.td}>
                    <div className={styles.userInfo}>
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className={styles.avatar}
                      />
                      <span className={styles.userName}>{member.name}</span>
                    </div>
                  </td>
                  <td className={styles.td}>{member.email}</td>
                  <td className={styles.td}>
                    <span
                      className={`${styles.badge} ${getStatusClass(
                        member.status
                      )}`}
                    >
                      {member.status}
                    </span>
                  </td>
                  <td className={styles.td}>{member.joinDate}</td>
                  <td className={styles.td}>
                    <div className={styles.rowActions}>
                      <button className={styles.editBtn}>
                        <span
                          className={`material-symbols-outlined ${styles.actionIcon}`}
                        >
                          edit
                        </span>
                      </button>
                      <button className={styles.deleteBtn}>
                        <span
                          className={`material-symbols-outlined ${styles.actionIcon}`}
                        >
                          delete
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className={styles.pagination}>
          <div className={styles.paginationInfo}>
            Showing <span className={styles.paginationBold}>1-5</span> of 1,247
            entries
          </div>
          <div className={styles.pageNav}>
            <button className={styles.pageBtn}>
              <span
                className={`material-symbols-outlined ${styles.chevronIcon}`}
              >
                chevron_left
              </span>
            </button>
            <button className={`${styles.pageBtn} ${styles.activePage}`}>
              1
            </button>
            <button className={styles.pageBtn}>2</button>
            <button className={styles.pageBtn}>3</button>
            <span className={styles.pageEllipsis}>...</span>
            <button className={styles.pageBtn}>125</button>
            <button className={styles.pageBtn}>
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
