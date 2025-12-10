  // Preloader
        window.addEventListener('load', function() {
            setTimeout(function() {
                document.querySelector('.preloader').style.opacity = '0';
                setTimeout(function() {
                    document.querySelector('.preloader').style.display = 'none';
                }, 500);
            }, 1000);
        });

        // Mobile menu toggle
        document.getElementById('mobile-menu-button').addEventListener('click', function() {
            const menu = document.getElementById('mobile-menu');
            menu.classList.toggle('hidden');
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Close mobile menu if open
                    const mobileMenu = document.getElementById('mobile-menu');
                    if (!mobileMenu.classList.contains('hidden')) {
                        mobileMenu.classList.add('hidden');
                    }
                    
                    // Scroll to target
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Add shadow to navbar on scroll
        window.addEventListener('scroll', function() {
            const nav = document.querySelector('nav');
            if (window.scrollY > 50) {
                nav.classList.add('shadow-lg');
            } else {
                nav.classList.remove('shadow-lg');
            }
        });






  const canvas = document.getElementById("falling-bg");
  const ctx = canvas.getContext("2d");

  // Setup canvas full screen
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Customize these settings
  const particleCount = 120;
  const colors = ["#ff00ea", "#ff6ec4", "#d96efb", "#ff91a4"]; // pink & violet tones
  const particles = [];

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * -canvas.height; // start above screen
      this.radius = Math.random() * 3 + 1;
      this.speed = Math.random() * 1.5 + 0.5;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.opacity = Math.random() * 0.5 + 0.3;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.colorWithOpacity();
      ctx.shadowBlur = 10;
      ctx.shadowColor = this.color;
      ctx.fill();
    }

    colorWithOpacity() {
      const rgb = this.color.match(/\w\w/g).map(hex => parseInt(hex, 16));
      return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${this.opacity})`;
    }

    update() {
      this.y += this.speed;
      if (this.y > canvas.height) this.reset();
      this.draw();
    }
  }

  // Initialize particles
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  // Animate particles
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => p.update());
    requestAnimationFrame(animate);
  }

  animate();

  // Handle window resize
  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });





  // form


function validateForm() {
    let valid = true;

    // Clear all error messages
    document.querySelectorAll("p.text-red-400").forEach(el => el.classList.add("hidden"));

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (name === "") {
        document.getElementById("nameError").classList.remove("hidden");
        valid = false;
    }

    if (!emailPattern.test(email)) {
        document.getElementById("emailError").classList.remove("hidden");
        valid = false;
    }

    if (subject === "") {
        document.getElementById("subjectError").classList.remove("hidden");
        valid = false;
    }

    if (message === "") {
        document.getElementById("messageError").classList.remove("hidden");
        valid = false;
    }

    return valid;
}







   const pdfUrls = {
            resume: 'resume.pdf',
            certificates: [
                'certificate_1.pdf',
                'certificate_2.pdf',
                'certificate_3.pdf',
                'certificate_4.pdf'
            ]
        };

        const certificateNames = [
            'EGC Certificate ',
            'tcsion Certificate',
            'EGC internship Certificate',
            'NPTEL Certificate'
        ];

        function viewResume() {
            const modal = document.getElementById('resumeModal');
            const modalBody = modal.querySelector('.modal-body');
            
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Load PDF
            setTimeout(() => {
                modalBody.innerHTML = `
                    <iframe class="pdf-viewer" src="${pdfUrls.resume}" type="application/pdf">
                        <p>Your browser does not support PDF viewing. 
                        <a href="${pdfUrls.resume}" target="_blank">Click here to download the resume</a></p>
                    </iframe>
                `;
            }, 500);
        }

        function viewCertificates() {
            const modal = document.getElementById('certificatesModal');
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function viewCertificate(index) {
            const modal = document.getElementById('certificateViewerModal');
            const modalBody = modal.querySelector('.modal-body');
            const titleElement = document.getElementById('certificateTitle');
            
            titleElement.textContent = certificateNames[index - 1];
            modal.classList.add('active');
            
            // Load PDF
            setTimeout(() => {
                modalBody.innerHTML = `
                    <iframe class="pdf-viewer" src="${pdfUrls.certificates[index - 1]}" type="application/pdf">
                        <p>Your browser does not support PDF viewing. 
                        <a href="${pdfUrls.certificates[index - 1]}" target="_blank">Click here to download the certificate</a></p>
                    </iframe>
                `;
            }, 500);
        }

        function closeModal(modalId) {
            const modal = document.getElementById(modalId);
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
            
            // Reset modal body content
            const modalBody = modal.querySelector('.modal-body');
            if (modalId === 'resumeModal' || modalId === 'certificateViewerModal') {
                modalBody.innerHTML = `
                    <div class="loading">
                        <div class="spinner"></div>
                        Loading...
                    </div>
                `;
            }
        }

        // Close modal when clicking outside
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('modal')) {
                const modalId = e.target.id;
                closeModal(modalId);
            }
        });

        // Handle escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                const activeModal = document.querySelector('.modal.active');
                if (activeModal) {
                    closeModal(activeModal.id);
                }
            }
        });

        // Handle orientation change for mobile
        window.addEventListener('orientationchange', function() {
            setTimeout(() => {
                // Refresh iframe on orientation change for better mobile experience
                const activeModal = document.querySelector('.modal.active');
                if (activeModal) {
                    const iframe = activeModal.querySelector('iframe');
                    if (iframe) {
                        const src = iframe.src;
                        iframe.src = '';
                        iframe.src = src;
                    }
                }
            }, 100);
        });