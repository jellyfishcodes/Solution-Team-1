const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        const navItems = document.querySelectorAll('.nav-links a');

        // 1. Mobile Menu Toggle
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });

        // 2. Dynamic Active Underline Toggle
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                navItems.forEach(link => link.classList.remove('active'));
                item.classList.add('active');

                if (navLinks.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('active');
                    document.body.classList.remove('no-scroll');
                }
            });
        });

        // 3. Dynamic Resize Cleanup (Fixes Desktop Scroll Lock Bug)
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });

        // 4. PREMIUM INLINE FORM SUBMISSION (No Redirects)
        const form = document.querySelector('.contact-form form');
        const formContainer = document.querySelector('.contact-form');

        if (form && formContainer) {
            form.addEventListener('submit', function(e) {
                e.preventDefault(); // Prevents the browser redirect
                
                const formData = new FormData(form);
                const json = JSON.stringify(Object.fromEntries(formData));

                // Change button state to "Sending..."
                const submitBtn = form.querySelector('button[type="submit"]');
                submitBtn.innerHTML = 'SENDING...';
                submitBtn.disabled = true;

                // Post data in the background
                fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: json
                })
                .then(async (response) => {
                    if (response.status === 200) {
                        // Smoothly replace the form with a premium success card matching your branding
                        formContainer.innerHTML = `
                            <div style="text-align: center; padding: 40px 0; color: #FFFFFF; animation: fadeUp 0.6s ease;">
                                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" style="margin-bottom: 24px;">
                                    <circle cx="32" cy="32" r="30" stroke="#FFC000" stroke-width="3" fill="rgba(255, 192, 0, 0.1)"/>
                                    <path d="M20 32L28 40L44 24" stroke="#FFC000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <h3 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 12px; color: #FFFFFF;">Message Sent!</h3>
                                <p style="font-size: 0.95rem; opacity: 0.85; max-width: 300px; margin: 0 auto; line-height: 1.7;">
                                    Thank you for getting in touch. We have received your message and will respond within 24 hours.
                                </p>
                            </div>
                        `;
                    } else {
                        alert("Something went wrong. Please try again.");
                        submitBtn.innerHTML = 'SEND MESSAGE';
                        submitBtn.disabled = false;
                    }
                })
                .catch(error => {
                    alert("Something went wrong. Please try again.");
                    submitBtn.innerHTML = 'SEND MESSAGE';
                    submitBtn.disabled = false;
                });
            });
        }