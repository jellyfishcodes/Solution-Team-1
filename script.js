// 1. Mobile Menu Toggle
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        const navItems = document.querySelectorAll('.nav-links a');

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });

        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navItems.forEach(link => link.classList.remove('active'));
                item.classList.add('active');

                if (navLinks.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('active');
                    document.body.classList.remove('no-scroll');
                }
            });
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });

        // 2. Premium AJAX Form Submission (No Redirects!)
        const form = document.getElementById('contact-form');
        const formResult = document.getElementById('form-result');

        form.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevents the browser from redirecting
            
            formResult.className = ''; 
            formResult.innerHTML = "Sending message...";
            formResult.classList.add('success'); // Show temporary neutral state

            const formData = new FormData(form);

            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            })
            .then(async (response) => {
                let json = await response.json();
                if (response.status == 200) {
                    // Success! Show green message and clear inputs
                    formResult.className = 'success';
                    formResult.innerHTML = "Message sent successfully!";
                    form.reset(); 
                } else {
                    // Error! Show red message
                    formResult.className = 'error';
                    formResult.innerHTML = json.message || "Failed to send. Please try again.";
                }
            })
            .catch(error => {
                formResult.className = 'error';
                formResult.innerHTML = "Network error. Please check your connection.";
            });
        });
