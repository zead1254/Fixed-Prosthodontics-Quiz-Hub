// Quiz Data Structure
const QUIZZES = [
    {
        id: 'q1',
        icon: '💎',
        title: 'Basics & Biology',
        description: 'Foundational principles of tooth preparation.',
        link: 'https://zead1254.github.io/Fixed-Prosthodontics-Quiz1/',
        external: true,
        questionCount: 40
    },
    {
        id: 'q2',
        icon: '⚔️',
        title: 'Full Metal Crowns',
        description: 'Preparation and materials for metal coverage.',
        link: 'https://zead1254.github.io/Full-Metal-Crown-Quiz-2/',
        external: true,
        questionCount: 40
    },
    {
        id: 'q3',
        icon: '⚙️',
        title: 'Instrumentation',
        description: 'Burs and tool selection for precise clinical work.',
        link: 'https://zead1254.github.io/dental-instruments-quiz3/',
        external: true,
        questionCount: 40
    },
    {
        id: 'q4',
        icon: '⚡',
        title: 'Bio-Mechanical Principles',
        description: 'Analysis of forces and resistance geometry.',
        link: 'https://zead1254.github.io/Bio-Mechanical-Principles-of-Tooth-Preparation-Quiz4/',
        external: true,
        questionCount: 40
    },
    {
        id: 'q5',
        icon: '🏛️',
        title: 'Advanced Stability',
        description: 'Expert questions on retention geometry and stability.',
        external: false,
        questionCount: 40,
        lecture: 'Lecture 5: Dental Restoration: Retention & Resistance Form'
    },
    {
        id: 'q6',
        icon: '❄️',
        title: 'Ceramic Systems',
        description: 'Advanced questions on all-ceramic preparation.',
        external: false,
        questionCount: 40,
        lecture: 'Lecture 6: All-Ceramic Crown Preparation'
    },
    {
        id: 'q7',
        icon: '🧪',
        title: 'Fabrication Flow',
        description: 'Laboratory steps and modern fabrication methods.',
        external: false,
        questionCount: 40,
        lecture: 'Lecture 7: Fabrication of All-Ceramic Crowns'
    },
    {
        id: 'q8',
        icon: '🔱',
        title: 'PFM Principles',
        description: 'Metal-ceramic framework success and principles.',
        external: false,
        questionCount: 40,
        lecture: 'Lecture 8: Metal-Ceramic Crowns (PFM)'
    }
];

