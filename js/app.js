/**
 * MyntOS - Premium SaaS Operating System Interactive Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileMenu();
  initIntersectionObserver();
  initCRMTableFilter();
  initLeadJourneyTimeline();
  initSoftphoneTimer();
  initAutomationNodes();
  initEcosystemTooltips();
  initCounterAnimations();
  initMouseParallax();
});

/* 1. Sticky Navigation Header */
function initStickyHeader() {
  const header = document.getElementById('main-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* 2. Mobile Drawer Menu */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const closeBtn = document.getElementById('mobile-menu-close');
  const menu = document.getElementById('mobile-menu');
  const menuLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !menu) return;

  const openMenu = () => {
    menu.classList.remove('hidden');
    menu.classList.add('flex');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    menu.classList.add('hidden');
    menu.classList.remove('flex');
    document.body.style.overflow = '';
  };

  toggleBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);

  menuLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

/* 3. Intersection Observer for Scroll Animations */
function initIntersectionObserver() {
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (isReducedMotion) {
    document.querySelectorAll('.reveal-on-scroll, .stagger-children').forEach(el => {
      el.classList.add('is-visible');
    });
    return;
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        
        // Trigger path drawing if present
        const paths = entry.target.querySelectorAll('.draw-path');
        paths.forEach(p => p.classList.add('animated'));

        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal-on-scroll, .stagger-children').forEach(el => {
    observer.observe(el);
  });
}

/* 4. Interactive CRM Lead Table Filtering */
function initCRMTableFilter() {
  const filterTabs = document.querySelectorAll('.crm-filter-tab');
  const crmRows = document.querySelectorAll('.crm-lead-row');

  if (!filterTabs.length || !crmRows.length) return;

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Update Active Tab UI
      filterTabs.forEach(t => {
        t.classList.remove('bg-royal-blue', 'text-white', 'shadow-sm');
        t.classList.add('text-slate-400', 'hover:text-white');
      });
      tab.classList.add('bg-royal-blue', 'text-white', 'shadow-sm');
      tab.classList.remove('text-slate-400', 'hover:text-white');

      const filterValue = tab.getAttribute('data-filter');

      // Filter Table Rows with Fade Effect
      crmRows.forEach(row => {
        const rowStage = row.getAttribute('data-stage');
        if (filterValue === 'all' || rowStage === filterValue) {
          row.style.display = 'table-row';
          setTimeout(() => { row.style.opacity = '1'; }, 20);
        } else {
          row.style.opacity = '0';
          setTimeout(() => { row.style.display = 'none'; }, 200);
        }
      });
    });
  });
}

