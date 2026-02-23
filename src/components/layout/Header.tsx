import React, { useState, useEffect, useRef } from 'react';
import {
  Menu, X, ChevronDown, Search, GraduationCap,
  BookOpen, FlaskConical, Users, FileText,
  Phone, Briefcase, Award, ChevronRight, Microscope
} from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo_main.jpg';

/* ─── Inline styles for keyframe animations ─── */
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-8px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  @keyframes slideRight {
    from { transform: scaleX(0); }
    to   { transform: scaleX(1); }
  }
  @keyframes mobileIn {
    from { opacity: 0; transform: translateY(-16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes pulse-dot {
    0%, 100% { transform: scale(1); opacity: 1; }
    50%       { transform: scale(1.4); opacity: 0.7; }
  }

  .nav-link-underline {
    position: relative;
  }
  .nav-link-underline::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0;
    width: 100%; height: 2px;
    background: white;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.25s ease;
  }
  .nav-link-underline:hover::after { transform: scaleX(1); }

  .dropdown-animate { animation: slideDown 0.22s cubic-bezier(0.16,1,0.3,1) forwards; }
  .mobile-animate   { animation: mobileIn 0.3s cubic-bezier(0.16,1,0.3,1) forwards; }

  .shimmer-btn {
    background: linear-gradient(90deg, #111 40%, #444 50%, #111 60%);
    background-size: 200% auto;
  }
  .shimmer-btn:hover { animation: shimmer 1.2s linear infinite; }

  .search-input:focus { box-shadow: 0 0 0 2px #555; }

  .scroll-shadow { box-shadow: 0 4px 24px rgba(0,0,0,0.18); }

  /* staggered dropdown items */
  .drop-item { opacity: 0; transform: translateX(-6px); transition: opacity 0.18s ease, transform 0.18s ease, background 0.15s; }
  .drop-item:nth-child(1) { transition-delay: 0.04s; }
  .drop-item:nth-child(2) { transition-delay: 0.08s; }
  .drop-item:nth-child(3) { transition-delay: 0.12s; }
  .drop-item:nth-child(4) { transition-delay: 0.16s; }
  .dropdown-animate .drop-item { opacity: 1; transform: translateX(0); }
`;

/* ─── Nav data with icons ─── */
interface NavLink {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  hasDropdown?: boolean;
  dropdownItems?: { label: string; href: string; icon?: React.ReactNode }[];
}

const navLinks: NavLink[] = [
  { label: 'Home', href: '/', icon: <GraduationCap className="w-3.5 h-3.5" /> },
  {
    label: 'About Us', hasDropdown: true, icon: <Users className="w-3.5 h-3.5" />,
    dropdownItems: [
      { label: 'Overview',          href: '/about',                 icon: <FileText className="w-3.5 h-3.5" /> },
      { label: 'Mission & Vision',  href: '/vision-mission',        icon: <Award className="w-3.5 h-3.5" /> },
      { label: 'Values',            href: '/values',                icon: <BookOpen className="w-3.5 h-3.5" /> },
      { label: 'Accreditations',    href: '/about/accreditations',  icon: <Award className="w-3.5 h-3.5" /> },
    ],
  },
  {
    label: 'Academic', hasDropdown: true, icon: <BookOpen className="w-3.5 h-3.5" />,
    dropdownItems: [
      { label: 'Programs',          href: '/academics',             icon: <GraduationCap className="w-3.5 h-3.5" /> },
      { label: 'Departments',       href: '/academics/departments', icon: <Users className="w-3.5 h-3.5" /> },
      { label: 'Faculty',           href: '/academics/faculty',     icon: <Users className="w-3.5 h-3.5" /> },
      { label: 'Academic Calendar', href: '/academics/calendar',    icon: <FileText className="w-3.5 h-3.5" /> },
    ],
  },
  {
    label: 'Examinations', hasDropdown: true, icon: <FileText className="w-3.5 h-3.5" />,
    dropdownItems: [
      { label: 'Exam Schedule',  href: '/examinations/schedule',   icon: <FileText className="w-3.5 h-3.5" /> },
      { label: 'Results',        href: '/examinations/results',    icon: <Award className="w-3.5 h-3.5" /> },
      { label: 'Exam Guidelines',href: '/examinations/guidelines', icon: <BookOpen className="w-3.5 h-3.5" /> },
    ],
  },
  {
    label: 'R&D Activities', hasDropdown: true, icon: <FlaskConical className="w-3.5 h-3.5" />,
    dropdownItems: [
      { label: 'Research Projects', href: '/research/projects',    icon: <Microscope className="w-3.5 h-3.5" /> },
      { label: 'Publications',      href: '/research/publications', icon: <BookOpen className="w-3.5 h-3.5" /> },
      { label: 'Innovation',        href: '/research/innovation',  icon: <FlaskConical className="w-3.5 h-3.5" /> },
    ],
  },
  {
    label: 'Research', hasDropdown: true, icon: <Microscope className="w-3.5 h-3.5" />,
    dropdownItems: [
      { label: 'Research Centers', href: '/research-section/centers',        icon: <FlaskConical className="w-3.5 h-3.5" /> },
      { label: 'PhD Programs',     href: '/research-section/phd',            icon: <GraduationCap className="w-3.5 h-3.5" /> },
      { label: 'Collaborations',   href: '/research-section/collaborations', icon: <Users className="w-3.5 h-3.5" /> },
    ],
  },
  {
    label: 'Admissions', hasDropdown: true, icon: <Award className="w-3.5 h-3.5" />,
    dropdownItems: [
      { label: 'Admission Form',    href: '/admission-form',       icon: <FileText className="w-3.5 h-3.5" /> },
      { label: 'Admission Process', href: '/admission/process',    icon: <ChevronRight className="w-3.5 h-3.5" /> },
      { label: 'Eligibility',       href: '/admission/eligibility',icon: <Award className="w-3.5 h-3.5" /> },
      { label: 'Fee Structure',     href: '/admission/fees',       icon: <FileText className="w-3.5 h-3.5" /> },
    ],
  },
  { label: 'Careers',    href: '/careers',    icon: <Briefcase className="w-3.5 h-3.5" /> },
  { label: 'Placements', href: '/placements', icon: <Award className="w-3.5 h-3.5" /> },
  { label: 'Contact Us', href: '/contact',    icon: <Phone className="w-3.5 h-3.5" /> },
];

/* ─── Component ─── */
export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const dropdownRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`;
  }, [fontSize]);

  const handleMouseEnter = (label: string) => {
    if (dropdownRef.current) clearTimeout(dropdownRef.current);
    setActiveDropdown(label);
  };
  const handleMouseLeave = () => {
    dropdownRef.current = setTimeout(() => setActiveDropdown(null), 120);
  };

  return (
    <>
      <style>{globalStyles}</style>
      <nav
        className={`fixed top-0 left-0 right-0 w-full z-30 transition-all duration-300 ${isScrolled ? 'scroll-shadow' : ''}`}
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >

        {/* ── Utility Bar ── */}
        <div style={{ background: '#111', borderBottom: '1px solid #2a2a2a' }}>
          <div className="max-w-full mx-auto px-4 lg:px-16">
            <div className="flex justify-between items-center h-10 text-xs">

              {/* Accessibility */}
              <div className="flex items-center gap-4">
                <button
                  className="text-gray-400 hover:text-white transition-colors duration-200 border-r border-gray-700 pr-4 whitespace-nowrap flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 inline-block" style={{ animation: 'pulse-dot 2s ease-in-out infinite' }} />
                  Screen Reader Access
                </button>
                <button className="text-gray-400 hover:text-white transition-colors duration-200 whitespace-nowrap">
                  Skip To Main Content
                </button>
              </div>

              {/* Desktop Search */}
              <div className="hidden md:flex items-center">
                <div className={`relative transition-all duration-300 ${searchFocused ? 'w-72' : 'w-56'}`}>
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                    className="search-input w-full px-4 py-1.5 pr-10 rounded-sm text-white text-xs focus:outline-none transition-all duration-200"
                    style={{ background: '#1e1e1e', border: '1px solid #333' }}
                  />
                  <button className="absolute right-0 top-0 bottom-0 px-3 hover:bg-gray-700 rounded-r-sm transition-colors">
                    <Search className="w-3.5 h-3.5 text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Right Controls */}
              <div className="flex items-center gap-2">
                <select
                  className="text-gray-300 text-xs px-2 py-1 focus:outline-none border-r border-gray-700 pr-3 cursor-pointer hover:text-white transition-colors"
                  style={{ background: 'transparent' }}
                >
                  <option style={{ background: '#111' }}>Lang</option>
                  <option style={{ background: '#111' }}>English</option>
                  <option style={{ background: '#111' }}>हिंदी</option>
                </select>
                {[
                  { label: '+A', action: () => setFontSize(p => Math.min(p + 2, 24)), title: 'Increase font size' },
                  { label: 'A',  action: () => setFontSize(16),                        title: 'Reset font size' },
                  { label: '-A', action: () => setFontSize(p => Math.max(p - 2, 12)), title: 'Decrease font size' },
                ].map(({ label, action, title }) => (
                  <button
                    key={label}
                    onClick={action}
                    title={title}
                    className="text-gray-400 hover:text-white hover:bg-gray-800 px-2 py-0.5 rounded transition-all duration-150 text-xs border border-transparent hover:border-gray-600"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Branding Bar ── */}
        <div style={{ background: '#fff', borderBottom: '1px solid #e5e5e5' }}>
          <div className="max-w-full mx-auto px-4 lg:px-16">
            <div className="flex justify-between items-center py-3">

              {/* Logo + Name */}
              <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-4 group">
                {/* Placeholder logo circle */}
                <div
                  className="flex-shrink-0 w-24 h-24 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
                >
                  <img src={logo} alt="Logo" className="h-24 w-24 object-contain" />
                </div>
                <div className="hidden lg:block">
                  {/* <p className="text-sm text-gray-500 tracking-wider uppercase font-medium">Higher Education Department</p> */}
                  <h1
                    className="text-2xl font-semibold text-black leading-tight"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    उच्च शिक्षा विभाग
                  </h1>
                  <p className="text-base text-gray-500">शासकीय आदर्श महाविद्यालय विदिशा (म.प्र.)</p>
                </div>
              </Link>

              {/* Action Buttons */}
              <div className="hidden lg:flex items-center gap-3">
                <button
                  className="shimmer-btn text-white text-sm px-5 py-2 rounded-full font-medium tracking-wide transition-all duration-200 hover:shadow-lg"
                  style={{ background: '#222', border: '1px solid #444' }}
                >
                  सीएमएस लॉगिन
                </button>
                <Link to="/contact">
                  <button
                    className="text-sm px-5 py-2 rounded-full font-medium tracking-wide transition-all duration-200 hover:bg-gray-900 hover:text-white"
                    style={{ background: '#fff', color: '#111', border: '2px solid #111' }}
                  >
                    Contact Us
                  </button>
                </Link>
              </div>

              {/* Mobile Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-sm transition-all duration-200 hover:bg-gray-100"
                style={{ border: '1px solid #ddd' }}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen
                  ? <X className="w-5 h-5 text-black" />
                  : <Menu className="w-5 h-5 text-black" />
                }
              </button>
            </div>
          </div>
        </div>

        {/* ── Navigation Bar ── */}
        <div style={{ background: '#111', borderBottom: '1px solid #222' }}>
          <div className="max-w-full mx-auto px-4 lg:px-16">
            <div className="hidden lg:flex items-center">
              {navLinks.map((link, i) => (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => link.hasDropdown && handleMouseEnter(link.label)}
                  onMouseLeave={handleMouseLeave}
                  style={{ animationDelay: `${i * 30}ms` }}
                >
                  {link.hasDropdown ? (
                    <>
                      <button
                        className="nav-link-underline text-gray-300 hover:text-white px-3 xl:px-4 py-4 font-medium transition-all duration-200 flex items-center gap-1.5 text-xs uppercase tracking-wider whitespace-nowrap"
                        style={{ letterSpacing: '0.08em' }}
                      >
                        {link.icon && <span className="opacity-70">{link.icon}</span>}
                        <span>{link.label}</span>
                        <ChevronDown
                          className="w-3 h-3 opacity-60 transition-transform duration-200"
                          style={{ transform: activeDropdown === link.label ? 'rotate(180deg)' : 'rotate(0deg)' }}
                        />
                      </button>

                      {activeDropdown === link.label && (
                        <div
                          className="absolute top-full left-0 w-52 z-50 dropdown-animate"
                          onMouseEnter={() => handleMouseEnter(link.label)}
                          onMouseLeave={handleMouseLeave}
                        >
                          <div
                            className="py-2 mt-0"
                            style={{
                              background: '#fff',
                              border: '1px solid #e0e0e0',
                              borderTop: '3px solid #111',
                              boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
                            }}
                          >
                            {link.dropdownItems?.map((item) => (
                              <Link
                                key={item.label}
                                to={item.href}
                                className="drop-item flex items-center gap-2.5 px-4 py-2.5 text-gray-600 hover:text-black hover:bg-gray-50 text-sm transition-colors"
                              >
                                <span className="text-gray-400">{item.icon}</span>
                                {item.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      to={link.href || '#'}
                      className="nav-link-underline text-gray-300 hover:text-white px-3 xl:px-4 py-4 font-medium transition-all duration-200 flex items-center gap-1.5 text-xs uppercase tracking-wider whitespace-nowrap"
                    >
                      {link.icon && <span className="opacity-70">{link.icon}</span>}
                      <span>{link.label}</span>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Mobile Menu ── */}
        {isMobileMenuOpen && (
          <div
            className="lg:hidden mobile-animate overflow-y-auto"
            style={{
              background: '#fff',
              borderTop: '3px solid #111',
              maxHeight: 'calc(100vh - 10rem)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
            }}
          >
            {/* Mobile Search */}
            <div className="px-4 py-3" style={{ borderBottom: '1px solid #eee' }}>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pr-10 text-sm focus:outline-none"
                  style={{ border: '1px solid #ddd', background: '#fafafa' }}
                />
                <button className="absolute right-0 top-0 bottom-0 px-3 hover:bg-gray-100 transition-colors">
                  <Search className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Mobile Action Buttons */}
            <div className="px-4 py-3 grid grid-cols-2 gap-2" style={{ borderBottom: '1px solid #eee', background: '#fafafa' }}>
              {['Results', 'UGC DEB', 'Online Admission', 'AICTE'].map(label => (
                <button
                  key={label}
                  className="py-2 text-sm font-medium tracking-wide transition-all duration-200 hover:bg-black hover:text-white"
                  style={{ border: '1px solid #333', color: '#111', background: '#fff' }}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Mobile Nav Links */}
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <div key={link.label}>
                  {link.hasDropdown ? (
                    <div>
                      <button
                        onClick={() => setActiveDropdown(activeDropdown === link.label ? null : link.label)}
                        className="w-full flex items-center justify-between py-3 px-3 text-gray-700 hover:text-black hover:bg-gray-50 font-medium transition-all duration-150 rounded-sm"
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-gray-400">{link.icon}</span>
                          <span className="text-sm tracking-wide">{link.label}</span>
                        </span>
                        <ChevronDown
                          className="w-4 h-4 text-gray-400 transition-transform duration-200"
                          style={{ transform: activeDropdown === link.label ? 'rotate(180deg)' : 'rotate(0)' }}
                        />
                      </button>

                      {activeDropdown === link.label && (
                        <div className="pl-6 space-y-0.5 mt-1 mobile-animate">
                          {link.dropdownItems?.map((item) => (
                            <Link
                              key={item.label}
                              to={item.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="flex items-center gap-2 py-2 px-3 text-sm text-gray-500 hover:text-black hover:bg-gray-50 transition-colors rounded-sm"
                            >
                              <span className="text-gray-300">{item.icon}</span>
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={link.href || '#'}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-2 py-3 px-3 text-sm text-gray-700 hover:text-black hover:bg-gray-50 font-medium transition-all duration-150 rounded-sm"
                    >
                      <span className="text-gray-400">{link.icon}</span>
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}