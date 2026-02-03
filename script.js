/**
 * Terminal Portfolio - Interactive Scripts
 * Pure JavaScript - No external dependencies
 */

// ========================================
// TERMINAL TYPING EFFECT
// ========================================

class TerminalTypewriter {
    constructor(element, text, speed = 50) {
        this.element = element;
        this.text = text;
        this.speed = speed;
        this.index = 0;
        this.isTyping = false;
    }

    type() {
        if (this.index < this.text.length) {
            this.element.textContent += this.text.charAt(this.index);
            this.index++;
            setTimeout(() => this.type(), this.speed);
        } else {
            this.isTyping = false;
        }
    }

    start() {
        if (!this.isTyping) {
            this.isTyping = true;
            this.element.textContent = '';
            this.type();
        }
    }
}

// ========================================
// SCROLL REVEAL ANIMATION
// ========================================

class ScrollReveal {
    constructor() {
        this.elements = document.querySelectorAll('.skill-box, .case-section, .resource-item');
        this.observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
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
// COMMAND LINE INTERACTIVITY
// ========================================

class CommandLine {
    constructor() {
        this.commands = {
            'help': this.showHelp.bind(this),
            'about': this.showAbout.bind(this),
            'skills': this.showSkills.bind(this),
            'projects': this.showProjects.bind(this),
            'contact': this.showContact.bind(this),
            'clear': this.clearTerminal.bind(this)
        };
        this.init();
    }

    init() {
        // Add click handlers to command lines for visual feedback
        const commandLines = document.querySelectorAll('.command-line');
        commandLines.forEach(line => {
            line.addEventListener('click', () => {
                line.style.opacity = '0.7';
                setTimeout(() => {
                    line.style.opacity = '1';
                }, 150);
            });
        });
    }

    showHelp() {
        return `
Available commands:
  help      - Show this help message
  about     - Display about information
  skills    - List technical skills
  projects  - Show project portfolio
  contact   - Display contact information
  clear     - Clear terminal output
        `;
    }

    showAbout() {
        return 'Lee Ser Hong - Final-year Cybersecurity & Digital Forensics student at NYP.';
    }

    showSkills() {
        return 'Frontend: HTML5, CSS3, JavaScript (ES6+), Bootstrap 5';
    }

    showProjects() {
        return 'IT1515 Table Tennis CCA Website - A responsive recruitment platform.';
    }

    showContact() {
        return 'Email: available in resume.pdf | Download from footer section.';
    }

    clearTerminal() {
        return '';
    }
}

// ========================================
// CURSOR BLINK SYNC
// ========================================

function syncCursors() {
    const cursors = document.querySelectorAll('.cursor');
    cursors.forEach((cursor, index) => {
        cursor.style.animationDelay = `${index * 0.2}s`;
    });
}

// ========================================
// DOWNLOAD RESUME FUNCTION
// ========================================

function downloadResume(event) {
    event.preventDefault();
    
    const btn = event.currentTarget;
    const originalText = btn.querySelector('.btn-text').textContent;
    
    // Visual feedback
    btn.style.transform = 'scale(0.95)';
    btn.querySelector('.btn-text').textContent = 'downloading...';
    
    setTimeout(() => {
        btn.style.transform = 'scale(1)';
        btn.querySelector('.btn-text').textContent = 'download complete!';
        
        // Create a simple PDF notification
        showNotification('Resume download initiated!', 'success');
        
        setTimeout(() => {
            btn.querySelector('.btn-text').textContent = originalText;
        }, 2000);
    }, 500);
}

// ========================================
// NOTIFICATION SYSTEM
// ========================================

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `terminal-notification ${type}`;
    notification.innerHTML = `
        <span class="notification-prompt">$</span>
        <span class="notification-message">${message}</span>
    `;
    
    // Styles for notification
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #0a0a0a;
        border: 1px solid #00FF41;
        padding: 16px 24px;
        font-family: 'Courier New', monospace;
        font-size: 14px;
        color: #00FF41;
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 10px;
        box-shadow: 0 0 20px rgba(0, 255, 65, 0.3);
        animation: slideIn 0.3s ease;
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
            const items = box.querySelectorAll('.skill-item');
            items.forEach((item, index) => {
                setTimeout(() => {
                    item.style.color = '#00FF41';
                }, index * 50);
            });
        });
        
        box.addEventListener('mouseleave', () => {
            const items = box.querySelectorAll('.skill-item');
            items.forEach(item => {
                item.style.color = '';
            });
        });
    });
}

// ========================================
// PARALLAX SCROLL EFFECT
// ========================================

function initParallax() {
    const hero = document.querySelector('.hero');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.3;
        
        if (hero && scrolled < window.innerHeight) {
            hero.style.backgroundPositionY = `${rate}px`;
        }
    });
}

// ========================================
// TERMINAL GLITCH EFFECT
// ========================================

function initGlitchEffect() {
    const headline = document.querySelector('.headline');
    if (!headline) return;
    
    const originalText = headline.textContent;
    const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    headline.addEventListener('mouseenter', () => {
        let iterations = 0;
        const interval = setInterval(() => {
            headline.textContent = originalText
                .split('')
                .map((char, index) => {
                    if (index < iterations) {
                        return originalText[index];
                    }
                    if (char === ' ') return ' ';
                    return glitchChars[Math.floor(Math.random() * glitchChars.length)];
                })
                .join('');
            
            if (iterations >= originalText.length) {
                clearInterval(interval);
                headline.textContent = originalText;
            }
            
            iterations += 1 / 2;
        }, 30);
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
// INITIALIZE ALL FUNCTIONS
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // Sync cursor animations
    syncCursors();
    
    // Initialize scroll reveal
    new ScrollReveal();
    
    // Initialize command line interactivity
    new CommandLine();
    
    // Initialize skill hover effects
    initSkillEffects();
    
    // Initialize parallax scroll
    initParallax();
    
    // Initialize glitch effect
    initGlitchEffect();
    
    // Initialize keyboard shortcuts
    initKeyboardShortcuts();
    
    // Add CSS animations dynamically
    addDynamicStyles();
});

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
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .revealed {
            opacity: 1;
            transform: translateY(0);
        }
        
        .skill-box.revealed {
            transition-delay: calc(var(--index, 0) * 0.1s);
        }
        
        .case-section.revealed {
            transition-delay: 0.1s;
        }
        
        .resource-item.revealed {
            transition-delay: calc(var(--index, 0) * 0.05s);
        }
    `;
    document.head.appendChild(style);
}

// ========================================
// CONSOLE EASTER EGG
// ========================================

console.log('%c> SYSTEM_USER: LEE SER HONG', 'color: #00FF41; font-family: monospace; font-size: 16px; font-weight: bold;');
console.log('%c> Welcome to my terminal portfolio!', 'color: #888; font-family: monospace; font-size: 12px;');
console.log('%c> Try hovering over elements for interactive effects.', 'color: #888; font-family: monospace; font-size: 12px;');