/* 5. Lead Journey Interactive 8-Stage Selector */
const journeyStageData = {
  'new-lead': {
    stage: '01. New Lead Received',
    customer: 'Apex Logistics Ltd',
    contact: 'Rajesh Sharma (Managing Director)',
    system: '50 KW Commercial Rooftop Solar',
    value: '₹24.50 L',
    owner: 'Auto Assign (Round Robin)',
    nextAction: 'Initiate Discovery Call & Qualify Requirement',
    status: 'New Enquiry',
    badgeBg: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
  },
  'assigned': {
    stage: '02. Lead Assigned',
    customer: 'Vikram Singh',
    contact: 'Vikram Singh (Property Owner)',
    system: '5 KW Dual-Axis Residential Solar',
    value: '₹3.10 L',
    owner: 'Ananya Roy (Senior Account Exec)',
    nextAction: 'Confirm Customer Availability for Call',
    status: 'Assigned',
    badgeBg: 'bg-blue-500/20 text-blue-400 border-blue-500/30'
  },
  'contacted': {
    stage: '03. Customer Contacted',
    customer: 'Sunview Residency',
    contact: 'Meera Patel (Society Secretary)',
    system: '15 KW Hybrid Solar + Battery Storage',
    value: '₹8.75 L',
    owner: 'Rahul Verma (Sales Specialist)',
    nextAction: 'Collect Energy Bills & Roof Layout Dimensions',
    status: 'In Conversation',
    badgeBg: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30'
  },
  'qualified': {
    stage: '04. Lead Qualified',
    customer: 'Ravi Kumar',
    contact: 'Ravi Kumar (Home Owner)',
    system: '3 KW Residential Solar System',
    value: '₹1.85 L',
    owner: 'Suresh Menon (Sales Executive)',
    nextAction: 'Schedule Technical Site Survey & Roof Inspection',
    status: 'Qualified Opportunity',
    badgeBg: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
  },
  'site-survey': {
    stage: '05. Technical Site Survey',
    customer: 'Green Agro Storage',
    contact: 'Karan Malhotra (Ops Manager)',
    system: '100 KW Industrial Solar Plant',
    value: '₹48.00 L',
    owner: 'Devendra Joshi (Field Engineer)',
    nextAction: 'Complete Shadow Analysis & Structural Load Check',
    status: 'Survey Scheduled',
    badgeBg: 'bg-amber-500/20 text-amber-400 border-amber-500/30'
  },
  'proposal': {
    stage: '06. Commercial Proposal Sent',
    customer: 'Priya Enterprises',
    contact: 'Priya Sundaram (Director)',
    system: '25 KW Commercial Solar Grid',
    value: '₹12.40 L',
    owner: 'Ananya Roy (Senior Account Exec)',
    nextAction: 'Review ROI Calculations & Financial Quotation',
    status: 'Proposal Delivered',
    badgeBg: 'bg-purple-500/20 text-purple-400 border-purple-500/30'
  },
  'follow-up': {
    stage: '07. Active Follow-up',
    customer: 'Horizon Tech Park',
    contact: 'Amitabh Sen (VP Facilities)',
    system: '150 KW Rooftop Solar Array',
    value: '₹72.00 L',
    owner: 'Rahul Verma (Enterprise Sales)',
    nextAction: 'Final Legal Contract Sign-off & Advance Invoice',
    status: 'Negotiation Phase',
    badgeBg: 'bg-rose-500/20 text-rose-400 border-rose-500/30'
  },
  'won': {
    stage: '08. Deal Closed & Won',
    customer: 'Zenith Manufacturing',
    contact: 'Harish Mehta (Chief Operating Officer)',
    system: '200 KW Solar Installation + Net Metering',
    value: '₹95.00 L',
    owner: 'Team MyntOS (Project Handoff)',
    nextAction: 'Initiate Material Procurement & Grid Approval',
    status: 'Deal Won / Handed Off',
    badgeBg: 'bg-emerald-500/30 text-emerald-300 border-emerald-400/40'
  }
};