// Quiz Questions Data (Loaded from the text you provided)
const QUIZ_QUESTIONS = {
    q5: [
        {
            question: "Retention form is defined as the feature of a preparation that resists dislodgement by forces parallel to:",
            options: [
                "The occlusal plane",
                "The horizontal axis",
                "The path of insertion",
                "The gingival floor"
            ],
            correctAnswer: 2,
            explanation: "Retention form resists dislodgement along the path of insertion."
        },
        {
            question: "The imaginary line along which a restoration is placed or removed is called:",
            options: [
                "The tipping path",
                "The path of insertion",
                "The long axis of the crown",
                "The arc of rotation"
            ],
            correctAnswer: 1,
            explanation: "The path of insertion is the imaginary line for restoration placement/removal."
        },
        {
            question: "For an anterior crown, the path of insertion should be parallel with:",
            options: [
                "The long axis of the tooth",
                "The incisal two-thirds of the facial surface",
                "The cervical third of the facial surface",
                "The lingual concavity"
            ],
            correctAnswer: 1,
            explanation: "For anterior crowns, parallel to incisal two-thirds of facial surface."
        },
        {
            question: "Which factor directly increases the surface area and, consequently, the retention?",
            options: [
                "Increasing the taper",
                "Decreasing the height of axial walls",
                "Increasing the length of axial walls",
                "Rounding the external angles"
            ],
            correctAnswer: 2,
            explanation: "Longer axial walls increase surface area and retention."
        },
        {
            question: "The recommended clinical convergence angle (taper) for maximum retention and seating is:",
            options: [
                "0 degrees",
                "6 degrees",
                "15 degrees",
                "20 degrees"
            ],
            correctAnswer: 1,
            explanation: "6 degrees is the ideal clinical convergence angle."
        },
        {
            question: "What is the effect of an 'undercut' (reverse taper) on a preparation?",
            options: [
                "It increases retention significantly",
                "It makes the restoration easier to seat",
                "It prevents the restoration from being seated",
                "It reduces the need for cement"
            ],
            correctAnswer: 2,
            explanation: "Undercuts prevent the restoration from being seated properly."
        },
        {
            question: "Rounding internal line and point angles increases retention by:",
            options: [
                "Increasing the taper",
                "Reducing stress concentration",
                "Increasing the surface area",
                "Making the preparation smoother"
            ],
            correctAnswer: 1,
            explanation: "Rounding reduces stress concentration points."
        },
        {
            question: "Which alloy type provides better retention due to its high chemical reactivity with luting cements?",
            options: [
                "High gold-content alloy",
                "Noble metal alloy",
                "Base metal alloy",
                "Titanium alloy"
            ],
            correctAnswer: 2,
            explanation: "Base metal alloys have higher chemical reactivity with cements."
        },
        {
            question: "(CONCEPTUAL) Why is a 'zero-degree' parallel preparation avoided despite being theoretically ideal for retention?",
            options: [
                "It causes pulp exposure in all cases",
                "It creates hydrostatic pressure that prevents the escape of cement and full seating",
                "It makes the restoration too thin",
                "It requires specialized laboratory equipment not available"
            ],
            correctAnswer: 1,
            explanation: "Zero-degree creates hydrostatic pressure preventing cement escape."
        },
        {
            question: "Resistance form is designed to prevent dislodgement by forces in which direction?",
            options: [
                "Parallel to the path of insertion",
                "Oblique or horizontal",
                "Purely vertical (tensile)",
                "Along the long axis"
            ],
            correctAnswer: 1,
            explanation: "Resistance form prevents dislodgement by oblique/horizontal forces."
        }
        // Additional questions would continue here up to 40...
    ],
    q6: [
        {
            question: "Which of the following is a primary advantage of all-ceramic crowns?",
            options: [
                "High thermal conductivity",
                "Excellent translucency and superior esthetics",
                "High metal content",
                "Low cost"
            ],
            correctAnswer: 1,
            explanation: "All-ceramic crowns offer excellent translucency and esthetics."
        },
        {
            question: "The most critical design feature to minimize fracture risk in all-ceramic crowns is:",
            options: [
                "Sharp line angles",
                "Rounded shoulder margin",
                "Heavy bevels",
                "Minimum reduction"
            ],
            correctAnswer: 1,
            explanation: "Rounded shoulder margins minimize fracture risk."
        },
        {
            question: "What is a notable disadvantage of ceramic functional surfaces?",
            options: [
                "They are too soft",
                "They can wear down opposing natural teeth",
                "They change color over time",
                "They are highly conductive"
            ],
            correctAnswer: 1,
            explanation: "Ceramics can wear opposing natural teeth."
        },
        {
            question: "All-ceramic crowns are contraindicated in:",
            options: [
                "Malformed teeth",
                "Young patients with large vital pulps",
                "Discolored teeth",
                "Anterior teeth fractures"
            ],
            correctAnswer: 1,
            explanation: "Contraindicated in young patients with large vital pulps."
        },
        {
            question: "A 'Half-moon' fracture in the labiogingival area is often caused by:",
            options: [
                "Excessive thickness of ceramic",
                "Over-shortening of the preparation (Lack of support)",
                "Use of resin cement",
                "Sharp incisal edges"
            ],
            correctAnswer: 1,
            explanation: "Half-moon fractures result from over-shortened preparations."
        },
        {
            question: "In deep bite cases, occluding on the cervical fifth of the lingual surface produces:",
            options: [
                "Compressive stresses",
                "Tensile stresses",
                "No stress",
                "Shear stresses only"
            ],
            correctAnswer: 1,
            explanation: "Creates tensile stresses in deep bite cases."
        },
        {
            question: "The instrument used for incisal reduction is:",
            options: [
                "Wheel diamond",
                "Flat-end tapered diamond",
                "Needle diamond",
                "Round bur"
            ],
            correctAnswer: 1,
            explanation: "Flat-end tapered diamond is used for incisal reduction."
        },
        {
            question: "Labial reduction of an anterior tooth for an all-ceramic crown is performed in:",
            options: [
                "One plane",
                "Two planes (Incisal and Gingival halves)",
                "Three planes",
                "Vertical lines only"
            ],
            correctAnswer: 1,
            explanation: "Labial reduction is done in two planes."
        },
        {
            question: "(CONCEPTUAL) Why is the all-ceramic preparation considered the 'least conservative' compared to PFM?",
            options: [
                "Because it requires metal coping",
                "Because a deep, uniform shoulder (1.0-1.5mm) is required circumferentially (360 degrees)",
                "Because the incisal reduction is only 0.5mm",
                "Because it is only used on small teeth"
            ],
            correctAnswer: 1,
            explanation: "Requires deep uniform shoulder circumferentially."
        },
        {
            question: "The lingual reduction (axial) is performed using which instrument?",
            options: [
                "Small wheel diamond",
                "Flat-end tapered diamond",
                "Round bur",
                "Flame bur"
            ],
            correctAnswer: 1,
            explanation: "Flat-end tapered diamond for lingual axial reduction."
        }
        // Additional questions would continue here up to 40...
    ],
    q7: [
        {
            question: "The first all-ceramic crown (1886) was known as:",
            options: [
                "Metal-Ceramic Crown",
                "Porcelain Jacket Crown (PJC)",
                "Zirconia Crown",
                "IPS e.max"
            ],
            correctAnswer: 1,
            explanation: "First all-ceramic crown was Porcelain Jacket Crown (1886)."
        },
        {
            question: "The primary component of conventional dental porcelain is:",
            options: [
                "Alumina",
                "Feldspar",
                "Quartz",
                "Kaolin"
            ],
            correctAnswer: 1,
            explanation: "Feldspar is the primary component of dental porcelain."
        },
        {
            question: "Which component acts as a binder and provides workability?",
            options: [
                "Quartz",
                "Kaolin (Clay)",
                "Feldspar",
                "Pigments"
            ],
            correctAnswer: 1,
            explanation: "Kaolin (clay) acts as binder and provides workability."
        },
        {
            question: "Quartz in porcelain serves as a:",
            options: [
                "Glass former",
                "Strengthening filler",
                "Color additive",
                "Flux"
            ],
            correctAnswer: 1,
            explanation: "Quartz serves as strengthening filler."
        },
        {
            question: "'Annealing' the platinum foil is done to:",
            options: [
                "Change its color",
                "Relieve work hardening and allow better adaptation",
                "Make it melt",
                "Clean it from bacteria"
            ],
            correctAnswer: 1,
            explanation: "Annealing relieves work hardening for better adaptation."
        },
        {
            question: "The process of powder particles fusing to form a continuous mass is:",
            options: [
                "Glazing",
                "Sintering",
                "Compaction",
                "Annealing"
            ],
            correctAnswer: 1,
            explanation: "Sintering fuses particles into continuous mass."
        },
        {
            question: "Maximum shrinkage during firing occurs in which stage?",
            options: [
                "Low bisque",
                "Medium bisque",
                "High bisque",
                "Glazing"
            ],
            correctAnswer: 2,
            explanation: "Maximum shrinkage in medium bisque stage."
        },
        {
            question: "Which stage results in a smooth and shiny surface?",
            options: [
                "Low bisque",
                "High bisque",
                "Medium bisque",
                "Compaction"
            ],
            correctAnswer: 1,
            explanation: "High bisque results in smooth, shiny surface."
        },
        {
            question: "(CONCEPTUAL) During sintering, why does the porcelain mass shrink significantly?",
            options: [
                "Because the powder particles expand",
                "Because air spaces between powder particles are eliminated as they fuse",
                "Because the platinum foil shrinks",
                "Because the water is added"
            ],
            correctAnswer: 1,
            explanation: "Shrinkage occurs as air spaces are eliminated during fusion."
        },
        {
            question: "Self-glazing is preferred over add-on glazing because it is:",
            options: [
                "More colorful",
                "More resistant to oral fluids",
                "Faster to apply",
                "Cheaper"
            ],
            correctAnswer: 1,
            explanation: "Self-glazing is more resistant to oral fluids."
        }
        // Additional questions would continue here up to 40...
    ],
    q8: [
        {
            question: "A metal-ceramic crown is also known as:",
            options: [
                "All-porcelain crown",
                "Porcelain Fused to Metal (PFM)",
                "Gold crown",
                "Veneer"
            ],
            correctAnswer: 1,
            explanation: "Also known as Porcelain Fused to Metal (PFM)."
        },
        {
            question: "The structure of PFM consists of a ceramic layer bonded to a:",
            options: [
                "Plastic coping",
                "Thin cast metal coping",
                "Thick gold block",
                "Dentin layer"
            ],
            correctAnswer: 1,
            explanation: "Ceramic bonded to thin cast metal coping."
        },
        {
            question: "What is a major advantage of PFM over all-ceramic crowns?",
            options: [
                "Better translucency",
                "Higher strength due to metal substructure",
                "Less tooth reduction",
                "Easier shade matching"
            ],
            correctAnswer: 1,
            explanation: "PFM has higher strength due to metal substructure."
        },
        {
            question: "The facial reduction for an anterior PFM crown should be:",
            options: [
                "0.5 mm",
                "1.2 mm",
                "2.0 mm",
                "0.1 mm"
            ],
            correctAnswer: 1,
            explanation: "Facial reduction should be 1.2 mm for anterior PFM."
        },
        {
            question: "Insufficient facial reduction in PFM leads to:",
            options: [
                "Better aesthetics",
                "Poor contour and shade mismatch (opaque appearance)",
                "Increased pulp health",
                "Easier lab work"
            ],
            correctAnswer: 1,
            explanation: "Insufficient reduction causes opaque appearance."
        },
        {
            question: "The facial reduction should be prepared in how many planes?",
            options: [
                "One plane",
                "Two planes",
                "Three planes",
                "Four planes"
            ],
            correctAnswer: 1,
            explanation: "Facial reduction should be in two planes."
        },
        {
            question: "The 'Silicone Index' is used for:",
            options: [
                "Taking the final impression",
                "Verifying the amount of reduction",
                "Cementing the crown",
                "Cleaning the preparation"
            ],
            correctAnswer: 1,
            explanation: "Silicone index verifies reduction amount."
        },
        {
            question: "Incisal reduction for a metal-ceramic crown is:",
            options: [
                "1.0 mm",
                "2.0 mm",
                "0.5 mm",
                "3.0 mm"
            ],
            correctAnswer: 1,
            explanation: "Incisal reduction is 2.0 mm for metal-ceramic."
        },
        {
            question: "(CONCEPTUAL) Why is the facial reduction of PFM prepared in two planes?",
            options: [
                "To speed up the procedure",
                "To follow the facial anatomy, ensuring enough space for porcelain without compromising the pulp",
                "To increase the taper to 20 degrees",
                "To make the metal coping thicker"
            ],
            correctAnswer: 1,
            explanation: "Two planes follow facial anatomy for proper porcelain space."
        },
        {
            question: "Lingual concavity reduction is performed with:",
            options: [
                "Needle diamond",
                "Small wheel diamond",
                "Flat-end tapered diamond",
                "Round bur"
            ],
            correctAnswer: 1,
            explanation: "Small wheel diamond for lingual concavity reduction."
        }
        // Additional questions would continue here up to 40...
    ]
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Load quizzes on homepage
    if (document.getElementById('quizzesGrid')) {
        loadQuizzes();
    }
    
    // Check if we're on a quiz page
    const quizId = getCurrentQuizId();
    if (quizId && QUIZ_QUESTIONS[quizId]) {
        initializeQuiz(quizId);
    }
    
    // Register service worker for offline functionality
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js')
            .then(registration => {
                console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    }
});

