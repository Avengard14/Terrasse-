// ================================================================
// PDF EXPORT MODULE - VERSION 6.0 - MISE EN PAGE CORRIGÉE
// Corrige les zones vides et les éléments coupés
// ================================================================

class PDFExporter {
    constructor() {
        this.styleElement = null;
    }

    async generatePDF() {
        const isLightTheme = document.documentElement.getAttribute('data-theme') === 'light';
        
        // Rendre tous les éléments visibles
        this.makeAllElementsVisible();
        
        // Injecter les styles d'impression
        this.injectPrintStyles(isLightTheme);
        
        await new Promise(resolve => setTimeout(resolve, 500));
        
        window.print();
        
        setTimeout(() => {
            this.cleanup();
        }, 1500);
        
        return true;
    }

    makeAllElementsVisible() {
        // Forcer visibilité de tous les fade-in
        document.querySelectorAll('.fade-in').forEach(el => {
            el.classList.add('visible');
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
        
        // Cacher le loading screen
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.style.display = 'none';
        }
    }

    injectPrintStyles(isLight) {
        const bg = isLight ? '#f8f9fa' : '#0a0a0f';
        const cardBg = isLight ? '#ffffff' : '#1a1a2e';
        const primary = isLight ? '#0077cc' : '#00ffff';
        const secondary = isLight ? '#cc0099' : '#ff00ff';
        const text = isLight ? '#1a1d23' : '#ffffff';
        const textMuted = isLight ? '#555555' : 'rgba(255,255,255,0.7)';
        const border = isLight ? 'rgba(0,119,204,0.3)' : 'rgba(0,255,255,0.3)';
        const yellow = isLight ? '#cc9900' : '#ffff00';

        this.styleElement = document.createElement('style');
        this.styleElement.id = 'pdf-print-styles';
        this.styleElement.textContent = `
            @media print {
                /* ============ RESET COMPLET ============ */
                * {
                    -webkit-print-color-adjust: exact !important;
                    print-color-adjust: exact !important;
                    color-adjust: exact !important;
                    box-sizing: border-box !important;
                }
                
                /* ============ CACHER LES EFFETS ============ */
                #loadingScreen,
                .loading-container,
                .cyber-grid-3d,
                .scan-lines,
                .scan-line-main,
                .aurora-container,
                .aurora,
                .aurora-1, .aurora-2, .aurora-3,
                .orb, .orb-cyan, .orb-magenta, .orb-yellow, .orb-purple,
                .matrix-bg,
                .holo-grid,
                #particleContainer,
                #nebulaCanvas,
                .photo-glow,
                .profile-ring, .ring-2,
                .navbar-glow,
                .avatar-particles,
                .avatar-hologram,
                .avatar-outer-ring,
                .avatar-inner-ring,
                .hero-bg-lines,
                .hero-corner,
                .scroll-indicator,
                .scroll-top-ultra,
                #scrollTop,
                .music-controls,
                .animations-control,
                .card-glow,
                .card-border,
                .card-corners,
                .game-hologram,
                .game-scan-line,
                .game-overlay,
                .footer-glow,
                .footer-decoration,
                .btn-glitch,
                .btn-shine,
                .btn-bg,
                .title-decoration,
                .skill-glow,
                .skill-particles,
                audio, video {
                    display: none !important;
                    visibility: hidden !important;
                    opacity: 0 !important;
                    position: absolute !important;
                    width: 0 !important;
                    height: 0 !important;
                    overflow: hidden !important;
                }
                
                /* ============ VISIBILITÉ FORCÉE ============ */
                .fade-in,
                .fade-in.visible,
                .main-content,
                .hero-content,
                section,
                .container,
                .holo-card,
                .card-content,
                .project-card,
                .skill-card,
                .stat-card,
                .featured-game,
                .featured-game-item {
                    opacity: 1 !important;
                    visibility: visible !important;
                    transform: none !important;
                    animation: none !important;
                    transition: none !important;
                }
                
                /* ============ PAGE DE BASE ============ */
                html, body {
                    background: ${bg} !important;
                    color: ${text} !important;
                    font-family: 'Rajdhani', Arial, sans-serif !important;
                    font-size: 10pt !important;
                    line-height: 1.3 !important;
                    margin: 0 !important;
                    padding: 0 !important;
                    width: 100% !important;
                    height: auto !important;
                    overflow: visible !important;
                }
                
                /* ============ NAVBAR ============ */
                .navbar {
                    position: relative !important;
                    background: ${cardBg} !important;
                    backdrop-filter: none !important;
                    border-bottom: 2px solid ${primary} !important;
                    padding: 8px 15px !important;
                    box-shadow: none !important;
                    height: auto !important;
                }
                
                .navbar-container {
                    display: flex !important;
                    align-items: center !important;
                }
                
                .navbar-toggle,
                .navbar-menu,
                .controls-group {
                    display: none !important;
                }
                
                .navbar-brand {
                    display: flex !important;
                    align-items: center !important;
                    gap: 8px !important;
                }
                
                .profile-wrapper {
                    width: 35px !important;
                    height: 35px !important;
                }
                
                .profile-photo {
                    width: 35px !important;
                    height: 35px !important;
                    border: 2px solid ${primary} !important;
                    border-radius: 50% !important;
                }
                
                .brand-first, .brand-last {
                    background: none !important;
                    -webkit-text-fill-color: ${primary} !important;
                    color: ${primary} !important;
                    text-shadow: none !important;
                }
                
                .brand-first { font-size: 8pt !important; }
                .brand-last { font-size: 11pt !important; font-weight: bold !important; }
                
                /* ============ MAIN CONTENT ============ */
                .main-content {
                    padding: 0 !important;
                    margin: 0 !important;
                    width: 100% !important;
                }
                
                .container {
                    width: 100% !important;
                    max-width: 100% !important;
                    padding: 0 10px !important;
                    margin: 0 !important;
                }
                
                section {
                    padding: 10px 0 !important;
                    margin: 0 !important;
                    page-break-inside: avoid !important;
                    break-inside: avoid !important;
                    height: auto !important;
                    min-height: 0 !important;
                }
                
                /* ============ HERO ============ */
                #hero {
                    min-height: auto !important;
                    height: auto !important;
                    padding: 15px 0 !important;
                    margin: 0 !important;
                    display: block !important;
                }
                
                .hero-content {
                    text-align: center !important;
                }
                
                .holo-avatar-container {
                    width: 70px !important;
                    height: 70px !important;
                    margin: 0 auto 8px !important;
                }
                
                .holo-avatar {
                    width: 70px !important;
                    height: 70px !important;
                    border: 2px solid ${primary} !important;
                    border-radius: 50% !important;
                    overflow: hidden !important;
                }
                
                .holo-avatar img {
                    width: 100% !important;
                    height: 100% !important;
                    object-fit: cover !important;
                }
                
                .hero-title, .hero-title .glitch-text, .glitch-text {
                    font-size: 20pt !important;
                    background: none !important;
                    -webkit-text-fill-color: ${primary} !important;
                    color: ${primary} !important;
                    text-shadow: none !important;
                    margin: 0 0 4px 0 !important;
                }
                
                .hero-title::before, .hero-title::after,
                .glitch-text::before, .glitch-text::after {
                    display: none !important;
                }
                
                .hero-subtitle {
                    font-size: 10pt !important;
                    color: ${secondary} !important;
                    -webkit-text-fill-color: ${secondary} !important;
                    margin: 0 0 6px 0 !important;
                }
                
                .subtitle-separator {
                    color: ${yellow} !important;
                    -webkit-text-fill-color: ${yellow} !important;
                }
                
                .hero-description {
                    font-size: 9pt !important;
                    color: ${textMuted} !important;
                    margin: 0 auto 8px !important;
                    max-width: 400px !important;
                }
                
                .btn-group { display: none !important; }
                
                /* ============ SECTION TITLES ============ */
                .section-title {
                    font-size: 14pt !important;
                    background: none !important;
                    -webkit-text-fill-color: ${primary} !important;
                    color: ${primary} !important;
                    text-shadow: none !important;
                    text-align: center !important;
                    margin: 0 0 10px 0 !important;
                    padding-bottom: 6px !important;
                    border-bottom: 2px solid ${primary} !important;
                }
                
                /* ============ ABOUT / HOLO CARD ============ */
                .holo-card {
                    background: ${cardBg} !important;
                    border: 1px solid ${border} !important;
                    border-radius: 6px !important;
                    padding: 12px !important;
                    box-shadow: none !important;
                }
                
                .card-content {
                    background: transparent !important;
                    padding: 0 !important;
                }
                
                .card-content h3 {
                    color: ${primary} !important;
                    -webkit-text-fill-color: ${primary} !important;
                    font-size: 11pt !important;
                    margin: 0 0 6px 0 !important;
                }
                
                .card-content p {
                    font-size: 9pt !important;
                    color: ${text} !important;
                    line-height: 1.4 !important;
                    margin: 0 0 5px 0 !important;
                }
                
                .card-content .highlight,
                .card-content .accent {
                    color: ${primary} !important;
                    -webkit-text-fill-color: ${primary} !important;
                }
                
                /* ============ FEATURED GAMES ============ */
                .featured-games-container {
                    display: grid !important;
                    grid-template-columns: repeat(3, 1fr) !important;
                    gap: 8px !important;
                }
                
                .featured-game-item {
                    page-break-inside: avoid !important;
                }
                
                .featured-game {
                    background: ${cardBg} !important;
                    border: 1px solid ${border} !important;
                    border-radius: 6px !important;
                    padding: 8px !important;
                    text-align: center !important;
                    height: auto !important;
                }
                
                .featured-game h3 {
                    color: ${primary} !important;
                    -webkit-text-fill-color: ${primary} !important;
                    font-size: 10pt !important;
                    margin: 0 0 4px 0 !important;
                }
                
                .featured-game p {
                    font-size: 8pt !important;
                    color: ${textMuted} !important;
                    margin: 0 0 6px 0 !important;
                    line-height: 1.2 !important;
                }
                
                .game-img-container {
                    height: auto !important;
                    margin-bottom: 6px !important;
                }
                
                .game-img {
                    width: 100% !important;
                    height: 60px !important;
                    object-fit: cover !important;
                    border-radius: 4px !important;
                }
                
                /* Tags dans les jeux */
                .game-tags, .project-tags {
                    display: flex !important;
                    flex-wrap: wrap !important;
                    gap: 3px !important;
                    justify-content: center !important;
                }
                
                .game-tag, .project-tag, .tag {
                    font-size: 7pt !important;
                    padding: 2px 5px !important;
                    border: 1px solid ${border} !important;
                    border-radius: 3px !important;
                    background: transparent !important;
                    color: ${textMuted} !important;
                }
                
                /* ============ PROJECTS ============ */
                .projects-grid {
                    display: grid !important;
                    grid-template-columns: repeat(3, 1fr) !important;
                    gap: 8px !important;
                }
                
                .project-card {
                    background: ${cardBg} !important;
                    border: 1px solid ${border} !important;
                    border-radius: 6px !important;
                    overflow: hidden !important;
                    page-break-inside: avoid !important;
                    height: auto !important;
                }
                
                .project-card img, .project-image {
                    width: 100% !important;
                    height: 50px !important;
                    object-fit: cover !important;
                }
                
                .project-content {
                    padding: 5px !important;
                }
                
                .project-title {
                    color: ${primary} !important;
                    -webkit-text-fill-color: ${primary} !important;
                    font-size: 9pt !important;
                    margin: 0 0 2px 0 !important;
                    background: none !important;
                }
                
                .project-desc {
                    font-size: 7pt !important;
                    color: ${textMuted} !important;
                    line-height: 1.2 !important;
                    margin: 0 !important;
                }
                
                /* ============ SKILLS - GRILLE 4 COLONNES ============ */
                .skills-grid {
                    display: grid !important;
                    grid-template-columns: repeat(4, 1fr) !important;
                    gap: 6px !important;
                }
                
                .skill-card {
                    background: ${cardBg} !important;
                    border: 1px solid ${border} !important;
                    border-radius: 5px !important;
                    padding: 8px !important;
                    page-break-inside: avoid !important;
                    text-align: center !important;
                    height: auto !important;
                    min-height: 0 !important;
                }
                
                .skill-icon {
                    font-size: 16pt !important;
                    margin-bottom: 4px !important;
                    display: block !important;
                }
                
                .skill-icon svg,
                .skill-icon img {
                    width: 24px !important;
                    height: 24px !important;
                    margin: 0 auto !important;
                }
                
                .skill-name {
                    color: ${primary} !important;
                    -webkit-text-fill-color: ${primary} !important;
                    font-size: 8pt !important;
                    font-weight: bold !important;
                    display: block !important;
                    margin-bottom: 3px !important;
                }
                
                .skill-bar {
                    height: 4px !important;
                    background: ${isLight ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)'} !important;
                    border-radius: 2px !important;
                    overflow: hidden !important;
                    margin-top: 4px !important;
                }
                
                .skill-progress {
                    height: 100% !important;
                    background: linear-gradient(90deg, ${primary}, ${secondary}) !important;
                    border-radius: 2px !important;
                }
                
                .skill-percent {
                    display: none !important;
                }
                
                /* ============ STATS ============ */
                .stats-grid, .stats-container {
                    display: grid !important;
                    grid-template-columns: repeat(4, 1fr) !important;
                    gap: 8px !important;
                }
                
                .stat-card {
                    background: ${cardBg} !important;
                    border: 1px solid ${border} !important;
                    border-radius: 6px !important;
                    padding: 10px !important;
                    text-align: center !important;
                    page-break-inside: avoid !important;
                }
                
                .stat-ring { display: none !important; }
                
                .stat-icon {
                    font-size: 14pt !important;
                    margin-bottom: 3px !important;
                }
                
                .stat-value {
                    font-size: 16pt !important;
                    color: ${primary} !important;
                    -webkit-text-fill-color: ${primary} !important;
                    font-weight: bold !important;
                    background: none !important;
                }
                
                .stat-plus {
                    font-size: 10pt !important;
                    color: ${secondary} !important;
                }
                
                .stat-label {
                    font-size: 7pt !important;
                    color: ${textMuted} !important;
                    text-transform: uppercase !important;
                    margin-top: 2px !important;
                }
                
                /* ============ CONTACT ============ */
                .contact-wrapper {
                    display: grid !important;
                    grid-template-columns: 1fr 1fr !important;
                    gap: 10px !important;
                }
                
                .contact-form, .map-container {
                    background: ${cardBg} !important;
                    border: 1px solid ${border} !important;
                    border-radius: 6px !important;
                    padding: 10px !important;
                }
                
                .form-header, .map-header {
                    color: ${primary} !important;
                    -webkit-text-fill-color: ${primary} !important;
                    font-size: 10pt !important;
                    margin: 0 0 6px 0 !important;
                }
                
                .form-group {
                    margin-bottom: 6px !important;
                }
                
                .form-group label {
                    color: ${primary} !important;
                    font-size: 7pt !important;
                    margin-bottom: 2px !important;
                }
                
                .form-group input, .form-group textarea {
                    padding: 4px !important;
                    font-size: 8pt !important;
                    background: ${isLight ? '#f0f0f0' : 'rgba(0,0,0,0.3)'} !important;
                    border: 1px solid ${border} !important;
                    border-radius: 3px !important;
                }
                
                .submit-btn { display: none !important; }
                
                .map-wrapper {
                    height: 80px !important;
                    background: ${isLight ? '#e9ecef' : '#0f0f1a'} !important;
                    border: 1px dashed ${border} !important;
                    border-radius: 4px !important;
                    display: flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                }
                
                .map-wrapper iframe { display: none !important; }
                
                .map-wrapper::after {
                    content: "📍 Draguignan, France" !important;
                    color: ${primary} !important;
                    font-size: 9pt !important;
                }
                
                /* ============ FOOTER ============ */
                .footer, footer {
                    background: ${cardBg} !important;
                    border-top: 2px solid ${primary} !important;
                    padding: 10px !important;
                    text-align: center !important;
                    margin-top: 10px !important;
                    page-break-inside: avoid !important;
                }
                
                .footer-logo {
                    font-size: 12pt !important;
                    color: ${primary} !important;
                    -webkit-text-fill-color: ${primary} !important;
                    background: none !important;
                }
                
                .footer-link {
                    color: ${textMuted} !important;
                    font-size: 8pt !important;
                    margin: 0 5px !important;
                }
                
                .footer-copyright {
                    font-size: 7pt !important;
                    color: ${textMuted} !important;
                }
                
                /* ============ ROWS & UTILITIES ============ */
                .row {
                    display: block !important;
                    width: 100% !important;
                }
                
                img {
                    max-width: 100% !important;
                }
                
                a {
                    color: ${primary} !important;
                    text-decoration: none !important;
                }
                
                /* ============ PAGE CONFIG ============ */
                @page {
                    size: A4 portrait;
                    margin: 8mm;
                }
                
                /* Éviter les pages vides */
                html, body {
                    height: auto !important;
                    min-height: 0 !important;
                }
                
                .main-content {
                    height: auto !important;
                    min-height: 0 !important;
                }
            }
        `;
        
        document.head.appendChild(this.styleElement);
    }

    cleanup() {
        if (this.styleElement && this.styleElement.parentNode) {
            this.styleElement.parentNode.removeChild(this.styleElement);
            this.styleElement = null;
        }
    }
}

// ==================== INITIALISATION ====================
document.addEventListener('DOMContentLoaded', function() {
    const pdfBtn = document.getElementById('pdfBtn');
    
    if (pdfBtn) {
        const exporter = new PDFExporter();
        
        pdfBtn.addEventListener('click', async function() {
            const btn = this;
            const originalHTML = btn.innerHTML;
            
            btn.innerHTML = `<span>IMPRESSION...</span>`;
            btn.disabled = true;
            
            try {
                await exporter.generatePDF();
            } catch (error) {
                console.error('Erreur PDF:', error);
            } finally {
                setTimeout(() => {
                    btn.innerHTML = originalHTML;
                    btn.disabled = false;
                }, 1500);
            }
        });
    }
});

console.log('📄 PDF Export v6.0 - Loaded!');
