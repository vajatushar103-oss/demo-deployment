import { useEffect, useMemo, useState } from 'react';
import {Activity,Check,ChevronDown,Edit3,KeyRound,Lock,Mail,Plus,RefreshCw,Search,Shield,ShieldCheck,UserCheck,UserCog,UserPlus,UserRound,UserRoundCheck,UserRoundX,Users,X} from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout.jsx';
import { userService, userServiceUpdateUser } from '../../services/api.js';
import { useAuth } from '../../components/context/AuthContext.jsx';

import {tempAdminUsers} from "../../services/auth.api.js";

const emptyForm = {
  name: '',
  email: '',
  password: '',
  role: 'staff'
};

const emptyEditForm = {
  name: '',
  email: '',
  password: ''
};

function formatDate(value) {
  if (!value) return 'Never';

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return '—';
  }

  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
}

function formatDateTime(value) {
  if (!value) return 'Never';

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return '—';
  }

  return date.toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

function getInitials(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('') || 'U';
}

function StatCard({ icon: Icon, label, value, detail, accent = 'green' }) {
  return (
    <div className="admin-stat-card group">
      <div className={`admin-stat-icon ${accent}`}>
        <Icon size={19} />
      </div>

      <div className="min-w-0">
        <p className="admin-stat-label">{label}</p>

        <div className="mt-1 flex items-end gap-2">
          <span className="font-display text-2xl font-extrabold tracking-tight text-white">
            {value}
          </span>

          {detail && (
            <span className="mb-1 text-[9px] font-bold uppercase tracking-widest text-slate-600">
              {detail}
            </span>
          )}
        </div>
      </div>

      <div className="admin-stat-glow" />
    </div>
  );
}

function Field({ label, hint, children }) {
  return (
    <label className="block">
      <span className="staff-field-label">
        {label}
        {hint && <small>{hint}</small>}
      </span>

      {children}
    </label>
  );
}

function RoleBadge({ role }) {
  const normalizedRole = String(role || '').trim().toLowerCase();

  if (normalizedRole === 'admin') {
    return (
      <span className="admin-role-badge admin-role-badge-admin">
        <ShieldCheck size={12} />
        Administrator
      </span>
    );
  }

  if (normalizedRole === 'staff') {
    return (
      <span className="admin-role-badge admin-role-badge-staff">
        <UserCog size={12} />
        Staff
      </span>
    );
  }

  // Unknown / missing role
  return (
    <span className="admin-role-badge admin-role-badge-unknown">
      <UserRoundX size={12} />
      Unknown
    </span>
  );
}