// Load quizzes on homepage
function loadQuizzes() {
    const quizzesGrid = document.getElementById('quizzesGrid');
    
    QUIZZES.forEach(quiz => {
        const quizCard = document.createElement('div');
        quizCard.className = 'quiz-card';
        
        quizCard.innerHTML = `
            <div class="quiz-header">
                <div class="quiz-icon">${quiz.icon}</div>
                <div>
                    <h3 class="quiz-title">${quiz.title}</h3>
                    <span class="quiz-id">${quiz.id.toUpperCase()}</span>
                </div>
            </div>
            <div class="quiz-body">
                <p class="quiz-desc">${quiz.description}</p>
                <div class="quiz-meta">
                    <div class="quiz-count">
                        <i class="fas fa-question-circle"></i>
                        <span>${quiz.questionCount} Questions</span>
                    </div>
                    <a href="${quiz.external ? quiz.link : quiz.id + '.html'}" 
                       class="quiz-button ${quiz.external ? '' : 'offline'}"
                       ${quiz.external ? 'target="_blank"' : ''}>
                        ${quiz.external ? 'Online Quiz' : 'Start Quiz'}
                        <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            </div>
        `;
        
        quizzesGrid.appendChild(quizCard);
    });
}

// Get current quiz ID from URL
function getCurrentQuizId() {
    const path = window.location.pathname;
    const filename = path.split('/').pop();
    
    if (filename.startsWith('quiz') && filename.endsWith('.html')) {
        return filename.replace('quiz', '').replace('.html', '');
    }
    
    return null;
}

