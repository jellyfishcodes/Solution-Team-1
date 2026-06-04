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
                // Remove active class from all links
                navItems.forEach(link => link.classList.remove('active'));
                
                // Add active class to the clicked link
                item.classList.add('active');

                // If mobile menu is open, slide it away cleanly when a link is clicked
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
                // Force close mobile menu and restore scrolling if window is scaled up to desktop
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
