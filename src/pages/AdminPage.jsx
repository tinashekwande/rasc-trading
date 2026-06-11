// ============================================
// AdminPage — Styled Admin Portal (Tailwind v4)
// ============================================

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiLock, FiLogOut, FiMail, FiMessageSquare, FiUser, FiCalendar, FiEye, FiTrash2, FiPlus } from 'react-icons/fi';
import { projects as fallbackProjects } from '../data/siteData';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState('inquiries');
  const [inquiries, setInquiries] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [projectsList, setProjectsList] = useState([]);
  const [teamList, setTeamList] = useState([]);
  const [loading, setLoading] = useState(false);

  // Form states for projects
  const [newProjTitle, setNewProjTitle] = useState('');
  const [newProjCategory, setNewProjCategory] = useState('Residential');
  const [newProjImage, setNewProjImage] = useState('');

  // Form states for team
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberPosition, setNewMemberPosition] = useState('');
  const [newMemberDescription, setNewMemberDescription] = useState('');
  const [newMemberImage, setNewMemberImage] = useState('');

  // Detail View Modal State
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  // Simple password check (front-end only)
  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'rasc2024') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Invalid password. Please try again.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
  };

  // Image Upload handler (Base64 conversion)
  const handleImageUpload = (e, callback) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("Image is too large. Max size is 2MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      callback(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Fetch data
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const headers = { 'x-admin-key': 'rasc-admin-2024' };
      const [inqRes, quoteRes, projRes, teamRes] = await Promise.allSettled([
        fetch('/api/inquiries', { headers }),
        fetch('/api/quotes', { headers }),
        fetch('/api/projects'),
        fetch('/api/team')
      ]);

      if (inqRes.status === 'fulfilled' && inqRes.value.ok) {
        const data = await inqRes.value.json();
        setInquiries(data.data || []);
      } else {
        setInquiries([
          { id: 1, name: 'John Smith', email: 'john@email.com', date: '2024-01-15', status: 'New', message: 'Interested in kitchen renovation.' },
          { id: 2, name: 'Sarah Williams', email: 'sarah@email.com', date: '2024-01-14', status: 'Responded', message: 'Need a quote for office fit-out.' },
          { id: 3, name: 'Mike Johnson', email: 'mike@email.com', date: '2024-01-13', status: 'New', message: 'Looking for plumbing services.' },
        ]);
      }

      if (quoteRes.status === 'fulfilled' && quoteRes.value.ok) {
        const data = await quoteRes.value.json();
        setQuotes(data.data || []);
      } else {
        setQuotes([
          { id: 1, name: 'David Patel', email: 'david@email.com', date: '2024-01-15', status: 'Pending', service: 'Building' },
          { id: 2, name: 'Lisa Brown', email: 'lisa@email.com', date: '2024-01-14', status: 'Quoted', service: 'Renovations' },
          { id: 3, name: 'James Wilson', email: 'james@email.com', date: '2024-01-12', status: 'Pending', service: 'Ceilings & Partitions' },
        ]);
      }

      if (projRes.status === 'fulfilled' && projRes.value.ok) {
        const data = await projRes.value.json();
        setProjectsList(data.data || []);
      } else {
        setProjectsList(fallbackProjects);
      }

      if (teamRes.status === 'fulfilled' && teamRes.value.ok) {
        const data = await teamRes.value.json();
        setTeamList(data.data || []);
      }
    } catch (err) {
      console.error("Sync error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated, fetchData]);

  // Project Mutations
  const handleAddProject = async (e) => {
    e.preventDefault();
    if (!newProjTitle || !newProjImage) {
      alert("Please enter a title and upload an image.");
      return;
    }

    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': 'rasc-admin-2024'
        },
        body: JSON.stringify({
          title: newProjTitle,
          category: newProjCategory,
          image: newProjImage
        })
      });

      if (res.ok) {
        const json = await res.json();
        if (json.success) {
          setProjectsList(prev => [json.data, ...prev]);
          setNewProjTitle('');
          setNewProjCategory('Residential');
          setNewProjImage('');
          alert("Project added successfully!");
        }
      } else {
        const errJson = await res.json();
        alert(`Error: ${errJson.error || 'Failed to add project'}`);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to add project.");
    }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;

    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
        headers: {
          'x-admin-key': 'rasc-admin-2024'
        }
      });

      if (res.ok) {
        setProjectsList(prev => prev.filter(p => p.id !== id));
        alert("Project deleted.");
      } else {
        alert("Failed to delete project.");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting project.");
    }
  };

  // Team Mutations
  const handleAddTeamMember = async (e) => {
    e.preventDefault();
    if (!newMemberName || !newMemberPosition || !newMemberDescription || !newMemberImage) {
      alert("Please fill in all fields and select a photo.");
      return;
    }

    try {
      const res = await fetch('/api/team', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': 'rasc-admin-2024'
        },
        body: JSON.stringify({
          name: newMemberName,
          position: newMemberPosition,
          description: newMemberDescription,
          image: newMemberImage
        })
      });

      if (res.ok) {
        const json = await res.json();
        if (json.success) {
          setTeamList(prev => [...prev, json.data]);
          setNewMemberName('');
          setNewMemberPosition('');
          setNewMemberDescription('');
          setNewMemberImage('');
          alert("Team member added!");
        }
      } else {
        const errJson = await res.json();
        alert(`Error: ${errJson.error || 'Failed to add team member'}`);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to add team member.");
    }
  };

  const handleDeleteTeamMember = async (id) => {
    if (!window.confirm("Are you sure you want to delete this team member?")) return;

    try {
      const res = await fetch(`/api/team/${id}`, {
        method: 'DELETE',
        headers: {
          'x-admin-key': 'rasc-admin-2024'
        }
      });

      if (res.ok) {
        setTeamList(prev => prev.filter(t => t.id !== id));
        alert("Team member deleted.");
      } else {
        alert("Failed to delete team member.");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting team member.");
    }
  };

  /* ── 1. Login Screen ── */
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <motion.div
          className="bg-white border border-gray-150 p-8 md:p-10 rounded-3xl shadow-lg max-w-md w-full text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6 flex justify-center">
            <img
              src="/images/brand/logo.png"
              alt="RASC Trading Logo"
              className="h-12 w-auto object-contain animate-heartbeat"
            />
          </div>
          <h1 className="font-semibold text-2xl text-gray-900 mb-2">Admin Portal</h1>
          <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-8">
            RASC Trading Systems
          </p>

          <form className="space-y-5" onSubmit={handleLogin}>
            <div className="relative">
              <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="password"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-gray-900 focus:bg-white transition-all text-sm"
                placeholder="Enter Administrator Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
              />
            </div>

            <AnimatePresence>
              {loginError && (
                <motion.p
                   className="text-xs font-semibold text-red-600 text-left"
                   initial={{ opacity: 0, height: 0 }}
                   animate={{ opacity: 1, height: 'auto' }}
                   exit={{ opacity: 0, height: 0 }}
                >
                   {loginError}
                </motion.p>
              )}
            </AnimatePresence>

            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-full font-semibold transition-all duration-300 hover:scale-[1.01] hover:shadow-md bg-gray-900 text-white hover:bg-gray-800 text-sm cursor-pointer"
            >
              Sign In
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  /* ── 2. Dashboard Screen ── */
  const currentInquiriesAndQuotes = activeTab === 'inquiries' ? inquiries : quotes;

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 md:p-10 max-w-7xl mx-auto space-y-8">
      {/* Header Panel */}
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-150 pb-6">
        <div className="flex items-center gap-3">
          <img
            src="/images/brand/logo.png"
            alt="RASC Logo"
            className="h-10 w-auto object-contain animate-heartbeat"
          />
          <div>
            <h1 className="font-semibold text-xl text-gray-900">Dashboard</h1>
            <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">
              RASC Management System
            </span>
          </div>
        </div>
        <button
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold border border-gray-250 text-gray-600 bg-white hover:bg-gray-50 hover:text-gray-900 transition-colors shadow-xs cursor-pointer"
          onClick={handleLogout}
        >
          <FiLogOut size={13} />
          <span>Sign Out</span>
        </button>
      </header>

      {/* Stats Quadrant */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {/* Card 1 */}
        <div className="flex items-center gap-3 md:gap-4 p-4 md:p-6 bg-white border border-gray-150 rounded-2xl shadow-xs">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
            <FiMessageSquare size={18} className="md:w-5 md:h-5" />
          </div>
          <div>
            <span className="block text-xl md:text-2xl font-bold text-gray-900">{inquiries.length}</span>
            <span className="block text-[9px] md:text-xs text-gray-400 font-semibold uppercase tracking-wider mt-0.5">
              Inquiries
            </span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="flex items-center gap-3 md:gap-4 p-4 md:p-6 bg-white border border-gray-150 rounded-2xl shadow-xs">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-yellow-50 text-yellow-600 flex items-center justify-center flex-shrink-0">
            <FiMail size={18} className="md:w-5 md:h-5" />
          </div>
          <div>
            <span className="block text-xl md:text-2xl font-bold text-gray-900">{quotes.length}</span>
            <span className="block text-[9px] md:text-xs text-gray-400 font-semibold uppercase tracking-wider mt-0.5">
              Quotes
            </span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="flex items-center gap-3 md:gap-4 p-4 md:p-6 bg-white border border-gray-150 rounded-2xl shadow-xs">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center flex-shrink-0">
            <FiPlus size={18} className="md:w-5 md:h-5" />
          </div>
          <div>
            <span className="block text-xl md:text-2xl font-bold text-gray-900">{projectsList.length}</span>
            <span className="block text-[9px] md:text-xs text-gray-400 font-semibold uppercase tracking-wider mt-0.5">
              Projects
            </span>
          </div>
        </div>

        {/* Card 4 */}
        <div className="flex items-center gap-3 md:gap-4 p-4 md:p-6 bg-white border border-gray-150 rounded-2xl shadow-xs">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
            <FiUser size={18} className="md:w-5 md:h-5" />
          </div>
          <div>
            <span className="block text-xl md:text-2xl font-bold text-gray-950">{teamList.length}</span>
            <span className="block text-[9px] md:text-xs text-gray-400 font-semibold uppercase tracking-wider mt-0.5">
              Team Members
            </span>
          </div>
        </div>
      </div>

      {/* Tabs Selector */}
      <div className="flex gap-2 p-1.5 bg-gray-50 border border-gray-100 rounded-2xl w-full overflow-x-auto scrollbar-none whitespace-nowrap">
        {[
          { id: 'inquiries', label: 'Contact Inquiries' },
          { id: 'quotes', label: 'Quote Requests' },
          { id: 'projects', label: 'Manage Projects' },
          { id: 'team', label: 'Manage Team' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer text-center inline-block ${
              activeTab === tab.id
                ? 'bg-gray-900 text-white shadow-xs'
                : 'bg-transparent text-gray-500 hover:text-gray-950'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Tab Content Panel */}
      {loading ? (
        <div className="bg-white border border-gray-150 rounded-3xl py-20 flex flex-col items-center justify-center gap-3 shadow-xs">
          <div className="w-8 h-8 border-2 border-gray-200 border-t-gray-900 rounded-full animate-spin" />
          <p className="text-sm text-gray-400 font-medium">Syncing database...</p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* 2.1 Inquiries and Quotes Tables */}
          {(activeTab === 'inquiries' || activeTab === 'quotes') && (
            <div className="bg-white border border-gray-150 rounded-3xl overflow-hidden shadow-xs">
              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-150">
                      <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-500">
                        Name
                      </th>
                      <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-500">
                        Email
                      </th>
                      <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-500">
                        Date / Details
                      </th>
                      <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-500">
                        Status
                      </th>
                      <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-500">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {currentInquiriesAndQuotes.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4 text-sm font-semibold text-gray-900">{item.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{item.email}</td>
                        <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                          {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : item.date} - {activeTab === 'quotes' ? item.projectType : item.service}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                              item.status === 'New' || item.status === 'new' || item.status === 'Pending'
                                ? 'bg-yellow-50 border-yellow-100 text-yellow-700'
                                : 'bg-green-50 border-green-100 text-green-700'
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => setSelectedInquiry(item)}
                            className="p-2 rounded-lg border border-gray-150 hover:bg-blue-50 hover:text-blue-600 transition-all cursor-pointer text-gray-400 inline-flex items-center gap-1 text-xs font-semibold"
                            title="View Message"
                          >
                            <FiEye size={14} />
                            <span>Read Message</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                    {currentInquiriesAndQuotes.length === 0 && (
                      <tr>
                        <td colSpan="5" className="px-6 py-12 text-center text-sm text-gray-400">
                          No records found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              
              {/* Mobile Card List View */}
              <div className="block md:hidden divide-y divide-gray-100">
                {currentInquiriesAndQuotes.map((item) => (
                  <div key={item.id} className="p-5 space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-base text-gray-900">{item.name}</h4>
                        <p className="text-xs text-gray-500 mt-0.5">{item.email}</p>
                      </div>
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider border ${
                          item.status === 'New' || item.status === 'new' || item.status === 'Pending'
                            ? 'bg-yellow-50 border-yellow-100 text-yellow-700'
                            : 'bg-green-50 border-green-100 text-green-700'
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-400 font-medium pt-1">
                      <div className="flex items-center gap-1.5">
                        <FiCalendar size={13} />
                        <span>{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : item.date}</span>
                      </div>
                      <span className="bg-gray-50 border border-gray-100 px-2 py-0.5 rounded-md text-[10px] uppercase font-bold text-gray-500">
                        {activeTab === 'quotes' ? item.projectType : item.service}
                      </span>
                    </div>

                    <button
                      onClick={() => setSelectedInquiry(item)}
                      className="w-full py-2.5 rounded-xl border border-gray-150 hover:bg-blue-50 hover:text-blue-600 transition-all cursor-pointer text-gray-600 flex items-center justify-center gap-2 text-xs font-semibold"
                    >
                      <FiEye size={14} />
                      <span>Read Message</span>
                    </button>
                  </div>
                ))}
                {currentInquiriesAndQuotes.length === 0 && (
                  <div className="p-8 text-center text-sm text-gray-400">
                    No records found.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 2.2 Manage Projects Content */}
          {activeTab === 'projects' && (
            <div className="p-6 md:p-8 space-y-8 bg-white border border-gray-150 rounded-3xl shadow-xs">
              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-6">Add New Project</h3>
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Left: Form inputs */}
                  <form onSubmit={handleAddProject} className="flex-grow space-y-6 max-w-2xl">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">Project Title</label>
                        <input
                           type="text"
                           required
                           value={newProjTitle}
                           onChange={e => setNewProjTitle(e.target.value)}
                           placeholder="e.g. Modern Office Fit-Out"
                           className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-gray-900 focus:bg-white transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</label>
                        <select
                           value={newProjCategory}
                           onChange={e => setNewProjCategory(e.target.value)}
                           className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-gray-900 focus:bg-white transition-all"
                        >
                          <option value="Residential">Residential</option>
                          <option value="Commercial">Commercial</option>
                          <option value="Renovation">Renovation</option>
                          <option value="White Boxing">White Boxing</option>
                          <option value="Infrastructure">Infrastructure</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">Project Image</label>
                      <div className="flex flex-wrap gap-3 items-center">
                        <input
                           type="file"
                           accept="image/*"
                           onChange={e => handleImageUpload(e, setNewProjImage)}
                           className="hidden"
                           id="proj-image-file"
                        />
                        <label
                           htmlFor="proj-image-file"
                           className="px-5 py-2.5 rounded-xl border border-dashed border-gray-300 hover:border-gray-950 bg-gray-50 text-xs font-semibold text-gray-600 cursor-pointer text-center flex-grow sm:flex-initial transition-colors truncate"
                        >
                          {newProjImage ? "Change Photo" : "Choose File"}
                        </label>
                        {newProjImage && (
                          <button
                             type="button"
                             onClick={() => setNewProjImage('')}
                             className="px-4 py-2.5 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-xs font-semibold transition-colors cursor-pointer w-full sm:w-auto"
                          >
                             Remove
                          </button>
                        )}
                      </div>
                    </div>
                    <button
                       type="submit"
                       className="px-6 py-3 rounded-full font-semibold bg-gray-900 text-white hover:bg-gray-800 text-xs cursor-pointer shadow-xs transition-colors"
                    >
                       Add Project
                    </button>
                  </form>

                  {/* Right: Live Preview Card */}
                  <div className="w-full lg:w-72 flex-shrink-0">
                    <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Live Card Preview</span>
                    <div className="border border-gray-150 rounded-2xl overflow-hidden shadow-xs bg-white relative group min-h-[240px] flex flex-col justify-between">
                      {newProjImage ? (
                        <>
                          <div className="aspect-[4/3] bg-gray-50 overflow-hidden">
                            <img src={newProjImage} alt="Preview" className="w-full h-full object-cover animate-fade-in" />
                          </div>
                          <div className="p-4 pr-12">
                            <span className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">{newProjCategory}</span>
                            <h4 className="font-semibold text-sm text-gray-900 truncate">{newProjTitle || "Untitled Project"}</h4>
                          </div>
                        </>
                      ) : (
                        <div className="flex-grow flex flex-col items-center justify-center p-6 text-center border border-dashed border-gray-200 rounded-2xl bg-gray-50/50 m-2 text-gray-400 animate-pulse">
                          <FiPlus size={24} className="mb-2 text-gray-300" />
                          <p className="text-xs font-medium">Upload a photo to preview</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <hr className="border-gray-100" />

              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-6">Current Work Registry ({projectsList.length})</h3>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                  {projectsList.map(proj => (
                    <div key={proj.id} className="border border-gray-150 rounded-2xl overflow-hidden shadow-xs bg-white relative group">
                      <div className="aspect-[4/3] bg-gray-50 overflow-hidden">
                        <img src={proj.image} alt={proj.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="p-3 pr-10 md:p-4 md:pr-12">
                        <span className="block text-[8px] md:text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">{proj.category}</span>
                        <h4 className="font-semibold text-xs md:text-sm text-gray-900 truncate">{proj.title}</h4>
                      </div>
                      <button
                         onClick={() => handleDeleteProject(proj.id)}
                         className="absolute bottom-2 right-2 md:bottom-3 md:right-3 p-1.5 md:p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 border border-red-100 transition-colors cursor-pointer"
                         title="Delete work item"
                      >
                        <FiTrash2 size={12} className="md:w-3.5 md:h-3.5" />
                      </button>
                    </div>
                  ))}
                  {projectsList.length === 0 && (
                    <p className="text-sm text-gray-400 col-span-full">No project content posted yet.</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* 2.3 Manage Team Content */}
          {activeTab === 'team' && (
            <div className="p-6 md:p-8 space-y-8 bg-white border border-gray-150 rounded-3xl shadow-xs">
              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-6">Add New Team Member</h3>
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Left: Form inputs */}
                  <form onSubmit={handleAddTeamMember} className="flex-grow space-y-6 max-w-2xl">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">Full Name</label>
                        <input
                           type="text"
                           required
                           value={newMemberName}
                           onChange={e => setNewMemberName(e.target.value)}
                           placeholder="e.g. Shaun Naidoo"
                           className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-gray-900 focus:bg-white transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">Position / Role</label>
                        <input
                           type="text"
                           required
                           value={newMemberPosition}
                           onChange={e => setNewMemberPosition(e.target.value)}
                           placeholder="e.g. Co-Director & Project Manager"
                           className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-gray-900 focus:bg-white transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">Brief Biography / Description</label>
                      <textarea
                         required
                         value={newMemberDescription}
                         onChange={e => setNewMemberDescription(e.target.value)}
                         placeholder="Describe their role, experience, and certifications..."
                         rows={3}
                         className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-gray-900 focus:bg-white transition-all resize-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">Profile Photo</label>
                      <div className="flex flex-wrap gap-3 items-center">
                        <input
                           type="file"
                           accept="image/*"
                           onChange={e => handleImageUpload(e, setNewMemberImage)}
                           className="hidden"
                           id="team-image-file"
                        />
                        <label
                           htmlFor="team-image-file"
                           className="px-5 py-2.5 rounded-xl border border-dashed border-gray-300 hover:border-gray-950 bg-gray-50 text-xs font-semibold text-gray-600 cursor-pointer text-center flex-grow sm:flex-initial transition-colors truncate"
                        >
                          {newMemberImage ? "Change Photo" : "Choose Photo File"}
                        </label>
                        {newMemberImage && (
                          <button
                             type="button"
                             onClick={() => setNewMemberImage('')}
                             className="px-4 py-2.5 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-xs font-semibold transition-colors cursor-pointer w-full sm:w-auto"
                          >
                             Remove
                          </button>
                        )}
                      </div>
                    </div>

                    <button
                       type="submit"
                       className="px-6 py-3 rounded-full font-semibold bg-gray-900 text-white hover:bg-gray-800 text-xs cursor-pointer shadow-xs transition-colors"
                    >
                       Add Team Member
                    </button>
                  </form>

                  {/* Right: Live Preview Card */}
                  <div className="w-full lg:w-80 flex-shrink-0">
                    <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Live Profile Preview</span>
                    <div className="border border-gray-150 rounded-2xl p-6 shadow-xs bg-white relative flex flex-col items-center text-center min-h-[300px]">
                      {newMemberImage ? (
                        <>
                          <div className="w-28 h-28 rounded-full overflow-hidden border border-gray-100 shadow-sm flex-shrink-0 relative">
                            <img src={newMemberImage} alt="Preview" className="w-full h-full object-cover animate-fade-in" />
                          </div>
                          <div className="mt-5 flex-grow flex flex-col items-center">
                            <h4 className="font-semibold text-base text-gray-900 mb-1">{newMemberName || "Full Name"}</h4>
                            <span className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-3">{newMemberPosition || "Position / Role"}</span>
                            <p className="text-xs text-gray-500 leading-relaxed">{newMemberDescription || "Biography and details will appear here..."}</p>
                          </div>
                        </>
                      ) : (
                        <div className="flex-grow w-full flex flex-col items-center justify-center p-6 border border-dashed border-gray-200 rounded-2xl bg-gray-50/50 text-gray-400 animate-pulse">
                          <FiPlus size={24} className="mb-2 text-gray-300" />
                          <p className="text-xs font-medium">Upload a profile photo to preview</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <hr className="border-gray-100" />

              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-6">Current Team Leadership ({teamList.length})</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {teamList.map(member => (
                    <div key={member.id} className="border border-gray-150 rounded-2xl p-6 shadow-xs bg-white relative flex flex-col items-center text-center pb-16">
                      <div className="w-24 h-24 rounded-full overflow-hidden border border-gray-100 shadow-sm flex-shrink-0 relative">
                        <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="mt-5 flex-grow flex flex-col items-center">
                        <h4 className="font-semibold text-base text-gray-900 mb-1">{member.name}</h4>
                        <span className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-3">{member.position}</span>
                        <p className="text-xs text-gray-500 leading-relaxed">{member.description}</p>
                      </div>
                      <button
                         onClick={() => handleDeleteTeamMember(member.id)}
                         className="absolute bottom-4 left-1/2 -translate-x-1/2 p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 border border-red-100 transition-colors cursor-pointer"
                         title="Delete team member"
                      >
                        <FiTrash2 size={13} />
                      </button>
                    </div>
                  ))}
                  {teamList.length === 0 && (
                    <p className="text-sm text-gray-400 col-span-full">No team members registered yet.</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── 3. Detail Popup Modal ── */}
      <AnimatePresence>
        {selectedInquiry && (
          <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 cursor-pointer" onClick={() => setSelectedInquiry(null)} />
            <motion.div
              className="bg-white border border-gray-150 p-6 md:p-8 rounded-3xl shadow-2xl max-w-lg w-full relative z-10 flex flex-col max-h-[90vh] sm:max-h-[85vh] overflow-hidden"
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
            >
              <div className="overflow-y-auto space-y-6 flex-grow pr-1 scrollbar-none pb-6 text-left">
                <div>
                  <span className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                    Inquiry Details ({selectedInquiry.id})
                  </span>
                  <h3 className="font-semibold text-xl text-gray-900">{selectedInquiry.name}</h3>
                  <p className="text-xs text-gray-400 mt-0.5">{selectedInquiry.email} {selectedInquiry.phone && `• ${selectedInquiry.phone}`}</p>
                </div>

                <div className="space-y-1 bg-gray-50 p-4 rounded-xl border border-gray-150">
                  <span className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                    Message Body
                  </span>
                  <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
                    {selectedInquiry.message || selectedInquiry.description || "No message body provided."}
                  </p>
                </div>

                {selectedInquiry.projectType && (
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="p-3 bg-gray-50 border border-gray-150 rounded-xl">
                      <span className="block text-[8px] font-bold text-gray-400 uppercase">Budget</span>
                      <span className="text-xs font-semibold text-gray-900">{selectedInquiry.budget}</span>
                    </div>
                    <div className="p-3 bg-gray-50 border border-gray-150 rounded-xl">
                      <span className="block text-[8px] font-bold text-gray-400 uppercase">Timeline</span>
                      <span className="text-xs font-semibold text-gray-900">{selectedInquiry.timeline}</span>
                    </div>
                    <div className="p-3 bg-gray-50 border border-gray-150 rounded-xl">
                      <span className="block text-[8px] font-bold text-gray-400 uppercase">Location</span>
                      <span className="text-xs font-semibold text-gray-900">{selectedInquiry.location}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-gray-100">
                <button
                   className="w-full py-3.5 px-6 rounded-full font-semibold bg-gray-900 text-white hover:bg-gray-800 text-xs cursor-pointer shadow-xs transition-colors"
                   onClick={() => setSelectedInquiry(null)}
                >
                  Close Details
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