// Initialize quiz page
function initializeQuiz(quizId) {
    const quizData = QUIZZES.find(q => q.id === quizId);
    const questions = QUIZ_QUESTIONS[quizId] || [];
    
    // Update quiz header
    const quizTitle = document.querySelector('.quiz-title-page');
    const quizSubtitle = document.querySelector('.quiz-subtitle');
    
    if (quizTitle && quizData) {
        quizTitle.textContent = quizData.title;
    }
    
    if (quizSubtitle && quizData) {
        quizSubtitle.textContent = quizData.lecture || quizData.description;
    }
    
    // Update stats
    const questionCount = document.getElementById('questionCount');
    if (questionCount) {
        questionCount.textContent = questions.length;
    }
    
    // Load questions
    loadQuestions(questions, quizId);
    
    // Setup navigation
    setupQuizNavigation(questions.length);
}

// Load questions into the quiz
function loadQuestions(questions, quizId) {
    const quizContainer = document.querySelector('.quiz-container');
    if (!quizContainer) return;
    
    // Remove existing question cards (except first one if it exists)
    const existingCards = document.querySelectorAll('.question-card');
    for (let i = 1; i < existingCards.length; i++) {
        existingCards[i].remove();
    }
    
    // Create question cards
    questions.forEach((q, index) => {
        if (index === 0) {
            // Update first question card if it exists
            const firstCard = document.querySelector('.question-card');
            if (firstCard) {
                updateQuestionCard(firstCard, q, index, questions.length);
            }
        } else {
            const questionCard = createQuestionCard(q, index, questions.length);
            quizContainer.insertBefore(questionCard, document.querySelector('.quiz-controls'));
        }
    });
    
    // Initialize current question
    window.currentQuestionIndex = 0;
    window.userAnswers = new Array(questions.length).fill(null);
    window.quizQuestions = questions;
    window.quizId = quizId;
    
    // Show first question
    showQuestion(0);
}