function StatusBadge({ active }) {
  return (
    <span
      className={`admin-status-badge ${
        active ? 'admin-status-active' : 'admin-status-disabled'
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {active ? 'Access active' : 'Access disabled'}
    </span>
  );
}

function UserAvatar({ user }) {
  return (
    <div
      className={`admin-user-avatar ${
        user.role === 'admin' ? 'admin-user-avatar-admin' : ''
      }`}
    >
      {getInitials(user.name)}
    </div>
  );
}

function UserCard({
  user,
  currentUser,
  onEdit,
  onToggleAccess,
  onChangeRole,
  onResetPassword,
  busyId
}) {
  const isCurrentUser = user.id === currentUser?.id;
  const busy = busyId === user.id;

  return (
    <article className="admin-user-card group">
      <div className="admin-user-card-glow" />

      <div className="relative p-5 sm:p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">

          <div className="flex min-w-0 items-start gap-4">
            <UserAvatar user={user} />

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="truncate font-display text-base font-extrabold text-white sm:text-lg">
                  {user.name}
                </h3>

                {isCurrentUser && (
                  <span className="admin-you-badge">
                    You
                  </span>
                )}
              </div>

              <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                <Mail size={13} />
                <span className="truncate">{user.email}</span>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                <RoleBadge role={user.role} />
                <StatusBadge active={user.isActive} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:min-w-[330px]">
            <div className="admin-user-meta">
              <span>Last login</span>
              <strong>{formatDate(user.lastLoginAt)}</strong>
            </div>

            <div className="admin-user-meta">
              <span>Created</span>
              <strong>{formatDate(user.createdAt)}</strong>
            </div>

            <div className="admin-user-meta col-span-2 sm:col-span-1">
              <span>Access</span>
              <strong>{user.isActive ? 'Granted' : 'Revoked'}</strong>
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-white/5 pt-4">
          <button
            type="button"
            onClick={() => onEdit(user)}
            className="admin-action-button"
          >
            <Edit3 size={14} />
            Edit
          </button>

          <button
            type="button"
            onClick={() => onResetPassword(user)}
            disabled={isCurrentUser || busy}
            className="admin-action-button"
          >
            <KeyRound size={14} />
            Reset password
          </button>

          <button
            type="button"
            onClick={() => onChangeRole(user)}
            disabled={isCurrentUser || busy}
            className="admin-action-button"
          >
            <Shield size={14} />
            Make {user.role === 'admin' ? 'staff' : 'admin'}
          </button>

          <button
            type="button"
            onClick={() => onToggleAccess(user)}
            disabled={isCurrentUser || busy}
            className={`admin-action-button ${
              user.isActive ? 'danger' : 'success'
            }`}
          >
            {busy ? (
              <span className="h-3.5 w-3.5 animate-spin rounded-full border border-current/30 border-t-current" />
            ) : user.isActive ? (
              <UserRoundX size={14} />
            ) : (
              <UserRoundCheck size={14} />
            )}

            {user.isActive ? 'Disable access' : 'Restore access'}
          </button>
        </div>

        {isCurrentUser && (
          <div className="mt-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-slate-600">
            <Lock size={12} />
            Your own access and role cannot be changed from this panel.
          </div>
        )}
      </div>
    </article>
  );
}

export default function AdminControlPage() {
  const { user: currentUser } = useAuth();

  const [users, setUsers] = useState([]);

  const [form, setForm] = useState(emptyForm);
  const [editForm, setEditForm] = useState(emptyEditForm);
  const [editingUser, setEditingUser] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [busyId, setBusyId] = useState(null);

  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const [query, setQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const [showCreate, setShowCreate] = useState(false);

  const [activities, setActivities] = useState([]);

  const load = async () => {
    try {

        setLoading(true);
        setError('');
        
        // const data = await userService.getAll();

        const data = await tempAdminUsers();

        // console.log(data.users);
        
        setUsers(data.users || []);
    } catch (err) {
      setError(err.message || 'Unable to load users.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const addActivity = (text, type = 'normal') => {
    setActivities((items) => [
      {
        id: `${Date.now()}-${Math.random()}`,
        text,
        type,
        time: new Date()
      },
      ...items
    ].slice(0, 6));
  };

  const stats = useMemo(() => {
    const total = users.length;
    const admins = users.filter((user) => user.role === 'admin').length;
    const staff = users.filter((user) => user.role === 'staff').length;
    const active = users.filter((user) => user.isActive).length;
    const disabled = users.filter((user) => !user.isActive).length;

    return {
      total,
      admins,
      staff,
      active,
      disabled
    };
  }, [users]);

  const filteredUsers = useMemo(() => {
    const search = query.trim().toLowerCase();

    return users.filter((user) => {
      const matchesSearch =
        !search ||
        [user.name, user.email, user.role]
          .filter(Boolean)
          .some((value) =>
            String(value).toLowerCase().includes(search)
          );

      const matchesRole =
        roleFilter === 'all' || user.role === roleFilter;

      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'active' && user.isActive) ||
        (statusFilter === 'disabled' && !user.isActive);

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, query, roleFilter, statusFilter]);

  const create = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError('');
      setMessage('');

      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
        role: form.role
      };

      const data = await userService.create(payload);

      setUsers((items) => [data.user, ...items]);

      addActivity(
        `${data.user.name} was created as ${data.user.role}.`,
        'success'
      );

      setMessage(
        `${data.user.role === 'admin' ? 'Administrator' : 'Staff'} account created successfully.`
      );

      setForm(emptyForm);
      setShowCreate(false);
    } catch (err) {
      setError(err.message || 'Unable to create user.');
    } finally {
      setSaving(false);
    }
  };

  const openEdit = (user) => {
    setEditingUser(user);

    setEditForm({
      name: user.name || '',
      email: user.email || '',
      password: ''
    });

    setError('');
    setMessage('');
  };

  const closeEdit = () => {
    setEditingUser(null);
    setEditForm(emptyEditForm);
  };

  const saveEdit = async (event) => {
    event.preventDefault();

    if (!editingUser) return;

    try {
      setSaving(true);
      setError('');
      setMessage('');

      const payload = {
        name: editForm.name.trim(),
        email: editForm.email.trim()
      };

      if (editForm.password.trim()) {
        payload.password = editForm.password;
      }

      
      // const data = await userService.update(
      //   editingUser.id,
      //   payload
      // );

      const data = await userServiceUpdateUser(
        editingUser.id,
        payload
      );

      // console.log("=========================CLIENT_CHECKPOINT=========================");

      // console.log("data at client: " + data);
      // console.log("data at client: ");


      setUsers((items) =>
        items.map((item) =>
          item.id === editingUser.id ? data.user : item
        )
      );

      addActivity(
        `${data.user.name}'s account details were updated.`,
        'success'
      );

      setMessage('Account details updated successfully.');

      closeEdit();
    } catch (err) {
      setError(err.message || 'Unable to update account.');
    } finally {
      setSaving(false);
    }
  };

  const toggleAccess = async (user) => {


    const action = user.isActive
      ? 'disable login access'
      : 'restore login access';

    const confirmed = window.confirm(
      `${user.isActive ? 'Disable' : 'Restore'} login access for "${user.name}"?\n\n` +
      `The user record will remain in the database.`
    );

    if (!confirmed) return;

    try {
      setBusyId(user.id);
      setError('');
      setMessage('');

      
      // const data = await userService.update(user.id, {
      //   isActive: !user.isActive
      // });

      const data = await userServiceUpdateUser(
        user.id,
        {isActive: !user.isActive}
      );
      
      setUsers((items) =>
        items.map((item) =>
          item.id === user.id ? data.user : item
        )
      );
      
      addActivity(
        `${user.name}: ${action}.`,
        user.isActive ? 'warning' : 'success'
      );
      
      setMessage(
        user.isActive
        ? `${user.name}'s login access has been disabled. Database data was retained.`
        : `${user.name}'s login access has been restored.`
      );
      // console.log("===================================CLIENT_CHECKPOINT===================================");
    } catch (err) {
      setError(err.message || 'Unable to change account access.');
    } finally {
      setBusyId(null);
    }
  };

  const changeRole = async (user) => {

    
    const newRole =
    user.role === 'admin' ? 'staff' : 'admin';
    
    const confirmed = window.confirm(
      `Change "${user.name}" from ${user.role} to ${newRole}?`
    );

    if (!confirmed) return;
    
    try {
      setBusyId(user.id);
      setError('');
      setMessage('');
      
      // const data = await userService.update(user.id, {
      //   role: newRole
      // });

      const data = await userServiceUpdateUser(user.id, {
        role: newRole
      });
      
      setUsers((items) =>
        items.map((item) =>
          item.id === user.id ? data.user : item
    )
  );
  
  addActivity(
    `${user.name} was changed to ${newRole}.`,
        'success'
      );
      
      setMessage(
        `${user.name} is now ${newRole === 'admin' ? 'an administrator' : 'staff'}.`
      );
      // console.log("===================================CLIENT_CHECKPOINT===================================");
    } catch (err) {
      setError(err.message || 'Unable to change role.');
    } finally {
      setBusyId(null);
    }
  };

  const resetPassword = (user) => {
    openEdit(user);

    setTimeout(() => {
      document
        .getElementById('admin-password-field')
        ?.focus();
    }, 100);
  };

  return (
    <AdminLayout>
      <div className="admin-control-shell">

        <div className="admin-control-grid" />

        {/* HEADER */}
        <section className="admin-control-hero">

          <div className="admin-hero-orbit admin-hero-orbit-one" />
          <div className="admin-hero-orbit admin-hero-orbit-two" />

          <div className="relative z-10">

            <div className="mb-3 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-jet-400">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-jet-400" />
              Administration control
            </div>

            <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">

              <div>
                <h1 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                  Staff & Admin
                  <span className="text-slate-600"> / </span>
                  Control Center
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
                  Manage PRIME Machines accounts, permissions and login
                  access without removing user records from the database.
                </p>
              </div>

              <div className="flex items-center gap-2 rounded-2xl border border-jet-400/10 bg-black/20 px-4 py-3 backdrop-blur">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-jet-400 opacity-50" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-jet-400" />
                </span>

                <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-400">
                  Access system online
                </span>
              </div>

            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">

          <StatCard
            icon={Users}
            label="Total accounts"
            value={stats.total}
            detail="users"
          />

          <StatCard
            icon={ShieldCheck}
            label="Administrators"
            value={stats.admins}
            detail="admin"
            accent="purple"
          />

          <StatCard
            icon={UserRound}
            label="Staff"
            value={stats.staff}
            detail="staff"
            accent="blue"
          />

          <StatCard
            icon={UserCheck}
            label="Active access"
            value={stats.active}
            detail="enabled"
            accent="green"
          />

          <StatCard
            icon={UserRoundX}
            label="Disabled"
            value={stats.disabled}
            detail="retained"
            accent="red"
          />

        </section>

        {/* ALERTS */}
        {error && (
          <div className="staff-alert error">
            <X size={17} />
            <span>{error}</span>

            <button
              type="button"
              onClick={() => setError('')}
              className="ml-auto"
            >
              <X size={15} />
            </button>
          </div>
        )}

        {message && (
          <div className="staff-alert success">
            <Check size={17} />
            <span>{message}</span>

            <button
              type="button"
              onClick={() => setMessage('')}
              className="ml-auto"
            >
              <X size={15} />
            </button>
          </div>
        )}

        {/* MAIN GRID */}
        <div className="grid gap-6 xl:grid-cols-[1fr_320px]">

          <div className="min-w-0 space-y-6">

            {/* CREATE */}
            <section className="admin-panel-card">

              <button
                type="button"
                onClick={() => setShowCreate((value) => !value)}
                className="admin-panel-header-button"
              >
                <div className="flex items-center gap-3">
                  <div className="admin-panel-icon">
                    <UserPlus size={18} />
                  </div>

                  <div className="text-left">
                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-jet-400">
                      Account provisioning
                    </p>

                    <h2 className="mt-1 font-display text-lg font-extrabold text-white">
                      Add staff or administrator
                    </h2>
                  </div>
                </div>

                <ChevronDown
                  size={18}
                  className={`text-slate-600 transition ${
                    showCreate ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {showCreate && (
                <form
                  onSubmit={create}
                  className="admin-create-form"
                >
                  <div className="grid gap-5 md:grid-cols-2">

                    <Field label="Full name">
                      <input
                        required
                        value={form.name}
                        onChange={(event) =>
                          setForm({
                            ...form,
                            name: event.target.value
                          })
                        }
                        placeholder="e.g. Rahul Patel"
                        className="staff-input "
                      />
                    </Field>

                    <Field label="Email address">
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={(event) =>
                          setForm({
                            ...form,
                            email: event.target.value
                          })
                        }
                        placeholder="staff@prime-machines.com"
                        className="staff-input"
                      />
                    </Field>

                    <Field
                      label="Initial password"
                      hint="Minimum 8 characters"
                    >
                      <input
                        required
                        minLength={8}
                        type="password"
                        value={form.password}
                        onChange={(event) =>
                          setForm({
                            ...form,
                            password: event.target.value
                          })
                        }
                        placeholder="Create secure password"
                        className="staff-input"
                      />
                    </Field>

                    <Field label="Access role">
                      <select
                        value={form.role}
                        onChange={(event) =>
                          setForm({
                            ...form,
                            role: event.target.value
                          })
                        }
                        className="staff-select w-full"
                      >
                        <option value="staff">
                          Staff — catalogue access
                        </option>

                        <option value="admin">
                          Admin — full control
                        </option>
                      </select>
                    </Field>

                  </div>

                  <div className="mt-5 flex flex-col justify-between gap-4 border-t border-white/5 pt-5 sm:flex-row sm:items-center">
                    <div className="flex items-start gap-2 text-[10px] leading-5 text-slate-600">
                      <Shield size={14} className="mt-0.5 shrink-0" />
                      <span>
                        Accounts are created directly by an administrator.
                        There is no public registration page.
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setForm(emptyForm);
                          setShowCreate(false);
                        }}
                        className="staff-secondary-button"
                      >
                        Cancel
                      </button>

                      <button
                        disabled={saving}
                        className="staff-primary-button disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <UserPlus size={16} />

                        {saving
                          ? 'Creating account...'
                          : 'Create account'}
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </section>

            {/* USER DIRECTORY */}
            <section className="admin-panel-card overflow-hidden">

              <div className="border-b border-white/10 p-5 sm:p-6">

                <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">

                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-600">
                      User directory
                    </p>

                    <h2 className="mt-1 font-display text-xl font-extrabold text-white">
                      Accounts
                      <span className="ml-2 font-normal text-slate-600">
                        {filteredUsers.length} of {users.length}
                      </span>
                    </h2>
                  </div>

                  <div className="flex flex-col gap-2 sm:flex-row">

                    <div className="staff-search">
                      <Search size={16} />

                      <input
                        value={query}
                        onChange={(event) =>
                          setQuery(event.target.value)
                        }
                        placeholder="Search name or email..."
                      />
                    </div>

                    <select
                      value={roleFilter}
                      onChange={(event) =>
                        setRoleFilter(event.target.value)
                      }
                      className="staff-select"
                    >
                      <option value="all">
                        All roles
                      </option>

                      <option value="admin">
                        Administrators
                      </option>

                      <option value="staff">
                        Staff
                      </option>
                    </select>

                    <select
                      value={statusFilter}
                      onChange={(event) =>
                        setStatusFilter(event.target.value)
                      }
                      className="staff-select"
                    >
                      <option value="all">
                        All status
                      </option>

                      <option value="active">
                        Active
                      </option>

                      <option value="disabled">
                        Disabled
                      </option>
                    </select>

                    <button
                      type="button"
                      onClick={load}
                      disabled={loading}
                      className="staff-icon-button"
                      title="Refresh users"
                    >
                      <RefreshCw
                        size={16}
                        className={
                          loading ? 'animate-spin' : ''
                        }
                      />
                    </button>

                  </div>
                </div>
              </div>

              {loading ? (
                <div className="space-y-3 p-5 sm:p-6">
                  <div className="admin-user-skeleton" />
                  <div className="admin-user-skeleton" />
                  <div className="admin-user-skeleton" />
                </div>
              ) : filteredUsers.length === 0 ? (
                <div className="p-14 text-center">

                  <div className="admin-empty-icon">
                    <Users size={22} />
                  </div>

                  <h3 className="mt-4 font-display text-lg font-bold text-white">
                    No accounts found
                  </h3>

                  <p className="mt-2 text-sm text-slate-600">
                    Try changing your search or filters.
                  </p>

                </div>
              ) : (
                <div className="space-y-3 p-4 sm:p-5">
                  {filteredUsers.map((user) => (
                    <UserCard
                      key={user.id}
                      user={user}
                      currentUser={currentUser}
                      onEdit={openEdit}
                      onToggleAccess={toggleAccess}
                      onChangeRole={changeRole}
                      onResetPassword={resetPassword}
                      busyId={busyId}
                    />
                  ))}
                </div>
              )}

            </section>

          </div>

          {/* RIGHT SIDE */}
          <aside className="space-y-6">

            {/* SECURITY */}
            <section className="admin-side-card">

              <div className="admin-side-card-header">
                <div className="admin-panel-icon">
                  <ShieldCheck size={17} />
                </div>

                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-jet-400">
                    Security
                  </p>

                  <h3 className="mt-1 font-display text-base font-extrabold text-white">
                    Access rules
                  </h3>
                </div>
              </div>

              <div className="space-y-3 p-5">

                <div className="admin-rule">
                  <Check size={13} />
                  <span>
                    Staff can manage catalogue products.
                  </span>
                </div>

                <div className="admin-rule">
                  <Check size={13} />
                  <span>
                    Admins can manage staff and admins.
                  </span>
                </div>

                <div className="admin-rule">
                  <Check size={13} />
                  <span>
                    Disabled accounts remain in MongoDB.
                  </span>
                </div>

                <div className="admin-rule">
                  <Check size={13} />
                  <span>
                    Users cannot disable their own account.
                  </span>
                </div>

                <div className="admin-rule">
                  <Check size={13} />
                  <span>
                    Users cannot change their own role.
                  </span>
                </div>

              </div>
            </section>

            {/* SESSION ACTIVITY */}
            <section className="admin-side-card">

              <div className="admin-side-card-header">
                <div className="admin-panel-icon">
                  <Activity size={17} />
                </div>

                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-jet-400">
                    Session activity
                  </p>

                  <h3 className="mt-1 font-display text-base font-extrabold text-white">
                    Recent actions
                  </h3>
                </div>
              </div>

              <div className="p-5">

                {activities.length === 0 ? (
                  <div className="py-6 text-center">
                    <Activity
                      size={22}
                      className="mx-auto text-slate-700"
                    />

                    <p className="mt-3 text-xs leading-5 text-slate-600">
                      Account management actions performed during
                      this panel session will appear here.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {activities.map((activity) => (
                      <div
                        key={activity.id}
                        className="admin-activity-item"
                      >
                        <span
                          className={`admin-activity-dot ${
                            activity.type
                          }`}
                        />

                        <div className="min-w-0">
                          <p className="text-xs leading-5 text-slate-400">
                            {activity.text}
                          </p>

                          <p className="mt-1 text-[9px] font-bold uppercase tracking-wider text-slate-700">
                            {formatDateTime(activity.time)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            </section>

            {/* CURRENT ADMIN */}
            <section className="admin-profile-card">

              <div className="admin-profile-glow" />

              <div className="relative">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-jet-400">
                  Current session
                </p>

                <div className="mt-4 flex items-center gap-3">
                  <div className="admin-user-avatar admin-user-avatar-admin">
                    {getInitials(currentUser?.name)}
                  </div>

                  <div className="min-w-0">
                    <h3 className="truncate font-display font-bold text-white">
                      {currentUser?.name || 'Administrator'}
                    </h3>

                    <p className="truncate text-xs text-slate-600">
                      {currentUser?.email}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <RoleBadge role={currentUser?.role} />

                  <span className="admin-status-badge admin-status-active">
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                    Session active
                  </span>
                </div>
              </div>

            </section>

          </aside>

        </div>

        {/* EDIT MODAL */}
        {editingUser && (
          <div
            className="admin-modal-backdrop"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                closeEdit();
              }
            }}
          >
            <div className="admin-modal-card">

              <div className="admin-modal-header">
                <div className="flex items-center gap-3">

                  <UserAvatar user={editingUser} />

                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-jet-400">
                      Account settings
                    </p>

                    <h2 className="mt-1 font-display text-lg font-extrabold text-white">
                      Edit {editingUser.name}
                    </h2>
                  </div>

                </div>

                <button
                  type="button"
                  onClick={closeEdit}
                  className="staff-icon-button"
                >
                  <X size={16} />
                </button>
              </div>

              <form
                onSubmit={saveEdit}
                className="space-y-5 p-5 sm:p-6"
              >

                <Field label="Full name">
                  <input
                    required
                    value={editForm.name}
                    onChange={(event) =>
                      setEditForm({
                        ...editForm,
                        name: event.target.value
                      })
                    }
                    className="staff-input"
                  />
                </Field>

                <Field label="Email address">
                  <input
                    required
                    type="email"
                    value={editForm.email}
                    onChange={(event) =>
                      setEditForm({
                        ...editForm,
                        email: event.target.value
                      })
                    }
                    className="staff-input"
                  />
                </Field>

                <Field
                  label="New password"
                  hint="Leave empty to keep current password"
                >
                  <input
                    id="admin-password-field"
                    minLength={8}
                    type="password"
                    value={editForm.password}
                    onChange={(event) =>
                      setEditForm({
                        ...editForm,
                        password: event.target.value
                      })
                    }
                    placeholder="Optional password reset"
                    className="staff-input"
                  />
                </Field>

                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                  <div className="flex items-start gap-3">
                    <Lock
                      size={15}
                      className="mt-0.5 text-jet-400"
                    />

                    <p className="text-[10px] leading-5 text-slate-600">
                      Role and access status are controlled separately
                      from the account editor to prevent accidental
                      permission changes.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col-reverse gap-2 border-t border-white/5 pt-5 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={closeEdit}
                    className="staff-secondary-button justify-center"
                  >
                    Cancel
                  </button>

                  <button
                    disabled={saving}
                    className="staff-primary-button justify-center disabled:opacity-50"
                  >
                    <Check size={16} />

                    {saving
                      ? 'Saving...'
                      : 'Save account'}
                  </button>
                </div>

              </form>

            </div>
          </div>
        )}

      </div>
    </AdminLayout>
  );
}