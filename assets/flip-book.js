/***** CONFIG *****/
const TOTAL_PAGES = 6;
const FLIP_MS = 20;
const STEPS = 20;

/***** STATE MANAGEMENT *****/
const state = {
  currentPage: 0,
  isFlipping: false,
  
  setCurrentPage(newPage) {
    this.currentPage = newPage;
    this.updateUI();
  },
  
  updateUI() {
    Navigation.updateActiveChapter(this.currentPage);
    Navigation.updateNavArrows(this.currentPage);
  }
};

/***** NAVIGATION SERVICE *****/
const Navigation = {
  getChapterForPage(page) {
    const pageMap = {
      0: "cover",
      1: "1",
      2: "2",
      3: "3",
      4: "4",
      5: "5",
      6: "6"
    };
    return pageMap[page] || null;
  },

  updateActiveChapter(chapterId) {
    // Highlight chapter buttons
    document.querySelectorAll(".chapter-btn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.chapter === chapterId);
    });

    // Sync section tabs
    const sectionMap = {
      cover: "cover",
      1: "about",
      2: "menu",
      3: "minuman",
      4: "saus",
      5: "reviews",
      6: "contact"
    };
    
    const sectionId = sectionMap[chapterId];
    document.querySelectorAll(".nav-tab").forEach(tab => {
      tab.classList.toggle("active", tab.dataset.section === sectionId);
    });
  },

  updateNavArrows() {
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    prevBtn.disabled = state.currentPage === 0;
    nextBtn.disabled = state.currentPage === TOTAL_PAGES;
  }
};

/***** ANIMATION SERVICE *****/
const Animation = {
  animateFlip(pageEl, direction, callback) {
    let step = 0;
    const perStep = FLIP_MS / STEPS;
    
    const interval = setInterval(() => {
      step++;
      const rotation = direction === 1 
        ? Math.min(step * (200 / STEPS), 200)
        : 180 - step * (180 / STEPS);
      
      pageEl.style.transform = `rotateY(${-rotation}deg)`;
      
      if (step >= STEPS) {
        clearInterval(interval);
        pageEl.style.transform = "";
        pageEl.classList.toggle("flipped", direction === 1);
        callback();
      }
    }, perStep);
  },

  flipToPage(targetPage) {
    if (state.isFlipping || targetPage === state.currentPage) return;
    
    state.isFlipping = true;
    const direction = targetPage > state.currentPage ? 1 : -1;
    
    const flipStep = () => {
      if (state.currentPage === targetPage) {
        state.isFlipping = false;
        return;
      }
      
      const pageIndex = direction === 1 ? state.currentPage : state.currentPage - 1;
      const pageEl = document.querySelector(`.page[data-page="${pageIndex}"]`);
      
      this.animateFlip(pageEl, direction, () => {
        state.setCurrentPage(state.currentPage + direction);
        flipStep();
      });
    };
    
    flipStep();
  }
};

/***** EVENT HANDLER *****/
const EventHandlers = {
  init() {
    document.getElementById("prevBtn").addEventListener("click", this.handlePrevClick);
    document.getElementById("nextBtn").addEventListener("click", this.handleNextClick);
    
    document.querySelectorAll(".chapter-btn").forEach(tab => {
      tab.addEventListener("click", this.handleChapterClick);
    });
  },
  
  handlePrevClick() {
    if (state.currentPage > 0) Animation.flipToPage(state.currentPage - 1);
  },
  
  handleNextClick() {
    if (state.currentPage < TOTAL_PAGES) Animation.flipToPage(state.currentPage + 1);
  },
  
  handleChapterClick(e) {
    e.preventDefault();
    const targetPage = parseInt(this.dataset.target);
    if (!isNaN(targetPage)) Animation.flipToPage(targetPage);
  }
};

/***** PUBLIC API *****/
export function initFlipBook() {
  EventHandlers.init();
  Navigation.updateActiveChapter("cover");
  Navigation.updateNavArrows();
}