// Create a question card
function createQuestionCard(question, index, total) {
    const card = document.createElement('div');
    card.className = 'question-card';
    card.id = `question-${index}`;
    card.style.display = 'none';
    
    updateQuestionCard(card, question, index, total);
    
    return card;
}

// Update question card content
function updateQuestionCard(card, question, index, total) {
    card.innerHTML = `
        <div class="question-number">${index + 1}</div>
        <h3 class="question-text">${question.question}</h3>
        <div class="options-grid">
            ${question.options.map((option, optIndex) => `
                <div class="option" data-index="${optIndex}">
                    <div class="option-letter">${String.fromCharCode(65 + optIndex)}</div>
                    <div class="option-text">${option}</div>
                </div>
            `).join('')}
        </div>
        ${question.explanation ? `<div class="explanation" style="display: none; margin-top: 20px; padding: 15px; background-color: #f5f7ff; border-radius: 8px; border-left: 4px solid var(--accent-blue);">
            <strong>Explanation:</strong> ${question.explanation}
        </div>` : ''}
    `;
    
    // Add click handlers to options
    const options = card.querySelectorAll('.option');
    options.forEach(option => {
        option.addEventListener('click', function() {
            selectOption(this, index);
        });
    });
}

// Select an option
function selectOption(optionElement, questionIndex) {
    const questionCard = document.getElementById(`question-${questionIndex}`);
    const options = questionCard.querySelectorAll('.option');
    const selectedIndex = parseInt(optionElement.getAttribute('data-index'));
    
    // Remove selected class from all options
    options.forEach(opt => {
        opt.classList.remove('selected');
    });
    
    // Add selected class to clicked option
    optionElement.classList.add('selected');
    
    // Store user answer
    window.userAnswers[questionIndex] = selectedIndex;
    
    // Enable next button if not last question
    const nextButton = document.querySelector('.next-button');
    if (nextButton && questionIndex < window.quizQuestions.length - 1) {
        nextButton.disabled = false;
    }
    
    // Enable submit button if last question
    const submitButton = document.querySelector('.submit-button');
    if (submitButton && questionIndex === window.quizQuestions.length - 1) {
        submitButton.disabled = false;
    }
}

