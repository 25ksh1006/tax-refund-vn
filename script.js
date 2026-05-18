document.addEventListener('DOMContentLoaded', function() {
    // Accordion Logic
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            // Toggle active class on header
            this.classList.toggle('active');
            
            // Toggle active class on content
            const content = this.nextElementSibling;
            if (content.classList.contains('active')) {
                content.classList.remove('active');
            } else {
                // Close other open accordions (optional, can be removed to allow multiple open)
                document.querySelectorAll('.accordion-content').forEach(item => {
                    item.classList.remove('active');
                });
                document.querySelectorAll('.accordion-header').forEach(item => {
                    item.classList.remove('active');
                });
                
                this.classList.add('active');
                content.classList.add('active');
            }
        });
    });

    // Form Submission Logic
    const form = document.getElementById('refundForm');
    const formSuccess = document.getElementById('formSuccess');

});