function initLeadJourneyTimeline() {
  const nodes = document.querySelectorAll('.journey-node');
  const stageTitle = document.getElementById('journey-stage-title');
  const customerName = document.getElementById('journey-customer-name');
  const contactPerson = document.getElementById('journey-contact-person');
  const systemSize = document.getElementById('journey-system-size');
  const dealValue = document.getElementById('journey-deal-value');
  const leadOwner = document.getElementById('journey-lead-owner');
  const nextAction = document.getElementById('journey-next-action');
  const statusBadge = document.getElementById('journey-status-badge');

  if (!nodes.length || !stageTitle) return;

  nodes.forEach(node => {
    node.addEventListener('click', () => {
      const key = node.getAttribute('data-stage-key');
      const data = journeyStageData[key];
      if (!data) return;

      // Update Node Active UI
      nodes.forEach(n => {
        n.classList.remove('ring-2', 'ring-royal-blue', 'bg-royal-blue/20', 'border-royal-blue');
        n.classList.add('border-slate-700/60');
      });
      node.classList.add('ring-2', 'ring-royal-blue', 'bg-royal-blue/20', 'border-royal-blue');
      node.classList.remove('border-slate-700/60');

      // Update Detail Drawer with smooth fade transition
      const card = document.getElementById('journey-detail-card');
      if (card) {
        card.style.opacity = '0.4';
        card.style.transform = 'translateY(6px)';
        setTimeout(() => {
          stageTitle.textContent = data.stage;
          customerName.textContent = data.customer;
          contactPerson.textContent = data.contact;
          systemSize.textContent = data.system;
          dealValue.textContent = data.value;
          leadOwner.textContent = data.owner;
          nextAction.textContent = data.nextAction;

          statusBadge.textContent = data.status;
          statusBadge.className = `px-3 py-1 text-xs font-semibold rounded-full border ${data.badgeBg}`;

          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 150);
      }
    });
  });
}

/* 6. Active Softphone Timer Ticking & Button Micro-states */
function initSoftphoneTimer() {
  const timerEl = document.getElementById('softphone-timer');
  const muteBtn = document.getElementById('call-mute-btn');
  const holdBtn = document.getElementById('call-hold-btn');
  const endCallBtn = document.getElementById('call-end-btn');
  const callStatusBadge = document.getElementById('call-status-badge');

  if (!timerEl) return;

  let seconds = 278; // 04:38 in seconds
  let isConnected = true;

  const timerInterval = setInterval(() => {
    if (!isConnected) return;
    seconds++;
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    timerEl.textContent = `${mins}:${secs}`;
  }, 1000);

  if (muteBtn) {
    muteBtn.addEventListener('click', () => {
      const isMuted = muteBtn.classList.contains('bg-amber-500/20');
      if (isMuted) {
        muteBtn.classList.remove('bg-amber-500/20', 'text-amber-400', 'border-amber-500/40');
        muteBtn.classList.add('bg-slate-800', 'text-slate-300');
        muteBtn.querySelector('span').textContent = 'Mute';
      } else {
        muteBtn.classList.add('bg-amber-500/20', 'text-amber-400', 'border-amber-500/40');
        muteBtn.classList.remove('bg-slate-800', 'text-slate-300');
        muteBtn.querySelector('span').textContent = 'Muted';
      }
    });
  }

  if (holdBtn) {
    holdBtn.addEventListener('click', () => {
      const isOnHold = holdBtn.classList.contains('bg-indigo-500/20');
      if (isOnHold) {
        holdBtn.classList.remove('bg-indigo-500/20', 'text-indigo-400', 'border-indigo-500/40');
        holdBtn.classList.add('bg-slate-800', 'text-slate-300');
        holdBtn.querySelector('span').textContent = 'Hold';
        if (callStatusBadge) callStatusBadge.textContent = 'Connected';
      } else {
        holdBtn.classList.add('bg-indigo-500/20', 'text-indigo-400', 'border-indigo-500/40');
        holdBtn.classList.remove('bg-slate-800', 'text-slate-300');
        holdBtn.querySelector('span').textContent = 'On Hold';
        if (callStatusBadge) callStatusBadge.textContent = 'On Hold';
      }
    });
  }

  if (endCallBtn) {
    endCallBtn.addEventListener('click', () => {
      isConnected = !isConnected;
      if (!isConnected) {
        callStatusBadge.textContent = 'Call Ended';
        callStatusBadge.className = 'px-3 py-1 text-xs font-semibold rounded-full bg-red-500/20 text-red-400 border border-red-500/30';
        endCallBtn.querySelector('span').textContent = 'Reconnect';
      } else {
        callStatusBadge.textContent = 'Connected';
        callStatusBadge.className = 'px-3 py-1 text-xs font-semibold rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30';
        endCallBtn.querySelector('span').textContent = 'End Call';
      }
    });
  }
}

/* 7. Automation Flowchart Expandable Nodes */
function initAutomationNodes() {
  const autoNodes = document.querySelectorAll('.auto-flow-node');
  autoNodes.forEach(node => {
    node.addEventListener('click', () => {
      const detail = node.querySelector('.auto-node-detail');
      if (!detail) return;
      
      const isExpanded = !detail.classList.contains('hidden');
      if (isExpanded) {
        detail.classList.add('hidden');
        node.classList.remove('border-royal-blue', 'bg-slate-800/90');
      } else {
        detail.classList.remove('hidden');
        node.classList.add('border-royal-blue', 'bg-slate-800/90');
      }
    });
  });
}

/* 8. Interactive Ecosystem Module Tooltips */
function initEcosystemTooltips() {
  const ecoNodes = document.querySelectorAll('.eco-node');
  const tooltipTitle = document.getElementById('eco-tooltip-title');
  const tooltipDesc = document.getElementById('eco-tooltip-desc');

  if (!ecoNodes.length || !tooltipTitle) return;

  const moduleData = {
    'CRM': 'Comprehensive customer profile, activity history, past interactions, and document repository in one secure location.',
    'Leads': 'Intelligent lead capture from web, ads, calls, and emails with automated qualification and round-robin assignment.',
    'Sales': 'Visual multi-pipeline management with real-time deal stage tracking, revenue forecasting, and quotation generation.',
    'Calling': 'Integrated softphone with 1-click dialer, immediate activity logging, follow-up scheduling, and call metrics.',
    'Workflows': 'Custom trigger-action automation builder to eliminate manual tasks and keep sales moving 24/7.',
    'Employees': 'Real-time team performance metrics, activity logs, conversion rates, and workload distribution analytics.',
    'Analytics': 'Executive business intelligence dashboards, revenue reporting, funnel conversion stats, and performance metrics.',
    'Solar Operations': 'Tailored workflows for solar businesses: site surveys, technical feasibility, proposal generation, and installation tracking.'
  };

  ecoNodes.forEach(node => {
    node.addEventListener('mouseenter', () => {
      const name = node.getAttribute('data-module');
      if (moduleData[name]) {
        tooltipTitle.textContent = `${name} Module`;
        tooltipDesc.textContent = moduleData[name];
      }
    });
  });
}

/* 9. Animated Counter for Analytics */
function initCounterAnimations() {
  const counterElements = document.querySelectorAll('.count-up-metric');
  if (!counterElements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const targetValue = parseFloat(target.getAttribute('data-target') || '0');
        const prefix = target.getAttribute('data-prefix') || '';
        const suffix = target.getAttribute('data-suffix') || '';
        const isDecimal = targetValue % 1 !== 0;

        let startValue = 0;
        const duration = 1500;
        const frameTime = 1000 / 60;
        const totalFrames = Math.round(duration / frameTime);
        let frame = 0;

        const timer = setInterval(() => {
          frame++;
          const progress = frame / totalFrames;
          const currentVal = targetValue * (1 - Math.pow(1 - progress, 3));

          if (isDecimal) {
            target.textContent = `${prefix}${currentVal.toFixed(1)}${suffix}`;
          } else {
            target.textContent = `${prefix}${Math.round(currentVal).toLocaleString('en-IN')}${suffix}`;
          }

          if (frame >= totalFrames) {
            clearInterval(timer);
            if (isDecimal) {
              target.textContent = `${prefix}${targetValue.toFixed(1)}${suffix}`;
            } else {
              target.textContent = `${prefix}${targetValue.toLocaleString('en-IN')}${suffix}`;
            }
          }
        }, frameTime);

        obs.unobserve(target);
      }
    });
  }, { threshold: 0.2 });

  counterElements.forEach(el => observer.observe(el));
}

/* 10. Ambient Mouse Parallax on Hero Card */
function initMouseParallax() {
  const heroCard = document.getElementById('hero-dashboard-card');
  if (!heroCard) return;

  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (isTouch || isReducedMotion) return;

  const container = heroCard.parentElement;
  if (!container) return;

  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const tiltX = (y / (rect.height / 2)) * -4;
    const tiltY = (x / (rect.width / 2)) * 4;

    heroCard.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(0)`;
  });

  container.addEventListener('mouseleave', () => {
    heroCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
  });
}