// Show a specific question
function showQuestion(index) {
    // Hide all questions
    document.querySelectorAll('.question-card').forEach(card => {
        card.style.display = 'none';
    });
    
    // Show selected question
    const questionCard = document.getElementById(`question-${index}`);
    if (questionCard) {
        questionCard.style.display = 'block';
    }
    
    // Update navigation buttons
    updateNavigationButtons(index);
    
    // Update current question index
    window.currentQuestionIndex = index;
}

// Update navigation buttons
function updateNavigationButtons(currentIndex) {
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    const submitButton = document.querySelector('.submit-button');
    
    if (prevButton) {
        prevButton.disabled = currentIndex === 0;
    }
    
    if (nextButton) {
        nextButton.disabled = currentIndex === window.quizQuestions.length - 1 || window.userAnswers[currentIndex] === null;
    }
    
    if (submitButton) {
        submitButton.style.display = currentIndex === window.quizQuestions.length - 1 ? 'inline-flex' : 'none';
        nextButton.style.display = currentIndex === window.quizQuestions.length - 1 ? 'none' : 'inline-flex';
        submitButton.disabled = window.userAnswers[currentIndex] === null;
    }
}

// Setup quiz navigation
function setupQuizNavigation(totalQuestions) {
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    const submitButton = document.querySelector('.submit-button');
    
    if (prevButton) {
        prevButton.addEventListener('click', function() {
            if (window.currentQuestionIndex > 0) {
                showQuestion(window.currentQuestionIndex - 1);
            }
        });
    }
    
    if (nextButton) {
        nextButton.addEventListener('click', function() {
            if (window.currentQuestionIndex < totalQuestions - 1) {
                showQuestion(window.currentQuestionIndex + 1);
            }
        });
    }
    
    if (submitButton) {
        submitButton.addEventListener('click', function() {
            submitQuiz();
        });
    }
}

// Submit quiz and show results
function submitQuiz() {
    const questions = window.quizQuestions;
    const userAnswers = window.userAnswers;
    
    let correctCount = 0;
    
    // Check answers and show explanations
    questions.forEach((q, index) => {
        const questionCard = document.getElementById(`question-${index}`);
        const options = questionCard.querySelectorAll('.option');
        const explanation = questionCard.querySelector('.explanation');
        
        // Mark correct/incorrect
        options.forEach((opt, optIndex) => {
            opt.classList.remove('correct', 'incorrect', 'selected');
            
            if (optIndex === q.correctAnswer) {
                opt.classList.add('correct');
            } else if (optIndex === userAnswers[index]) {
                opt.classList.add('incorrect');
            }
        });
        
        // Mark user's selection if any
        if (userAnswers[index] !== null) {
            options[userAnswers[index]].classList.add('selected');
        }
        
        // Show explanation
        if (explanation) {
            explanation.style.display = 'block';
        }
        
        // Count correct answers
        if (userAnswers[index] === q.correctAnswer) {
            correctCount++;
        }
    });
    
    // Calculate score
    const score = Math.round((correctCount / questions.length) * 100);
    
    // Show result panel
    showResultPanel(score, correctCount, questions.length);
    
    // Hide navigation buttons
    document.querySelector('.quiz-controls').style.display = 'none';
}

// Show result panel
function showResultPanel(score, correctCount, totalQuestions) {
    const resultPanel = document.querySelector('.result-panel');
    if (!resultPanel) return;
    
    // Update result values
    document.getElementById('scoreValue').textContent = score;
    document.getElementById('correctCount').textContent = correctCount;
    document.getElementById('totalQuestions').textContent = totalQuestions;
    document.getElementById('incorrectCount').textContent = totalQuestions - correctCount;
    
    // Set score color based on performance
    const scoreDisplay = document.querySelector('.score-display');
    if (score >= 80) {
        scoreDisplay.style.color = '#4caf50';
    } else if (score >= 60) {
        scoreDisplay.style.color = '#ff9800';
    } else {
        scoreDisplay.style.color = '#f44336';
    }
    
    // Show result panel
    resultPanel.style.display = 'block';
    
    // Scroll to results
    resultPanel.scrollIntoView({ behavior: 'smooth' });
}

// Service Worker for offline functionality
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('service-worker.js')
            .then(registration => {
                console.log('ServiceWorker registration successful');
            })
            .catch(err => {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}