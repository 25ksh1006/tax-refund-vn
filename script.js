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

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Collect form data
        const formData = new FormData(form);
        // Add required FormSubmit configurations
        formData.append('_subject', '새로운 무료 조회 신청 (베트남 랜딩페이지)');
        formData.append('_captcha', 'false');

        // Change button text to indicate loading
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = 'Đang gửi... (전송 중...)';
        submitBtn.disabled = true;

        // Send data using FormSubmit AJAX API
        fetch('https://formsubmit.co/ajax/bsy900814@gmail.com', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            // Hide form and show success message
            form.classList.add('hidden');
            formSuccess.classList.remove('hidden');
            
            // Scroll to success message
            formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Đã xảy ra lỗi. Vui lòng thử lại sau. (오류가 발생했습니다. 다시 시도해 주세요.)');
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        });
    });
});
