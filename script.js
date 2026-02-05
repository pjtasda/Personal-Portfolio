/**
 * Terminal Portfolio - Interactive Scripts
 * Multi-page version
 */

// ========================================
// NAVIGATION
// ========================================

class Navigation {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.navToggle = document.querySelector('.nav-toggle');
        this.navLinks = document.querySelector('.nav-links');
        this.init();
    }

    init() {
        // Mobile menu toggle
        if (this.navToggle) {
            this.navToggle.addEventListener('click', () => {
                this.navLinks.classList.toggle('active');
                this.toggleMenuAnimation();
            });
        }

        // Close mobile menu on link click
        const navLinkItems = document.querySelectorAll('.nav-link');
        navLinkItems.forEach(link => {
            link.addEventListener('click', () => {
                this.navLinks.classList.remove('active');
                this.resetMenuAnimation();
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.navbar.contains(e.target) && this.navLinks.classList.contains('active')) {
                this.navLinks.classList.remove('active');
                this.resetMenuAnimation();
            }
        });
    }

    toggleMenuAnimation() {
        const spans = this.navToggle.querySelectorAll('span');
        if (this.navLinks.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            this.resetMenuAnimation();
        }
    }

    resetMenuAnimation() {
        const spans = this.navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
}

// ========================================
// SCROLL REVEAL ANIMATION
// ========================================

class ScrollReveal {
    constructor() {
        this.elements = document.querySelectorAll('.skill-box, .case-section, .contact-item, .metric, .stat-card, .interest-item');
        this.observerOptions = {
            root: null,
            rootMargin: '0px 0px -50px 0px',
            threshold: 0.1
        };
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    
                    // Animate proficiency bars if inside this element
                    const proficiencyBars = entry.target.querySelectorAll('.proficiency-fill');
                    proficiencyBars.forEach(bar => {
                        const level = bar.dataset.level;
                        if (level) {
                            setTimeout(() => {
                                bar.style.width = level + '%';
                            }, 200);
                        }
                    });
                    
                    observer.unobserve(entry.target);
                }
            });
        }, this.observerOptions);

        this.elements.forEach(el => {
            el.classList.add('reveal-hidden');
            observer.observe(el);
        });
    }
}

// ========================================
// CURSOR BLINK SYNC
// ========================================

function syncCursors() {
    const cursors = document.querySelectorAll('.cursor');
    cursors.forEach((cursor, index) => {
        cursor.style.animationDelay = `${index * 0.3}s`;
    });
}

// ========================================
// DOWNLOAD RESUME FUNCTION
// ========================================

function initDownloadButton() {
    const downloadBtn = document.querySelector('.download-btn');
    if (!downloadBtn) return;

    downloadBtn.addEventListener('click', function(e) {
        const btnText = this.querySelector('.btn-text');
        const originalText = btnText.textContent;
        
        // Visual feedback
        this.style.transform = 'scale(0.95)';
        btnText.textContent = 'downloading...';
        
        setTimeout(() => {
            this.style.transform = 'scale(1)';
            btnText.textContent = 'download complete!';
            
            showNotification('Resume download started!', 'success');
            
            setTimeout(() => {
                btnText.textContent = originalText;
            }, 2000);
        }, 800);
    });
}

// ========================================
// NOTIFICATION SYSTEM
// ========================================

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.terminal-notification');
    existingNotifications.forEach(n => n.remove());

    const notification = document.createElement('div');
    notification.className = `terminal-notification ${type}`;
    notification.innerHTML = `
        <span class="notification-prompt">$</span>
        <span class="notification-message">${message}</span>
    `;
    
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #0a0a0a;
        border: 1px solid #00FF41;
        padding: 16px 24px;
        font-family: 'JetBrains Mono', monospace;
        font-size: 14px;
        color: #00FF41;
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 10px;
        box-shadow: 0 0 30px rgba(0, 255, 65, 0.3);
        animation: slideIn 0.3s ease;
        border-radius: 4px;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ========================================
// SKILL BOX HOVER EFFECTS
// ========================================

function initSkillEffects() {
    const skillBoxes = document.querySelectorAll('.skill-box');
    
    skillBoxes.forEach(box => {
        box.addEventListener('mouseenter', () => {
            const items = box.querySelectorAll('.skill-name-item');
            items.forEach((item, index) => {
                setTimeout(() => {
                    item.style.color = '#00FF41';
                }, index * 50);
            });
        });
        
        box.addEventListener('mouseleave', () => {
            const items = box.querySelectorAll('.skill-name-item');
            items.forEach(item => {
                item.style.color = '';
            });
        });
    });
}

// ========================================
// KEYBOARD SHORTCUTS
// ========================================

function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + D to download resume
        if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
            e.preventDefault();
            const downloadBtn = document.querySelector('.download-btn');
            if (downloadBtn) {
                downloadBtn.click();
            }
        }
        
        // Escape to close notifications
        if (e.key === 'Escape') {
            const notifications = document.querySelectorAll('.terminal-notification');
            notifications.forEach(n => n.remove());
        }
    });
}

// ========================================
// TYPING EFFECT FOR COMMAND LINES
// ========================================

function initTypingEffect() {
    const commandLines = document.querySelectorAll('.command-line');
    
    commandLines.forEach((line, index) => {
        line.style.opacity = '0';
        line.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
            line.style.transition = 'all 0.4s ease';
            line.style.opacity = '1';
            line.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// ========================================
// DYNAMIC STYLES
// ========================================

function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .reveal-hidden {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .revealed {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
}

// ========================================
// INITIALIZE ALL FUNCTIONS
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // Add dynamic styles
    addDynamicStyles();
    
    // Initialize navigation
    new Navigation();
    
    // Sync cursor animations
    syncCursors();
    
    // Initialize scroll reveal
    new ScrollReveal();
    
    // Initialize skill hover effects
    initSkillEffects();
    
    // Initialize keyboard shortcuts
    initKeyboardShortcuts();
    
    // Initialize download button
    initDownloadButton();
    
    // Initialize typing effect
    initTypingEffect();
});

// ========================================
// CONSOLE EASTER EGG
// ========================================

console.log('%c> SYSTEM_USER: LEE SER HONG', 'color: #00FF41; font-family: monospace; font-size: 16px; font-weight: bold;');
console.log('%c> Welcome to my terminal portfolio!', 'color: #888; font-family: monospace; font-size: 12px;');
console.log('%c> Navigate through the pages using the menu above.', 'color: #888; font-family: monospace; font-size: 12px;');
console.log('%c> Tip: Press Ctrl+D on the Contact page to download my resume!', 'color: #00cc33; font-family: monospace; font-size: 12px;');
// ========================================

console.log('%c> SYSTEM_USER: LEE SER HONG', 'color: #00FF41; font-family: monospace; font-size: 16px; font-weight: bold;');
console.log('%c> Welcome to my terminal portfolio!', 'color: #888; font-family: monospace; font-size: 12px;');

console.log('%c> Try hovering over elements for interactive effects.', 'color: #888; font-family: monospace; font-size: 12px;');
